import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home/Home";
import Menu from "../pages/public/Menu/Menu";
import ProductDetail from "../pages/public/ProductDetail/ProductDetail";
import AboutUs from "../pages/public/AboutUs/AboutUs";
import Contact from "../pages/public/Contact/Contact";
import TermsAndConditions from "../pages/public/TermsAndConditions/TermsAndConditions";
import ShoppingCart from "../pages/public/ShoppingCart/ShoppingCart";
import Checkout from "../pages/public/Checkout/Checkout";
import donutsColores from "../assets/donuts-colores.png";

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route
                path="/producto/:id"
                element={
                    <ProductDetail
                        image={donutsColores}
                        name="Sugar Rush"
                        tags={[
                            { label: "Fresa", color: "#f4b8b8" },
                            { label: "Frío", color: "#b8d4f4" },
                            { label: "Donas", color: "#d4c4b0" },
                        ]}
                        description="Diversión en forma de dona. Glaseado blanco, lluvia de colores y un toque de marshmallow que la hace dulce, esponjosa y totalmente irresistible."
                        price={2.50}
                    />
                }
            />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/terminos" element={<TermsAndConditions />} />
            <Route path="/carrito" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
        </Routes>
    );
};

export default PublicRouter;
