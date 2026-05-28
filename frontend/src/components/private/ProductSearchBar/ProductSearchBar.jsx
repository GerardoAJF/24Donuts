// ProductSearchBar.jsx
import React from "react";
import "./ProductSearchBar.css";

const ProductSearchBar = ({ search, onSearchChange, maxPrice, onMaxPriceChange, onSubmit }) => {
    return (
        <div className="product-search-bar">
            <div className="product-search-bar__left">
                <input
                    className="product-search-bar__name"
                    type="text"
                    placeholder="Ingrese el nombre del producto"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="product-search-bar__right">
                <label className="product-search-bar__price-label">Precio máximo:</label>
                <input
                    className="product-search-bar__price-input"
                    type="number"
                    value={maxPrice}
                    onChange={(e) => onMaxPriceChange(e.target.value)}
                />
                <button className="product-search-bar__btn" onClick={onSubmit}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export default ProductSearchBar;