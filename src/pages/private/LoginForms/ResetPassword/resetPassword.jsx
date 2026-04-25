import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el hook para navegar
import './ResetPassword.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/registerButton';

const ResetPassword = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/auth/login');
  };

  return (
    <div className="page-container">
      <BaseWindowCard title="Nueva contraseña">
        <InputPassword label="Nueva contraseña:" />
        <InputPassword label="Confirme su contraseña:" />
        <div className="btn-spacing">
          <Boton text="Confirmar" onClick={handleFinish} />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default ResetPassword;