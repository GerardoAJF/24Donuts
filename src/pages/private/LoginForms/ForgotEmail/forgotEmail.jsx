import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ForgotEmail.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';

const ForgotEmail = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/auth/validar-pin');
  };

  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Ingrese el correo electrónico" 
        subtitle="Recibirá instrucciones en su correo para recuperarla"
      >
        <div className="input-wrapper">
          <InputCustom label="Correo electrónico:" />
        </div>
        <Boton text="Continuar" onClick={handleNext} />
      </BaseWindowCard>
    </div>
  );
};

export default ForgotEmail;