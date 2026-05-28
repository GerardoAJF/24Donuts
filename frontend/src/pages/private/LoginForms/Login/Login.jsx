import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BaseWindowCard from '../../../../components/private/BaseWindowCard/baseWindowCard';
import InputCustom from '../../../../components/shared/InputCustom/Input';
import InputPassword from '../../../../components/shared/InputPassword/InputPass';
import Boton from '../../../../components/shared/RegisterButton/RegisterButton';
import { useAuth } from '../../../../context/AuthContext';
import api from '../../../../services/api';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) { setError('Completa todos los campos'); return; }
    setLoading(true);
    setError('');
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.data);
      navigate('/admin/sales');
    } catch (e) {
      setError(e.response?.data?.message || 'Credenciales incorrectas');
    } finally {
      setLoading(false);
    }
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
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <InputPassword
          label="Contraseña:"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red', fontSize: '13px', marginTop: '8px' }}>{error}</p>}
        <div className="btn-spacing" style={{ marginTop: '20px' }}>
          <Boton text={loading ? 'Cargando...' : 'Iniciar sesión'} onClick={handleLogin} />
        </div>
        <p
          className="forgot-password"
          onClick={() => navigate('/auth/recuperar-correo')}
          style={{ cursor: 'pointer', marginTop: '15px', textAlign: 'center', textDecoration: 'underline', fontSize: '14px' }}
        >
          ¿Olvidaste tu contraseña?
        </p>
      </BaseWindowCard>
    </div>
  );
};

export default Login;
