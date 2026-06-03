import express from "express"

import userController from '../controllers/user.controller.js';

const router = express.Router()

router.route("/admins")
.get(userController.getAdmins)
.post(userController.createAdmin);

router.route("/employees")
.get(userController.getEmployees)
.post(userController.createEmployee);

router.route("/employees/:id")
.put(userController.updateEmployee)
.delete(userController.deleteEmployee);

router.get('/customers', userController.getCustomers);

router.patch('/:role/:id/reset-password', userController.resetUserPassword);

export default router;
