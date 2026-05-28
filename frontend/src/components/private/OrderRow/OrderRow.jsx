// OrderRow.jsx
import React, { useState } from "react";
import ProductSummaryBar from "../ProductSummaryBar/ProductSummaryBar.jsx";
import "./OrderRow.css";

const OrderRow = ({ name, date, quantity, total, paymentMethod, delivery, status, details, products, onAccept, onReject, onComplete }) => {
    const [open, setOpen] = useState(false);

    return (
        <>
            <tr className={`order-row ${open ? "order-row--open" : ""}`} onClick={() => setOpen(!open)}>
                <td className="order-row__chevron">{open ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-down-icon lucide-circle-chevron-down"><circle cx="12" cy="12" r="10" /><path d="m16 10-4 4-4-4" /></svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-circle-chevron-right-icon lucide-circle-chevron-right"><circle cx="12" cy="12" r="10" /><path d="m10 8 4 4-4 4" /></svg>}</td>
                <td>{name}</td>
                <td>{date}</td>
                <td>{quantity}</td>
                <td>${total}</td>
                <td>{paymentMethod}</td>
                <td>{delivery}</td>
                <td>{status}</td>
            </tr>

            {open && (
                <tr className="order-row__expanded">
                    <td colSpan={8}>
                        <div className="order-row__detail">
                            <div className="order-row__info">
                                <div className="order-row__info-col">
                                    <span>Nombre completo: {details.fullName}</span>
                                    <span>Correo electrónico: {details.email}</span>
                                    <span>Teléfono: {details.phone}</span>
                                </div>
                                <div className="order-row__info-col">
                                    <span>Entrega: {details.deliveryType}</span>
                                    <span>Dirección de entrega: {details.address}</span>
                                </div>
                            </div>
                            <ProductSummaryBar title="Productos" products={products} />
                            <div className="order-row__footer">
                                <span className="order-row__total">Total: {total}</span>
                                <div className="order-row__footer-actions">
                                    {status === "Pendiente" ? (
                                        <>
                                            <button className="order-row__btn order-row__btn--accept" onClick={onAccept}>Aceptar</button>
                                            <button className="order-row__btn order-row__btn--reject" onClick={onReject}>Rechazar</button>
                                        </>
                                    ) : status === "Aceptado" || status === "Rechazado" ? (
                                        <button className="order-row__btn order-row__btn--complete" onClick={onComplete}>Completado</button>
                                    ) : null}
                                </div>
                            </div>
                        </div>
                    </td>
                </tr>
            )}
        </>
    );
};

export default OrderRow;