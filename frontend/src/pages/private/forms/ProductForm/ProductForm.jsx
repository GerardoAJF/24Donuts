// ProductForm.jsx
import React, { useState, useEffect } from "react";
import InputCustom from "../../../../components/shared/InputCustom/Input.jsx";
import TextAreaInput from "../../../../components/shared/TextAreaInput/TextAreaInput.jsx";
import FileInput from "../../../../components/shared/FileInput/FileInput.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./ProductForm.css";

const ProductForm = ({ initialData = null, onSubmit, onClose }) => {
    const [nombre, setNombre] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [precio, setPrecio] = useState("");
    const [imagen, setImagen] = useState(null);

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.name);
            setDescripcion(initialData.description);
            setPrecio(initialData.price);
            setImagen(null);
        } else {
            setNombre("");
            setDescripcion("");
            setPrecio("");
            setImagen(null);
        }
    }, [initialData]);

    const handleSubmit = () => {
        if (!nombre || !descripcion || !precio) return;
        onSubmit({ id: initialData?.id, nombre, descripcion, precio, imagen });
        onClose();
    };

    return (
        <div className="product-form">
            <div className="product-form__header">
                <h2 className="product-form__title">Productos</h2>
                <button className="product-form__close" onClick={onClose}>✕</button>
            </div>

            <InputCustom
                label="Nombre:"
                placeholder="Donas de Coco"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
            />

            <TextAreaInput
                label="Descripción:"
                placeholder="Lorem ipsum dolor ameit"
                value={descripcion}
                onChange={(value) => setDescripcion(value)}
            />

            <InputCustom
                label="Precio:"
                placeholder="200"
                type="number"
                value={precio}
                onChange={(e) => setPrecio(e.target.value)}
            />

            <FileInput
                label="Imagen:"
                value={imagen}
                onChange={(file) => setImagen(file)}
            />

            <div className="product-form__footer">
                <BotonPrimario onClick={handleSubmit}>
                    {initialData ? "Guardar" : "Insertar"}
                </BotonPrimario>
            </div>
        </div>
    );
};

export default ProductForm;

/*
const [modalOpen, setModalOpen] = useState(true);
    const [editingProduct, setEditingProduct] = useState(null);
    const [products, setProducts] = useState([]);

    const handleEdit = (product) => {
        setEditingProduct(product);
        setModalOpen(true);
    };

    const handleSubmit = ({ id, nombre, descripcion, precio, imagen }) => {
        if (id) {
            setProducts(products.map((p) =>
                p.id === id ? { ...p, name: nombre, description: descripcion, price: precio } : p
            ));
        } else {
            setProducts([...products, {
                id: Date.now(),
                name: nombre,
                description: descripcion,
                price: precio,
                image: imagen ? URL.createObjectURL(imagen) : null,
            }]);
        }
    };

    return (
        <>
            {modalOpen && (
                <ProductForm
                    initialData={editingProduct}
                    onSubmit={handleSubmit}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
*/