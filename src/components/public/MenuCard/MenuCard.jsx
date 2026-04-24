import { useState } from "react";
import BotonPrimario from "../../shared/Boton/Boton";
import Counter from "../../shared/Counter/Counter";
import "./MenuCard.css";

function MenuCard({ image, name, tags = [], price, originalPrice }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="menu-card">
      <img className="menu-card-image" src={image} alt={name} />
      <div className="menu-card-body">
        <div className="menu-card-tags">
          {tags.map((tag, i) => (
            <span
              key={i}
              className="menu-card-tag"
              style={{ backgroundColor: tag.color, color: tag.textColor || "#3b312b" }}
            >
              {tag.label}
            </span>
          ))}
        </div>
        <h3 className="menu-card-name">{name}</h3>
        <div className="menu-card-price-row">
          {originalPrice && (
            <span className="menu-card-original-price">${originalPrice.toFixed(2)}</span>
          )}
          <span className="menu-card-price">${price.toFixed(2)}</span>
        </div>
        <div className="menu-card-actions">
          <BotonPrimario>Agregar</BotonPrimario>
          <Counter initialValue={1} min={1} max={99} onChange={setQuantity} />
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
