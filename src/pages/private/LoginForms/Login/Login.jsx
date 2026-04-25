import React from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/admin/sales');
  };

  const handleRecover = () => {
    navigate('/auth/recuperar-email');
  };

  return (
    <div className="page-container">
      <BaseWindowCard 
        title="Bienvenido de vuelta" 
        subtitle="Por favor ingrese los datos para iniciar sesión"
      >
        <InputCustom 
          label="Correo electrónico:" 
          placeholder="ejemplo@correo.com" 
        />
        
        <InputPassword 
          label="Contraseña:" 
          placeholder="********" 
        />
        
        <div className="btn-spacing" style={{ marginTop: '20px' }}>
          <Boton 
            text="Iniciar sesión" 
            onClick={handleLogin} 
          />
        </div>

        
        <p 
          className="forgot-password" 
          onClick={handleRecover} 
          style={{ 
            cursor: 'pointer', 
            marginTop: '15px', 
            textAlign: 'center', 
            textDecoration: 'underline',
            fontSize: '14px'
          }}
        >
          ¿Olvidaste tu contraseña?
        </p>
      </BaseWindowCard>
    </div>
  );
};

export default Login;