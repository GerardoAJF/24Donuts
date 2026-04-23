// ColorInput.jsx
import React from "react";
import "./ColorInput.css";

const colors = [
    "#3E2C2C", "#4a3f35", "#8b735b",
    "#C4A0A0", "#8DBF7A", "#E07070",
    "#F5C842", "#A8A8E8", "#D4A0D4",
];

const ColorInput = ({ label, value, onChange }) => {
    return (
        <div className="color-input">
            {label && <label className="color-input__label">{label}</label>}
            <div className="color-input__grid">
                {colors.map((color) => (
                    <button
                        key={color}
                        className={`color-input__swatch ${value === color ? "color-input__swatch--selected" : ""}`}
                        style={{ backgroundColor: color }}
                        onClick={() => onChange(color)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ColorInput;

/*
const [color, setColor] = useState(null);

<ColorInput
  label="Color:"
  value={color}
  onChange={setColor}
/>
*/