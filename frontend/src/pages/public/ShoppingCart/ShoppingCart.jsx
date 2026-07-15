import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar/Navbar";
import CartItem from "../../../components/public/CartItem/CartItem";
import CheckoutSummary from "../../../components/public/CheckoutSummary/CheckoutSummary";
import Footer from "../../../components/public/Foteer/Foteer";
import BotonPrimario from "../../../components/shared/Boton/Boton";
import { FaChevronLeft } from "react-icons/fa6";
import donuts from "../../../assets/donuts.png";
import { useCart } from "../../../hooks/useCart";
import "./ShoppingCart.css";

const ShoppingCart = () => {
  const navigate = useNavigate();
  const { items, total, loading, loadCart, updateAmount, removeItem } = useCart();

  useEffect(() => {
    loadCart();
  }, [loadCart]);

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
                  image={item.image || donuts}
                  name={item.name}
                  price={item.price}
                  amount={item.amount}
                  subtotal={item.subtotal}
                  onChangeAmount={(amount) => updateAmount(item.id, amount)}
                  onRemove={() => removeItem(item.id)}
                />
              ))}
            </div>
          )}
        </div>
        <div className="shopping-cart-right">
          <CheckoutSummary
            total={total}
            onFinalize={() => navigate("/checkout")}
            disabled={items.length === 0}
          />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
