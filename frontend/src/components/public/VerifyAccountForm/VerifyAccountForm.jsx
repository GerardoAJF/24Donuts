import { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import './VerifyAccountForm.css';

import BotonPrimario from '../../shared/Boton/Boton.jsx';
import InputCustom from '../../shared/InputCustom/Input.jsx';
import api from '../../../services/api.js';
import { useToast } from '../../../context/ToastContext.jsx';

function VerifyAccountForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || '';
  const { showToast } = useToast();

  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (code.trim().length !== 6) {
      showToast('El código debe tener 6 caracteres', 'error');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/verificar-cuenta', { verificationCode: code.trim() });
      showToast('Cuenta verificada. Ya puedes iniciar sesión.', 'success');
      navigate('/login');
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo verificar el código', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-container">
      <form className="verify-formulario-seccion" onSubmit={handleSubmit}>
        <h1 className="verify-titulo">Verifica tu cuenta</h1>
        <p className="verify-subtitulo">
          {email
            ? `Enviamos un código de 6 caracteres a ${email}`
            : 'Ingresa el código de 6 caracteres que enviamos a tu correo'}
        </p>

        <InputCustom
          label="Código de verificación:"
          placeholder="a1b2c3"
          value={code}
          onChange={(e) => setCode(e.target.value)}
        />

        <div className="verify-boton-wrapper">
          <BotonPrimario type="submit" disabled={loading}>
            {loading ? 'Verificando...' : 'Verificar cuenta'}
          </BotonPrimario>
        </div>

        <p className="verify-login-link">
          ¿No recibiste el código? <Link to="/registro">Regístrate de nuevo</Link>
        </p>
      </form>
    </div>
  );
}

export default VerifyAccountForm;
