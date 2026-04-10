import './RegisterForm.css';

import imagenDonuts from '../../assets/donuts.png'; 
import BotonPrimario from '../Boton/Boton.jsx'; 
import InputCustom from '../Input/Input.jsx';
import InputPassword from '../InputPassword/InputPass.jsx';

function RegisterForm() {
  return (
    <div className="registro-container">
      <div className="registro-imagen-seccion">
        <img 
          src={imagenDonuts} 
          alt="Donuts Anna" 
          className="registro-imagen" 
        />
      </div>

      <form className="registro-formulario-seccion">
        <h1 className="registro-titulo">Registrate</h1>
        
        <div className="formulario-fila">
          <InputCustom label="Nombres:" placeholder="Pedro" />
          <InputCustom label="Apellidos:" placeholder="Alvarado" />
        </div>

        <InputCustom label="Teléfono:" type="tel" placeholder="69225140" />
        
        <InputCustom label="Correo electrónico:" type="email" placeholder="jhon.doe@email.com" />

        <InputPassword label="Contraseña:" showForgotLink={false} />
        
        <InputPassword label="Confirme la contraseña:" showForgotLink={false} />

        <div className="formulario-boton-wrapper">
          <BotonPrimario type="submit">Registrarse</BotonPrimario>
        </div>
      </form>
    </div>
  );
}

export default RegisterForm;