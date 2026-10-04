import crypto from "crypto"

import config from "../../config.js";

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

const RESET_CODE_TTL = '10m';

// El código nunca viaja en claro dentro del token: solo un HMAC de correo + código
const hashCode = (email, code) =>
  crypto.createHmac('sha256', config.jwtSecret).update(`${email}:${code}`).digest('hex');

const readCookie = (req, name) => {
  const pair = (req.headers.cookie || '').split(';').map(c => c.trim()).find(c => c.startsWith(`${name}=`));
  return pair ? decodeURIComponent(pair.slice(name.length + 1)) : null;
};

// POST /api/auth/recuperar-correo
const forgotPassword = async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    if (!email) return badRequest(res, 'Correo es requerido');

    const found = await findUserByEmail(email);
    if (!found) return notFound(res, 'No existe una cuenta con ese correo');

    const code = crypto.randomInt(0, 1000000).toString().padStart(6, '0');
    const token = generateToken({ email, codeHash: hashCode(email, code) }, RESET_CODE_TTL);

    try {
      await sendOTPEmail(email, code);
    } catch {
      return res.status(503).json({ success: false, message: 'No se pudo enviar el correo. Intenta más tarde.' });
    }

    res.cookie("ForgotCookie", token, { httpOnly: true, maxAge: 10 * 60 * 1000 })
    return success(res, { token }, 'Código enviado al correo');
  } catch (err) { next(err); }
};

// POST /api/auth/validar-pin
const validatePin = async (req, res, next) => {
  try {
    const email = String(req.body.email || '').trim().toLowerCase();
    const clientCode = String(req.body.clientCode || req.body.code || '').trim();
    if (!email || !clientCode) return badRequest(res, 'Correo y código son requeridos');

    const payload = verifyToken(req.body.token || readCookie(req, 'ForgotCookie'));
    const valid = payload && payload.email === email && payload.codeHash === hashCode(email, clientCode);
    if (!valid) return badRequest(res, 'Código inválido o expirado');

    const resetToken = generateToken({ email, verified: true }, RESET_CODE_TTL);
    res.cookie("ValidatedCookie", resetToken, { httpOnly: true, maxAge: 10 * 60 * 1000 })

    return success(res, { resetToken }, 'Código válido');
  } catch (err) { next(err); }
};

// POST /api/auth/nueva-contrasena
const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) return badRequest(res, 'La contraseña es requerida');

    const payload = verifyToken(req.body.resetToken || readCookie(req, 'ValidatedCookie'));
    if (!payload?.verified) return badRequest(res, 'El correo no ha sido confirmado o el código expiró');

    const found = await findUserByEmail(payload.email);
    if (!found) return notFound(res, 'No existe una cuenta con ese correo');

    found.user.password = await hashPassword(password);
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
