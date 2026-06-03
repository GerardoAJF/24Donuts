import crypto from "crypto"

import adminModel from '../models/Admin.js';
import customerModel from '../models/Customer.js';
import { hashPassword } from '../utils/bcrypt.js';
import { generateToken, verifyToken } from "../utils/jwt.js"
import { loginUser, findUserByEmail } from '../services/auth.service.js';
import { sendOTPEmail } from '../services/email.service.js';
import { success, created, badRequest, unauthorized, notFound } from '../utils/responses.js';

// POST /api/auth/registro-inicial
const registerInitialAdmin = async (req, res, next) => {
  try {
    const count = await adminModel.countDocuments();
    if (count > 0) return badRequest(res, 'Ya existe un administrador registrado');

    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, 'Correo y contraseña son requeridos');

    const hashed = await hashPassword(password);
    const admin = await adminModel.create({
      email,
      password: hashed,
      first_name: '',
      last_name: '',
      phone: '',
    });

    return created(res, { id: admin._id }, 'Admin creado. Completa tu perfil.');
  } catch (err) { next(err); }
};

// POST /api/auth/configuracion-inicial
const completeAdminProfile = async (req, res, next) => {
  try {
    const { first_name, last_name, phone } = req.body;
    const admin = await adminModel.findByIdAndUpdate(
      req.user.id,
      { first_name, last_name, phone },
      { new: true, runValidators: true }
    );
    if (!admin) return notFound(res, 'Admin no encontrado');
    return success(res, { admin }, 'Perfil completado');
  } catch (err) { next(err); }
};

// POST /api/auth/login
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, 'Correo y contraseña son requeridos');

    const result = await loginUser(email, password);
    if (!result) return unauthorized(res, 'Credenciales incorrectas');

    const { token, role, user } = result;
    const resUser = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
    }

    res.cookie("LoginCookie", {resUser})
    return success(res, {
      token,
      role,
      user: resUser
    }, 'Login exitoso');
  } catch (err) { next(err); }
};

// POST /api/auth/register
const registerCustomer = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    if (!first_name || !last_name || !email || !password || !phone)
      return badRequest(res, 'Todos los campos son requeridos');

    const existing = await customerModel.findOne({ email });
    if (existing) return badRequest(res, 'El correo ya está registrado');

    const hashed = await hashPassword(password);
    const customer = await customerModel.create({ first_name, last_name, email, password: hashed, phone });

    return created(res, { id: customer._id }, 'Cliente registrado exitosamente');
  } catch (err) { next(err); }
};

// POST /api/auth/recuperar-correo
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return badRequest(res, 'Correo es requerido');

    const found = await findUserByEmail(email);
    if (!found) return notFound(res, 'No existe una cuenta con ese correo');

    const code = crypto.randomBytes(6).toString("hex")
    const token = generateToken({code})

    res.cookie("ForgotCookie", token)
    await sendOTPEmail(email, code);

    return success(res, {}, 'Código enviado al correo');
  } catch (err) { next(err); }
};

// POST /api/auth/validar-pin
const validatePin = async (req, res, next) => {
  try {
    const { email, clientCode } = req.body;
    if (!email || !clientCode) return badRequest(res, 'Correo y código son requeridos');

    const token = req.cookies.ForgotCookie;
    const { code } = verifyToken(token) 

    const valid = clientCode === code
    if (!valid) return badRequest(res, 'Código inválido o expirado');

    const newToken = generateToken({email, verified: true})
    res.cookie("ValidatedCookie", newToken)

    return success(res, {}, 'Código válido');
  } catch (err) { next(err); }
};

// POST /api/auth/nueva-contrasena
const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if ( !password ) return badRequest(res, 'Correo y contraseña son requeridos');

    const token = req.cookies.ValidatedCookie;

    const {email, verified} = verifyToken(token)

    if (!verified) return badRequest(res, "El correo no ha sido confirmado")

    const found = await findUserByEmail(email)
    
    const hashed = await hashPassword(password);
    found.user.password = hashed;
    await found.user.save();

    return success(res, {}, 'Contraseña actualizada');
  } catch (err) { next(err); }
};

export default {
  registerInitialAdmin,
  completeAdminProfile,
  login,
  registerCustomer,
  forgotPassword,
  validatePin,
  resetPassword,
};
