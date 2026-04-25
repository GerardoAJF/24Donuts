// tabs/ExpensesTab.jsx
import React, { useState } from "react";
import ExpenseSearchBar from "../../../../components/private/ExpenseSearchBar/ExpenseSearchBar.jsx";
import InventoryTable from "../../../../components/private/InventoryTable/InventoryTable.jsx";
import BotonPrimario from "../../../../components/shared/Boton/Boton.jsx";
import "./ExpensesTab.css";

const ExpensesTab = ({ expenses, onInsert, onEdit, onDelete }) => {
    const [search, setSearch] = useState("");
    const [year, setYear] = useState("");
    const [month, setMonth] = useState("");

    const filteredExpenses = expenses.filter((e) => {
        const matchesSearch = search === "" || e.ingredientes.some((i) =>
            i.nombre.toLowerCase().includes(search.toLowerCase())
        );
        const matchesYear = year === "" || e.fechaCompra.startsWith(year);
        const matchesMonth = month === "" || new Date(e.fechaCompra).getMonth() + 1 === Number(month);
        return matchesSearch && matchesYear && matchesMonth;
    });

    return (
        <div className="expenses-tab">
            <ExpenseSearchBar
                search={search}
                onSearchChange={setSearch}
                year={year}
                onYearChange={setYear}
                month={month}
                onMonthChange={setMonth}
                onSubmit={() => { }}
            />

            <InventoryTable
                entries={filteredExpenses}
                onEdit={onEdit}
                onDelete={onDelete}
            />

            <div className="expenses-tab__footer">
                <BotonPrimario onClick={onInsert}>Insertar Gasto</BotonPrimario>
            </div>
        </div>
    );
};

export default ExpensesTab;