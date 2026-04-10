import { useState } from 'react';
import './InputPass.css';

function InputPassword({ label, showForgotLink = true }) {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="input-container">
      <label className="input-label">{label}</label>
      
      <div className="password-wrapper">
        <input 
          type={isVisible ? "text" : "password"} 
          className="password-input"
          placeholder="***********"
        />
        
        <button type="button" className="eye-icon" onClick={toggleVisibility}>
          {isVisible ? '👁️‍🗨️' : '👁️'} 
        </button>
      </div>

      {showForgotLink && (
        <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
      )}
    </div>
  );
}

export default InputPassword;