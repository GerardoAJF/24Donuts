import React from 'react'
import './Navbar.css'
import { FaHouse, FaUtensils, FaPhone, FaUser, FaCartShopping } from 'react-icons/fa6'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <FaHouse size={30} color="#3a2e2a" />
        <span className="navbar-logo-texto">24DONUTS</span>
        <span className="navbar-logo-numero">24</span>
      </div>

      <div className="navbar-links">
        <a href="#"><FaHouse size={14} /> Inicio</a>
        <a href="#"><FaUtensils size={14} /> Menú</a>
        <a href="#"><FaPhone size={14} /> Contáctanos</a>
        <a href="#"><FaUser size={14} /> Perfil</a>
        <a href="#"><FaCartShopping size={20} /></a>
      </div>
    </nav>
  )
}

export default Navbar