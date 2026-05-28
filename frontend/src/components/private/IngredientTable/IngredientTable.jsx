// IngredientTable.jsx
import React from "react";
import "./IngredientTable.css";

const IngredientTable = ({ ingredients, onEdit, onDelete }) => {
    return (
        <div className="ingredient-table__wrapper">
            <table className="ingredient-table">
                <thead>
                    <tr className="ingredient-table__header">
                        <th>Nombre</th>
                        <th>Stock</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {ingredients.map((ingredient) => (
                        <tr key={ingredient.id} className="ingredient-table__row">
                            <td>{ingredient.nombre}</td>
                            <td>{ingredient.stock}</td>
                            <td>
                                <div className="ingredient-table__actions">
                                    <button className="ingredient-table__btn" onClick={() => onEdit(ingredient)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                            <path d="m15 5 4 4" />
                                        </svg>
                                    </button>
                                    <button className="ingredient-table__btn ingredient-table__btn--delete" onClick={() => onDelete(ingredient.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M10 11v6" /><path d="M14 11v6" />
                                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" />
                                            <path d="M3 6h18" />
                                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                                        </svg>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IngredientTable;