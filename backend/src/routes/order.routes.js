const router = require('express').Router();
const { getOrders, getMyOrders, getOrderById, createOrder, updateOrderStatus } = require('../controllers/order.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.get('/', authMiddleware, requireRole('admin', 'employee'), getOrders);
router.get('/my', authMiddleware, requireRole('customer'), getMyOrders);
router.get('/:id', authMiddleware, requireRole('admin', 'employee'), getOrderById);
router.post('/', authMiddleware, requireRole('customer'), createOrder);
router.patch('/:id/status', authMiddleware, requireRole('admin', 'employee'), updateOrderStatus);

module.exports = router;
