// OrderTable.jsx
import React from "react";
import OrderRow from "../OrderRow/OrderRow.jsx";
import "./OrderTable.css";

/*
    const [orders, setOrders] = useState([
        {
            id: 1,
            name: "Jhon Doe",
            date: "2026/02/14 5:43 PM",
            quantity: 3,
            total: 12,
            paymentMethod: "Efectivo",
            delivery: "Sí",
            status: "Pendiente",
            details: {
                fullName: "Jhon Jhon Doe Doe",
                email: "jhon.doe@gmail.com",
                phone: "69225140",
                deliveryType: "A domicilio (Delivery)",
                address: "Avenida Aguilares",
            },
            products: [
                { id: 1, name: "Galletas", quantity: 5, subtotal: 10, href: "/productos/galletas" },
                { id: 2, name: "Café", quantity: 3, subtotal: 6, href: "/productos/cafe" },
                { id: 3, name: "Pan", quantity: 2, subtotal: 3, href: "/productos/pan" },
                { id: 3, name: "Pan", quantity: 2, subtotal: 3, href: "/productos/pan" },
                { id: 3, name: "Pan", quantity: 2, subtotal: 3, href: "/productos/pan" },
                { id: 3, name: "Pan", quantity: 2, subtotal: 3, href: "/productos/pan" },
                { id: 3, name: "Pan", quantity: 2, subtotal: 3, href: "/productos/pan" },
                { id: 3, name: "Pan", quantity: 2, subtotal: 3, href: "/productos/pan" },

            ],
        },
        {
            id: 2,
            name: "Jane Doe",
            date: "2026/02/15 10:20 AM",
            quantity: 2,
            total: 8,
            paymentMethod: "Tarjeta",
            delivery: "No",
            status: "Pendiente",
            details: {
                fullName: "Jane Marie Doe",
                email: "jane.doe@gmail.com",
                phone: "69334521",
                deliveryType: "Recoger en tienda",
                address: "N/A",
            },
            products: [
                { id: 1, name: "Café", quantity: 2, subtotal: 4, href: "/productos/cafe" },
                { id: 2, name: "Pan", quantity: 2, subtotal: 4, href: "/productos/pan" },
            ],
        },
    ]);

    const handleAccept = (id) => {
        setOrders(orders.map((o) =>
            o.id === id ? { ...o, status: "Aceptado" } : o
        ));
    };

    const handleReject = (id) => {
        setOrders(orders.map((o) =>
            o.id === id ? { ...o, status: "Rechazado" } : o
        ));
    };

    const handleComplete = (id) => {
        setOrders(orders.map((o) =>
            o.id === id ? { ...o, status: "Completado" } : o
        ));
    };

    return (
        <div style={{ padding: "24px" }}>
            <OrderTable
                orders={orders}
                onAccept={handleAccept}
                onReject={handleReject}
                onComplete={handleComplete}
            />
        </div>
    );
*/

const OrderTable = ({ orders, onAccept, onReject, onComplete }) => {
    return (
        <div className="order-table__wrapper">
            <table className="order-table">
                <thead>
                    <tr className="order-table__header">
                        <th></th>
                        <th>Cliente</th>
                        <th>Fecha y Hora</th>
                        <th>Cantidad de productos</th>
                        <th>Total</th>
                        <th>Método de pago</th>
                        <th>Delivery</th>
                        <th>Estado</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <OrderRow
                            key={order.id}
                            {...order}
                            onAccept={() => onAccept(order.id)}
                            onReject={() => onReject(order.id)}
                            onComplete={() => onComplete(order.id)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrderTable;