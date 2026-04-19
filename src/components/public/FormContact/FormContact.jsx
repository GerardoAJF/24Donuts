import './FormContact.css';
import InputCustom from '../../shared/Input/Input.jsx';
import BotonPrimario from '../Boton/Boton.jsx';

function FormularioContacto() {
    return (
        <div className="card-formulario">
            <h2 className="titulo-formulario">Contáctanos</h2>

            <div className="contenido-formulario">
                {/* Lado Izquierdo: Los 3 inputs que ya tenías */}
                <div className="columna-izquierda">
                    <InputCustom label="Nombre Completo:" placeholder="" />
                    <InputCustom label="Correo Electrónico:" placeholder="" />
                    <InputCustom label="Número de Teléfono:" placeholder="" />
                </div>

                {/* Lado Derecho: El área de mensaje */}
                <div className="textarea-container">
                    <label className="input-label">Mensaje:</label>
                    <textarea className="textarea-field"></textarea>
                </div>
            </div>

            {/* Botón de Enviar centrado abajo */}
            <div className="boton-centrado">
                <BotonPrimario>Enviar</BotonPrimario>
            </div>
        </div>
    );
}

export default FormularioContacto;