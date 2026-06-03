import ingredientModel from '../models/Ingredient';
import { success, created, badRequest, notFound } from '../utils/responses';

const getIngredients = async (req, res, next) => {
  try {
    const { search } = req.query;
    const filter = search ? { name: { $regex: search, $options: 'i' } } : {};
    const ingredients = await ingredientModel.find(filter);
    return success(res, { ingredients });
  } catch (err) { next(err); }
};

const createIngredient = async (req, res, next) => {
  try {
    const { name, stock } = req.body;
    if (!name) return badRequest(res, 'Nombre es requerido');
    const ingredient = await ingredientModel.create({ name, stock: stock || 0 });
    return created(res, { ingredient });
  } catch (err) { next(err); }
};

const updateIngredient = async (req, res, next) => {
  try {
    const ingredient = await ingredientModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!ingredient) return notFound(res, 'Ingrediente no encontrado');
    return success(res, { ingredient });
  } catch (err) { next(err); }
};

const deleteIngredient = async (req, res, next) => {
  try {
    const ingredient = await ingredientModel.findByIdAndDelete(req.params.id);
    if (!ingredient) return notFound(res, 'Ingrediente no encontrado');
    return success(res, {}, 'Ingrediente eliminado');
  } catch (err) { next(err); }
};

export default { getIngredients, createIngredient, updateIngredient, deleteIngredient };
