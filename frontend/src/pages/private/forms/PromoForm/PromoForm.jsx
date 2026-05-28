// PromoForm.jsx
import React, { useState, useEffect } from "react";
import InputCustom from "../../../../components/shared/InputCustom/Input.jsx";
import NumberInput from "../../../../components/shared/NumberInput/NumberInput.jsx";
import DateInput from "../../../../components/shared/DateInput/DateInput.jsx";
import AddTags from "../../../../components/shared/AddTags/AddTags.jsx";
import ProductList from "../../../../components/private/ProductList/ProductList.jsx";
import ProductGrid from "../../../../components/private/ProductGrid/ProductGrid.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./PromoForm.css";

const PromoForm = ({ initialData = null, allProducts = [], onSubmit, onClose, onOpenAddTag }) => {
    const [nombre, setNombre] = useState("");
    const [fechaInicio, setFechaInicio] = useState("");
    const [fechaCierre, setFechaCierre] = useState("");
    const [descuento, setDescuento] = useState("");
    const [tags, setTags] = useState([]);
    const [productos, setProductos] = useState([]);
    const [search, setSearch] = useState("");

    useEffect(() => {
        if (initialData) {
            setNombre(initialData.nombre);
            setFechaInicio(initialData.fechaInicio);
            setFechaCierre(initialData.fechaCierre);
            setDescuento(initialData.descuento);
            setTags(initialData.tags || []);
            setProductos(initialData.productos || []);
        } else {
            setNombre("");
            setFechaInicio("");
            setFechaCierre("");
            setDescuento("");
            setTags([]);
            setProductos([]);
        }
    }, [initialData]);

    const handleAddTag = (tag) => {
        if (tags.find((t) => t.id === tag.id)) return;

        // Agrega los productos de ese tag al grid
        const tagProducts = allProducts.filter((p) =>
            p.tags?.some((t) => t.id === tag.id)
        );

        setTags((prev) => [...prev, tag]);
        setProductos((prev) => {
            const newProducts = tagProducts.filter((p) => !prev.find((x) => x.id === p.id));
            return [...prev, ...newProducts];
        });
    };

    const handleRemoveTag = (id) => setTags(tags.filter((t) => t.id !== id));

    // Al seleccionar un producto de la lista, se agrega al grid y se elimina de la lista
    const handleSelectProduct = (product) => {
        if (productos.find((p) => p.id === product.id)) return;
        setProductos((prev) => [...prev, product]);
    };

    const handleRemoveProduct = (id) => setProductos(productos.filter((p) => p.id !== id));

    const handleSubmit = () => {
        if (!nombre || !fechaInicio || !fechaCierre || !descuento) return;
        onSubmit({ id: initialData?.id, nombre, fechaInicio, fechaCierre, descuento, tags, productos });
        onClose();
    };

    // Productos que no están en el grid y coinciden con la búsqueda
    const filteredProducts = allProducts.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) &&
        !productos.find((x) => x.id === p.id)
    );

    return (
        <div className="promo-form">
            <div className="promo-form__header">
                <h2 className="promo-form__title">
                    {initialData ? "Editar Promoción" : "Promociones"}
                </h2>
                <button className="promo-form__close" onClick={onClose}>✕</button>
            </div>

            <div className="promo-form__body">
                <div className="promo-form__left">
                    <InputCustom
                        label="Nombre:"
                        placeholder="Fiestas Padonutrales"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />

                    <div className="promo-form__dates">
                        <DateInput
                            label="Fecha de inicio:"
                            value={fechaInicio}
                            onChange={setFechaInicio}
                        />
                        <DateInput
                            label="Fecha de cierre:"
                            value={fechaCierre}
                            onChange={setFechaCierre}
                        />
                    </div>

                    <div className="promo-form__bottom">
                        <BotonPrimario onClick={handleSubmit}>
                            {initialData ? "Guardar" : "Insertar"}
                        </BotonPrimario>
                        <NumberInput
                            label="Descuento:"
                            placeholder="10"
                            value={descuento}
                            min={0}
                            max={100}
                            onChange={setDescuento}
                        />
                    </div>
                </div>

                <div className="promo-form__right">
                    <div>
                        <span className="promo-form__label">Etiquetas:</span>
                        <AddTags
                            tags={tags}
                            onRemove={handleRemoveTag}
                            onOpenAdd={() => onOpenAddTag(handleAddTag)}
                        />
                    </div>

                    <div className="promo-form__products">
                        <div className="promo-form__search">
                            <InputCustom
                                label="Buscar productos:"
                                placeholder="Producto"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                            <ProductList
                                products={filteredProducts}
                                value={null}
                                onChange={handleSelectProduct}
                            />
                        </div>

                        <div className="promo-form__grid">
                            <span className="promo-form__label">Productos:</span>
                            <ProductGrid
                                products={productos}
                                onRemove={handleRemoveProduct}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PromoForm;

/*
const [promoModalOpen, setPromoModalOpen] = useState(true);
    const [editingPromo, setEditingPromo] = useState(null);

    const [tagManagerOpen, setTagManagerOpen] = useState(false);
    const [tagFormOpen, setTagFormOpen] = useState(false);
    const [editingTag, setEditingTag] = useState(null);
    const [onTagSelected, setOnTagSelected] = useState(null);

    const [promos, setPromos] = useState([]);
    const [tags, setTags] = useState([
        { id: 1, label: "Bajo en grasas", backgroundColor: "#C0DD97", textColor: "#27500A" },
        { id: 2, label: "Postres", backgroundColor: "#F7C1C1", textColor: "#791F1F" },
    ]);
    const [products] = useState([
        { id: 1, name: "Galletas", tags: [{ id: 1 }] },
        { id: 2, name: "Café", tags: [{ id: 2 }] },
        { id: 3, name: "Pan", tags: [{ id: 1 }, { id: 2 }] },
    ]);

    const handlePromoSubmit = ({ id, nombre, fechaInicio, fechaCierre, descuento, tags, productos }) => {
        if (id) {
            setPromos(promos.map((p) =>
                p.id === id ? { ...p, nombre, fechaInicio, fechaCierre, descuento, tags, productos } : p
            ));
        } else {
            setPromos([...promos, {
                id: Date.now(),
                nombre, fechaInicio, fechaCierre, descuento, tags, productos,
            }]);
        }
    };

    // PromoForm llama a esto cuando el usuario presiona el + de etiquetas
    // onTagSelected es el callback para agregarle el tag al PromoForm
    const handleOpenTagManager = (onTagSelected) => {
        setOnTagSelected(() => onTagSelected);
        setTagManagerOpen(true);
    };

    // TagManagerForm llama a esto cuando el usuario presiona "Crear Etiqueta"
    const handleOpenTagForm = () => {
        setEditingTag(null);
        setTagFormOpen(true);
    };

    // TagManagerForm llama a esto cuando el usuario presiona editar en un tag
    const handleEditTag = (tag) => {
        setEditingTag(tag);
        setTagFormOpen(true);
    };

    const handleDeleteTag = (id) => {
        setTags(tags.filter((t) => t.id !== id));
    };

    const handleTagSubmit = ({ id, nombre, color }) => {
        if (id) {
            setTags(tags.map((t) =>
                t.id === id ? { ...t, label: nombre, backgroundColor: color } : t
            ));
        } else {
            const newTag = {
                id: Date.now(),
                label: nombre,
                backgroundColor: color,
                textColor: "#3E3232",
            };
            setTags((prev) => [...prev, newTag]);

            // Si venimos desde PromoForm, le pasamos el tag nuevo
            if (onTagSelected) {
                onTagSelected(newTag);
                setOnTagSelected(null);
                setTagManagerOpen(false);
            }
        }
        setTagFormOpen(false);
    };

    return (
        <>
            {promoModalOpen && (
                <PromoForm
                    initialData={editingPromo}
                    allProducts={products}
                    onSubmit={handlePromoSubmit}
                    onClose={() => setPromoModalOpen(false)}
                    onOpenAddTag={handleOpenTagManager}
                />
            )}

            {tagManagerOpen && (
                <TagManagerForm
                    tags={tags}
                    onEdit={handleEditTag}
                    onDelete={handleDeleteTag}
                    onOpenCreate={handleOpenTagForm}
                    onClose={() => setTagManagerOpen(false)}
                    onSelect={onTagSelected}
                />
            )}

            {tagFormOpen && (
                <TagForm
                    initialData={editingTag}
                    onSubmit={handleTagSubmit}
                    onClose={() => setTagFormOpen(false)}
                />
            )}
        </>
    );
*/