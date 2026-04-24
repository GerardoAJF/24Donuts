import React from 'react';
import './ForgotEmail.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';

const ForgotEmail = () => {
  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Ingrese el correo electrónico" 
        subtitle="Recibirá instrucciones en su correo para recuperarla"
      >
        <div className="input-wrapper">
          <InputCustom label="Correo electrónico:" />
        </div>
        <Boton text="Continuar" />
      </BaseWindowCard>
    </div>
  );
};

export default ForgotEmail;