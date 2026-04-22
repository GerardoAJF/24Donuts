import Navbar from "../../../components/public/Navbar/Navbar";
import ProductCard from "../../../components/public/ProductCard/ProductCard";
import Footer from "../../../components/public/Foteer/Foteer";
import "./ProductDetail.css";

const ProductDetail = ({ image, name, tags, description, price }) => {
  return (
    <div className="product-detail-page">
      <Navbar />
      <main className="product-detail-main">
        <ProductCard
          image={image}
          name={name}
          tags={tags}
          description={description}
          price={price}
        />
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
