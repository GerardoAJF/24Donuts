import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterAdmin.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';
import api from '../../../../services/api';

const RegisterAdmin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.post('/auth/registro-inicial', {})
      .catch((e) => {
        if (e.response?.data?.message === 'Ya existe un administrador registrado') {
          navigate('/auth/login');
        }
      });
  }, []);

  const handleNext = async () => {
    if (!email || !password || !confirm) { setError('Completa todos los campos'); return; }
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/registro-inicial', { email, password });
      const loginRes = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', loginRes.data.data.token);
      navigate('/auth/configuracion-inicial');
    } catch (e) {
      const msg = e.response?.data?.message || 'Error al registrar';
      if (msg === 'Ya existe un administrador registrado') {
        navigate('/auth/login');
        return;
      }
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <BaseWindowCard
        title="Bienvenido"
        subtitle="Ingrese los datos para crear el primer administrador"
      >
        <InputCustom label="Correo electrónico:" value={email} onChange={(e) => setEmail(e.target.value)} />
        <InputPassword label="Contraseña:" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputPassword label="Confirma tu contraseña:" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {error && <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <div className="btn-spacing">
          <Boton text={loading ? 'Cargando...' : 'Avanzar'} onClick={handleNext} />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default RegisterAdmin;
