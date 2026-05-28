// PromoSearchBar.jsx
import React from "react";
import "./PromoSearchBar.css";

const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const PromoSearchBar = ({ search, onSearchChange, year, onYearChange, month, onMonthChange, active, onActiveChange, onSubmit }) => {
    return (
        <div className="promo-search-bar">
            <div className="promo-search-bar__left">
                <input
                    className="promo-search-bar__name"
                    type="text"
                    placeholder="Ingrese el nombre de la promoción"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="promo-search-bar__right">
                <div className="promo-search-bar__filter">
                    <label className="promo-search-bar__label">Año:</label>
                    <input
                        className="promo-search-bar__input"
                        type="number"
                        placeholder="2026"
                        value={year}
                        onChange={(e) => onYearChange(e.target.value)}
                    />
                </div>

                <div className="promo-search-bar__filter">
                    <label className="promo-search-bar__label">Mes:</label>
                    <select
                        className="promo-search-bar__select"
                        value={month}
                        onChange={(e) => onMonthChange(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {MONTHS.map((m, i) => (
                            <option key={i} value={i + 1}>{m}</option>
                        ))}
                    </select>
                </div>

                <div className="promo-search-bar__filter">
                    <label className="promo-search-bar__label">Activo:</label>
                    <input
                        className="promo-search-bar__checkbox"
                        type="checkbox"
                        checked={active}
                        onChange={(e) => onActiveChange(e.target.checked)}
                    />
                </div>

                <button className="promo-search-bar__btn" onClick={onSubmit}>
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

export default PromoSearchBar;