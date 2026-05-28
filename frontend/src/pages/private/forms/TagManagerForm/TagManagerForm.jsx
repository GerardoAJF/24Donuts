// TagManagerForm.jsx
import React, { useState } from "react";
import InputCustom from "../../../../components/shared/InputCustom/Input.jsx"
import TagManager from "../../../../components/private/TagManager/TagManager.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./TagManagerForm.css";

const TagManagerForm = ({ tags, onEdit, onDelete, onOpenCreate, onClose, onSelect }) => {
    const [search, setSearch] = useState("");

    const filteredTags = tags.filter((tag) =>
        tag.label.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="tag-manager-form">
            <div className="tag-manager-form__header">
                <button className="tag-manager-form__close" onClick={onClose}>✕</button>
            </div>

            <InputCustom
                label="Buscar:"
                placeholder="Bebidas..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />

            <TagManager
                tags={filteredTags}
                onEdit={onEdit}
                onDelete={onDelete}
                onSelect={onSelect}
            />

            <BotonPrimario onClick={onOpenCreate}>Crear Etiqueta</BotonPrimario>
        </div>
    );
};

export default TagManagerForm;

/*
 const [managerOpen, setManagerOpen] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingTag, setEditingTag] = useState(null);

    const [tags, setTags] = useState([
        { id: 1, label: "Bajo en grasas", backgroundColor: "#C0DD97", textColor: "#27500A" },
        { id: 2, label: "Postres", backgroundColor: "#F7C1C1", textColor: "#791F1F" },
        { id: 3, label: "Donas", backgroundColor: "#B5D4F4", textColor: "#0C447C" },
        { id: 4, label: "Postres", backgroundColor: "#CECBF6", textColor: "#3C3489" },
        { id: 5, label: "Postres", backgroundColor: "#FAC775", textColor: "#633806" },
    ]);

    const handleDelete = (id) => setTags(tags.filter((t) => t.id !== id));

    const handleEdit = (tag) => {
        setEditingTag(tag);
        setModalOpen(true);
    };

    const handleOpenCreate = () => {
        setEditingTag(null);
        setModalOpen(true);
    };

    const handleSubmit = ({ id, nombre, color }) => {
        if (id) {
            // Editar
            setTags(tags.map((t) =>
                t.id === id ? { ...t, label: nombre, backgroundColor: color } : t
            ));
        } else {
            // Crear
            setTags([...tags, {
                id: Date.now(),
                label: nombre,
                backgroundColor: color,
                textColor: "#3E3232",
            }]);
        }
    };
    return (
        <>
            {managerOpen && (
                <TagManagerForm
                    tags={tags}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                    onOpenCreate={handleOpenCreate}
                    onClose={() => setManagerOpen(false)}
                />
            )}

            {modalOpen && (
                <TagForm
                    initialData={editingTag}
                    onSubmit={handleSubmit}
                    onClose={() => setModalOpen(false)}
                />
            )}
        </>
    );
*/