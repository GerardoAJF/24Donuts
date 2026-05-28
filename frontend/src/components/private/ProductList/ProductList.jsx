// ProductList.jsx
import React from "react";
import "./ProductList.css";

const ProductList = ({ products, value, onChange }) => {
    return (
        <div className="product-list">
            {products.map((product) => (
                <button
                    key={product.id}
                    className={`product-list__item ${value === product.id ? "product-list__item--selected" : ""}`}
                    onClick={() => onChange(product)}
                >
                    {product.name}
                </button>
            ))}
        </div>
    );
};

export default ProductList;

/*
<ProductList
    products={[
        { id: 1, name: "Galletas" },
        { id: 2, name: "Café" },
        { id: 3, name: "Pan" },
    ]}
    value={selectedProduct?.id}
    onChange={(product) => setSelectedProduct(product)}
/>
*/