import React, { useState, useEffect, useCallback } from "react";
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
import Personas from "../pages/private/personas/personas.jsx";
import Modal from "../components/shared/Modal/Modal.jsx";
import AdminForms from '../pages/private/FormularioPersonas/empleadoForms.jsx';
import EmpleadoForms from '../pages/private/FormularioPersonas/empleadoForms.jsx';
import api, {
    normalizeTag, normalizeProduct, normalizeOrder,
    normalizePromo, normalizeIngredient, normalizeExpense,
} from "../services/api.js";

const AdminRouter = () => {

    // =========================================================
    // STATE
    // =========================================================

    const [products, setProducts] = useState([]);
    const [tags, setTags] = useState([]);
    const [orders, setOrders] = useState([]);
    const [promos, setPromos] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [expenses, setExpenses] = useState([]);

    // =========================================================
    // CARGA INICIAL DE DATOS
    // =========================================================

    const loadProducts = useCallback(async () => {
        try {
            const res = await api.get('/products');
            setProducts(res.data.data.products.map(normalizeProduct));
        } catch (e) { console.error('Error cargando productos', e); }
    }, []);

    const loadTags = useCallback(async () => {
        try {
            const res = await api.get('/tags');
            setTags(res.data.data.tags.map(normalizeTag));
        } catch (e) { console.error('Error cargando tags', e); }
    }, []);

    const loadOrders = useCallback(async () => {
        try {
            const res = await api.get('/orders');
            setOrders(res.data.data.orders.map(normalizeOrder));
        } catch (e) { console.error('Error cargando órdenes', e); }
    }, []);

    const loadPromos = useCallback(async () => {
        try {
            const res = await api.get('/promotions');
            setPromos(res.data.data.promotions.map(normalizePromo));
        } catch (e) { console.error('Error cargando promociones', e); }
    }, []);

    const loadIngredients = useCallback(async () => {
        try {
            const res = await api.get('/ingredients');
            setIngredients(res.data.data.ingredients.map(normalizeIngredient));
        } catch (e) { console.error('Error cargando ingredientes', e); }
    }, []);

    const loadExpenses = useCallback(async () => {
        try {
            const res = await api.get('/bills');
            setExpenses(res.data.data.bills.map(normalizeExpense));
        } catch (e) { console.error('Error cargando gastos', e); }
    }, []);

    useEffect(() => {
        loadProducts();
        loadTags();
        loadOrders();
        loadPromos();
        loadIngredients();
        loadExpenses();
    }, []);

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

    const handleDeleteProduct = async (id) => {
        try {
            await api.delete(`/products/${id}`);
            await loadProducts();
        } catch (e) { console.error('Error eliminando producto', e); }
    };

    const handleProductSubmit = async ({ id, nombre, descripcion, precio, imagen }) => {
        try {
            if (id) {
                await api.put(`/products/${id}`, {
                    name: nombre, description: descripcion, price: precio,
                });
            } else {
                await api.post('/products', {
                    name: nombre, description: descripcion, price: precio,
                    img_link: imagen ? URL.createObjectURL(imagen) : '',
                });
            }
            await loadProducts();
            setProductFormOpen(false);
        } catch (e) { console.error('Error guardando producto', e); }
    };

    const handleRemoveProductTag = async (productId, tagId) => {
        try {
            const product = products.find(p => p.id === productId);
            const newTags = product.tags.filter(t => t.id !== tagId).map(t => t.id);
            await api.put(`/products/${productId}`, { tags: newTags });
            await loadProducts();
        } catch (e) { console.error('Error eliminando tag del producto', e); }
    };

    const handleAddProductTag = async (productId, tag) => {
        try {
            const product = products.find(p => p.id === productId);
            if (product.tags.find(t => t.id === tag.id)) return;
            const newTags = [...product.tags.map(t => t.id), tag.id];
            await api.put(`/products/${productId}`, { tags: newTags });
            await loadProducts();
        } catch (e) { console.error('Error añadiendo tag al producto', e); }
    };

    // =========================================================
    // ORDER HANDLERS
    // =========================================================

    const handleAcceptOrder = async (id) => {
        try {
            await api.patch(`/orders/${id}/status`, { status: 'Aceptado' });
            await loadOrders();
        } catch (e) { console.error('Error aceptando orden', e); }
    };

    const handleRejectOrder = async (id) => {
        try {
            await api.patch(`/orders/${id}/status`, { status: 'Rechazado' });
            await loadOrders();
        } catch (e) { console.error('Error rechazando orden', e); }
    };

    const handleCompleteOrder = async (id) => {
        try {
            await api.patch(`/orders/${id}/status`, { status: 'Completado' });
            await loadOrders();
        } catch (e) { console.error('Error completando orden', e); }
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

    const handleDeletePromo = async (id) => {
        try {
            await api.delete(`/promotions/${id}`);
            await loadPromos();
        } catch (e) { console.error('Error eliminando promoción', e); }
    };

    const handlePromoSubmit = async ({ id, nombre, fechaInicio, fechaCierre, descuento, tags: promoTags, productos }) => {
        try {
            const body = {
                name: nombre,
                init_date: fechaInicio,
                end_date: fechaCierre,
                discount_percentage: descuento,
                tags: promoTags.map(t => t.id),
                products: productos.map(p => p.id),
            };
            if (id) {
                await api.put(`/promotions/${id}`, body);
            } else {
                await api.post('/promotions', body);
            }
            await loadPromos();
            setPromoFormOpen(false);
        } catch (e) { console.error('Error guardando promoción', e); }
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

    const handleDeleteIngredient = async (id) => {
        try {
            await api.delete(`/ingredients/${id}`);
            await loadIngredients();
        } catch (e) { console.error('Error eliminando ingrediente', e); }
    };

    const handleIngredientSubmit = async ({ id, nombre, cantidad }) => {
        try {
            if (id) {
                await api.put(`/ingredients/${id}`, { name: nombre, stock: cantidad });
            } else {
                await api.post('/ingredients', { name: nombre, stock: cantidad });
            }
            await loadIngredients();
            setIngredientFormOpen(false);
        } catch (e) { console.error('Error guardando ingrediente', e); }
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

    const handleDeleteExpense = async (id) => {
        try {
            await api.delete(`/bills/${id}`);
            await loadExpenses();
        } catch (e) { console.error('Error eliminando gasto', e); }
    };

    const handleExpenseSubmit = async ({ id, fechaCompra, ingredientes }) => {
        try {
            const total = ingredientes.reduce((acc, i) => acc + i.subtotal, 0);
            const body = {
                date: fechaCompra,
                total,
                ingredients: ingredientes.map(i => ({
                    ingredient_id: i.id,
                    amount: i.cantidad,
                    subtotal: i.subtotal,
                })),
            };
            if (id) {
                await api.put(`/bills/${id}`, body);
            } else {
                await api.post('/bills', body);
            }
            await loadExpenses();
            await loadIngredients();
            setExpenseFormOpen(false);
        } catch (e) { console.error('Error guardando gasto', e); }
    };

    // =========================================================
    // TAG HANDLERS
    // =========================================================

    const handleOpenAddTag = (onTagSelectedCallback) => {
        setOnTagSelected(() => (tag) => {
            onTagSelectedCallback(tag);
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

    const handleDeleteTag = async (id) => {
        try {
            await api.delete(`/tags/${id}`);
            await loadTags();
        } catch (e) { console.error('Error eliminando tag', e); }
    };

    const handleTagSubmit = async ({ id, nombre, color }) => {
        try {
            let savedTag;
            if (id) {
                const res = await api.put(`/tags/${id}`, { name: nombre, color });
                savedTag = normalizeTag(res.data.data.tag);
            } else {
                const res = await api.post('/tags', { name: nombre, color });
                savedTag = normalizeTag(res.data.data.tag);
            }
            await loadTags();
            if (!id && onTagSelected) {
                onTagSelected(savedTag);
                setOnTagSelected(null);
                setTagManagerOpen(false);
            }
            setTagFormOpen(false);
        } catch (e) { console.error('Error guardando tag', e); }
    };

    // =========================================================
    // RENDER
    // =========================================================

    return (
        <>
            <Navbar />

            <Routes>
                <Route path="personas/nuevo-admin" element={<AdminForms />} />
                <Route path="personas/nuevo-empleado" element={<EmpleadoForms />} />
                <Route path="people" element={<Personas />} />

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

            {productFormOpen && (
                <Modal onClose={() => setProductFormOpen(false)}>
                    <ProductForm
                        initialData={editingProduct}
                        onSubmit={handleProductSubmit}
                        onClose={() => setProductFormOpen(false)}
                    />
                </Modal>
            )}

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

            {ingredientFormOpen && (
                <Modal onClose={() => setIngredientFormOpen(false)}>
                    <IngredientForm
                        initialData={editingIngredient}
                        onSubmit={handleIngredientSubmit}
                        onClose={() => setIngredientFormOpen(false)}
                    />
                </Modal>
            )}

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
