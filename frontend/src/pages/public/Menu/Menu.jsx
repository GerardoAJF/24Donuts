import { useState, useEffect } from "react";
import Navbar from "../../../components/public/Navbar/Navbar";
import HeroBanner from "../../../components/public/HeroBanner/HeroBanner";
import SearchBar from "../../../components/public/SearchBar/SearchBar";
import AddTags from "../../../components/shared/AddTags/AddTags";
import MenuCard from "../../../components/public/MenuCard/MenuCard";
import Footer from "../../../components/public/Foteer/Foteer";
import donuts from "../../../assets/donuts.png";
import api from "../../../services/api";
import { useCart } from "../../../hooks/useCart";
import { useToast } from "../../../context/ToastContext.jsx";
import "./Menu.css";

const Menu = () => {
  const [products, setProducts] = useState([]);
  const [activeTags, setActiveTags] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const { showToast } = useToast();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = {};
        if (search) params.search = search;
        const res = await api.get('/products', { params });
        const normalized = res.data.data.products.map(p => ({
          id: p._id,
          image: p.img_link || donuts,
          name: p.name,
          price: p.price,
          tags: (p.tags || []).map(t => ({ label: t.name, color: t.color })),
        }));
        setProducts(normalized);
      } catch (e) {
        showToast(e.response?.data?.message || 'No se pudieron cargar los productos', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [search, showToast]);

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
        <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
        <div className="menu-filters">
          <span className="menu-filters-label">Etiquetas:</span>
          <AddTags tags={activeTags} onRemove={handleRemoveTag} onOpenAdd={() => {}} />
        </div>

        {loading ? (
          <p style={{ textAlign: 'center', padding: '2rem' }}>Cargando productos...</p>
        ) : (
          <div className="menu-grid">
            {products.map((product) => (
              <MenuCard
                key={product.id}
                id={product.id}
                image={product.image}
                name={product.name}
                price={product.price}
                tags={product.tags}
                onAdd={addToCart}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Menu;
