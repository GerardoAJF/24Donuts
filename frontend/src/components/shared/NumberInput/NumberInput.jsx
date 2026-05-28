// NumberInput.jsx
import React from "react";
import "./NumberInput.css";

const NumberInput = ({ label, value, onChange, min, max, placeholder }) => {
    const handleChange = (e) => {
        const val = e.target.value;
        if (max !== undefined && val > max) return;
        if (min !== undefined && val < min) return;
        onChange(val);
    };

    return (
        <div className="number-input">
            {label && <label className="number-input__label">{label}</label>}
            <input
                className="number-input__field"
                type="number"
                value={value}
                onChange={handleChange}
                min={min}
                max={max}
                placeholder={placeholder}
            />
        </div>
    );
};

export default NumberInput;