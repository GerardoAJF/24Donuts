// IngredientForm.jsx
import React, { useState, useEffect } from "react";
import InputCustom from "../../../../components/shared/InputCustom/Input.jsx";
import NumberInput from "../../../../components/shared/NumberInput/NumberInput.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./IngredientForm.css";

const IngredientForm = ({ initialData = null, onSubmit, onClose }) => {
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setCantidad(initialData.cantidad);
        } else {
            setNombre("");
            setCantidad("");
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!nombre || !cantidad) return;
        onSubmit({ id: initialData?.id, nombre, cantidad: Number(cantidad) });
        onClose();
    };

    return (
        <div className="ingredient-form">
            <div className="ingredient-form__header">
                <h2 className="ingredient-form__title">
                    {initialData ? "Editar Ingrediente" : "Ingredientes"}
                </h2>
                <button className="ingredient-form__close" onClick={onClose}>✕</button>
            </div>

            <div className="ingredient-form__fields">
                <InputCustom
                    label="Nombre:"
                    placeholder="Azúcar"
                    value={nombre}
                    onChange={(e) => setNombre(e.target.value)}
                />
                <NumberInput
                    label="Cantidad:"
                    placeholder="0"
                    value={cantidad}
                    min={0}
                    onChange={setCantidad}
                />
            </div>

            <div className="ingredient-form__footer">
                <BotonPrimario onClick={handleSubmit}>Insertar</BotonPrimario>
            </div>
        </div>
    );
};

export default IngredientForm;