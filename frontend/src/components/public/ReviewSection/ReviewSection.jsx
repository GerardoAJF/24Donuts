import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import StarRating from "../StarRating/StarRating.jsx";
import TextAreaInput from "../../shared/TextAreaInput/TextAreaInput.jsx";
import BotonPrimario from "../../shared/Boton/Boton.jsx";
import api from "../../../services/api.js";
import { useAuth } from "../../../context/AuthContext.jsx";
import { useToast } from "../../../context/ToastContext.jsx";
import "./ReviewSection.css";

function ReviewSection({ productId }) {
  const { token, role } = useAuth();
  const { showToast } = useToast();

  const [reviews, setReviews] = useState([]);
  const [average, setAverage] = useState(0);
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const loadReviews = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/reviews/product/${productId}`);
      setReviews(res.data.data.reviews);
      setAverage(res.data.data.average);
      setCount(res.data.data.count);
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudieron cargar las reseñas', 'error');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productId]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (rating === 0) {
      showToast('Selecciona una calificación de 1 a 5 estrellas', 'error');
      return;
    }

    setSubmitting(true);
    try {
      await api.post('/reviews', { product_id: productId, rating, comment });
      showToast('Reseña publicada. ¡Gracias por tu opinión!', 'success');
      setRating(0);
      setComment('');
      await loadReviews();
    } catch (err) {
      showToast(err.response?.data?.message || 'No se pudo publicar la reseña', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="review-section">
      <div className="review-summary">
        <h2 className="review-title">Reseñas</h2>
        <div className="review-average">
          <StarRating value={average} readOnly size={22} />
          <span className="review-average-number">{average.toFixed(1)}</span>
          <span className="review-count">({count} {count === 1 ? 'reseña' : 'reseñas'})</span>
        </div>
      </div>

      {token && role === 'customer' ? (
        <form className="review-form" onSubmit={handleSubmit}>
          <h3 className="review-form-title">Deja tu reseña</h3>
          <StarRating value={rating} onChange={setRating} />
          <TextAreaInput
            label="Comentario (opcional):"
            placeholder="¿Qué te pareció el producto?"
            value={comment}
            onChange={setComment}
          />
          <BotonPrimario type="submit" disabled={submitting}>
            {submitting ? 'Publicando...' : 'Publicar reseña'}
          </BotonPrimario>
        </form>
      ) : (
        <p className="review-login-prompt">
          <Link to="/login">Inicia sesión</Link> para dejar tu reseña (solo si ya compraste este producto).
        </p>
      )}

      {loading ? (
        <p className="review-status">Cargando reseñas...</p>
      ) : reviews.length === 0 ? (
        <p className="review-status">Este producto aún no tiene reseñas.</p>
      ) : (
        <ul className="review-list">
          {reviews.map((r) => (
            <li key={r.id} className="review-item">
              <div className="review-item-header">
                <StarRating value={r.rating} readOnly size={16} />
                <span className="review-item-name">{r.customerName}</span>
                <span className="review-item-date">{new Date(r.datetime).toLocaleDateString('es-SV')}</span>
              </div>
              {r.comment && <p className="review-item-comment">{r.comment}</p>}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

export default ReviewSection;
