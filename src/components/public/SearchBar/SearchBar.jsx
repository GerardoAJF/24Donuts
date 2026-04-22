import { useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./SearchBar.css";

function SearchBar({ onSearch }) {
  const [nombre, setNombre] = useState("");
  const [precioMax, setPrecioMax] = useState("");

  const handleSearch = () => {
    if (onSearch) onSearch({ nombre, precioMax });
  };

  return (
    <div className="search-bar">
      <input
        className="search-bar-input"
        type="text"
        placeholder="Ingrese el nombre del producto"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <div className="search-bar-right">
        <span className="search-bar-label">Precio máximo:</span>
        <input
          className="search-bar-price"
          type="number"
          min="0"
          value={precioMax}
          onChange={(e) => setPrecioMax(e.target.value)}
        />
        <button className="search-bar-btn" onClick={handleSearch}>
          <FaMagnifyingGlass size={16} />
        </button>
      </div>
    </div>
  );
}

export default SearchBar;
