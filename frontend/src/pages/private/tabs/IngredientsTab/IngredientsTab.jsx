// tabs/IngredientsTab.jsx
import React, { useState } from "react";
import IngredientSearchBar from "../../../../components/private/IngredientSearchBar/IngredientSearchBar.jsx";
import IngredientTable from "../../../../components/private/IngredientTable/IngredientTable.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./IngredientsTab.css";

const IngredientsTab = ({ ingredients, onInsert, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");

    const filteredIngredients = ingredients.filter((i) =>
        i.nombre.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="ingredients-tab">
            <IngredientSearchBar
                search={search}
                onSearchChange={setSearch}
                onSubmit={() => { }}
            />

            <IngredientTable
                ingredients={filteredIngredients}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <div className="ingredients-tab__footer">
                <BotonPrimario onClick={onInsert}>Insertar Ingrediente</BotonPrimario>
            </div>
        </div>
    );
};

export default IngredientsTab;