// tabs/OrdersTab.jsx
import React, { useState } from "react";
import OrderSearchBar from "../../../../components/private/OrderSearchBar/OrderSearchBar.jsx";
import OrderTable from "../../../../components/private/OrderTable/OrderTable.jsx";
import "./OrdersTab.css";

const OrdersTab = ({ orders, onAccept, onReject, onComplete }) => {
    const [search, setSearch] = useState("");
    const [date, setDate] = useState("");
    const [delivery, setDelivery] = useState("");
    const [status, setStatus] = useState("");

    const filteredOrders = orders.filter((order) => {
        const matchesName = order.name.toLowerCase().includes(search.toLowerCase());
        const matchesDate = date === "" || order.date.startsWith(date);
        const matchesDelivery = delivery === "" || order.delivery === delivery;
        const matchesStatus = status === "" || order.status === status;
        return matchesName && matchesDate && matchesDelivery && matchesStatus;
    });

    return (
        <div className="orders-tab">
            <OrderSearchBar
                search={search}
                onSearchChange={setSearch}
                date={date}
                onDateChange={setDate}
                delivery={delivery}
                onDeliveryChange={setDelivery}
                status={status}
                onStatusChange={setStatus}
                onSubmit={() => { }}
            />

            <OrderTable
                orders={filteredOrders}
                onAccept={onAccept}
                onReject={onReject}
                onComplete={onComplete}
            />
        </div>
    );
};

export default OrdersTab;