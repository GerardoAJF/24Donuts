// ProductGrid.jsx
import React from "react";
import "./ProductGrid.css";

const ProductGrid = ({ products, onRemove }) => {
    return (
        <div className="product-grid">
            {products.map((product) => (
                <div key={product.id} className="product-grid__item">
                    <span className="product-grid__name">{product.name}</span>
                    <button className="product-grid__remove" onClick={() => onRemove(product.id)}>✕</button>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;

/*
const [products, setProducts] = useState([
  { id: 1, name: "Producto 1" },
  { id: 2, name: "Producto 2" },
  { id: 3, name: "Producto 3" },
  { id: 4, name: "Producto 4" },
  { id: 5, name: "Producto 5" },
  { id: 6, name: "Producto 6" },
]);

const handleRemove = (id) => setProducts(products.filter((p) => p.id !== id));

<ProductGrid
  products={products}
  onRemove={handleRemove}
/>
*/