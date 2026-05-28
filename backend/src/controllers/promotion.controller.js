const Promotion = require('../models/Promotion');
const { success, created, badRequest, notFound } = require('../utils/responses');

const getPromotions = async (req, res, next) => {
  try {
    const { active, year, month } = req.query;
    const filter = {};

    if (year && month) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      filter.init_date = { $lt: end };
      filter.end_date = { $gte: start };
    }

    const promotions = await Promotion.find(filter).populate('tags products');

    let result = promotions;
    if (active !== undefined) {
      const now = new Date();
      result = promotions.filter(p => {
        const isActive = p.init_date <= now && p.end_date >= now;
        return active === 'true' ? isActive : !isActive;
      });
    }

    return success(res, { promotions: result });
  } catch (err) { next(err); }
};

const getPromotionById = async (req, res, next) => {
  try {
    const promo = await Promotion.findById(req.params.id).populate('tags products');
    if (!promo) return notFound(res, 'Promoción no encontrada');
    return success(res, { promotion: promo });
  } catch (err) { next(err); }
};

const createPromotion = async (req, res, next) => {
  try {
    const { name, init_date, end_date, tags, products, discount_percentage } = req.body;
    if (!name || !init_date || !end_date || discount_percentage === undefined)
      return badRequest(res, 'Faltan campos requeridos');

    const promo = await Promotion.create({ name, init_date, end_date, tags: tags || [], products: products || [], discount_percentage });
    const populated = await promo.populate('tags products');
    return created(res, { promotion: populated });
  } catch (err) { next(err); }
};

const updatePromotion = async (req, res, next) => {
  try {
    const promo = await Promotion.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('tags products');
    if (!promo) return notFound(res, 'Promoción no encontrada');
    return success(res, { promotion: promo });
  } catch (err) { next(err); }
};

const deletePromotion = async (req, res, next) => {
  try {
    const promo = await Promotion.findByIdAndDelete(req.params.id);
    if (!promo) return notFound(res, 'Promoción no encontrada');
    return success(res, {}, 'Promoción eliminada');
  } catch (err) { next(err); }
};

module.exports = { getPromotions, getPromotionById, createPromotion, updatePromotion, deletePromotion };
