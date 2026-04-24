import { useNavigate } from "react-router-dom";
import Navbar from "../../../components/public/Navbar/Navbar";
import CartItem from "../../../components/public/CartItem/CartItem";
import CheckoutSummary from "../../../components/public/CheckoutSummary/CheckoutSummary";
import Footer from "../../../components/public/Foteer/Foteer";
import BotonPrimario from "../../../components/shared/Boton/Boton";
import { FaChevronLeft } from "react-icons/fa6";
import donutsColores from "../../../assets/donuts-colores.png";
import donuts from "../../../assets/donuts.png";
import "./ShoppingCart.css";

const items = [
  { id: 1, image: donutsColores, name: "Cold Brew de Coco Tostado", price: 3.80 },
  { id: 2, image: donuts, name: "Roll de Pistacho", price: 3.80 },
  { id: 3, image: donutsColores, name: "Latte de Lavanda", price: 4.20 },
];

const ShoppingCart = () => {
  const navigate = useNavigate();

  return (
    <div className="shopping-cart-page">
      <Navbar />
      <main className="shopping-cart-main">
        <div className="shopping-cart-left">
          <BotonPrimario onClick={() => navigate("/menu")}>
            <FaChevronLeft size={12} /> Seguir Comprando
          </BotonPrimario>
          <div className="shopping-cart-items">
            {items.map((item) => (
              <CartItem key={item.id} image={item.image} name={item.name} price={item.price} />
            ))}
          </div>
        </div>
        <div className="shopping-cart-right">
          <CheckoutSummary total={16.44} onFinalize={() => navigate("/checkout")} />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ShoppingCart;
