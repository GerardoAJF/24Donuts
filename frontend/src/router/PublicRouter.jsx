import { Routes, Route } from "react-router-dom";
import Home from "../pages/public/Home/Home";
import Menu from "../pages/public/Menu/Menu";
import ProductDetail from "../pages/public/ProductDetail/ProductDetail";
import AboutUs from "../pages/public/AboutUs/AboutUs";
import Contact from "../pages/public/Contact/Contact";
import TermsAndConditions from "../pages/public/TermsAndConditions/TermsAndConditions";
import ShoppingCart from "../pages/public/ShoppingCart/ShoppingCart";
import Checkout from "../pages/public/Checkout/Checkout";
import Login from "../pages/public/Login/Login";
import Register from "../pages/public/Register/Register";
import VerifyAccount from "../pages/public/VerifyAccount/VerifyAccount";
import Profile from "../pages/public/Profile/Profile";

const PublicRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/producto/:id" element={<ProductDetail />} />
            <Route path="/nosotros" element={<AboutUs />} />
            <Route path="/contacto" element={<Contact />} />
            <Route path="/terminos" element={<TermsAndConditions />} />
            <Route path="/carrito" element={<ShoppingCart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/login" element={<Login />} />
            <Route path="/registro" element={<Register />} />
            <Route path="/verificar-cuenta" element={<VerifyAccount />} />
            <Route path="/perfil" element={<Profile />} />
        </Routes>
    );
};

export default PublicRouter;
