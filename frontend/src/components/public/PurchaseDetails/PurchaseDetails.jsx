import { useState } from "react";
import BotonPrimario from "../../shared/Boton/Boton";
import DeliveryCheckbox from "../DeliveryCheckbox/DeliveryCheckbox";
import InputCustom from "../../shared/InputCustom/Input";
import SelectField from "../../shared/SelectField/SelectField";
import { useToast } from "../../../context/ToastContext.jsx";
import "./PurchaseDetails.css";

// El modelo Order del backend solo acepta 'Efectivo' o 'Tarjeta' (sin pasarela real de pago,
// como indica la rúbrica: "no es obligatorio tener una pasarela de pago configurada").
const PAY_METHODS = [
  { label: "Efectivo", value: "Efectivo" },
  { label: "Tarjeta", value: "Tarjeta" },
];

function PurchaseDetails({ onConfirm, loading = false }) {
  const [payMethod, setPayMethod] = useState(PAY_METHODS[0].value);
  const [delivery, setDelivery] = useState(false);
  const [address, setAddress] = useState('');
  const { showToast } = useToast();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (delivery && !address.trim()) {
      showToast('Ingresa la dirección de entrega', 'error');
      return;
    }

    onConfirm({ payMethod, delivery, address: address.trim() });
  };

  return (
    <form className="purchase-details" onSubmit={handleSubmit}>
      <h2 className="purchase-details-title">Detalles de Compra</h2>

      <SelectField
        label="Método de pago:"
        options={PAY_METHODS}
        value={payMethod}
        onChange={(e) => setPayMethod(e.target.value)}
      />

      <div className="purchase-details-row">
        <DeliveryCheckbox label="Entrega a domicilio" onChange={setDelivery} />
      </div>

      {delivery && (
        <InputCustom
          label="Dirección de entrega:"
          placeholder="Colonia, calle, referencia"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
        />
      )}

      <BotonPrimario type="submit" disabled={loading}>
        {loading ? 'Confirmando...' : 'Confirmar pedido'}
      </BotonPrimario>
    </form>
  );
}

export default PurchaseDetails;
