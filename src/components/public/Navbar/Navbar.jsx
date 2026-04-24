import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
import { FaHouse, FaUtensils, FaPhone, FaUser, FaCartShopping } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="navbar-logo">
        <FaHouse size={30} color="#3a2e2a" />
        <span className="navbar-logo-texto">24DONUTS</span>
        <span className="navbar-logo-numero">24</span>
      </Link>

      <div className="navbar-links">
        <Link to="/"><FaHouse size={14} /> Inicio</Link>
        <Link to="/menu"><FaUtensils size={14} /> Menú</Link>
        <Link to="/contacto"><FaPhone size={14} /> Contáctanos</Link>
        <Link to="/perfil"><FaUser size={14} /> Perfil</Link>
        <Link to="/carrito"><FaCartShopping size={20} /></Link>
      </div>
    </nav>
  )
}

export default Navbar