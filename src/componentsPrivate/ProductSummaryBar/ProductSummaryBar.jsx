import React from "react";
import "./ProductSummaryBar.css";

const ProductSummaryBar = ({ title, products }) => {
    return (
        <div className="summary-bar">
            <span className="summary-bar__title">{title}</span>

            <div className="summary-bar__list">
                {products.map((product) => (
                    <div key={product.id} className="summary-bar__item">
                        <span className="summary-bar__item-name">
                        {product.name}
                        <a href="#"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-up-right-icon lucide-arrow-up-right"><path d="M7 7h10v10" /><path d="M7 17 17 7" /></svg></a>
                        </span>
                        <span className="summary-bar__item-stat">Cantidad: {product.quantity}</span>
                        <span className="summary-bar__item-stat">Subtotal: {product.subtotal}</span>
                    </div>
            ))}
        </div>
    </div >
  );
};

export default ProductSummaryBar;