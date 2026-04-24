import React from 'react';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';
import './Login.css';

const Login = () => {
  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Bienvenido de vuelta" 
        subtitle="Por favor ingrese los datos para iniciar sesión"
      >
        <InputCustom label="Correo electrónico:" placeholder="ejemplo@correo.com" />
        <InputPassword label="Contraseña:" placeholder="********" />
        <Boton text="Iniciar sesión" />
        <p className="forgot-password">¿Olvidaste tu contraseña?</p>
      </BaseWindowCard>
    </div>
  );
};

export default Login;