import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './RegisterForm.css';

import imagenDonuts from '../../../assets/donuts.png';
import BotonPrimario from '../../shared/Boton/Boton.jsx';
import InputCustom from '../../shared/InputCustom/Input.jsx';
import InputPassword from '../../shared/InputPassword/InputPass.jsx';
import api from '../../../services/api.js';
import { useToast } from '../../../context/ToastContext.jsx';

const initialForm = {
  first_name: '',
  last_name: '',
  phone: '',
  email: '',
  password: '',
  confirmPassword: '',
};

function RegisterForm() {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleChange = (field) => (event) => {
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const validate = () => {
    if (!form.first_name || !form.last_name || !form.phone || !form.email || !form.password || !form.confirmPassword)
      return 'Todos los campos son requeridos';
    if (!/^\S+@\S+\.\S+$/.test(form.email)) return 'Ingresa un correo electrónico válido';
    if (form.password.length < 8) return 'La contraseña debe tener al menos 8 caracteres';
    if (form.password !== form.confirmPassword) return 'Las contraseñas no coinciden';
    return '';
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const validationError = validate();
    if (validationError) {
      showToast(validationError, 'error');
      return;
    }

    setLoading(true);
    try {
      await api.post('/auth/register', {
        first_name: form.first_name,
        last_name: form.last_name,
        phone: form.phone,
        email: form.email,
        password: form.password,
      });
      showToast('Te enviamos un código de verificación a tu correo', 'success');
      navigate('/verificar-cuenta', { state: { email: form.email } });
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo completar el registro', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="registro-container">
      <div className="registro-imagen-seccion">
        <img
          src={imagenDonuts}
          alt="Donuts Anna"
          className="registro-imagen"
        />
      </div>

      <form className="registro-formulario-seccion" onSubmit={handleSubmit}>
        <h1 className="registro-titulo">Registrate</h1>

        <div className="formulario-fila">
          <InputCustom label="Nombres:" placeholder="Pedro" value={form.first_name} onChange={handleChange('first_name')} />
          <InputCustom label="Apellidos:" placeholder="Alvarado" value={form.last_name} onChange={handleChange('last_name')} />
        </div>

        <InputCustom label="Teléfono:" type="tel" placeholder="69225140" value={form.phone} onChange={handleChange('phone')} />

        <InputCustom label="Correo electrónico:" type="email" placeholder="jhon.doe@email.com" value={form.email} onChange={handleChange('email')} />

        <InputPassword label="Contraseña:" showForgotLink={false} value={form.password} onChange={handleChange('password')} />

        <InputPassword label="Confirme la contraseña:" showForgotLink={false} value={form.confirmPassword} onChange={handleChange('confirmPassword')} />

        <div className="formulario-boton-wrapper">
          <BotonPrimario type="submit" disabled={loading}>
            {loading ? 'Registrando...' : 'Registrarse'}
          </BotonPrimario>
        </div>

        <p className="registro-login-link">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </form>
    </div>
  );
}

export default RegisterForm;
