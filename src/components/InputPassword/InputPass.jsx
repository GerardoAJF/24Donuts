import { useState } from 'react';
import './InputPass.css';

function InputPassword({ label }) {
  // Estado para ver si la contraseña es visible o no
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div className="input-container"> {/* Reutilizamos el estilo del label anterior */}
      <label className="input-label">{label}</label>
      
      <div className="password-wrapper">
        <input 
          type={isVisible ? "text" : "password"} 
          className="password-input"
          placeholder="***********"
        />
        
        {/* Botón del ojo */}
        <button type="button" className="eye-icon" onClick={toggleVisibility}>
          {isVisible ? '👁️‍🗨️' : '👁️'} 
        </button>
      </div>

      <a href="#" className="forgot-link">¿Olvidaste tu contraseña?</a>
    </div>
  );
}

export default InputPassword;