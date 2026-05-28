import Navbar from "../../../components/public/Navbar/Navbar";
import HeroBanner from "../../../components/public/HeroBanner/HeroBanner";
import ComboCard from "../../../components/public/ComboCard/ComboCard";
import CategoryGrid from "../../../components/public/CategoryGrid/CategoryGrid";
import MenuCard from "../../../components/public/MenuCard/MenuCard";
import Footer from "../../../components/public/Foteer/Foteer";
import donuts from "../../../assets/donuts.png";
import donutsColores from "../../../assets/donuts-colores.png";
import "./Home.css";

const combos = [
  {
    image: donutsColores,
    name: "La Trasnochada",
    items: ["Café Latte x1", "Medialunas de Manteca x1", "Sándwich de Miga x1"],
  },
  {
    image: donuts,
    name: "El Madrugador",
    items: ["Café Espresso x1", "Dona de Caramelo x1", "Agua mineral x1"],
  },
  {
    image: donutsColores,
    name: "Peace And Safe",
    items: ["Café con Leche x1", "Porción de Lemon Pie x1"],
  },
];

const categories = [
  { title: "Cafés", description: "Desde el espresso más puro hasta el latte más cremoso. Tu dosis diaria de energía en cada taza.", image: donuts },
  { title: "Dulces y pastelería", description: "Medialunas, budines, scones y más. El placer de lo recién horneado en cada bocado.", image: donutsColores },
  { title: "Salados", description: "Sándwiches, tostados y facturas saladas. Ideales para cuando el hambre no espera.", image: donuts },
  { title: "Donuts", description: "Suaves, coloridos y con glaseados irresistibles. El antojo que siempre convierte.", image: donutsColores },
  { title: "Bebidas frías", description: "Jugos naturales, licuados y aguas saborizadas. Frescura para cualquier momento del día.", image: donuts },
];

const seasonProducts = [
  { id: 1, image: donutsColores, name: "Latte de Lavanda", price: 4.20, tags: [{ label: "Relajante", color: "#d4b8f4" }, { label: "Café", color: "#c9b8b8" }] },
  { id: 2, image: donuts, name: "Roll de Pistacho", price: 3.80, tags: [{ label: "Pastelería", color: "#b8f4c4" }, { label: "Pistacho", color: "#c4d4b0" }] },
  { id: 3, image: donutsColores, name: "Cold Brew de Coco Tostado", price: 3.80, tags: [{ label: "Salado", color: "#f4e0b8" }, { label: "Frío", color: "#b8d4f4" }, { label: "Frío", color: "#b8d4f4" }] },
];

const Home = () => {
  return (
    <div className="home-page">
      <Navbar />

      <HeroBanner
        image={donuts}
        title="24Donuts"
        description="La mejor opción para comer y relajarte: antes, durante y después de cualquier ocasión."
      />

      <section className="home-section">
        <h2 className="home-section-title">Armados Listos</h2>
        <div className="home-combos">
          {combos.map((combo, i) => (
            <ComboCard key={i} image={combo.image} name={combo.name} items={combo.items} />
          ))}
        </div>
        <div className="home-dots">
          <span className="home-dot active" />
          <span className="home-dot" />
          <span className="home-dot" />
        </div>
      </section>

      <section className="home-categories">
        <CategoryGrid categories={categories} />
      </section>

      <section className="home-section">
        <h2 className="home-section-title">Productos de Temporada</h2>
        <div className="home-season">
          {seasonProducts.map((product) => (
            <MenuCard key={product.id} image={product.image} name={product.name} price={product.price} tags={product.tags} />
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Home;
