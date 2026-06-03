import shoppingCartModel from "../models/ShoppingCart.js";
import productModel from "../models/Product.js";
import { success, created, badRequest, notFound } from "../utils/responses.js";

// GET /api/cart  — carrito activo del cliente
const getCart = async (req, res, next) => {
  try {
    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true })
      .populate('products.product_id');
    return success(res, { cart: cart || null });
  } catch (err) { next(err); }
};

// POST /api/cart/add
const addToCart = async (req, res, next) => {
  try {
    const { product_id, amount } = req.body;
    if (!product_id || !amount) return badRequest(res, 'product_id y amount son requeridos');

    const product = await productModel.findById(product_id);
    if (!product) return notFound(res, 'Producto no encontrado');

    let cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart) {
      cart = await shoppingCartModel.create({ customer_id: req.user.id, products: [], total: 0 });
    }

    const subtotal = product.price * amount;
    const idx = cart.products.findIndex(p => p.product_id.toString() === product_id);

    if (idx >= 0) {
      cart.products[idx].amount += amount;
      cart.products[idx].subtotal += subtotal;
    } else {
      cart.products.push({ product_id, amount, subtotal });
    }

    cart.total = cart.products.reduce((acc, p) => acc + p.subtotal, 0);
    await cart.save();

    return success(res, { cart });
  } catch (err) { next(err); }
};

// PUT /api/cart/update
const updateCartItem = async (req, res, next) => {
  try {
    const { product_id, amount } = req.body;
    if (!product_id || amount === undefined) return badRequest(res, 'product_id y amount son requeridos');

    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart) return notFound(res, 'Carrito no encontrado');

    const product = await productModel.findById(product_id);
    if (!product) return notFound(res, 'Producto no encontrado');

    const idx = cart.products.findIndex(p => p.product_id.toString() === product_id);
    if (idx < 0) return notFound(res, 'Producto no está en el carrito');

    if (amount <= 0) {
      cart.products.splice(idx, 1);
    } else {
      cart.products[idx].amount = amount;
      cart.products[idx].subtotal = product.price * amount;
    }

    cart.total = cart.products.reduce((acc, p) => acc + p.subtotal, 0);
    await cart.save();

    return success(res, { cart });
  } catch (err) { next(err); }
};

// DELETE /api/cart/remove/:productId
const removeFromCart = async (req, res, next) => {
  try {
    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart) return notFound(res, 'Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product_id.toString() !== req.params.productId);
    cart.total = cart.products.reduce((acc, p) => acc + p.subtotal, 0);
    await cart.save();

    return success(res, { cart });
  } catch (err) { next(err); }
};

export default { getCart, addToCart, updateCartItem, removeFromCart };
