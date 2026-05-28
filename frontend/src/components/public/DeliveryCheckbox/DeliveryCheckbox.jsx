import { useState } from "react";
import "./DeliveryCheckbox.css";

function DeliveryCheckbox({ label = "Delivery:", onChange }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const next = !checked;
    setChecked(next);
    if (onChange) onChange(next);
  };

  return (
    <label className="delivery-checkbox">
      <input
        type="checkbox"
        className="delivery-checkbox-input"
        checked={checked}
        onChange={handleChange}
      />
      <span className="delivery-checkbox-label">{label}</span>
    </label>
  );
}

export default DeliveryCheckbox;
