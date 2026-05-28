const Product = require('../models/Product');
const { success, created, badRequest, notFound } = require('../utils/responses');

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { search, tag, maxPrice } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };
    if (tag) filter.tags = tag;
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const products = await Product.find(filter).populate('tags');
    return success(res, { products });
  } catch (err) { next(err); }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id).populate('tags');
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, { product });
  } catch (err) { next(err); }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, img_link, tags } = req.body;
    if (!name || price === undefined) return badRequest(res, 'Nombre y precio son requeridos');

    const product = await Product.create({ name, description, price, img_link, tags: tags || [] });
    const populated = await product.populate('tags');
    return created(res, { product: populated });
  } catch (err) { next(err); }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }).populate('tags');
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, { product });
  } catch (err) { next(err); }
};

// DELETE /api/products/:id
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, {}, 'Producto eliminado');
  } catch (err) { next(err); }
};

module.exports = { getProducts, getProductById, createProduct, updateProduct, deleteProduct };
