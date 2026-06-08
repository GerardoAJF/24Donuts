import React from 'react';
import ActionIcons from '../ActionIcons/actionIcons';
import './personasTable.css';

const PersonasTable = ({ data, onEdit, onDelete }) => {
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
          {data.length === 0 ? (
            <tr>
              <td colSpan="5" style={{ textAlign: 'center', fontStyle: 'italic', color: '#4b3939' }}>
                No hay registros disponibles
              </td>
            </tr>
          ) : (
            data.map((row, index) => (
              <tr key={index}>
                <td>{row.nombre}</td>
                <td>{row.apellido}</td>
                <td>
                  <a href={`mailto:${row.correo}`} className="table-link">
                    {row.correo}
                  </a>
                </td>
                <td>{row.telefono}</td>
                <td>
                  <div className="actions-cell">
                    <ActionIcons
                      onEdit={() => onEdit && onEdit(row)}
                      onDelete={() => onDelete && onDelete(row)}
                    />
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PersonasTable;