// Sales.jsx
import React, { useState } from "react";
import TabBar from "../../../components/private/TabBar/TabBar.jsx";
import ProductsTab from "../tabs/ProductTab/ProductTab.jsx";
import OrdersTab from "../tabs/OrdersTab/OrdersTab.jsx";
import PromotionsTab from "../tabs/PromotionsTab/PromotionsTab.jsx";
import "./Sales.css";

const TABS = [
    { id: "products", label: "Productos" },
    { id: "orders", label: "Órdenes" },
    { id: "promotions", label: "Promociones" },
];

const Sales = ({
    products, tags, onInsertProduct, onEditProduct, onDeleteProduct, onOpenAddTag,
    orders, onAcceptOrder, onRejectOrder, onCompleteOrder,
    promos, onInsertPromo, onEditPromo, onDeletePromo,
    onRemoveProductTag, onAddProductTag
}) => {
    const [activeTab, setActiveTab] = useState("products");

    return (
        <div className="sales">
            <h1 className="sales__title">Ventas</h1>

            <TabBar
                tabs={TABS}
                activeTab={activeTab}
                onTabChange={setActiveTab}
            />

            <div className="sales__content">
                {activeTab === "products" && (
                    <ProductsTab
                        products={products}
                        tags={tags}
                        onInsert={onInsertProduct}
                        onEdit={onEditProduct}
                        onDelete={onDeleteProduct}
                        onOpenAddTag={onOpenAddTag}
                        onRemoveProductTag={onRemoveProductTag}
                        onAddProductTag={onAddProductTag}
                    />
                )}
                {activeTab === "orders" && (
                    <OrdersTab
                        orders={orders}
                        onAccept={onAcceptOrder}
                        onReject={onRejectOrder}
                        onComplete={onCompleteOrder}
                    />
                )}
                {activeTab === "promotions" && (
                    <PromotionsTab
                        promos={promos}
                        onInsert={onInsertPromo}
                        onEdit={onEditPromo}
                        onDelete={onDeletePromo}
                    />
                )}
            </div>
        </div>
    );
};

export default Sales;