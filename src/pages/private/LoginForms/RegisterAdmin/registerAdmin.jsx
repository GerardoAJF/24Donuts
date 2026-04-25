import React from 'react';
import { useNavigate } from 'react-router-dom';
import './RegisterAdmin.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';

const RegisterAdmin = () => {
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/auth/configuracion-inicial');
  };

  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Bienvenido" 
        subtitle="Ingrese los datos para crear el primer administrador"
      >
        <InputCustom label="Correo electrónico:" />
        <InputPassword label="Contraseña:" />
        <InputPassword label="Confirma tu contraseña:" />
        <div className="btn-spacing">
          <Boton text="Avanzar" onClick={handleNext} />
        </div>
      </BaseWindowCard>
    </div>
  );
};

export default RegisterAdmin;