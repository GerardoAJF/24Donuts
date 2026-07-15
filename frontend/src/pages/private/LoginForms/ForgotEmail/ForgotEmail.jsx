import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotEmail.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';
import api from '../../../../services/api';
import { useToast } from '../../../../context/ToastContext.jsx';

const ForgotEmail = () => {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!email) { showToast('Ingresa tu correo', 'error'); return; }
    setLoading(true);
    try {
      await api.post('/auth/recuperar-correo', { email });
      sessionStorage.setItem('recovery_email', email);
      showToast('Te enviamos un código a tu correo', 'success');
      navigate('/auth/validar-pin');
    } catch (e) {
      showToast(e.response?.data?.message || 'Correo no encontrado', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <BaseWindowCard
        title="Ingrese el correo electrónico"
        subtitle="Recibirá instrucciones en su correo para recuperarla"
      >
        <div className="input-wrapper">
          <InputCustom label="Correo electrónico:" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <Boton text={loading ? 'Enviando...' : 'Continuar'} onClick={handleNext} />
      </BaseWindowCard>
    </div>
  );
};

export default ForgotEmail;
