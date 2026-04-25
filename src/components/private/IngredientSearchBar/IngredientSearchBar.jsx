// IngredientSearchBar.jsx
import React from "react";
import "./IngredientSearchBar.css";

const IngredientSearchBar = ({ search, onSearchChange, onSubmit }) => {
    return (
        <div className="ingredient-search-bar">
            <div className="ingredient-search-bar__left">
                <input
                    className="ingredient-search-bar__name"
                    type="text"
                    placeholder="Ingrese el nombre del ingrediente"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <button className="ingredient-search-bar__btn" onClick={onSubmit}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </svg>
            </button>
        </div>
    );
};

export default IngredientSearchBar;