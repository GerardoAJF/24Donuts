import { useState } from "react";
import "./Counter.css";

function Counter({ initialValue = 0, min = 0, max = 99, onChange }) {
  const [count, setCount] = useState(initialValue);

  const decrement = () => {
    if (count > min) {
      const next = count - 1;
      setCount(next);
      if (onChange) onChange(next);
    }
  };

  const increment = () => {
    if (count < max) {
      const next = count + 1;
      setCount(next);
      if (onChange) onChange(next);
    }
  };

  return (
    <div className="counter">
      <button className="counter-btn" onClick={decrement}>
        −
      </button>
      <span className="counter-value">{count}</span>
      <button className="counter-btn" onClick={increment}>
        +
      </button>
    </div>
  );
}

export default Counter;
