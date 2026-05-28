import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar/Navbar";
import CartItem from "../../../components/public/CartItem/CartItem";
import CheckoutSummary from "../../../components/public/CheckoutSummary/CheckoutSummary";
import Footer from "../../../components/public/Foteer/Foteer";
import BotonPrimario from "../../../components/shared/Boton/Boton";
import { FaChevronLeft } from "react-icons/fa6";
import donuts from "../../../assets/donuts.png";
import api from "../../../services/api";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setLoading(false);
        return;
      }
      const res = await api.get('/cart');
      const cart = res.data.data.cart;
      if (cart) {
        const normalized = (cart.products || []).map(p => ({
          id: p.product_id?._id || p.product_id,
          image: p.product_id?.img_link || donuts,
          name: p.product_id?.name || 'Producto',
          price: p.product_id?.price || 0,
          amount: p.amount,
        }));
        setItems(normalized);
        setTotal(cart.total || 0);
      }
    } catch (e) {
      console.error('Error cargando carrito', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadCart(); }, []);

  const handleRemoveItem = async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      await loadCart();
    } catch (e) { console.error('Error eliminando del carrito', e); }
  };

  return (
    <div className="shopping-cart-page">
      <Navbar />
      <main className="shopping-cart-main">
        <div className="shopping-cart-left">
          <BotonPrimario onClick={() => navigate("/menu")}>
            <FaChevronLeft size={12} /> Seguir Comprando
          </BotonPrimario>
          {loading ? (
            <p style={{ padding: '1rem' }}>Cargando carrito...</p>
          ) : items.length === 0 ? (
            <p style={{ padding: '1rem' }}>Tu carrito está vacío</p>
          ) : (
            <div className="shopping-cart-items">
              {items.map((item) => (
                <CartItem
                  key={item.id}
                  image={item.image}
                  name={item.name}
                  price={item.price}
                  onRemove={() => handleRemoveItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="shopping-cart-right">
          <CheckoutSummary total={total} onFinalize={() => navigate("/checkout")} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
