import { useState } from "react";
import Navbar from "../../../components/public/Navbar/Navbar";
import CartItem from "../../../components/public/CartItem/CartItem";
import CheckoutSummary from "../../../components/public/CheckoutSummary/CheckoutSummary";
import PurchaseDetails from "../../../components/public/PurchaseDetails/PurchaseDetails";
import BotonPrimario from "../../../components/shared/Boton/Boton";
import Footer from "../../../components/public/Foteer/Foteer";
import { FaChevronLeft } from "react-icons/fa6";
import donutsColores from "../../../assets/donuts-colores.png";
import donuts from "../../../assets/donuts.png";
import "./Checkout.css";

const cartItems = [
  { id: 1, image: donutsColores, name: "Cold Brew de Coco Tostado", price: 3.80 },
  { id: 2, image: donuts, name: "Roll de Pistacho", price: 3.80 },
  { id: 3, image: donutsColores, name: "Latte de Lavanda", price: 4.20 },
];

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="checkout-page">
      <Navbar />

      <main className="checkout-main">
        <div className="checkout-left">
          <BotonPrimario>
            <FaChevronLeft size={12} /> Seguir Comprando
          </BotonPrimario>
          <div className="checkout-items">
            {cartItems.map((item) => (
              <CartItem key={item.id} image={item.image} name={item.name} price={item.price} />
            ))}
          </div>
        </div>

        <div className="checkout-right">
          <CheckoutSummary total={16.44} onFinalize={() => setShowModal(true)} />
        </div>
      </main>

      {showModal && (
        <div className="checkout-modal-overlay" onClick={() => setShowModal(false)}>
          <div className="checkout-modal" onClick={(e) => e.stopPropagation()}>
            <PurchaseDetails />
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Checkout;
