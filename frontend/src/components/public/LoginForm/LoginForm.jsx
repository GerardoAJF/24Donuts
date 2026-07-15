import { useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './LoginForm.css';

import BotonPrimario from '../../shared/Boton/Boton.jsx';
import InputCustom from '../../shared/InputCustom/Input.jsx';
import InputPassword from '../../shared/InputPassword/InputPass.jsx';
import imagenLoginDonuts from '../../../assets/donuts-colores.png';
import api from '../../../services/api.js';
import { useAuth } from '../../../context/AuthContext.jsx';
import { useToast } from '../../../context/ToastContext.jsx';

function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { showToast } = useToast();

  useEffect(() => {
    if (location.state?.message) showToast(location.state.message, 'info');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.state]);

  const handleLoginSubmit = async (event) => {
    event.preventDefault();

    if (!email || !password) {
      showToast('Correo y contraseña son requeridos', 'error');
      return;
    }

    setLoading(true);
    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.data);
      showToast('Sesión iniciada correctamente', 'success');
      navigate('/');
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo iniciar sesión', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form className="login-formulario-seccion" onSubmit={handleLoginSubmit}>

        <div className="login-header">
          <h1 className="login-titulo">Bienvenido de vuelta</h1>
          <p className="login-subtitulo">Por favor ingrese los datos para iniciar sesión</p>
        </div>

        <InputCustom
          label="Correo electrónico:"
          type="email"
          placeholder="jhon.doe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <InputPassword
          label="Contraseña:"
          placeholder="***********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <div className="login-footer">
          <BotonPrimario type="submit" disabled={loading}>
            {loading ? 'Ingresando...' : 'Iniciar sesión'}
          </BotonPrimario>

          <Link to="/registro" className="register-link">
            ¿No tienes cuenta? Registrate
          </Link>

          <Link to="/auth/recuperar-correo" className="register-link">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>

      </form>

      <div className="login-imagen-seccion">
        <img
          src={imagenLoginDonuts}
          alt="Variedad de donuts coloridas"
          className="login-imagen"
        />
      </div>
    </div>
  );
}

export default LoginForm;
