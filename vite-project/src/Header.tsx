
import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import './Header.css'; 

function Header() {
  const navigate = useNavigate(); 

  return (
    <header className="header">
      <div className="header-content">
        <div className="First-text">
          <p className="free-tag">forever-free to use</p>
        </div>
        <div className="Text-Logo">
            <span className="logo-relapse">Relapse</span>
            <span className="logo-predictor">Predictor</span>
        </div>
        <div className='Row-2'>
          <div className='filler'>
            <p>
            some filler text here some filler text here some filler text
            here some filler text here some filler text here some filler
            text here
          </p>
            <div className="button-1">
              <button onClick={() => navigate('/next-page')}>Start </button>
            </div>
          </div>
          <div className="header-image">
            <img 
            src="./src/assets2/Image1.png" 
            alt="Group of diverse people with raised hands" 
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;