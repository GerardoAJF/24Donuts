import tagModel from '../models/Tag.js';
import { success, created, badRequest, notFound } from '../utils/responses.js';

const getTags = async (req, res, next) => {
  try {
    const tags = await tagModel.find();
    return success(res, { tags });
  } catch (err) { next(err); }
};

const createTag = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!name || !color) return badRequest(res, 'Nombre y color son requeridos');
    const tag = await tagModel.create({ name, color });
    return created(res, { tag });
  } catch (err) { next(err); }
};

const updateTag = async (req, res, next) => {
  try {
    const tag = await tagModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tag) return notFound(res, 'Tag no encontrado');
    return success(res, { tag });
  } catch (err) { next(err); }
};

const deleteTag = async (req, res, next) => {
  try {
    const tag = await tagModel.findByIdAndDelete(req.params.id);
    if (!tag) return notFound(res, 'Tag no encontrado');
    return success(res, {}, 'Tag eliminado');
  } catch (err) { next(err); }
};

export default { getTags, createTag, updateTag, deleteTag };
