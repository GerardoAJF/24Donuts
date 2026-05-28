const router = require('express').Router();
const { getProducts, getProductById, createProduct, updateProduct, deleteProduct } = require('../controllers/product.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.get('/', getProducts);
router.get('/:id', getProductById);
router.post('/', authMiddleware, requireRole('admin'), createProduct);
router.put('/:id', authMiddleware, requireRole('admin'), updateProduct);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteProduct);

module.exports = router;
