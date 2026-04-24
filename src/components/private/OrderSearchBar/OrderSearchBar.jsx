// OrderSearchBar.jsx
import React from "react";
import "./OrderSearchBar.css";

const OrderSearchBar = ({ search, onSearchChange, date, onDateChange, delivery, onDeliveryChange, status, onStatusChange, onSubmit }) => {
    return (
        <div className="order-search-bar">
            <div className="order-search-bar__left">
                <input
                    className="order-search-bar__name"
                    type="text"
                    placeholder="Ingrese el nombre del cliente"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="order-search-bar__right">
                <div className="order-search-bar__filter">
                    <label className="order-search-bar__label">Día:</label>
                    <input
                        className="order-search-bar__date"
                        type="date"
                        value={date}
                        onChange={(e) => onDateChange(e.target.value)}
                    />
                </div>

                <div className="order-search-bar__filter">
                    <label className="order-search-bar__label">Delivery:</label>
                    <select
                        className="order-search-bar__select"
                        value={delivery}
                        onChange={(e) => onDeliveryChange(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Si">Sí</option>
                        <option value="No">No</option>
                    </select>
                </div>

                <div className="order-search-bar__filter">
                    <label className="order-search-bar__label">Estado:</label>
                    <select
                        className="order-search-bar__select"
                        value={status}
                        onChange={(e) => onStatusChange(e.target.value)}
                    >
                        <option value="">Todos</option>
                        <option value="Pendiente">Pendiente</option>
                        <option value="Aceptado">Aceptado</option>
                        <option value="Rechazado">Rechazado</option>
                        <option value="Completado">Completado</option>
                    </select>
                </div>

                <button className="order-search-bar__btn" onClick={onSubmit}>
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

export default OrderSearchBar;