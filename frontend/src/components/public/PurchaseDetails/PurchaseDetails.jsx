import BotonPrimario from "../../shared/Boton/Boton";
import DeliveryCheckbox from "../DeliveryCheckbox/DeliveryCheckbox";
import InputCustom from "../../shared/InputCustom/Input";
import SelectField from "../../shared/SelectField/SelectField";
import "./PurchaseDetails.css";

function PurchaseDetails() {
  return (
    <div className="purchase-details">
      <h2 className="purchase-details-title">Detalles de Compra</h2>

      <SelectField
        label="Método de pago:"
        options={[
          { label: "Efectivo", value: "efectivo" },
          { label: "Tarjeta de crédito", value: "credito" },
          { label: "Tarjeta de débito", value: "debito" },
        ]}
      />

      <div className="purchase-details-row">
        <DeliveryCheckbox />
        <InputCustom label="Dirección de entrega:" placeholder="" />
      </div>

      <div className="purchase-details-row">
        <InputCustom label="Fecha de Expiración:" placeholder="" />
        <InputCustom label="CVV:" placeholder="" />
      </div>

      <BotonPrimario>Enviar</BotonPrimario>
    </div>
  );
}

export default PurchaseDetails;
