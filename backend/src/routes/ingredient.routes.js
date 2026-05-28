const router = require('express').Router();
const { getIngredients, createIngredient, updateIngredient, deleteIngredient } = require('../controllers/ingredient.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.use(authMiddleware, requireRole('admin'));

router.get('/', getIngredients);
router.post('/', createIngredient);
router.put('/:id', updateIngredient);
router.delete('/:id', deleteIngredient);

module.exports = router;
