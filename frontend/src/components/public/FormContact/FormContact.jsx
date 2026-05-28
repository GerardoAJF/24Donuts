import './FormContact.css';
import InputCustom from '../../shared/InputCustom/Input.jsx';
import TextAreaInput from '../../shared/TextAreaInput/TextAreaInput.jsx';
import BotonPrimario from '../../shared/Boton/Boton.jsx';

function FormularioContacto() {
    return (
        <div className="card-formulario">
            <h2 className="titulo-formulario">Contáctanos</h2>

            <div className="contenido-formulario">
                <div className="columna-izquierda">
                    <InputCustom label="Nombre Completo:" placeholder="" />
                    <InputCustom label="Correo Electrónico:" placeholder="" />
                    <InputCustom label="Número de Teléfono:" placeholder="" />
                </div>

                <TextAreaInput label="Mensaje:" placeholder="" onChange={() => {}} />
            </div>

            <div className="boton-centrado">
                <BotonPrimario>Enviar</BotonPrimario>
            </div>
        </div>
    );
}

export default FormularioContacto;