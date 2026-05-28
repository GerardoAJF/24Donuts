// ExpenseForm.jsx
import React, { useState, useEffect } from "react";
import InputCustom from "../../../../components/shared/InputCustom/Input.jsx";
import NumberInput from "../../../../components/shared/NumberInput/NumberInput.jsx";
import DateInput from "../../../../components/shared/DateInput/DateInput.jsx";
import ProductList from "../../../../components/private/ProductList/ProductList.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import ExpenseSummaryBar from "../../../../components/private/ExpenseSummaryBar/ExpenseSummaryBar.jsx";
import "./ExpenseForm.css";

const ExpenseForm = ({ initialData = null, allIngredients = [], onSubmit, onClose }) => {
    const [search, setSearch] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [subtotal, setSubtotal] = useState("");
    const [fechaCompra, setFechaCompra] = useState("");
    const [selectedIngredients, setSelectedIngredients] = useState([]);
    const [pendingIngredient, setPendingIngredient] = useState(null); // ingrediente seleccionado de la lista

    useEffect(() => {
        if (initialData) {
            setFechaCompra(initialData.fechaCompra);
            setSelectedIngredients(initialData.ingredientes || []);
        } else {
            setFechaCompra("");
            setSelectedIngredients([]);
        }
    }, [initialData]);

    const filteredIngredients = allIngredients.filter((i) =>
        i.nombre.toLowerCase().includes(search.toLowerCase()) &&
        !selectedIngredients.find((s) => s.id === i.id)
    );

    // Al hacer click en la lista solo lo marca como pendiente
    const handleSelectIngredient = (item) => {
        const ingredient = allIngredients.find((i) => i.id === item.id);
        setPendingIngredient(ingredient);
    };

    // El botón "Agregar Ingrediente" lo agrega al grid
    const handleAddIngredient = () => {
        if (!pendingIngredient || !cantidad || !subtotal) return;
        setSelectedIngredients([...selectedIngredients, {
            ...pendingIngredient,
            cantidad: Number(cantidad),
            subtotal: Number(subtotal),
        }]);
        setPendingIngredient(null);
        setCantidad("");
        setSubtotal("");
    };

    const handleRemoveIngredient = (id) => {
        setSelectedIngredients(selectedIngredients.filter((i) => i.id !== id));
    };

    const handleSubmit = () => {
        if (!fechaCompra || selectedIngredients.length === 0) return;
        onSubmit({ id: initialData?.id, fechaCompra, ingredientes: selectedIngredients });
        onClose();
    };

    return (
        <div className="expense-form">
            <div className="expense-form__header">
                <h2 className="expense-form__title">
                    {initialData ? "Editar Gasto" : "Gastos"}
                </h2>
                <button className="expense-form__close" onClick={onClose}>✕</button>
            </div>

            <div className="expense-form__body">
                <div className="expense-form__left">
                    <InputCustom
                        label="Buscar ingredientes:"
                        placeholder="Azúcar..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <ProductList
                        products={filteredIngredients.map((i) => ({ id: i.id, name: i.nombre }))}
                        value={pendingIngredient?.id}
                        onChange={handleSelectIngredient}
                    />
                </div>

                <div className="expense-form__right">
                    <NumberInput
                        label="Cantidad:"
                        placeholder="0"
                        value={cantidad}
                        min={0}
                        onChange={setCantidad}
                    />
                    <NumberInput
                        label="Subtotal:"
                        placeholder="0"
                        value={subtotal}
                        min={0}
                        onChange={setSubtotal}
                    />
                    <BotonPrimario onClick={handleAddIngredient}>
                        Agregar Ingrediente
                    </BotonPrimario>

                </div>
            </div>

            {selectedIngredients.length > 0 && (
                <ExpenseSummaryBar
                    ingredients={selectedIngredients}
                    onRemove={handleRemoveIngredient}
                />
            )}

            <div className="expense-form__footer">
                <DateInput
                    label="Fecha de compra:"
                    value={fechaCompra}
                    onChange={setFechaCompra}
                />
                <BotonPrimario onClick={handleSubmit}>Insertar</BotonPrimario>
            </div>
        </div>
    );
};

export default ExpenseForm;