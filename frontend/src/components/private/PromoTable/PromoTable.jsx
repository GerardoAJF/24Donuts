// PromoTable.jsx
import React from "react";
import "./PromoTable.css";

const PromoTable = ({ promos, onEdit, onDelete }) => {
    return (
        <div className="promo-table__wrapper">
            <table className="promo-table">
                <thead>
                    <tr className="promo-table__header">
                        <th>Nombre</th>
                        <th>Inicio</th>
                        <th>Fin</th>
                        <th>Categorías</th>
                        <th>Productos</th>
                        <th>Descuento</th>
                        <th>Activo</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {promos.map((promo) => (
                        <tr key={promo.id} className="promo-table__row">
                            <td>{promo.nombre}</td>
                            <td>{promo.fechaInicio}</td>
                            <td>{promo.fechaCierre}</td>
                            <td className="promo-table__truncate">
                                {promo.tags?.map((t) => t.label).join(", ")}
                            </td>
                            <td className="promo-table__truncate">
                                {promo.productos?.map((p) => p.name).join(", ")}
                            </td>
                            <td>{promo.descuento}%</td>
                            <td>{promo.activo ? "Sí" : "No"}</td>
                            <td>
                                <div className="promo-table__actions">
                                    <button className="promo-table__btn" onClick={() => onEdit(promo)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" />
                                            <path d="m15 5 4 4" />
                                        </svg>
                                    </button>
                                    <button className="promo-table__btn promo-table__btn--delete" onClick={() => onDelete(promo.id)}>
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

export default PromoTable;