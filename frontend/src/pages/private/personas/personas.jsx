import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PersonasTable from '../../../components/private/PersonasTable/personasTable';
import Boton from '../../../components/shared/RegisterButton/RegisterButton';
import api from '../../../services/api';
import './Personas.css';

const Personas = () => {
  const [view, setView] = useState('Administradores');
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const labels = {
    'Administradores': 'administrador',
    'Empleados': 'empleado',
    'Clientes': 'cliente',
  };

  const loadData = async (currentView) => {
    setLoading(true);
    try {
      let res;
      if (currentView === 'Administradores') res = await api.get('/users/admins');
      else if (currentView === 'Empleados') res = await api.get('/users/employees');
      else res = await api.get('/users/customers');

      const key = currentView === 'Administradores' ? 'admins'
        : currentView === 'Empleados' ? 'employees' : 'customers';

      const normalized = (res.data.data[key] || []).map(u => ({
        nombre: u.first_name,
        apellido: u.last_name,
        correo: u.email,
        telefono: u.phone,
        salario: u.salary ? `$${u.salary}` : undefined,
        dias: u.days ? u.days.join(', ') : undefined,
        turno: u.turn,
      }));
      setData(normalized);
    } catch (e) {
      console.error('Error cargando personas', e);
      setData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { loadData(view); }, [view]);

  const handleInsertarClick = () => {
    if (view === 'Administradores') navigate('/admin/personas/nuevo-admin');
    else if (view === 'Empleados') navigate('/admin/personas/nuevo-empleado');
  };

  return (
    <div className="personas-page">
      <div className="personas-content">
        <h1 className="personas-title">Personas</h1>

        <div className="tabs-wrapper">
          {['Administradores', 'Empleados', 'Clientes'].map(tab => (
            <button
              key={tab}
              className={`tab-btn ${view === tab ? 'active' : ''}`}
              onClick={() => setView(tab)}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="search-section">
          <div className="search-bar">
            <input type="text" placeholder={`Ingrese el nombre, apellido o correo del ${labels[view]}`} />
            {view === 'Empleados' && (
              <div className="filters-inline">
                <div className="filter-group">
                  <label>Día:</label>
                  <select>
                    <option>Todos</option>
                    <option>Lunes</option>
                    <option>Martes</option>
                    <option>Miércoles</option>
                    <option>Jueves</option>
                    <option>Viernes</option>
                    <option>Sábado</option>
                    <option>Domingo</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Turno:</label>
                  <select>
                    <option>Todos</option>
                    <option>Día</option>
                    <option>Noche</option>
                  </select>
                </div>
              </div>
            )}
            <button className="search-icon-btn">🔍</button>
          </div>
        </div>

        <div className="table-container">
          {loading ? (
            <p style={{ padding: '1rem' }}>Cargando...</p>
          ) : (
            <PersonasTable data={data} type={view} />
          )}
        </div>

        {view !== 'Clientes' && (
          <div className="footer-actions">
            <Boton
              text={`Insertar ${labels[view].charAt(0).toUpperCase() + labels[view].slice(1)}`}
              onClick={handleInsertarClick}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Personas;
