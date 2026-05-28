import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar/Navbar";
import CartItem from "../../../components/public/CartItem/CartItem";
import CheckoutSummary from "../../../components/public/CheckoutSummary/CheckoutSummary";
import PurchaseDetails from "../../../components/public/PurchaseDetails/PurchaseDetails";
import BotonPrimario from "../../../components/shared/Boton/Boton";
import Footer from "../../../components/public/Foteer/Foteer";
import { FaChevronLeft } from "react-icons/fa6";
import donuts from "../../../assets/donuts.png";
import api from "../../../services/api";
import "./Checkout.css";

const Checkout = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;
        const res = await api.get('/cart');
        const cart = res.data.data.cart;
        if (cart) {
          setCartItems((cart.products || []).map(p => ({
            id: p.product_id?._id || p.product_id,
            image: p.product_id?.img_link || donuts,
            name: p.product_id?.name || 'Producto',
            price: p.product_id?.price || 0,
          })));
          setTotal(cart.total || 0);
        }
      } catch (e) { console.error('Error cargando carrito', e); }
    };
    loadCart();
  }, []);

  const handleConfirmOrder = async ({ payMethod, delivery, address }) => {
    try {
      await api.post('/orders', {
        pay_method: payMethod,
        delivery: delivery,
        address_delivery: address || '',
      });
      setShowModal(false);
      navigate('/');
    } catch (e) { console.error('Error creando orden', e); }
  };

  return (
    <div className="checkout-page">
      <Navbar />
      <main className="checkout-main">
        <div className="checkout-left">
          <BotonPrimario onClick={() => navigate("/carrito")}>
            <FaChevronLeft size={12} /> Seguir Comprando
          </BotonPrimario>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} image={item.image} name={item.name} price={item.price} />
            ))}
          </div>
        </div>
        <div className="checkout-right">
          <CheckoutSummary total={total} onFinalize={() => setShowModal(true)} />
        </div>
      </main>

      {showModal && (
        <div className="checkout-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <PurchaseDetails onConfirm={handleConfirmOrder} />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
