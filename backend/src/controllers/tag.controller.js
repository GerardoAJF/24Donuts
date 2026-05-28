const Tag = require('../models/Tag');
const { success, created, badRequest, notFound } = require('../utils/responses');

const getTags = async (req, res, next) => {
  try {
    const tags = await Tag.find();
    return success(res, { tags });
  } catch (err) { next(err); }
};

const createTag = async (req, res, next) => {
  try {
    const { name, color } = req.body;
    if (!name || !color) return badRequest(res, 'Nombre y color son requeridos');
    const tag = await Tag.create({ name, color });
    return created(res, { tag });
  } catch (err) { next(err); }
};

const updateTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!tag) return notFound(res, 'Tag no encontrado');
    return success(res, { tag });
  } catch (err) { next(err); }
};

const deleteTag = async (req, res, next) => {
  try {
    const tag = await Tag.findByIdAndDelete(req.params.id);
    if (!tag) return notFound(res, 'Tag no encontrado');
    return success(res, {}, 'Tag eliminado');
  } catch (err) { next(err); }
};

module.exports = { getTags, createTag, updateTag, deleteTag };
