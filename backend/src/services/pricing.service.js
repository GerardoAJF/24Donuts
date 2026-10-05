import promotionModel from '../models/Promotion.js';

const idOf = (value) => String(value?._id ?? value);
const round2 = (n) => Math.round(n * 100) / 100;

export const getActivePromotions = (now = new Date()) =>
  promotionModel.find({ init_date: { $lte: now }, end_date: { $gte: now } }).lean();

// Una promoción aplica si incluye el producto explícitamente o si el producto
// tiene todas las etiquetas de la promoción. Si aplican varias, gana el mayor descuento.
export const bestPromotionFor = (product, promotions) => {
  const productId = idOf(product);
  const productTags = new Set((product.tags || []).map(idOf));

  let best = null;
  for (const promo of promotions) {
    const listed = (promo.products || []).some((p) => idOf(p) === productId);
    const promoTags = (promo.tags || []).map(idOf);
    const byTags = promoTags.length > 0 && promoTags.every((t) => productTags.has(t));
    if ((listed || byTags) && (!best || promo.discount_percentage > best.discount_percentage)) {
      best = promo;
    }
  }
  return best;
};

export const unitPriceFor = (product, promotions) => {
  const promo = bestPromotionFor(product, promotions);
  if (!promo) return product.price;
  return round2(product.price * (1 - promo.discount_percentage / 100));
};

// Agrega al producto los datos de precio final sin tocar `price` (precio de lista)
export const withPricing = (product, promotions) => {
  const plain = typeof product.toObject === 'function' ? product.toObject() : { ...product };
  const promo = bestPromotionFor(plain, promotions);
  return {
    ...plain,
    final_price: promo ? round2(plain.price * (1 - promo.discount_percentage / 100)) : plain.price,
    discount_percentage: promo ? promo.discount_percentage : 0,
    promotion: promo ? { _id: promo._id, name: promo.name, end_date: promo.end_date } : null,
  };
};

// Recalcula subtotales del carrito con los precios vigentes (requiere products.product_id poblado)
export const repriceCart = (cart, promotions) => {
  cart.products = cart.products.filter((line) => line.product_id);
  for (const line of cart.products) {
    line.subtotal = round2(unitPriceFor(line.product_id, promotions) * line.amount);
  }
  cart.total = round2(cart.products.reduce((acc, line) => acc + line.subtotal, 0));
  return cart;
};
