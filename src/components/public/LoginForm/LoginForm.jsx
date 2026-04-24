import './LoginForm.css';

import BotonPrimario from '../../shared/Boton/Boton.jsx'; 
import InputCustom from '../../shared/InputCustom/Input.jsx';
import InputPassword from '../../shared/InputPassword/InputPass.jsx';
import imagenLoginDonuts from '../../../assets/donuts-colores.png'; 

function LoginForm() {
  const handleLoginSubmit = (event) => {
    event.preventDefault();
    console.log("Intento de inicio de sesión");
  };

  return (
    <div className="login-container">
      <form className="login-formulario-seccion" onSubmit={handleLoginSubmit}>
        
        <div className="login-header">
          <h1 className="login-titulo">Bienvenido de vuelta</h1>
          <p className="login-subtitulo">Por favor ingrese los datos para iniciar sesión</p>
        </div>

        {/* Fila: Correo electrónico (InputCustom) */}
        <InputCustom 
          label="Correo electrónico:" 
          type="email" 
          placeholder="jhon.doe@email.com" 
        />

        {/* Fila: Contraseña (InputPassword) */}
        <InputPassword 
          label="Contraseña:" 
          placeholder="***********"
        />

        {/* Fila: Botón e Inscripción */}
        <div className="login-footer">
          <BotonPrimario type="submit">
            Iniciar sesión
          </BotonPrimario>
          
          <a href="#" className="register-link">
            ¿No tienes cuenta? Registrate
          </a>
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