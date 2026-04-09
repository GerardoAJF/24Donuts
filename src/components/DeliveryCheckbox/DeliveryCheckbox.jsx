import { useState } from "react";
import "./DeliveryCheckbox.css";

function DeliveryCheckbox({ onChange }) {
  const [checked, setChecked] = useState(false);

  const handleChange = () => {
    const next = !checked;
    setChecked(next);
    if (onChange) onChange(next);
  };

  return (
    <label className="delivery-checkbox">
      <span className="delivery-checkbox-label">Delivery:</span>
      <input
        type="checkbox"
        className="delivery-checkbox-input"
        checked={checked}
        onChange={handleChange}
      />
    </label>
  );
}

export default DeliveryCheckbox;
