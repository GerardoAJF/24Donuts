const router = require('express').Router();
const {
  getAdmins, createAdmin,
  getEmployees, createEmployee, updateEmployee, deleteEmployee,
  getCustomers, resetUserPassword,
} = require('../controllers/user.controller');
const { authMiddleware } = require('../middlewares/auth.middleware');
const { requireRole } = require('../middlewares/role.middleware');

router.use(authMiddleware, requireRole('admin'));

router.get('/admins', getAdmins);
router.post('/admins', createAdmin);

router.get('/employees', getEmployees);
router.post('/employees', createEmployee);
router.put('/employees/:id', updateEmployee);
router.delete('/employees/:id', deleteEmployee);

router.get('/customers', getCustomers);

router.patch('/:role/:id/reset-password', resetUserPassword);

module.exports = router;
