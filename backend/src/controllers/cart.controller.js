import shoppingCartModel from "../models/ShoppingCart.js";
import productModel from "../models/Product.js";
import { success, badRequest, notFound } from "../utils/responses.js";
import { getActivePromotions, repriceCart } from "../services/pricing.service.js";

// Aplica los precios vigentes (con promociones), guarda y devuelve el carrito poblado
const saveWithPrices = async (cart) => {
  await cart.populate('products.product_id');
  repriceCart(cart, await getActivePromotions());
  await cart.save();
  await cart.populate('products.product_id');
  return cart;
};

// GET /api/cart  — carrito activo del cliente
const getCart = async (req, res, next) => {
  try {
    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    return success(res, { cart: cart ? await saveWithPrices(cart) : null });
  } catch (err) { next(err); }
};

// POST /api/cart/add
const addToCart = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const amount = Number(req.body.amount);
    if (!product_id || !Number.isInteger(amount) || amount < 1)
      return badRequest(res, 'product_id y amount son requeridos');

    const product = await productModel.findById(product_id);
    if (!product) return notFound(res, 'Producto no encontrado');

    let cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart) {
      cart = await shoppingCartModel.create({ customer_id: req.user.id, products: [], total: 0 });
    }

    const idx = cart.products.findIndex(p => p.product_id.toString() === product_id);
    if (idx >= 0) {
      cart.products[idx].amount += amount;
    } else {
      cart.products.push({ product_id, amount, subtotal: 0 });
    }

    return success(res, { cart: await saveWithPrices(cart) });
  } catch (err) { next(err); }
};

// PUT /api/cart/update
const updateCartItem = async (req, res, next) => {
  try {
    const { product_id } = req.body;
    const amount = Number(req.body.amount);
    if (!product_id || !Number.isInteger(amount)) return badRequest(res, 'product_id y amount son requeridos');

    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart) return notFound(res, 'Carrito no encontrado');

    const idx = cart.products.findIndex(p => p.product_id.toString() === product_id);
    if (idx < 0) return notFound(res, 'Producto no está en el carrito');

    if (amount <= 0) {
      cart.products.splice(idx, 1);
    } else {
      cart.products[idx].amount = amount;
    }

    return success(res, { cart: await saveWithPrices(cart) });
  } catch (err) { next(err); }
};

// DELETE /api/cart/remove/:productId
const removeFromCart = async (req, res, next) => {
  try {
    const cart = await shoppingCartModel.findOne({ customer_id: req.user.id, actual: true });
    if (!cart) return notFound(res, 'Carrito no encontrado');

    cart.products = cart.products.filter(p => p.product_id.toString() !== req.params.productId);

    return success(res, { cart: await saveWithPrices(cart) });
  } catch (err) { next(err); }
};

export default { getCart, addToCart, updateCartItem, removeFromCart };
