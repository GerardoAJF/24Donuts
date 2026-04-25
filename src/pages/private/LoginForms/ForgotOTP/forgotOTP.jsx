import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import Boton from '../../../../components/shared/RegisterButton/registerButton';
import MailPasswordBox from '../../../../components/private/MailPasswordBox/MailPasswordBox';
import './ForgotOTP.css';

const ForgotOTP = () => {
  const navigate = useNavigate();
  const [pinFinal, setPinFinal] = useState("");

  const handleConfirm = () => {
    // Aquí podrías validar que el PIN esté completo antes de navegar
    console.log("PIN ingresado:", pinFinal);
    
    // Navega a la última ventana de recuperación: Cambiar contraseña
    navigate('/auth/nueva-contrasena');
  };

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
            onClick={handleConfirm} 
          />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default ForgotOTP;