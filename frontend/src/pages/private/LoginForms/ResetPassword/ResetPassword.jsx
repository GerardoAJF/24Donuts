import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/registerButton';
import api from '../../../../services/api';

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('recovery_email') || '';

  const handleFinish = async () => {
    if (!password || !confirm) { setError('Completa todos los campos'); return; }
    if (password !== confirm) { setError('Las contraseñas no coinciden'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/nueva-contrasena', { email, password });
      sessionStorage.removeItem('recovery_email');
      navigate('/auth/login');
    } catch (e) {
      setError(e.response?.data?.message || 'Error al cambiar contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <BaseWindowCard title="Nueva contraseña">
        <InputPassword label="Nueva contraseña:" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputPassword label="Confirme su contraseña:" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        {error && <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <div className="btn-spacing">
          <Boton text={loading ? 'Guardando...' : 'Confirmar'} onClick={handleFinish} />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default ResetPassword;
