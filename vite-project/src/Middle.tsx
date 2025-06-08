// import React, { useState } from 'react';
// import './MiddleSection.css';

// function MiddleSection() {
//   const [formData, setFormData] = useState({});

//   const handleInputChange = (id, value) => {
//     setFormData(prev => ({
//       ...prev,
//       [id]: value
//     }));
//   };

//   return (
//     <section className="middle-section">
//       <div className="description-box">
//         <blockquote className="predictor-quote">
//           "Our AI-powered predictor helps assess the risk of relapse in schizophrenia patients, enabling early intervention and better management."
//         </blockquote>
//         <p className="stats">96% Accuracy | 97% Precision | 97% F1-Score</p>
//       </div>

//       <div className="questionnaire-grid">
//         <div className="question-box">
//           <label htmlFor="gender">What is the patient's gender?</label>
//           <input 
//             type="text" 
//             id="gender" 
//             onChange={(e) => handleInputChange('gender', e.target.value)}
//           />
//         </div>

//         <div className="question-box">
//           <label htmlFor="hospitalized">How long has the patient been hospitalized (in years)?</label>
//           <input 
//             type="text" 
//             id="hospitalized" 
//             onChange={(e) => handleInputChange('hospitalized', e.target.value)}
//           />
//         </div>

//         <div className="question-box">
//           <label htmlFor="education">What is the patient's education level?</label>
//           <select 
//             id="education" 
//             onChange={(e) => handleInputChange('education', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Elementary">Elementary</option>
//             <option value="High School">High School</option>
//             <option value="Undergraduate">Undergraduate</option>
//             <option value="Postgraduate">Postgraduate</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="hospitalized-times">How many times has the patient been hospitalized before?</label>
//           <input 
//             type="text" 
//             id="hospitalized-times" 
//             onChange={(e) => handleInputChange('hospitalizedTimes', e.target.value)}
//           />
//         </div>

//         <div className="question-box">
//           <label htmlFor="marital">What is the patient's marital status?</label>
//           <select 
//             id="marital" 
//             onChange={(e) => handleInputChange('marital', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Single">Single</option>
//             <option value="Married">Married</option>
//             <option value="Divorced">Divorced</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="relatives">Do any relatives of the patient also suffer from schizophrenia?</label>
//           <select 
//             id="relatives" 
//             onChange={(e) => handleInputChange('relatives', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="occupation">What is the patient's occupation status?</label>
//           <select 
//             id="occupation" 
//             onChange={(e) => handleInputChange('occupation', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Employed">Employed</option>
//             <option value="Unemployed">Unemployed</option>
//             <option value="Student">Student</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="forced-term">Has the patient ever extremely termed themselves?</label>
//           <select 
//             id="forced-term" 
//             onChange={(e) => handleInputChange('forcedTerm', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="income">What is the patient's income level?</label>
//           <select 
//             id="income" 
//             onChange={(e) => handleInputChange('income', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="substances">Does the patient take substances (tobacco, alcohol, or other substances)?</label>
//           <select 
//             id="substances" 
//             onChange={(e) => handleInputChange('substances', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="living-setting">Does the patient live in rural or urban setting?</label>
//           <select 
//             id="living-setting" 
//             onChange={(e) => handleInputChange('livingSetting', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Rural">Rural</option>
//             <option value="Urban">Urban</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="social-support">Does the patient receive social support?</label>
//           <select 
//             id="social-support" 
//             onChange={(e) => handleInputChange('socialSupport', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Yes">Yes</option>
//             <option value="No">No</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="stress">What is the patient's stress level?</label>
//           <select 
//             id="stress" 
//             onChange={(e) => handleInputChange('stress', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Low">Low</option>
//             <option value="Medium">Medium</option>
//             <option value="High">High</option>
//           </select>
//         </div>

//         <div className="question-box">
//           <label htmlFor="medication">How well is the patient adhering to their medication regimen?</label>
//           <select 
//             id="medication" 
//             onChange={(e) => handleInputChange('medication', e.target.value)}
//           >
//             <option value="">Select...</option>
//             <option value="Poor">Poor</option>
//             <option value="Moderate">Moderate</option>
//             <option value="Good">Good</option>
//           </select>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default MiddleSection;