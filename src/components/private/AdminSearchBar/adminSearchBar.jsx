import React from 'react';
import './adminSearchBar.css';

const AdminSearchBar = ({ placeholder }) => {
  return (
    <div className="adminSearch-container">
      <input
        type="text"
        className="adminSearch-input"
        placeholder={placeholder || "Ingrese el nombre, apellido o correo del administrador"}
      />
      <button className="adminSearch-btn">
        <svg viewBox="0 0 24 24" width="18" height="18" stroke="currentColor" strokeWidth="2" fill="none">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </button>
    </div>
  );
};

export default AdminSearchBar;