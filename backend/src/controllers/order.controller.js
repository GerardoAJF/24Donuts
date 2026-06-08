import orderModel from '../models/Order.js';
import shoppingCartModel from '../models/ShoppingCart.js';
import { success, created, badRequest, notFound, forbidden } from '../utils/responses.js';

// GET /api/orders  (admin/employee)
const getOrders = async (req, res, next) => {
  try {
    const { status, delivery, date } = req.query;
    const filter = {};
    if (status) filter.status = status;
    if (delivery !== undefined) filter.delivery = delivery === 'true';
    if (date) {
      const start = new Date(date);
      const end = new Date(date);
      end.setDate(end.getDate() + 1);
      filter.datetime = { $gte: start, $lt: end };
    }

    const orders = await orderModel.find(filter)
      .populate({
        path: 'shopping_cart_id',
        populate: { path: 'products.product_id customer_id' },
      })
      .sort({ datetime: -1 });

    return success(res, { orders });
  } catch (err) { next(err); }
};

// GET /api/orders/my  (customer — sus propias órdenes)
const getMyOrders = async (req, res, next) => {
  try {
    const carts = await shoppingCartModel.find({ customer_id: req.user.id });
    const cartIds = carts.map(c => c._id);
    const orders = await orderModel.find({ shopping_cart_id: { $in: cartIds } })
      .populate({ path: 'shopping_cart_id', populate: { path: 'products.product_id' } })
      .sort({ datetime: -1 });
    return success(res, { orders });
  } catch (err) { next(err); }
};

// GET /api/orders/:id
const getOrderById = async (req, res, next) => {
  try {
    const order = await orderModel.findById(req.params.id)
      .populate({ path: 'shopping_cart_id', populate: { path: 'products.product_id customer_id' } });
    if (!order) return notFound(res, 'Orden no encontrada');
    return success(res, { order });
  } catch (err) { next(err); }
};

// POST /api/orders  (customer)
const createOrder = async (req, res, next) => {
  try {
    const { pay_method, delivery, address_delivery } = req.body;
    if (!pay_method) return badRequest(res, 'Método de pago es requerido');

    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart || cart.products.length === 0) return badRequest(res, 'El carrito está vacío');

    cart.actual = false;
    await cart.save();

    const order = await orderModel.create({
      shopping_cart_id: cart._id,
      pay_method,
      delivery: delivery || false,
      address_delivery: address_delivery || '',
    });

    return created(res, { order }, 'Orden creada exitosamente');
  } catch (err) { next(err); }
};

// PATCH /api/orders/:id/status  (admin/employee)
const updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const valid = ['Pendiente', 'Aceptado', 'Rechazado', 'Completado'];
    if (!valid.includes(status)) return badRequest(res, 'Estado inválido');

    const order = await orderModel.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return notFound(res, 'Orden no encontrada');

    return success(res, { order }, 'Estado actualizado');
  } catch (err) { next(err); }
};

export default { getOrders, getMyOrders, getOrderById, createOrder, updateOrderStatus };
