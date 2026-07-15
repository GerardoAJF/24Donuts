import { body, validationResult } from 'express-validator';
import { badRequest } from '../utils/responses.js';

const handleValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return badRequest(res, errors.array()[0].msg);
  next();
};

export const registerValidators = [
  body('first_name').trim().notEmpty().withMessage('El nombre es requerido'),
  body('last_name').trim().notEmpty().withMessage('El apellido es requerido'),
  body('email').trim().isEmail().withMessage('Correo electrónico inválido'),
  body('password').isLength({ min: 8 }).withMessage('La contraseña debe tener al menos 8 caracteres'),
  body('phone').trim().isLength({ min: 7 }).withMessage('El teléfono debe ser válido'),
  handleValidation,
];

export const verifyAccountValidators = [
  body('verificationCode').trim().isLength({ min: 6, max: 6 }).withMessage('El código debe tener 6 caracteres'),
  handleValidation,
];
