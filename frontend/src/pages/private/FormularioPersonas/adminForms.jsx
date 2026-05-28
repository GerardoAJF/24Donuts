import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FormularioPersonas.css';

const AdminForm = () => {
  const navigate = useNavigate();

  return (
    <div className="form-page-wrapper">
      <div className="form-card">
        <h2>Administradores</h2>

        <div className="form-row-2">
          <div className="form-group">
            <label>Nombre:</label>
            <input type="text" placeholder="Jhon" />
          </div>
          <div className="form-group">
            <label>Apellidos:</label>
            <input type="text" placeholder="Doe" />
          </div>
        </div>

        <div className="form-row-1">
          <div className="form-group">
            <label>Correo electrónico:</label>
            <input type="email" placeholder="jhon.doe@email.com" />
          </div>
        </div>

        <div className="form-row-2">
          <div className="form-group">
            <label>Teléfono:</label>
            <input type="text" placeholder="69225140" />
          </div>
          <button className="btn-dark" type="button">Reestablecer contraseña</button>
        </div>

       
        <button className="btn-insertar" type="button" onClick={() => navigate('/admin/people')}>
          Insertar
        </button>
      </div>
    </div>
  );
};

export default AdminForm;