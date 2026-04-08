import React from 'react'
import './Seccion.css'

const Seccion = ({ numero, titulo, descripcion }) => {
    return (
      <div className="seccion">
        <div className="seccion-encabezado">
          <span className="seccion-numero">{numero}</span>
          <h2 className="seccion-titulo">{titulo}</h2>
        </div>
        <p className="seccion-descripcion">{descripcion}</p>
      </div>
    )
  }

export default Seccion