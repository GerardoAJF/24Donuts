import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:4000/api',
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

api.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response?.status === 401) {
      const role = localStorage.getItem('role');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('role');
      window.location.href = role === 'customer' ? '/login' : '/auth/login';
    }
    return Promise.reject(err);
  }
);

// ── Normalizers (MongoDB → formato del frontend) ──────────────────────────

export const normalizeTag = (tag) => ({
  id: tag._id,
  label: tag.name,
  backgroundColor: tag.color,
  textColor: '#3E3232',
});

export const normalizeProduct = (p) => ({
  id: p._id,
  name: p.name,
  description: p.description,
  price: p.price,
  image: p.img_link,
  tags: (p.tags || []).map(normalizeTag),
});

export const normalizeOrder = (o) => {
  const cart = o.shopping_cart_id;
  const customer = cart?.customer_id;
  return {
    id: o._id,
    name: customer ? `${customer.first_name} ${customer.last_name}` : 'Desconocido',
    date: new Date(o.datetime).toLocaleString('es-SV'),
    quantity: (cart?.products || []).reduce((acc, p) => acc + p.amount, 0),
    total: cart?.total || 0,
    paymentMethod: o.pay_method,
    delivery: o.delivery ? 'Sí' : 'No',
    status: o.status,
    details: {
      fullName: customer ? `${customer.first_name} ${customer.last_name}` : '',
      email: customer?.email || '',
      phone: customer?.phone || '',
      deliveryType: o.delivery ? 'A domicilio (Delivery)' : 'Recoger en tienda',
      address: o.address_delivery || '',
    },
    products: (cart?.products || []).map((p) => ({
      id: p.product_id?._id,
      name: p.product_id?.name || 'Producto',
      quantity: p.amount,
      subtotal: p.subtotal,
      href: `/producto/${p.product_id?._id}`,
    })),
  };
};

export const normalizePromo = (p) => ({
  id: p._id,
  nombre: p.name,
  fechaInicio: p.init_date?.slice(0, 10).replace(/-/g, '/'),
  fechaCierre: p.end_date?.slice(0, 10).replace(/-/g, '/'),
  descuento: p.discount_percentage,
  activo: new Date(p.init_date) <= new Date() && new Date(p.end_date) >= new Date(),
  tags: (p.tags || []).map(normalizeTag),
  productos: (p.products || []).map((pr) => ({ id: pr._id, name: pr.name })),
});

export const normalizeIngredient = (i) => ({
  id: i._id,
  nombre: i.name,
  stock: i.stock,
});

export const normalizeExpense = (b) => ({
  id: b._id,
  fechaCompra: b.date?.slice(0, 10).replace(/-/g, '/'),
  total: b.total,
  ingredientes: (b.ingredients || []).map((i) => ({
    id: i.ingredient_id?._id,
    nombre: i.ingredient_id?.name || '',
    cantidad: i.amount,
    subtotal: i.subtotal,
  })),
});

export default api;
