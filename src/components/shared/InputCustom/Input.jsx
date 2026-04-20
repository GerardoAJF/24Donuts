import "./Input.css";

// InputCustom.jsx
function InputCustom({ label, placeholder, type = "text", value, onChange }) {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    );
}

export default InputCustom;