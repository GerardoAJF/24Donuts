// DateInput.jsx
import React from "react";
import "./DateInput.css";

const DateInput = ({ label, value, onChange }) => {
    return (
        <div className="date-input">
            {label && <label className="date-input__label">{label}</label>}
            <input
                className="date-input__field"
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    );
};

export default DateInput;

/*
const [date, setDate] = useState("");

<DateInput
  label="Fecha de inicio:"
  value={date}
  onChange={setDate}
/>
*/