import { useState } from "react";
import Navbar from "../../../components/public/Navbar/Navbar";
import HeroBanner from "../../../components/public/HeroBanner/HeroBanner";
import SearchBar from "../../../components/public/SearchBar/SearchBar";
import AddTags from "../../../components/shared/AddTags/AddTags";
import MenuCard from "../../../components/public/MenuCard/MenuCard";
import Footer from "../../../components/public/Foteer/Foteer";
import donuts from "../../../assets/donuts.png";
import donutsColores from "../../../assets/donuts-colores.png";
import "./Menu.css";

const products = [
  { id: 1, image: donuts, name: "Noche Glaseada", price: 1.25, tags: [{ label: "Vainilla", color: "#f4e0b8" }, { label: "Frío", color: "#b8d4f4" }] },
  { id: 2, image: donutsColores, name: "ChocoLuna", price: 1.25, tags: [{ label: "Chocolate", color: "#c4a882" }, { label: "Donas", color: "#d4c4b0" }] },
  { id: 3, image: donuts, name: "Sugar Rush", price: 2.00, tags: [{ label: "Fresa", color: "#f4b8b8" }, { label: "Frío", color: "#b8d4f4" }, { label: "Donas", color: "#d4c4b0" }] },
  { id: 4, image: donutsColores, name: "La Tentación 24", price: 1.20, originalPrice: 1.75, tags: [{ label: "Chocolate", color: "#c4a882" }, { label: "Café", color: "#c9b8b8" }] },
  { id: 5, image: donuts, name: "Velvet Dream", price: 2.80, tags: [{ label: "Red Velvet", color: "#e8a0a0" }, { label: "Frío", color: "#b8d4f4" }] },
  { id: 6, image: donutsColores, name: "Fresa Sunset", price: 1.40, tags: [{ label: "Fresa", color: "#f4b8b8" }, { label: "Frío", color: "#b8d4f4" }, { label: "Donas", color: "#d4c4b0" }] },
];

const Menu = () => {
  const [activeTags, setActiveTags] = useState([{ id: 1, label: "Fresa", backgroundColor: "#f4b8b8", textColor: "#3b312b" }]);

  const handleRemoveTag = (id) => setActiveTags(activeTags.filter((t) => t.id !== id));

  return (
    <div className="menu-page">
      <Navbar />

      <HeroBanner
        image={donuts}
        title="Menú"
        description="Descubre nuestra variedad de donas frescas y deliciosas para todos los gustos."
      />

      <main className="menu-main">
        <SearchBar />
        <div className="menu-filters">
          <span className="menu-filters-label">Etiquetas:</span>
          <AddTags tags={activeTags} onRemove={handleRemoveTag} onOpenAdd={() => {}} />
        </div>
        <div className="menu-grid">
          {products.map((product) => (
            <MenuCard
              key={product.id}
              image={product.image}
              name={product.name}
              price={product.price}
              originalPrice={product.originalPrice}
              tags={product.tags}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Menu;
