const Ingredient = require('../models/Ingredient');
const { success, created, badRequest, notFound } = require('../utils/responses');

const getIngredients = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const ingredients = await Ingredient.find(filter);
    return success(res, { ingredients });
  } catch (err) { next(err); }
};

const createIngredient = async (req, res, next) => {
  try {
    const { name, stock } = req.body;
    if (!name) return badRequest(res, 'Nombre es requerido');
    const ingredient = await Ingredient.create({ name, stock: stock || 0 });
    return created(res, { ingredient });
  } catch (err) { next(err); }
};

const updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ingredient) return notFound(res, 'Ingrediente no encontrado');
    return success(res, { ingredient });
  } catch (err) { next(err); }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const ingredient = await Ingredient.findByIdAndDelete(req.params.id);
    if (!ingredient) return notFound(res, 'Ingrediente no encontrado');
    return success(res, {}, 'Ingrediente eliminado');
  } catch (err) { next(err); }
};

module.exports = { getIngredients, createIngredient, updateIngredient, deleteIngredient };
