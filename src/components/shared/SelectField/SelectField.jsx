import "./SelectField.css";

function SelectField({ label, options = [] }) {
  return (
    <div className="select-container">
      <label className="select-label">{label}</label>
      <select className="select-field">
        {options.map((option, i) => (
          <option key={i} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default SelectField;
