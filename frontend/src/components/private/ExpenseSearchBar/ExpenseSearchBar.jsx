// ExpenseSearchBar.jsx
import React from "react";
import "./ExpenseSearchBar.css";

const MONTHS = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
];

const ExpenseSearchBar = ({ search, onSearchChange, year, onYearChange, month, onMonthChange, onSubmit }) => {
    return (
        <div className="expense-search-bar">
            <div className="expense-search-bar__left">
                <input
                    className="expense-search-bar__name"
                    type="text"
                    placeholder="Ingrese el nombre de los ingredientes"
                    value={search}
                    onChange={(e) => onSearchChange(e.target.value)}
                />
            </div>

            <div className="expense-search-bar__right">
                <div className="expense-search-bar__filter">
                    <label className="expense-search-bar__label">Año:</label>
                    <input
                        className="expense-search-bar__input"
                        type="number"
                        placeholder="2026"
                        value={year}
                        onChange={(e) => onYearChange(e.target.value)}
                    />
                </div>

                <div className="expense-search-bar__filter">
                    <label className="expense-search-bar__label">Mes:</label>
                    <select
                        className="expense-search-bar__select"
                        value={month}
                        onChange={(e) => onMonthChange(e.target.value)}
                    >
                        <option value="">Todos</option>
                        {MONTHS.map((m, i) => (
                            <option key={i} value={i + 1}>{m}</option>
                        ))}
                    </select>
                </div>

                <button className="expense-search-bar__btn" onClick={onSubmit}>
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

export default ExpenseSearchBar;