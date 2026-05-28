import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotEmail.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';
import api from '../../../../services/api';

const ForgotEmail = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleNext = async () => {
    if (!email) { setError('Ingresa tu correo'); return; }
    setLoading(true);
    setError('');
    try {
      await api.post('/auth/recuperar-correo', { email });
      sessionStorage.setItem('recovery_email', email);
      navigate('/auth/validar-pin');
    } catch (e) {
      setError(e.response?.data?.message || 'Correo no encontrado');
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
        {error && <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <Boton text={loading ? 'Enviando...' : 'Continuar'} onClick={handleNext} />
      </BaseWindowCard>
    </div>
  );
};

export default ForgotEmail;
