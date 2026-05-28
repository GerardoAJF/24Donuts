// InventoryTable.jsx
import React from "react";
import InventoryRow from "../InventoryRow/InventoryRow.jsx";
import "./InventoryTable.css";

/*

<InventoryTable
    entries={[
        {
            id: 1,
            date: "2025/02/20",
            total: 100,
            ingredients: [
                { id: 1, name: "Cajas de huevo", quantity: 5, subtotal: 10, href: "/ingredientes/huevo" },
                { id: 2, name: "Bolsas de harina", quantity: 3, subtotal: 6, href: "/ingredientes/harina" },
                { id: 3, name: "Bolsas de leche", quantity: 2, subtotal: 3, href: "/ingredientes/leche" },
            ],
    }
]}
onEdit={(id) => console.log("Editar", id)}
onDelete={(id) => console.log("Eliminar", id)}
/>
*/

const InventoryTable = ({ entries, onEdit, onDelete }) => {
    return (
        <div className="inventory-table__wrapper">
            <table className="inventory-table">
                <thead>
                    <tr className="inventory-table__header">
                        <th></th>
                        <th>Fecha</th>
                        <th>Ingredientes</th>
                        <th>Total</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map((entry) => (
                        <InventoryRow
                            key={entry.id}
                            date={entry.fechaCompra}
                            ingredients={entry.ingredientes}
                            total={entry.total}
                            onEdit={() => onEdit(entry)}
                            onDelete={() => onDelete(entry.id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default InventoryTable;