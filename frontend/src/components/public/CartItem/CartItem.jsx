import { FaTrash } from "react-icons/fa6";
import Counter from "../../shared/Counter/Counter";
import "./CartItem.css";

function CartItem({ image, name, price, amount = 1, subtotal, onChangeAmount, onRemove, readOnly = false }) {
  const computedSubtotal = subtotal !== undefined ? subtotal : price * amount;

  return (
    <div className="cart-item">
      <img className="cart-item-image" src={image} alt={name} />

      <div className="cart-item-details">
        <div className="cart-item-grid">
          <span className="cart-item-label">Precio:</span>
          <span className="cart-item-label">Cantidad:</span>
          <span className="cart-item-label">Subtotal:</span>

          <span className="cart-item-value">${price.toFixed(2)}</span>
          {readOnly ? (
            <span className="cart-item-value">{amount}</span>
          ) : (
            <Counter initialValue={amount} min={1} max={99} onChange={onChangeAmount} />
          )}
          <span className="cart-item-value">${computedSubtotal.toFixed(2)}</span>
        </div>

        <p className="cart-item-name">{name}</p>
      </div>

      {!readOnly && onRemove && (
        <button type="button" className="cart-item-remove" onClick={onRemove} aria-label="Eliminar producto">
          <FaTrash size={16} />
        </button>
      )}
    </div>
  );
}

export default CartItem;
