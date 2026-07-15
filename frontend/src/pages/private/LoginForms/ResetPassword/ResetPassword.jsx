import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ResetPassword.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/registerButton';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext.jsx';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('recovery_email') || '';

  const handleFinish = async () => {
    if (!password || !confirm) { showToast('Completa todos los campos', 'error'); return; }
    if (password !== confirm) { showToast('Las contraseñas no coinciden', 'error'); return; }
    setLoading(true);
    try {
      await api.post('/auth/nueva-contrasena', { email, password });
      sessionStorage.removeItem('recovery_email');
      showToast('Contraseña actualizada exitosamente', 'success');
      navigate('/auth/login');
    } catch (e) {
      showToast(e.response?.data?.message || 'Error al cambiar contraseña', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <BaseWindowCard title="Nueva contraseña">
        <InputPassword label="Nueva contraseña:" value={password} onChange={(e) => setPassword(e.target.value)} />
        <InputPassword label="Confirme su contraseña:" value={confirm} onChange={(e) => setConfirm(e.target.value)} />
        <div className="btn-spacing">
          <Boton text={loading ? 'Guardando...' : 'Confirmar'} onClick={handleFinish} />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default ResetPassword;
