import productModel from '../models/Product.js';
import { success, created, badRequest, notFound } from '../utils/responses.js';
import { uploadImage } from '../utils/cloudinary.js';
import { getActivePromotions, withPricing } from '../services/pricing.service.js';

// Con multipart/form-data todo llega como texto: tags puede ser JSON ("[...]") o "id1,id2"
const parseTags = (tags) => {
  if (tags === undefined || Array.isArray(tags)) return tags;
  const text = String(tags).trim();
  if (!text) return [];
  if (text.startsWith('[')) return JSON.parse(text);
  return text.split(',').map(t => t.trim()).filter(Boolean);
};

// Si viene un archivo "image", se sube a Cloudinary y su URL reemplaza img_link
const buildProductData = async (req) => {
  const data = { ...req.body };
  if (data.tags !== undefined) data.tags = parseTags(data.tags);
  if (req.file) data.img_link = await uploadImage(req.file.buffer);
  return data;
};

// GET /api/products
const getProducts = async (req, res, next) => {
  try {
    const { search, tag, tags, match, maxPrice } = req.query;
    const filter = {};
    if (search) filter.name = { $regex: search, $options: 'i' };

    // ?tags=id1,id2 (o ?tag=id1&tag=id2). Por defecto el producto debe tener todas;
    // con ?match=any basta con una.
    const tagIds = [tags, tag].flat().filter(Boolean).flatMap(t => String(t).split(',')).map(t => t.trim()).filter(Boolean);
    if (tagIds.length) filter.tags = match === 'any' ? { $in: tagIds } : { $all: tagIds };
    if (maxPrice) filter.price = { $lte: Number(maxPrice) };

    const [products, promotions] = await Promise.all([
      productModel.find(filter).populate('tags'),
      getActivePromotions(),
    ]);
    return success(res, { products: products.map(p => withPricing(p, promotions)) });
  } catch (err) { next(err); }
};

// GET /api/products/:id
const getProductById = async (req, res, next) => {
  try {
    const product = await productModel.findById(req.params.id).populate('tags');
    if (!product) return notFound(res, 'Producto no encontrado');
    return success(res, { product: withPricing(product, await getActivePromotions()) });
  } catch (err) { next(err); }
};

// POST /api/products
const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, img_link, tags } = await buildProductData(req);
    if (!name || price === undefined) return badRequest(res, 'Nombre y precio son requeridos');

    const product = await productModel.create({ name, description, price, img_link, tags: tags || [] });
    const populated = await product.populate('tags');
    return created(res, { product: populated });
  } catch (err) { next(err); }
};

// PUT /api/products/:id
const updateProduct = async (req, res, next) => {
  try {
    const data = await buildProductData(req);
    const product = await productModel.findByIdAndUpdate(req.params.id, data, { new: true, runValidators: true }).populate('tags');
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
