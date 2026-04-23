import React from 'react';
import ActionIcons from '../ActionIcons/actionIcons';
import './personasTable.css';

const PersonasTable = ({ data }) => {
  return (
    <div className="personasTable-container">
      <table className="personasTable">
        <thead>
          <tr>
            <th>Nombres</th>
            <th>Apellidos</th>
            <th>Correo</th>
            <th>Teléfono</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, index) => (
            <tr key={index}>
              <td>{row.nombres}</td>
              <td>{row.apellidos}</td>
              <td><a href={`mailto:${row.correo}`} className="table-link">{row.correo}</a></td>
              <td>{row.telefono}</td>
              <td><ActionIcons /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PersonasTable;