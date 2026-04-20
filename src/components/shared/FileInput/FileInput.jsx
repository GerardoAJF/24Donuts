// FileInput.jsx
import React, { useRef } from "react";
import "./FileInput.css";

const FileInput = ({ label, value, onChange }) => {
    const inputRef = useRef(null);

    const handleClick = () => inputRef.current.click();

    return (
        <div className="file-input">
            {label && <label className="file-input__label">{label}</label>}
            <div className="file-input__field" onClick={handleClick}>
                <span className="file-input__filename">
                    {value ? value.name : ""}
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24"
                    fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="17 8 12 3 7 8" />
                    <line x1="12" y1="3" x2="12" y2="15" />
                </svg>
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    className="file-input__hidden"
                    onChange={(e) => onChange(e.target.files[0])}
                />
            </div>
            {value && (
                <img
                    className="file-input__preview"
                    src={URL.createObjectURL(value)}
                    alt="preview"
                />
            )}
        </div>
    );
};

export default FileInput;