// router/AdminRouter.jsx
import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "../components/private/NavBar/Navbar.jsx";
import Sales from "../pages/private/Sales/Sales.jsx";
import Inventory from "../pages/private/Inventory/Inventory.jsx";
import TagManagerForm from "../pages/private/forms/TagManagerForm/TagManagerForm.jsx";
import TagForm from "../pages/private/forms/TagForm/TagForm.jsx";
import ProductForm from "../pages/private/forms/ProductForm/ProductForm.jsx";
import PromoForm from "../pages/private/forms/PromoForm/PromoForm.jsx";
import IngredientForm from "../pages/private/forms/IngredientForm/IngredientForm.jsx";
import ExpenseForm from "../pages/private/forms/ExpenseForm/ExpenseForm.jsx";
import Modal from "../components/shared/Modal/Modal.jsx";

const AdminRouter = () => {

    // =========================================================
    // STATE
    // =========================================================

    const [products, setProducts] = useState([
        {
            id: 1,
            name: "Donas horneadas",
            description: "Donas horneadas bien buenas bien sabrosas para disfrutar a cualquier hora",
            price: 2,
            image: "../src/assets/donasHorneadas.png",
            tags: [
                { id: 1, label: "Bajo en grasas", backgroundColor: "#C0DD97", textColor: "#27500A" },
                { id: 2, label: "Postres", backgroundColor: "#F7C1C1", textColor: "#791F1F" },
            ],
        },
    ]);

    const [tags, setTags] = useState([
        { id: 1, label: "Bajo en grasas", backgroundColor: "#C0DD97", textColor: "#27500A" },
        { id: 2, label: "Postres", backgroundColor: "#F7C1C1", textColor: "#791F1F" },
    ]);

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
            ],
        },
    ]);

    const [promos, setPromos] = useState([
        {
            id: 1,
            nombre: "Valentín",
            fechaInicio: "2026/02/07",
            fechaCierre: "2026/02/14",
            descuento: 20,
            activo: true,
            tags: [
                { id: 1, label: "Postres" },
                { id: 2, label: "Horneados" },
            ],
            productos: [
                { id: 1, name: "Donas" },
                { id: 2, name: "Panes" },
            ],
        },
    ]);

    const [ingredients, setIngredients] = useState([
        { id: 1, nombre: "Cajas de huevo", stock: 10 },
        { id: 2, nombre: "Bolsas de azúcar", stock: 15 },
        { id: 3, nombre: "Bolsas de harina", stock: 30 },
        { id: 4, nombre: "Botellas de leche", stock: 25 },
    ]);

    const [expenses, setExpenses] = useState([
        {
            id: 1,
            fechaCompra: "2026/02/20",
            total: 100,
            ingredientes: [
                { id: 1, nombre: "Cajas de huevo", cantidad: 5, subtotal: 10 },
                { id: 2, nombre: "Bolsas de harina", cantidad: 3, subtotal: 6 },
                { id: 3, nombre: "Bolsas de leche", cantidad: 2, subtotal: 3 },
            ],
        },
    ]);

    // =========================================================
    // MODAL STATE
    // =========================================================

    const [productFormOpen, setProductFormOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState(null);

    const [tagManagerOpen, setTagManagerOpen] = useState(false);
    const [tagFormOpen, setTagFormOpen] = useState(false);
    const [editingTag, setEditingTag] = useState(null);
    const [onTagSelected, setOnTagSelected] = useState(null);

    const [promoFormOpen, setPromoFormOpen] = useState(false);
    const [editingPromo, setEditingPromo] = useState(null);

    const [ingredientFormOpen, setIngredientFormOpen] = useState(false);
    const [editingIngredient, setEditingIngredient] = useState(null);
    const [expenseFormOpen, setExpenseFormOpen] = useState(false);
    const [editingExpense, setEditingExpense] = useState(null);

    // =========================================================
    // PRODUCT HANDLERS
    // =========================================================

    const handleInsertProduct = () => {
        setEditingProduct(null);
        setProductFormOpen(true);
    };

    const handleEditProduct = (product) => {
        setEditingProduct(product);
        setProductFormOpen(true);
    };

    const handleDeleteProduct = (id) => {
        setProducts(products.filter((p) => p.id !== id));
    };

    const handleProductSubmit = ({ id, nombre, descripcion, precio, imagen }) => {
        if (id) {
            setProducts(products.map((p) =>
                p.id === id ? { ...p, name: nombre, description: descripcion, price: precio } : p
            ));
        } else {
            setProducts([...products, {
                id: Date.now(),
                name: nombre,
                description: descripcion,
                price: precio,
                image: imagen ? URL.createObjectURL(imagen) : null,
                tags: [],
            }]);
        }
        setProductFormOpen(false);
    };

    const handleRemoveProductTag = (productId, tagId) => {
        setProducts(products.map((p) =>
            p.id === productId
                ? { ...p, tags: p.tags.filter((t) => t.id !== tagId) }
                : p
        ));
    };

    const handleAddProductTag = (productId, tag) => {
        setProducts(products.map((p) =>
            p.id === productId && !p.tags.find((t) => t.id === tag.id)
                ? { ...p, tags: [...p.tags, tag] }
                : p
        ));
    };

    // =========================================================
    // ORDER HANDLERS
    // =========================================================

    const handleAcceptOrder = (id) => {
        setOrders(orders.map((o) =>
            o.id === id ? { ...o, status: "Aceptado" } : o
        ));
    };

    const handleRejectOrder = (id) => {
        setOrders(orders.map((o) =>
            o.id === id ? { ...o, status: "Rechazado" } : o
        ));
    };

    const handleCompleteOrder = (id) => {
        setOrders(orders.map((o) =>
            o.id === id ? { ...o, status: "Completado" } : o
        ));
    };

    // =========================================================
    // PROMO HANDLERS
    // =========================================================

    const handleInsertPromo = () => {
        setEditingPromo(null);
        setPromoFormOpen(true);
    };

    const handleEditPromo = (promo) => {
        setEditingPromo(promo);
        setPromoFormOpen(true);
    };

    const handleDeletePromo = (id) => {
        setPromos(promos.filter((p) => p.id !== id));
    };

    const handlePromoSubmit = ({ id, nombre, fechaInicio, fechaCierre, descuento, tags, productos }) => {
        if (id) {
            setPromos(promos.map((p) =>
                p.id === id ? { ...p, nombre, fechaInicio, fechaCierre, descuento, tags, productos } : p
            ));
        } else {
            setPromos([...promos, {
                id: Date.now(),
                nombre, fechaInicio, fechaCierre, descuento, tags, productos,
                activo: true,
            }]);
        }
        setPromoFormOpen(false);
    };

    // =========================================================
    // INGREDIENTS HANDLERS
    // =========================================================
    const handleInsertIngredient = () => {
        setEditingIngredient(null);
        setIngredientFormOpen(true);
    };

    const handleEditIngredient = (ingredient) => {
        setEditingIngredient(ingredient);
        setIngredientFormOpen(true);
    };

    const handleDeleteIngredient = (id) => {
        setIngredients(ingredients.filter((i) => i.id !== id));
    };

    const handleIngredientSubmit = ({ id, nombre, cantidad }) => {
        if (id) {
            setIngredients(ingredients.map((i) =>
                i.id === id ? { ...i, nombre, stock: cantidad } : i
            ));
        } else {
            setIngredients([...ingredients, {
                id: Date.now(),
                nombre,
                stock: cantidad,
            }]);
        }
        setIngredientFormOpen(false);
    };

    // =========================================================
    // EXPENSE HANDLERS
    // =========================================================
    const handleInsertExpense = () => {
        setEditingExpense(null);
        setExpenseFormOpen(true);
    };

    const handleEditExpense = (expense) => {
        setEditingExpense(expense);
        setExpenseFormOpen(true);
    };

    const handleDeleteExpense = (id) => {
        setExpenses(expenses.filter((e) => e.id !== id));
    };

    const handleExpenseSubmit = ({ id, fechaCompra, ingredientes }) => {
        const total = ingredientes.reduce((acc, i) => acc + i.subtotal, 0);
        if (id) {
            setExpenses(expenses.map((e) =>
                e.id === id ? { ...e, fechaCompra, ingredientes, total } : e
            ));
        } else {
            setExpenses([...expenses, {
                id: Date.now(),
                fechaCompra, ingredientes, total,
            }]);
        }
        setExpenseFormOpen(false);
    };

    // =========================================================
    // TAG HANDLERS
    // =========================================================

    const handleOpenAddTag = (onTagSelected) => {
        setOnTagSelected(() => (tag) => {
            onTagSelected(tag);
            setTagManagerOpen(false);
        });
        setTagManagerOpen(true);
    };

    const handleOpenTagForm = () => {
        setEditingTag(null);
        setTagFormOpen(true);
    };

    const handleEditTag = (tag) => {
        setEditingTag(tag);
        setTagFormOpen(true);
    };

    const handleDeleteTag = (id) => {
        setTags(tags.filter((t) => t.id !== id));
    };

    const handleTagSubmit = ({ id, nombre, color }) => {
        if (id) {
            setTags(tags.map((t) =>
                t.id === id ? { ...t, label: nombre, backgroundColor: color } : t
            ));
        } else {
            const newTag = {
                id: Date.now(),
                label: nombre,
                backgroundColor: color,
                textColor: "#3E3232",
            };
            setTags((prev) => [...prev, newTag]);
            if (onTagSelected) {
                onTagSelected(newTag);
                setOnTagSelected(null);
                setTagManagerOpen(false);
            }
        }
        setTagFormOpen(false);
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <>
            <Navbar />

            <Routes>
                <Route
                    path="/sales"
                    element={
                        <Sales
                            products={products}
                            tags={tags}
                            onInsertProduct={handleInsertProduct}
                            onEditProduct={handleEditProduct}
                            onDeleteProduct={handleDeleteProduct}
                            onOpenAddTag={handleOpenAddTag}
                            orders={orders}
                            onAcceptOrder={handleAcceptOrder}
                            onRejectOrder={handleRejectOrder}
                            onCompleteOrder={handleCompleteOrder}
                            promos={promos}
                            onInsertPromo={handleInsertPromo}
                            onEditPromo={handleEditPromo}
                            onDeletePromo={handleDeletePromo}
                            onRemoveProductTag={handleRemoveProductTag}
                            onAddProductTag={handleAddProductTag}
                        />
                    }
                />
                <Route
                    path="/inventory"
                    element={
                        <Inventory
                            ingredients={ingredients}
                            onInsertIngredient={handleInsertIngredient}
                            onEditIngredient={handleEditIngredient}
                            onDeleteIngredient={handleDeleteIngredient}
                            expenses={expenses}
                            onInsertExpense={handleInsertExpense}
                            onEditExpense={handleEditExpense}
                            onDeleteExpense={handleDeleteExpense}
                        />
                    }
                />
            </Routes>

            {/* Product modals */}
            {productFormOpen && (
                <Modal onClose={() => setProductFormOpen(false)}>
                    <ProductForm
                        initialData={editingProduct}
                        onSubmit={handleProductSubmit}
                        onClose={() => setProductFormOpen(false)}
                    />
                </Modal>
            )}

            {/* Tag modals */}
            {tagManagerOpen && (
                <Modal onClose={() => setTagManagerOpen(false)}>
                    <TagManagerForm
                        tags={tags}
                        onEdit={handleEditTag}
                        onDelete={handleDeleteTag}
                        onOpenCreate={handleOpenTagForm}
                        onClose={() => setTagManagerOpen(false)}
                        onSelect={onTagSelected}
                    />
                </Modal>
            )}

            {tagFormOpen && (
                <Modal onClose={() => setTagFormOpen(false)}>
                    <TagForm
                        initialData={editingTag}
                        onSubmit={handleTagSubmit}
                        onClose={() => setTagFormOpen(false)}
                    />
                </Modal>
            )}

            {/* Promo modals */}
            {promoFormOpen && (
                <Modal onClose={() => setPromoFormOpen(false)}>
                    <PromoForm
                        initialData={editingPromo}
                        allProducts={products}
                        onSubmit={handlePromoSubmit}
                        onClose={() => setPromoFormOpen(false)}
                        onOpenAddTag={handleOpenAddTag}
                    />
                </Modal>
            )}

            {/* Ingredient modals */}
            {ingredientFormOpen && (
                <Modal onClose={() => setIngredientFormOpen(false)}>
                    <IngredientForm
                        initialData={editingIngredient}
                        onSubmit={handleIngredientSubmit}
                        onClose={() => setIngredientFormOpen(false)}
                    />
                </Modal>
            )}

            {/* Expense modals */}
            {expenseFormOpen && (
                <Modal onClose={() => setExpenseFormOpen(false)}>
                    <ExpenseForm
                        initialData={editingExpense}
                        allIngredients={ingredients}
                        onSubmit={handleExpenseSubmit}
                        onClose={() => setExpenseFormOpen(false)}
                    />
                </Modal>
            )}
        </>
    );
};

export default AdminRouter;

/*
import React from "react";
import { BrowserRouter } from "react-router-dom";
import AdminRouter from "./router/AdminRouter.jsx";
import "./App.css"

const App = () => {
    return (
        <BrowserRouter>
            <AdminRouter />
        </BrowserRouter>
    );
};

export default App;
*/