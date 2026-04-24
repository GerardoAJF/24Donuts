import React from 'react';
import './AdminConfig.css';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import Boton from '../../../../components/shared/RegisterButton/registerButton';

const AdminConfig = () => {
  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Configuración" 
        subtitle="Ingrese los datos para facilitar la configuración de su perfil"
      >
        <InputCustom label="Nombres:" />
        <InputCustom label="Apellidos:" />
        <InputCustom label="Número de teléfono:" />
        <Boton text="Registrarse" />
      </BaseWindowCard>
    </div>
  );
};

export default AdminConfig;