import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../../../components/public/Navbar/Navbar";
import ProductCard from "../../../components/public/ProductCard/ProductCard";
import ReviewSection from "../../../components/public/ReviewSection/ReviewSection.jsx";
import Footer from "../../../components/public/Foteer/Foteer";
import donuts from "../../../assets/donuts.png";
import api from "../../../services/api";
import { useCart } from "../../../hooks/useCart";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await api.get(`/products/${id}`);
        const p = res.data.data.product;
        setProduct({
          id: p._id,
          image: p.img_link || donuts,
          name: p.name,
          description: p.description,
          price: p.price,
          tags: (p.tags || []).map((t) => ({ label: t.name, color: t.color })),
        });
      } catch (e) {
        setError(e.response?.data?.message || 'No se pudo cargar el producto');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  return (
    <div className="product-detail-page">
      <Navbar />
      <main className="product-detail-main">
        {loading ? (
          <p className="product-detail-status">Cargando producto...</p>
        ) : error ? (
          <p className="product-detail-status">{error}</p>
        ) : product ? (
          <div className="product-detail-content">
            <ProductCard
              id={product.id}
              image={product.image}
              name={product.name}
              tags={product.tags}
              description={product.description}
              price={product.price}
              onAdd={addToCart}
            />
            <ReviewSection productId={product.id} />
          </div>
        ) : null}
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
