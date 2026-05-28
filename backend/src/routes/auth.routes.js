const router = require('express').Router();
const {
  registerInitialAdmin,
  completeAdminProfile,
  login,
  registerCustomer,
  forgotPassword,
  validatePin,
  resetPassword,
} = require('../controllers/auth.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.post('/registro-inicial', registerInitialAdmin);
router.post('/configuracion-inicial', authMiddleware, requireRole('admin'), completeAdminProfile);
router.post('/login', login);
router.post('/register', registerCustomer);
router.post('/recuperar-correo', forgotPassword);
router.post('/validar-pin', validatePin);
router.post('/nueva-contrasena', resetPassword);

module.exports = router;
