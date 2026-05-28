import React from 'react'
import './tarjeta.css'

const Tarjeta = ({ icono, titulo, descripcion }) => {
  return (
    <div className="tarjeta">
      {typeof icono === "string"
        ? <img src={icono} alt={titulo} className="tarjeta-icono" />
        : <div className="tarjeta-icono-react">{icono}</div>
      }
      <h3 className="tarjeta-titulo">{titulo}</h3>
      <p className="tarjeta-descripcion">{descripcion}</p>
    </div>
  )
}

export default Tarjeta