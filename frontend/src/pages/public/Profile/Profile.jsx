import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../../../components/public/Navbar/Navbar';
import Footer from '../../../components/public/Foteer/Foteer';
import api, { normalizeOrder } from '../../../services/api';
import { useAuth } from '../../../context/AuthContext';
import { useToast } from '../../../context/ToastContext.jsx';
import './Profile.css';

const STATUS_CLASS = {
  Pendiente: 'status-pendiente',
  Aceptado: 'status-aceptado',
  Rechazado: 'status-rechazado',
  Completado: 'status-completado',
};

const Profile = () => {
  const { token, user } = useAuth();
  const { showToast } = useToast();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      showToast('Inicia sesión para ver tu perfil', 'info');
      navigate('/login');
      return;
    }

    const loadOrders = async () => {
      setLoading(true);
      try {
        const res = await api.get('/orders/my');
        setOrders(res.data.data.orders.map(normalizeOrder));
      } catch (err) {
        showToast(err.response?.data?.message || 'No se pudo cargar tu historial de pedidos', 'error');
      } finally {
        setLoading(false);
      }
    };
    loadOrders();
  }, [token, navigate, showToast]);

  return (
    <div className="profile-page">
      <Navbar />
      <main className="profile-main">
        <section className="profile-card">
          <h1 className="profile-title">Mi perfil</h1>
          <div className="profile-info">
            <p><strong>Nombre:</strong> {user?.first_name} {user?.last_name}</p>
            <p><strong>Correo:</strong> {user?.email}</p>
            <p><strong>Teléfono:</strong> {user?.phone || '—'}</p>
          </div>
        </section>

        <section className="profile-orders">
          <h2 className="profile-orders-title">Historial de pedidos</h2>

          {loading ? (
            <p className="profile-status">Cargando pedidos...</p>
          ) : orders.length === 0 ? (
            <p className="profile-status">Aún no tienes pedidos.</p>
          ) : (
            <div className="profile-orders-list">
              {orders.map((order) => (
                <article key={order.id} className="profile-order-card">
                  <div className="profile-order-header">
                    <span className="profile-order-date">{order.date}</span>
                    <span className={`profile-order-status ${STATUS_CLASS[order.status] || ''}`}>
                      {order.status}
                    </span>
                  </div>

                  <ul className="profile-order-products">
                    {order.products.map((p, idx) => (
                      <li key={`${p.id || 'producto'}-${idx}`}>
                        {p.quantity} × {p.name} — ${(p.subtotal || 0).toFixed(2)}
                      </li>
                    ))}
                  </ul>

                  <div className="profile-order-footer">
                    <span>Total: <strong>${order.total.toFixed(2)}</strong></span>
                    <span>Pago: {order.paymentMethod}</span>
                    <span>{order.details.deliveryType}</span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Profile;
