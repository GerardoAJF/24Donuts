import './Boton.css';

function BotonPrimario({ children, onClick, type = "button" }) {
  return (
    <button 
      className="boton-primario" 
      onClick={onClick} 
      type={type}
    >
      {children} {/* Aquí irá el texto como "Iniciar sesión" */}
    </button>
  );
}

export default BotonPrimario;