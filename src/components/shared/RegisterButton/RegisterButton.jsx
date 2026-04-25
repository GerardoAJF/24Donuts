import React from 'react';
import './registerButton.css';

const Boton = ({ text, onClick }) => {
  return (
    
    <button className="registerButton" onClick={onClick}>
      {text}
    </button>
  );
};

export default Boton;