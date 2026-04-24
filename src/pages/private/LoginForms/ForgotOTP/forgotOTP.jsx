import React, { useState } from 'react';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import Boton from '../../../../components/shared/RegisterButton/registerButton';
import MailPasswordBox from '../../../../components/private/MailPasswordBox/MailPasswordBox';
import './ForgotOTP.css';

const ForgotOTP = () => {
  const [pinFinal, setPinFinal] = useState("");

  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Ingrese el pin que se le acaba de enviar al correo" 
        subtitle="ejemplo@correo.com"
      >
        <MailPasswordBox onPinChange={(valor) => setPinFinal(valor)} />

        <div style={{ display: 'flex', justifyContent: 'center', width: '100%', marginTop: '20px' }}>
          <Boton 
            text="Confirmar" 
            onClick={() => console.log("PIN:", pinFinal)} 
          />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default ForgotOTP;