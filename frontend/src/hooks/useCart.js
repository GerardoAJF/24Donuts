import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useToast } from '../context/ToastContext.jsx';

const LOGIN_REQUIRED_MESSAGE = 'Inicia sesión para continuar con tu compra';

const normalizeCart = (cart) => ({
  items: (cart?.products || []).map((p) => ({
    id: p.product_id?._id || p.product_id,
    image: p.product_id?.img_link,
    name: p.product_id?.name || 'Producto',
    price: p.product_id?.price || 0,
    amount: p.amount,
    subtotal: p.subtotal,
  })),
  total: cart?.total || 0,
});

// Hook personalizado: centraliza el estado y las llamadas del carrito para
// que Menu, ProductDetail, ShoppingCart y Checkout compartan la misma lógica
// (evita repetir fetch/normalización de datos y notificaciones en cada pantalla).
export function useCart() {
  const navigate = useNavigate();
  const { showToast } = useToast();
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(false);

  const requireSession = useCallback(() => {
    if (localStorage.getItem('token')) return true;
    showToast(LOGIN_REQUIRED_MESSAGE, 'info');
    navigate('/login');
    return false;
  }, [navigate, showToast]);

  const fetchCart = useCallback(async () => {
    const res = await api.get('/cart');
    const { items: nextItems, total: nextTotal } = normalizeCart(res.data.data.cart);
    setItems(nextItems);
    setTotal(nextTotal);
  }, []);

  const loadCart = useCallback(async () => {
    if (!requireSession()) return;
    setLoading(true);
    try {
      await fetchCart();
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo cargar el carrito', 'error');
    } finally {
      setLoading(false);
    }
  }, [requireSession, fetchCart, showToast]);

  const addToCart = useCallback(async (productId, amount = 1) => {
    if (!requireSession()) return false;
    try {
      await api.post('/cart/add', { product_id: productId, amount });
      await fetchCart();
      showToast('Producto agregado al carrito', 'success');
      return true;
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo agregar el producto', 'error');
      return false;
    }
  }, [requireSession, fetchCart, showToast]);

  const updateAmount = useCallback(async (productId, amount) => {
    try {
      await api.put('/cart/update', { product_id: productId, amount });
      await fetchCart();
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo actualizar la cantidad', 'error');
    }
  }, [fetchCart, showToast]);

  const removeItem = useCallback(async (productId) => {
    try {
      await api.delete(`/cart/remove/${productId}`);
      await fetchCart();
      showToast('Producto eliminado del carrito', 'success');
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo eliminar el producto', 'error');
    }
  }, [fetchCart, showToast]);

  return { items, total, loading, loadCart, addToCart, updateAmount, removeItem };
}
