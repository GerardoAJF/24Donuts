const Bill = require('../models/Bill');
const Ingredient = require('../models/Ingredient');
const { success, created, badRequest, notFound } = require('../utils/responses');

const getBills = async (req, res, next) => {
  try {
    const { year, month } = req.query;
    const filter = {};
    if (year && month) {
      const start = new Date(year, month - 1, 1);
      const end = new Date(year, month, 1);
      filter.date = { $gte: start, $lt: end };
    }
    const bills = await Bill.find(filter).populate('ingredients.ingredient_id').sort({ date: -1 });
    return success(res, { bills });
  } catch (err) { next(err); }
};

const getBillById = async (req, res, next) => {
  try {
    const bill = await Bill.findById(req.params.id).populate('ingredients.ingredient_id');
    if (!bill) return notFound(res, 'Gasto no encontrado');
    return success(res, { bill });
  } catch (err) { next(err); }
};

const createBill = async (req, res, next) => {
  try {
    const { date, ingredients, total } = req.body;
    if (!ingredients || !ingredients.length || total === undefined)
      return badRequest(res, 'Ingredientes y total son requeridos');

    const bill = await Bill.create({ date: date || Date.now(), ingredients, total });

    // Actualizar stock de cada ingrediente
    for (const item of ingredients) {
      await Ingredient.findByIdAndUpdate(item.ingredient_id, { $inc: { stock: item.amount } });
    }

    const populated = await bill.populate('ingredients.ingredient_id');
    return created(res, { bill: populated });
  } catch (err) { next(err); }
};

const updateBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('ingredients.ingredient_id');
    if (!bill) return notFound(res, 'Gasto no encontrado');
    return success(res, { bill });
  } catch (err) { next(err); }
};

const deleteBill = async (req, res, next) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);
    if (!bill) return notFound(res, 'Gasto no encontrado');
    return success(res, {}, 'Gasto eliminado');
  } catch (err) { next(err); }
};

module.exports = { getBills, getBillById, createBill, updateBill, deleteBill };
