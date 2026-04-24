import React, { useState } from 'react';
import Navbar from '../../../components/private/Navbar/Navbar';
import PersonasTable from '../../../components/private/PersonasTable/personasTable';
import Boton from '../../../components/shared/Boton/Boton';
import './Personas.css';

const Personas = () => {
  const [view, setView] = useState('Administradores');

 
  const labels = {
    'Administradores': 'administrador',
    'Empleados': 'empleado',
    'Clientes': 'cliente'
  };

  const dataFake = [
    { 
      nombre: 'Jhon Jhon', 
      apellido: 'Doe Doe', 
      correo: 'jhondoe@email.com', 
      telefono: '6922-5140', 
      salario: '$400', 
      dias: 'Lunes, Martes, Miércoles', 
      turno: 'Diurno' 
    },
    { 
      nombre: 'Jhon Jhon', 
      apellido: 'Doe Doe2', 
      correo: 'jhondoe2@email.com', 
      telefono: '6922-5140', 
      salario: '$400', 
      dias: 'Lunes, Martes, Miércoles', 
      turno: 'Diurno' 
    }
  ];

  return (
    <div className="personas-page">
      <Navbar />

      <div className="personas-content">
        <h1 className="personas-title">Personas</h1>

        <div className="tabs-wrapper">
          <button 
            className={`tab-btn ${view === 'Administradores' ? 'active' : ''}`}
            onClick={() => setView('Administradores')}
          >
            Administradores
          </button>
          <button 
            className={`tab-btn ${view === 'Empleados' ? 'active' : ''}`}
            onClick={() => setView('Empleados')}
          >
            Empleados
          </button>
          <button 
            className={`tab-btn ${view === 'Clientes' ? 'active' : ''}`}
            onClick={() => setView('Clientes')}
          >
            Clientes
          </button>
        </div>

        <div className="search-section">
          <div className="search-bar">
            <input 
              type="text" 
              placeholder={`Ingrese el nombre, apellido o correo del ${labels[view]}`} 
            />
            
            {view === 'Empleados' && (
              <div className="filters-inline">
                <div className="filter-group">
                  <label>Día:</label>
                  <select>
                    <option>Todos</option>
                    <option>lunes</option>
                    <option>Martes</option>
                    <option>Fin de Semana</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Turno:</label>
                  <select>
                    <option>Todos</option>
                  </select>
                </div>
              </div>
            )}
            
            <button className="search-icon-btn">🔍</button>
          </div>
        </div>

        <div className="table-container">
          <PersonasTable data={dataFake} type={view} />
        </div>

        <div className="footer-actions">
          <Boton text={`Insertar ${labels[view].charAt(0).toUpperCase() + labels[view].slice(1)}`} />
        </div>
      </div>
    </div>
  );
};

export default Personas;