import './Boton.css';

function BotonPrimario({ children, onClick, type = "button", disabled = false }) {
  return (
    <button
      className="boton-primario"
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children} {/* Aquí irá el texto como "Iniciar sesión" */}
    </button>
  );
}

export default BotonPrimario;