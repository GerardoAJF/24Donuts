const router = require('express').Router();
const { getCart, addToCart, updateCartItem, removeFromCart } = require('../controllers/cart.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.use(authMiddleware, requireRole('customer'));

router.get('/', getCart);
router.post('/add', addToCart);
router.put('/update', updateCartItem);
router.delete('/remove/:productId', removeFromCart);

module.exports = router;
