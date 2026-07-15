import reviewModel from '../models/Review.js';
import shoppingCartModel from '../models/ShoppingCart.js';
import orderModel from '../models/Order.js';
import { success, created, badRequest, forbidden } from '../utils/responses.js';

// POST /api/reviews  (customer)
const createReview = async (req, res, next) => {
  try {
    const { product_id, rating, comment } = req.body;
    if (!product_id || !rating) return badRequest(res, 'Producto y calificación son requeridos');
    if (rating < 1 || rating > 5) return badRequest(res, 'La calificación debe ser entre 1 y 5');

    // Solo puede reseñar si tiene un carrito ya cerrado (actual:false) que contenga
    // ese producto, y ese carrito está ligado a una Order real (compra confirmada).
    const purchasedCarts = await shoppingCartModel.find({
      customer_id: req.user.id,
      actual: false,
      'products.product_id': product_id,
    });

    let purchased = false;
    if (purchasedCarts.length > 0) {
      const cartIds = purchasedCarts.map((c) => c._id);
      purchased = await orderModel.exists({ shopping_cart_id: { $in: cartIds } });
    }
    if (!purchased) return forbidden(res, 'Solo puedes reseñar productos que has comprado');

    const existing = await reviewModel.findOne({ customer_id: req.user.id, product_id });
    if (existing) return badRequest(res, 'Ya reseñaste este producto');

    const review = await reviewModel.create({ customer_id: req.user.id, product_id, rating, comment });
    return created(res, { review }, 'Reseña publicada');
  } catch (err) {
    if (err.code === 11000) return badRequest(res, 'Ya reseñaste este producto');
    next(err);
  }
};

// GET /api/reviews/product/:productId  (público)
const getProductReviews = async (req, res, next) => {
  try {
    const reviews = await reviewModel
      .find({ product_id: req.params.productId })
      .populate('customer_id', 'first_name last_name')
      .sort({ datetime: -1 });

    const count = reviews.length;
    const average = count ? reviews.reduce((acc, r) => acc + r.rating, 0) / count : 0;

    return success(res, {
      reviews: reviews.map((r) => ({
        id: r._id,
        rating: r.rating,
        comment: r.comment,
        datetime: r.datetime,
        customerName: r.customer_id ? `${r.customer_id.first_name} ${r.customer_id.last_name}` : 'Cliente',
      })),
      average: Number(average.toFixed(1)),
      count,
    });
  } catch (err) { next(err); }
};

export default { createReview, getProductReviews };
