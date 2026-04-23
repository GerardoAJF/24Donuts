import Navbar from "../../../components/public/Navbar/Navbar";
import HeroBanner from "../../../components/public/HeroBanner/HeroBanner";
import Seccion from "../../../components/public/seccion/Seccion";
import Footer from "../../../components/public/Foteer/Foteer";
import "./TermsAndConditions.css";

const secciones = [
  {
    numero: "01",
    titulo: "Información General",
    descripcion: "Al realizar un pedido en 24Donuts, el cliente acepta los presentes Términos y Condiciones. Nos reservamos el derecho de actualizar estos términos en cualquier momento.",
  },
  {
    numero: "02",
    titulo: "Pedidos",
    descripcion: "Todos los pedidos están sujetos a disponibilidad. Los pedidos personalizados deben realizarse con anticipación mínima de 24 horas. El cliente es responsable de proporcionar información correcta para la entrega.",
  },
  {
    numero: "03",
    titulo: "Pagos",
    descripcion: "Los pedidos deben ser pagados total o parcialmente según lo acordado al momento de la compra. La producción de pedidos personalizados inicia una vez confirmado el pago.",
  },
  {
    numero: "04",
    titulo: "Cancelaciones y Reembolsos",
    descripcion: "Los pedidos personalizados no son reembolsables una vez iniciada su preparación. Las cancelaciones deben realizarse con al menos 12 horas de anticipación.",
  },
  {
    numero: "05",
    titulo: "Entregas",
    descripcion: "Los tiempos de entrega son estimados y pueden variar por causas externas. 24Donuts no se hace responsable por retrasos ocasionados por direcciones incorrectas proporcionadas por el cliente.",
  },
  {
    numero: "06",
    titulo: "Alergias y Consumo",
    descripcion: "Nuestros productos pueden contener o haber tenido contacto con ingredientes como gluten, lácteos, huevo, frutos secos y otros alérgenos. Es responsabilidad del cliente informar sobre cualquier restricción alimentaria antes de realizar el pedido.",
  },
  {
    numero: "07",
    titulo: "Uso del Sitio",
    descripcion: "El contenido, imágenes y logotipos de 24Donuts no pueden ser utilizados sin autorización.",
  },
];

const TermsAndConditions = () => {
  return (
    <div className="terms-page">
      <Navbar />
      <HeroBanner
        image="https://images.unsplash.com/photo-1551024601-bec78aea704b?w=1200"
        title="Términos y Condiciones"
        description="Información importante sobre nuestras políticas de compra y servicio."
      />
      <div className="terms-page-content">
        <div className="terms-page-inner">
          {secciones.map((s) => (
            <Seccion key={s.numero} numero={s.numero} titulo={s.titulo} descripcion={s.descripcion} />
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default TermsAndConditions;
