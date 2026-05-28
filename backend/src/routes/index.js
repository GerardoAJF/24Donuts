const router = require('express').Router();

router.use('/auth',        require('./auth.routes'));
router.use('/products',    require('./product.routes'));
router.use('/tags',        require('./tag.routes'));
router.use('/cart',        require('./cart.routes'));
router.use('/orders',      require('./order.routes'));
router.use('/promotions',  require('./promotion.routes'));
router.use('/ingredients', require('./ingredient.routes'));
router.use('/bills',       require('./bill.routes'));
router.use('/users',       require('./user.routes'));

module.exports = router;
