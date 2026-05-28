const router = require('express').Router();
const { getTags, createTag, updateTag, deleteTag } = require('../controllers/tag.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.get('/', getTags);
router.post('/', authMiddleware, requireRole('admin'), createTag);
router.put('/:id', authMiddleware, requireRole('admin'), updateTag);
router.delete('/:id', authMiddleware, requireRole('admin'), deleteTag);

module.exports = router;
