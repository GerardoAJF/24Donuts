import { useState } from "react";
import { FaStar } from "react-icons/fa6";
import "./StarRating.css";

// readOnly: solo muestra `value` estrellas llenas (para promedios y reseñas existentes).
// interactivo (readOnly=false): permite elegir de 1 a 5 estrellas y avisa con onChange.
function StarRating({ value = 0, onChange, readOnly = false, size = 20 }) {
  const [hovered, setHovered] = useState(0);
  const displayValue = readOnly ? value : hovered || value;

  return (
    <div className={`star-rating ${readOnly ? "star-rating--readonly" : ""}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <FaStar
          key={star}
          size={size}
          className={star <= Math.round(displayValue) ? "star-filled" : "star-empty"}
          onClick={readOnly ? undefined : () => onChange && onChange(star)}
          onMouseEnter={readOnly ? undefined : () => setHovered(star)}
          onMouseLeave={readOnly ? undefined : () => setHovered(0)}
        />
      ))}
    </div>
  );
}

export default StarRating;
