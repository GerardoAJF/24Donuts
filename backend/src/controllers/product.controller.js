import productModel from '../models/Product.js';
import { success, created, badRequest, notFound } from '../utils/responses.js';

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { search, tag, maxPrice } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (tag) filter.tags = tag;
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const products = await productModel.find(filter).populate('tags');
    return success(res, { products });
  } catch (err) { next(err); }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id).populate('tags');
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, { product });
  } catch (err) { next(err); }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, img_link, tags } = req.body;
    if (!name || price === undefined) return badRequest(res, 'Nombre y precio son requeridos');

    const product = await productModel.create({ name, description, price, img_link, tags: tags || [] });
    const populated = await product.populate('tags');
    return created(res, { product: populated });
  } catch (err) { next(err); }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('tags');
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, { product });
  } catch (err) { next(err); }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await productModel.findByIdAndDelete(req.params.id);
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, {}, 'Producto eliminado');
  } catch (err) { next(err); }
};

export default {getProducts, getProductById, createProduct, updateProduct, deleteProduct };
