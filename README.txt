# Schizophrenia Relapse Predictor Web App
This is a simple web application that predicts the risk of schizophrenia relapse based on user input. It uses:
- A machine learning model (Flask backend)
- A Vite + React frontend form


# How It Works
Users fill out a form with 15 questions. The backend processes the answers and predicts whether the patient is at risk of relapse.


# Folder Structur
- `backend/`: Flask app and trained ML model
- `frontend/`: Vite + React frontend (TypeScript)


# How to Run
1. Backend (Python Flask)
cd backend
pip install -r requirements.txt
python app.py
Backend runs at: `http://localhost:5000`
Download model first from Train file

2. Frontend (React + Vite)
cd frontend
npm install
npm run dev
Frontend runs at: `http://localhost:5173`


# Technologies Used
- Flask
- Scikit-learn
- React + TypeScript (Vite)
- CORS for API access