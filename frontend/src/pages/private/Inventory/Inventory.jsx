// Inventory.jsx
import React, { useState } from "react";
import TabBar from "../../../components/private/TabBar/TabBar.jsx";
import IngredientsTab from "../tabs/IngredientsTab/IngredientsTab.jsx";
import ExpensesTab from "../tabs/ExpensesTab/ExpensesTab.jsx";
import "./Inventory.css";

const TABS = [
    { id: "ingredients", label: "Ingredientes" },
    { id: "expenses", label: "Gastos" },
];

const Inventory = ({
    ingredients, onInsertIngredient, onEditIngredient, onDeleteIngredient,
    expenses, onInsertExpense, onEditExpense, onDeleteExpense
}) => {
    const [activeTab, setActiveTab] = useState("ingredients");

    return (
        <div className="inventory">
            <h1 className="inventory__title">Inventario</h1>

            <TabBar
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="inventory__content">
                {activeTab === "ingredients" && (
                    <IngredientsTab
                        ingredients={ingredients}
                        onInsert={onInsertIngredient}
                        onEdit={onEditIngredient}
                        onDelete={onDeleteIngredient}
                    />
                )}
                {activeTab === "expenses" && (
                    <ExpensesTab
                        expenses={expenses}
                        onInsert={onInsertExpense}
                        onEdit={onEditExpense}
                        onDelete={onDeleteExpense}
                    />
                )}
            </div>
        </div>
    );
};

export default Inventory;