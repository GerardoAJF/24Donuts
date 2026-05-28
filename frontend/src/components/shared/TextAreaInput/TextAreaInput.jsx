// TextAreaInput.jsx
import React from "react";
import "./TextAreaInput.css";

const TextAreaInput = ({ label, placeholder, value, onChange }) => {
    return (
        <div className="textarea-input">
            {label && <label className="textarea-input__label">{label}</label>}
            <textarea
                className="textarea-input__field"
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default TextAreaInput;

/*
const [description, setDescription] = useState("");

<TextAreaInput
  label="Descripción:"
  placeholder="Lorem ipsum dolor ameit"
  value={description}
  onChange={setDescription}
/>
*/