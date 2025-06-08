from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np
import traceback

app = Flask(__name__)
CORS(app, resources={r"/predict": {"origins": "http://localhost:5173"}})

# Model Loading
try:
    model = joblib.load("model/finalized_model.sav")
    print("Model loaded successfully.")
except FileNotFoundError:
    print("ERROR: Model file 'model/finalized_model.sav' not found.")
    exit()
except Exception as e:
    print(f"ERROR: Failed to load model - {e}")
    exit()


# Feature Definitions
EXPECTED_NUMERIC_FEATURES = ["age", "schizophrenia_duration", "hospitalized"]
EXPECTED_CATEGORICAL_FEATURES = {
    "gender": ["Male", "Female"],
    "education": ["Primary", "Secondary", "High", "University", "Postgraduate"],
    "occupation": ["Employed", "Unemployed", "Retired", "Student"],
    "income": ["Low", "Medium", "High"],
    "residence": ["Rural", "Urban"],
    "diagnosis": ["No", "Yes"],
    "stress": ["Low", "Medium", "High"],
    "relatives_schizophrenia": ["Yes", "No"],
    "self_harm": ["Yes", "No"],
    "substance_use": ["Yes", "No"],
    "social_support": ["Yes", "No"],
    "medication_adherence": ["Poor", "Moderate", "Good"]
}
FINAL_FEATURE_ORDER = (
    EXPECTED_NUMERIC_FEATURES[:1] + # age
    list(EXPECTED_CATEGORICAL_FEATURES.keys()) +
    EXPECTED_NUMERIC_FEATURES[1:] # schizophrenia_duration, hospitalized
)


# Preprocessing Function
def preprocess_input(data):
    processed = []
    missing_keys = []
    invalid_values = {}

    # Validation Step
    all_expected_keys = EXPECTED_NUMERIC_FEATURES + list(EXPECTED_CATEGORICAL_FEATURES.keys())
    for key in all_expected_keys:
        if key not in data or data[key] is None or str(data[key]).strip() == '':
            missing_keys.append(key)

    if missing_keys:
        raise ValueError(f"Missing required fields: {', '.join(missing_keys)}")

    # Processing Step
    for feature_name in FINAL_FEATURE_ORDER:
        value_str = str(data[feature_name]).strip()

        if feature_name in EXPECTED_NUMERIC_FEATURES:
            try:
                numeric_value = float(value_str)
                if numeric_value < 0:
                     raise ValueError(f"Negative value not allowed for {feature_name}")
                processed.append(numeric_value)
            except (ValueError, TypeError):
                invalid_values[feature_name] = f"Invalid numeric value '{value_str}'"

        # Handle Categorical Features
        elif feature_name in EXPECTED_CATEGORICAL_FEATURES:
            valid_options = EXPECTED_CATEGORICAL_FEATURES[feature_name]
            valid_options_title_case = [opt.title() for opt in valid_options]
            input_title_case = value_str.title()

            try:
                index = valid_options_title_case.index(input_title_case)
                processed.append(index)
            except ValueError:
                invalid_values[feature_name] = (
                    f"Invalid option '{value_str}'. Expected one of (case-insensitive): "
                    f"{', '.join(valid_options)}"
                )

    if invalid_values:
        error_messages = [f"{k}: {v}" for k, v in invalid_values.items()]
        raise ValueError(f"Invalid input values: {'; '.join(error_messages)}")

    return np.array(processed).reshape(1, -1)


# API Routes
@app.route("/", methods=["GET"])
def home():
    """ Basic health check endpoint. """
    return "Schizophrenia Relapse Prediction Backend is running!", 200

@app.route("/favicon.ico")
def favicon():
    """ Handles browser requests for favicon. """
    return "", 204 # No Content

@app.route("/predict", methods=["POST"])
def predict():
    """
    Receives patient data, preprocesses it, predicts relapse risk,
    and returns the prediction.
    """
    if not request.is_json:
        return jsonify({"error": "Request must be JSON"}), 400

    data = request.json

    try:
        input_data = preprocess_input(data)
        prediction_code = model.predict(input_data)[0]
        prediction_label = "Relapse" if prediction_code == 1 else "No Relapse"
        return jsonify({"prediction": prediction_label})

    except ValueError as ve:
        print(f"Validation Error: {ve}")
        return jsonify({"error": str(ve)}), 400 # Bad Request
    except Exception as e:
        print("--- UNEXPECTED ERROR ---")
        print(f"Error processing request: {e}")
        traceback.print_exc()
        print("--- END TRACEBACK ---")
        return jsonify({"error": "An internal error occurred. Please try again later."}), 500 # Internal Server Error


if __name__ == "__main__":
    app.run(debug=True, port=5000)
