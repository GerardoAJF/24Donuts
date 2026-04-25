// InventoryRow.jsx
import React, { useState } from "react";
import ProductSummaryBar from "../ProductSummaryBar/ProductSummaryBar.jsx";
import "./InventoryRow.css";

// InventoryRow.jsx
const InventoryRow = ({ date, ingredients, total, onEdit, onDelete }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <tr className="inventory-row" onClick={() => setOpen(!open)}>
                <td className="inventory-row__chevron">{open ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-down-icon lucide-circle-chevron-down"><circle cx="12" cy="12" r="10" /><path d="m16 10-4 4-4-4" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-right-icon lucide-circle-chevron-right"><circle cx="12" cy="12" r="10" /><path d="m10 8 4 4-4 4" /></svg>}</td>
                <td>{date}</td>
                <td>{ingredients.map((i) => i.name).join(", ")}</td>
                <td>{total}</td>
                <td className="inventory-row__actions" onClick={(e) => e.stopPropagation()}>
                    <button className="inventory-row__btn" onClick={onEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-pencil"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z" /><path d="m15 5 4 4" /></svg>
                    </button>
                    <button className="inventory-row__btn" onClick={onDelete}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-trash-2"><path d="M10 11v6" /><path d="M14 11v6" /><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6" /><path d="M3 6h18" /><path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" /></svg>
                    </button>
                </td>
            </tr>

            {open && (
                <tr className="inventory-row__expanded">
                    <td colSpan={5}>
                        <div className="inventory-row__detail">
                            <ProductSummaryBar
                                title="Ingredientes"
                                products={ingredients}
                            />
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default InventoryRow;