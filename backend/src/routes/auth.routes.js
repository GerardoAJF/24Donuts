import express from 'express';
import authController from '../controllers/auth.controller.js';

const router = express.Router()

router.post('/registro-inicial', authController.registerInitialAdmin);
router.post('/login', authController.login);
router.post('/register', authController.registerCustomer);
router.post('/recuperar-correo', authController.forgotPassword);
router.post('/validar-pin', authController.validatePin);
router.post('/nueva-contrasena', authController.resetPassword);

export default router;
