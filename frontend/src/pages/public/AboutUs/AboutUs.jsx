import Navbar from "../../../components/public/Navbar/Navbar";
import HeroBanner from "../../../components/public/HeroBanner/HeroBanner";
import Footer from "../../../components/public/Foteer/Foteer";
import Tarjeta from "../../../components/public/Tarjeta/Tarjeta";
import donutsColores from "../../../assets/donuts-colores.png";
import donuts from "../../../assets/donuts.png";
import { FaStar, FaHandshake, FaShield, FaPersonWalking, FaLightbulb } from "react-icons/fa6";
import "./AboutUs.css";

const valores = [
  { icono: <FaStar size={36} />, titulo: "CALIDAD", descripcion: "Productos frescos y bien preparados en todo momento." },
  { icono: <FaHandshake size={36} />, titulo: "COMPROMISO", descripcion: "Siempre disponibles para nuestros clientes, sin importar la hora." },
  { icono: <FaShield size={36} />, titulo: "SEGURIDAD", descripcion: "Un espacio confiable, cómodo y bien iluminado." },
  { icono: <FaPersonWalking size={36} />, titulo: "ACCESIBILIDAD", descripcion: "Servicio rápido, práctico y disponible 24/7." },
  { icono: <FaLightbulb size={36} />, titulo: "INNOVACION", descripcion: "Opciones creativas y más ligeras para el consumidor nocturno." },
];

const AboutUs = () => {
  return (
    <div className="about-page">
      <Navbar />

      <HeroBanner
        image={donuts}
        title="Nosotros"
        description="Conocé quiénes somos y la pasión que ponemos en cada dona."
      />

      <section className="about-historia">
        <h2 className="about-section-title">Historia</h2>
        <div className="about-historia-content">
          <div className="about-historia-text">
            <p>
              En 24Donuts creemos que el antojo, la energía y el descanso no tienen horario. Nacimos con una idea clara: acompañar a quienes viven fuera del horario tradicional. Sabemos que miles de personas trabajan mientras otras duermen: en call centers, turnos rotativos, trabajos remotos o jornadas extendidas a las que encontrar una opción rica, confiable y abierta en la madrugada no siempre es fácil.
            </p>
            <p>
              Por eso creamos un espacio diferente: una cafetería especializada en donas y café, abierta las 24 horas del día, los 7 días de la semana. Pero no somos solo un lugar para comprar algo rápido: somos un punto de encuentro, un respiro en medio de la jornada y una alternativa pensada especialmente para el trabajador nocturno.
            </p>
          </div>
          <img className="about-historia-img" src={donutsColores} alt="Donas coloridas" />
        </div>
      </section>

      <section className="about-valores">
        <h2 className="about-section-title">Nuestros Valores</h2>
        <div className="about-valores-grid">
          {valores.map((v, i) => (
            <Tarjeta key={i} icono={v.icono} titulo={v.titulo} descripcion={v.descripcion} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutUs;
