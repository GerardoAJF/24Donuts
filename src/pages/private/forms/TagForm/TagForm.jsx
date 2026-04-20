// TagForm.jsx
import React, { useState, useEffect } from "react";

import InputCustom from "../../../../components/shared/InputCustom/Input.jsx";
import ColorInput from "../../../../components/shared/ColorInput/ColorInput.jsx"
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx"
import "./TagForm.css";

const TagForm = ({ initialData = null, onSubmit, onClose }) => {
    const [nombre, setNombre] = useState("");
    const [color, setColor] = useState(null);

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.label);
            setColor(initialData.backgroundColor);
        } else {
            setNombre("");
            setColor(null);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!nombre || !color) return;
        onSubmit({ id: initialData?.id, nombre, color });
        onClose();
    };

    return (
        <div className="tag-form">
            <div className="tag-form__header">
                <h2 className="tag-form__title">
                    {initialData ? "Editar Etiqueta" : "Etiquetas"}
                </h2>
                <button className="tag-form__close" onClick={onClose}>✕</button>
            </div>

            <InputCustom
                label="Nombre:"
                placeholder="Postres..."
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <ColorInput
                label="Color:"
                value={color}
                onChange={setColor}
            />

            <div className="tag-form__footer">
                <BotonPrimario onClick={handleSubmit}>
                    {initialData ? "Guardar" : "Insertar"}
                </BotonPrimario>
            </div>
        </div>
    );
};

export default TagForm;