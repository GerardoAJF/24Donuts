import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import Boton from '../../../../components/shared/RegisterButton/registerButton';
import MailPasswordBox from '../../../../components/private/MailPasswordBox/MailPasswordBox';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext.jsx';
import './ForgotOTP.css';

const ForgotOTP = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [pinFinal, setPinFinal] = useState('');
  const [loading, setLoading] = useState(false);

  const email = sessionStorage.getItem('recovery_email') || '';

  const handleConfirm = async () => {
    if (pinFinal.length < 6) { showToast('Ingresa el código completo', 'error'); return; }
    setLoading(true);
    try {
      await api.post('/auth/validar-pin', { email, code: pinFinal });
      showToast('Código válido', 'success');
      navigate('/auth/nueva-contrasena');
    } catch (e) {
      showToast(e.response?.data?.message || 'Código inválido o expirado', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <BaseWindowCard
        title="Ingrese el pin que se le acaba de enviar al correo"
        subtitle={email || 'ejemplo@correo.com'}
      >
        <MailPasswordBox onPinChange={(valor) => setPinFinal(valor)} />
        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
          <Boton text={loading ? 'Verificando...' : 'Confirmar'} onClick={handleConfirm} />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default ForgotOTP;
