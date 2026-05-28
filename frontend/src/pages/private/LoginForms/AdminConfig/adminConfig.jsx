import React from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminConfig.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import Boton from '../../../../components/shared/RegisterButton/registerButton';

const AdminConfig = () => {
  const navigate = useNavigate();

  const handleFinish = () => {
    navigate('/auth/Login');
  };

  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Configuración" 
        subtitle="Ingrese los datos para facilitar la configuración de su perfil"
      >
        <InputCustom label="Nombres:" />
        <InputCustom label="Apellidos:" />
        <InputCustom label="Número de teléfono:" />
        <Boton text="Registrarse" onClick={handleFinish} />
      </BaseWindowCard>
    </div>
  );
};

export default AdminConfig;