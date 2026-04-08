import React from 'react'
import './tarjeta.css'

const Tarjeta = ({ icono, titulo, descripcion }) => {
  return (
    <div className="tarjeta">
      <img src={icono} alt={titulo} className="tarjeta-icono" />
      <h3 className="tarjeta-titulo">{titulo}</h3>
      <p className="tarjeta-descripcion">{descripcion}</p>
    </div>
  )
}

export default Tarjeta