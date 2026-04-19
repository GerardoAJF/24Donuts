import { useState } from "react";
import BotonPrimario from "../Boton/Boton";
import Counter from "../../shared/Counter/Counter";
import "./ProductCard.css";

function ProductCard({ image, name, tags = [], description, price }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="product-card">
      <img className="product-card-image" src={image} alt={name} />

      <div className="product-card-info">
        <h2 className="product-card-name">{name}</h2>

        <div className="product-card-tags">
          <span className="product-card-tags-label">Etiquetas:</span>
          {tags.map((tag, i) => (
            <span
              key={i}
              className="product-card-tag"
              style={{ backgroundColor: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        <div className="product-card-description">
          <p className="product-card-description-title">Descripción</p>
          <p className="product-card-description-text">{description}</p>
        </div>

        <span className="product-card-price">Precio: ${price.toFixed(2)}</span>

        <div className="product-card-actions">
          <BotonPrimario>Agregar</BotonPrimario>
          <Counter initialValue={1} min={1} max={99} onChange={setQuantity} />
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
