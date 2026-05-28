import Navbar from "../../../components/public/Navbar/Navbar";
import FormularioContacto from "../../../components/public/FormContact/FormContact";
import Footer from "../../../components/public/Foteer/Foteer";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact-page">
      <Navbar />
      <main className="contact-main">
        <FormularioContacto />
      </main>
      <Footer />
    </div>
  );
};

export default Contact;
