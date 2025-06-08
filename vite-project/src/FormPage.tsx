import React, { useState, ChangeEvent, FormEvent } from "react";
import "./FormPage.css"; // Assuming FormPage.css remains the same as your original

// No options object needed here as we are using text inputs

function FormPage() {
  // Initialize state with empty strings for all fields
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    education: "",
    occupation: "",
    income: "",
    residence: "",
    diagnosis: "",
    stress: "",
    schizophrenia_duration: "",
    hospitalized: "",
    relatives_schizophrenia: "",
    self_harm: "",
    substance_use: "",
    social_support: "",
    medication_adherence: ""
  });

  const [showPopup, setShowPopup] = useState(false);
  const [predictionResult, setPredictionResult] = useState("");
  const [isLoading, setIsLoading] = useState(false); // State for loading indicator
  const [error, setError] = useState<string | null>(null); // State for error messages

  // Handler for input changes (works for both text and number)
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Function to send data to the backend
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault(); // Prevent default form submission
    setIsLoading(true); // Start loading indicator
    setError(null); // Clear previous errors
    setShowPopup(false); // Hide previous popup

    // Basic frontend validation (check if numerical fields are filled)
    // You might want to add checks for all fields if they are all required
    if (!formData.age || !formData.schizophrenia_duration || !formData.hospitalized) {
        setError("Please fill in at least the numerical fields (Age, Duration, Hospitalized). Ensure all other fields are completed accurately.");
        setIsLoading(false);
        return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/predict", { // Ensure backend is running at this address
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData), // Send current form data
      });

      const data = await response.json(); // Parse the JSON response from backend

      if (!response.ok) {
        // If response status is not 2xx, throw an error with the message from backend
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      // If successful, set prediction and show popup
      setPredictionResult(data.prediction);
      setShowPopup(true);

    } catch (error: any) {
      // Catch errors from fetch or backend response
      console.error("Error during prediction:", error);
      // Display the specific error message from the backend if available
      setError(error.message || "Failed to get prediction. Please check your inputs and try again.");
    } finally {
      setIsLoading(false); // Stop loading indicator regardless of success or failure
    }
  };

  // Function to close the popup
  const closePopup = () => setShowPopup(false);

  return (
    <div className="Content">
      {/* Header Section */}
      <div className="Header">
        <p className="Header-text1">
          “Our AI-powered predictor helps assess the risk of relapse in schizophrenia patients, enabling early intervention and better management.”
        </p>
         {/* You can update this text with actual metrics if you have them */}
        <p className="Header-text2">Please fill in the details below accurately.</p>
      </div>

      {/* Form Section */}
      <form className="Body" onSubmit={handleSubmit}>
        {/* Display error message if any */}
        {error && <div style={{ color: 'red', marginBottom: '1rem', textAlign: 'center', width: '100%' }}>Error: {error}</div>}

        <div className="Columns">
          {/* Column 1 */}
          <div className="Column-1">
            {/* Use InputField for all, specifying type and placeholder */}
            <InputField label="What is the patient's age?" name="age" type="number" placeholder="e.g., 35" value={formData.age} onChange={handleChange} />
            <InputField label="What is the patient's gender?" name="gender" type="text" placeholder="Male / Female" value={formData.gender} onChange={handleChange} />
            <InputField label="What is the patient's education level?" name="education" type="text" placeholder="Primary / Secondary / High / University / Postgraduate" value={formData.education} onChange={handleChange} />
            <InputField label="What is the patient’s occupation status?" name="occupation" type="text" placeholder="Employed / Unemployed / Retired / Student" value={formData.occupation} onChange={handleChange} />
            <InputField label="What is the patient’s income level?" name="income" type="text" placeholder="Low / Medium / High" value={formData.income} onChange={handleChange} />
            <InputField label="Does the patient live in rural or urban setting?" name="residence" type="text" placeholder="Rural / Urban" value={formData.residence} onChange={handleChange} />
            <InputField label="Has the patient been diagnosed with schizophrenia?" name="diagnosis" type="text" placeholder="Yes / No" value={formData.diagnosis} onChange={handleChange} />
          </div>

          {/* Column 2 */}
          <div className="Column-2">
            <InputField label="What is the patient’s stress level?" name="stress" type="text" placeholder="Low / Medium / High" value={formData.stress} onChange={handleChange} />
            <InputField label="How long has the subject had schizophrenia? (in years)" name="schizophrenia_duration" type="number" placeholder="e.g., 5" value={formData.schizophrenia_duration} onChange={handleChange} />
            <InputField label="How many times has the patient been hospitalized before?" name="hospitalized" type="number" placeholder="e.g., 2" value={formData.hospitalized} onChange={handleChange} />
            <InputField label="Do any relatives of the patient also suffer from schizophrenia?" name="relatives_schizophrenia" type="text" placeholder="Yes / No" value={formData.relatives_schizophrenia} onChange={handleChange} />
            <InputField label="Has the patient ever extremely harmed themselves?" name="self_harm" type="text" placeholder="Yes / No" value={formData.self_harm} onChange={handleChange} />
            <InputField label="Does the patient take substances (tobacco, alcohol, or other substances)?" name="substance_use" type="text" placeholder="Yes / No" value={formData.substance_use} onChange={handleChange} />
            <InputField label="Does the patient receive social support?" name="social_support" type="text" placeholder="Yes / No" value={formData.social_support} onChange={handleChange} />
            <InputField label="How well is the patient adhering to their medication regimen?" name="medication_adherence" type="text" placeholder="Poor / Moderate / Good" value={formData.medication_adherence} onChange={handleChange} />
          </div>
        </div>

        {/* Submit Button */}
        <div className="Button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Predicting..." : "Submit and Predict"}
          </button>
        </div>
      </form>

      {/* Prediction Result Popup (using the same CSS as before) */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-content">
            <div className="popup-header">
              <div className="prediction-label">AI Prediction:</div>
              <div className="prediction-result">{predictionResult}</div>
              <button className="close-button" onClick={closePopup}>×</button>
            </div>
            <div className="popup-illustration">
              <div className="person-illustration"></div> {/* Placeholder illustration */}
            </div>
            <div className="popup-tip">
              <div className="tip-label">Important Note:</div>
              <div className="tip-content">
                This prediction is based on a model and is not a substitute for professional medical advice. Please consult with a healthcare provider for any health concerns.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- Reusable Input Field Component (Handles both text and number) ---
interface InputFieldProps {
  label: string;
  name: string;
  type: string; // "text" or "number"
  placeholder: string;
  value: string; // Value is always string in input fields
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const InputField: React.FC<InputFieldProps> = ({ label, name, type, placeholder, value, onChange }) => (
  // Make sure these class names match your FormPage.css
  <div className="input-field">
    <label className="input-label">{label}</label>
    <input
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className="input-box" // Ensure this class is styled in FormPage.css
      required // Basic HTML5 validation - ensures field is not empty
      min={type === "number" ? "0" : undefined} // Set min for number inputs
      // Add pattern attribute for more specific text validation if needed, e.g., pattern="Male|Female"
      // Note: pattern validation can be complex to get right for all cases
    />
  </div>
);


export default FormPage;
