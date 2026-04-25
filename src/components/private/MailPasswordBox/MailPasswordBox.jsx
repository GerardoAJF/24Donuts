import React, { useState, useRef, useEffect } from 'react';
import './mailPasswordBox.css';

const MailPasswordBox = ({ onPinChange }) => {
  const [pin, setPin] = useState(new Array(6).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (onPinChange) {
      onPinChange(pin.join(""));
    }
  }, [pin, onPinChange]);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newPin = [...pin];
    newPin[index] = value.substring(value.length - 1);
    setPin(newPin);

    if (value && index < 5 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0 && inputRefs.current[index - 1]) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6).split("");
    if (pastedData.some(isNaN)) return;

    const newPin = [...pin];
    pastedData.forEach((char, index) => {
      newPin[index] = char;
    });
    setPin(newPin);

    const focusIndex = pastedData.length < 6 ? pastedData.length : 5;
    inputRefs.current[focusIndex].focus();
  };

  return (
    <div className="otp-container" style={{ display: 'flex', gap: '8px', justifyContent: 'center', margin: '20px 0' }}>
      {pin.map((data, index) => (
        <input
          key={index}
          type="text"
          maxLength={1}
          ref={(el) => (inputRefs.current[index] = el)}
          value={data}
          onChange={(e) => handleChange(e, index)}
          onKeyDown={(e) => handleKeyDown(e, index)}
          onPaste={handlePaste}
          className="input-otp-box" 
        />
      ))}
    </div>
  );
};

export default MailPasswordBox;