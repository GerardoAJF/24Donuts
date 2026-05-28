import { useState } from 'react';
import './InputPass.css';

function InputPassword({ label, showForgotLink = true, value, onChange, placeholder = "***********" }) {
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
          placeholder={placeholder}
          value={value}
          onChange={onChange}
        />
        
        <button type="button" className="eye-icon" onClick={toggleVisibility}>
          {isVisible ? '👁️‍🗨️' : '👁️'} 
        </button>
      </div>

    
    </div>
  );
}

export default InputPassword;