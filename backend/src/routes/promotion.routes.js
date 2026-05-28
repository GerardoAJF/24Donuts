const router = require('express').Router();
const { getPromotions, getPromotionById, createPromotion, updatePromotion, deletePromotion } = require('../controllers/promotion.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.get('/', getPromotions);
router.get('/:id', getPromotionById);
router.post('/', authMiddleware, requireRole('admin'), createPromotion);
router.put('/:id', authMiddleware, requireRole('admin'), updatePromotion);
router.delete('/:id', authMiddleware, requireRole('admin'), deletePromotion);

module.exports = router;
