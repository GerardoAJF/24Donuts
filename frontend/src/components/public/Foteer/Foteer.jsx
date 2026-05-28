import React from 'react'
import './Footer.css'
import { FaWhatsapp, FaInstagram, FaHouse } from 'react-icons/fa6'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-contenido">

        <div className="footer-logo">
          <FaHouse size={40} color="#3a2e2a" />
          <span className="footer-logo-texto">24DONUTS</span>
        </div>

        <div className="footer-links">
          <ul>
            <li>Sobre Nosotros</li>
            <li>Términos y Condiciones</li>
          </ul>
          <div className="footer-iconos">
            <FaWhatsapp size={28} color="#3a2e2a" />
            <FaInstagram size={28} color="#3a2e2a" />
          </div>
        </div>

        <div className="footer-info">
          <p>Dirección: Colonia Nocturna, Local 27, San Salvador</p>
          <p>Teléfono: 69225140</p>
        </div>

      </div>

      <div className="footer-barra">
        <p>Diseño y produccion Web Informática - 24 Donuts - 2026 - todos los derechos reservados ©</p>
      </div>
    </footer>
  )
}

export default Footer