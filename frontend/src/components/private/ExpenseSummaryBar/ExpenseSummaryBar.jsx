// ExpenseSummaryBar.jsx
import React from "react";
import "./ExpenseSummaryBar.css";

const ExpenseSummaryBar = ({ ingredients, onRemove }) => {
    return (
        <div className="expense-summary-bar">
            <span className="expense-summary-bar__title">Ingredientes</span>
            <div className="expense-summary-bar__list">
                {ingredients.map((ingredient) => (
                    <div key={ingredient.id} className="expense-summary-bar__item">
                        <div className="expense-summary-bar__item-header">
                            <span className="expense-summary-bar__item-name">{ingredient.nombre}</span>
                            <button
                                className="expense-summary-bar__item-remove"
                                onClick={() => onRemove(ingredient.id)}
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M10 11v6" /><path d="M14 11v6" />
                                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                    <path d="M3 6h18" />
                                    <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                </svg>
                            </button>
                        </div>
                        <span className="expense-summary-bar__item-stat">Cantidad: {ingredient.cantidad}</span>
                        <span className="expense-summary-bar__item-stat">Subtotal: {ingredient.subtotal}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ExpenseSummaryBar;