import "./Input.css";

function InputCustom({ label, placeholder, type = "text" }) {
    return (
        <div className="input-container">
            <label className="input-label">{label}</label>
            <input
                className="input-field"
                type={type}
                placeholder={placeholder}
            />
        </div>
    );
}

export default InputCustom;