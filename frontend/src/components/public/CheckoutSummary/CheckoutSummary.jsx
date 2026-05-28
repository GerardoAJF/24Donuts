import BotonPrimario from "../../shared/Boton/Boton";
import DeliveryCheckbox from "../DeliveryCheckbox/DeliveryCheckbox";
import "./CheckoutSummary.css";

function CheckoutSummary({ total = 0, onFinalize }) {
  return (
    <div className="checkout-summary">
      <p className="checkout-summary-total">
        Total a pagar: <span>${total.toFixed(2)}</span>
      </p>

      <DeliveryCheckbox label="Acepto los términos y condiciones" />

      <BotonPrimario onClick={onFinalize}>Finalizar Compra</BotonPrimario>
    </div>
  );
}

export default CheckoutSummary;
