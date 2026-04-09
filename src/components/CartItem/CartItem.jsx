import { useState } from "react";
import Counter from "../Counter/Counter";
import "./CartItem.css";

function CartItem({ image, name, price }) {
  const [quantity, setQuantity] = useState(1);

  const subtotal = (price * quantity).toFixed(2);

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={image} alt={name} />

      <div className="cart-item-details">
        <div className="cart-item-grid">
          <span className="cart-item-label">Precio:</span>
          <span className="cart-item-label">Cantidad:</span>
          <span className="cart-item-label">Subtotal:</span>

          <span className="cart-item-value">${price.toFixed(2)}</span>
          <Counter initialValue={1} min={1} max={99} onChange={setQuantity} />
          <span className="cart-item-value">${subtotal}</span>
        </div>

        <p className="cart-item-name">{name}</p>
      </div>
    </div>
  );
}

export default CartItem;
