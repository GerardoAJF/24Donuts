const router = require('express').Router();
const { getBills, getBillById, createBill, updateBill, deleteBill } = require('../controllers/bill.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.use(authMiddleware, requireRole('admin'));

router.get('/', getBills);
router.get('/:id', getBillById);
router.post('/', createBill);
router.put('/:id', updateBill);
router.delete('/:id', deleteBill);

module.exports = router;
