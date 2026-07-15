import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar/Navbar";
import CartItem from "../../../components/public/CartItem/CartItem";
import CheckoutSummary from "../../../components/public/CheckoutSummary/CheckoutSummary";
import PurchaseDetails from "../../../components/public/PurchaseDetails/PurchaseDetails";
import BotonPrimario from "../../../components/shared/Boton/Boton";
import Footer from "../../../components/public/Foteer/Foteer";
import { FaChevronLeft } from "react-icons/fa6";
import donuts from "../../../assets/donuts.png";
import { useCart } from "../../../hooks/useCart";
import { useToast } from "../../../context/ToastContext.jsx";
import api from "../../../services/api";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, total, loading, loadCart } = useCart();
  const { showToast } = useToast();
  const [showModal, setShowModal] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    loadCart();
  }, [loadCart]);

  const handleConfirmOrder = async ({ payMethod, delivery, address }) => {
    setOrderLoading(true);
    try {
      await api.post('/orders', {
        pay_method: payMethod,
        delivery,
        address_delivery: address || '',
      });
      setShowModal(false);
      setConfirmed(true);
      showToast('Pedido realizado con éxito', 'success');
      setTimeout(() => navigate('/'), 2000);
    } catch (e) {
      showToast(e.response?.data?.message || 'No se pudo crear la orden', 'error');
    } finally {
      setOrderLoading(false);
    }
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <main className="checkout-main">
        <div className="checkout-left">
          <BotonPrimario onClick={() => navigate("/carrito")}>
            <FaChevronLeft size={12} /> Seguir Comprando
          </BotonPrimario>

          {loading ? (
            <p style={{ padding: '1rem' }}>Cargando carrito...</p>
          ) : items.length === 0 ? (
            <p style={{ padding: '1rem' }}>Tu carrito está vacío. Agrega productos antes de continuar.</p>
          ) : (
            <div className="checkout-items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  image={item.image || donuts}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                  subtotal={item.subtotal}
                  readOnly
                />
              ))}
            </div>
          )}
        </div>
        <div className="checkout-right">
          <CheckoutSummary
            total={total}
            onFinalize={() => setShowModal(true)}
            disabled={items.length === 0}
          />
        </div>
      </main>

      {showModal && (
        <div className="checkout-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <PurchaseDetails onConfirm={handleConfirmOrder} loading={orderLoading} />
          </div>
        </div>
      )}

      {confirmed && (
        <div className="checkout-modal-overlay">
          <div className="checkout-modal checkout-confirmation">
            <h2>¡Pedido realizado!</h2>
            <p>Tu orden fue creada exitosamente. Te redirigiremos al inicio...</p>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
