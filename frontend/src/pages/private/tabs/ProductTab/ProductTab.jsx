// tabs/ProductsTab.jsx
import React, { useState } from "react";
import ProductSearchBar from "../../../../components/private/ProductSearchBar/ProductSearchBar.jsx";
import AddTags from "../../../../components/shared/AddTags/AddTags.jsx";
import ProductCard from "../../../../components/private/ProductCard/ProductCard.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./ProductTab.css";

const ProductsTab = ({ products, tags, onInsert, onEdit, onDelete, onOpenAddTag, onRemoveProductTag, onAddProductTag }) => {
    const [search, setSearch] = useState("");
    const [maxPrice, setMaxPrice] = useState("");
    const [filterTags, setFilterTags] = useState([]);

    const handleAddFilterTag = (tag) => {
        if (filterTags.find((t) => t.id === tag.id)) return;
        setFilterTags([...filterTags, tag]);
    };

    const handleRemoveFilterTag = (id) => {
        setFilterTags(filterTags.filter((t) => t.id !== id));
    };

    const handleSearch = () => {
        // el filtrado ya es reactivo, este botón puede disparar una búsqueda al backend si se necesita
    };

    const filteredProducts = products.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesPrice = maxPrice === "" || p.price <= Number(maxPrice);
        const matchesTags = filterTags.length === 0 || filterTags.every((ft) =>
            p.tags?.some((t) => t.id === ft.id)
        );
        return matchesName && matchesPrice && matchesTags;
    });

    return (
        <div className="products-tab">
            <ProductSearchBar
                search={search}
                onSearchChange={setSearch}
                maxPrice={maxPrice}
                onMaxPriceChange={setMaxPrice}
                onSubmit={handleSearch}
            />

            <div className="products-tab__tags">
                <span className="products-tab__tags-label">Etiquetas:</span>
                <AddTags
                    tags={filterTags}
                    onRemove={handleRemoveFilterTag}
                    onOpenAdd={() => onOpenAddTag(handleAddFilterTag)}
                />
            </div>

            <div className="products-tab__grid">
                {filteredProducts.map((product) => (
                    <ProductCard
                        key={product.id}
                        {...product}
                        onEdit={() => onEdit(product)}
                        onDelete={() => onDelete(product.id)}
                        onRemoveTag={(tagId) => onRemoveProductTag(product.id, tagId)}
                        onOpenAddTag={() => onOpenAddTag((tag) => onAddProductTag(product.id, tag))}
                    />
                ))}
            </div>

            <div className="products-tab__footer">
                <BotonPrimario onClick={onInsert}>Insertar Producto</BotonPrimario>
            </div>
        </div>
    );
};

export default ProductsTab;