import crypto from "crypto"

import adminModel from '../models/Admin.js';
import customerModel from '../models/Customer.js';
import { hashPassword } from '../utils/bcrypt.js';
import { generateToken, verifyToken } from "../utils/jwt.js"
import { loginUser, findUserByEmail } from '../services/auth.service.js';
import { sendOTPEmail, sendVerificationEmail } from '../services/email.service.js';
import { success, created, badRequest, unauthorized, notFound } from '../utils/responses.js';
import { shortLivedCookieOptions } from '../../config.js';

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
    if (result.unverified) return unauthorized(res, 'Debes confirmar tu cuenta por correo antes de iniciar sesión');

    const { token, role, user } = result;
    const resUser = {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone: user.phone,
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
// Paso 1 de 2: NO crea el Customer todavía. Guarda sus datos (con la contraseña ya
// hasheada) dentro de un JWT de 15 min metido en una cookie httpOnly, y manda el
// código de verificación por correo. El cliente solo queda "pendiente" hasta que
// confirme con /verificar-cuenta.
const registerCustomer = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;

    const existing = await customerModel.findOne({ email });
    if (existing) return badRequest(res, 'El correo ya está registrado');

    const hashedPassword = await hashPassword(password);
    const verificationCode = crypto.randomBytes(3).toString('hex'); // 6 caracteres

    const pendingToken = generateToken(
      { first_name, last_name, email, phone, password: hashedPassword, verificationCode },
      '15m'
    );

    res.cookie('registrationCookie', pendingToken, shortLivedCookieOptions);
    await sendVerificationEmail(email, verificationCode);

    return success(res, {}, 'Te enviamos un código de verificación a tu correo');
  } catch (err) { next(err); }
};

// POST /api/auth/verificar-cuenta
// Paso 2 de 2: compara el código que escribió el usuario contra el que va dentro
// del JWT de la cookie. Solo si coincide se crea el Customer real en la BD.
const verifyAccount = async (req, res, next) => {
  try {
    const { verificationCode } = req.body;

    const pendingToken = req.cookies.registrationCookie;
    const decoded = pendingToken ? verifyToken(pendingToken) : null;
    if (!decoded) return badRequest(res, 'El registro expiró o no existe. Vuelve a registrarte.');

    if (verificationCode.trim().toLowerCase() !== decoded.verificationCode)
      return badRequest(res, 'Código de verificación incorrecto');

    const existing = await customerModel.findOne({ email: decoded.email });
    if (existing) {
      res.clearCookie('registrationCookie');
      return badRequest(res, 'El correo ya está registrado');
    }

    const customer = await customerModel.create({
      first_name: decoded.first_name,
      last_name: decoded.last_name,
      email: decoded.email,
      password: decoded.password,
      phone: decoded.phone,
      isVerified: true,
    });

    res.clearCookie('registrationCookie');

    return created(res, { id: customer._id }, 'Cuenta verificada exitosamente. Ya puedes iniciar sesión.');
  } catch (err) { next(err); }
};

// POST /api/auth/recuperar-correo
const forgotPassword = async (req, res, next) => {
  try {
    const { email } = req.body;
    if (!email) return badRequest(res, 'Correo es requerido');

    const found = await findUserByEmail(email);
    if (!found) return notFound(res, 'No existe una cuenta con ese correo');

    // Código numérico de 6 dígitos: la UI (MailPasswordBox) solo acepta dígitos,
    // por eso NO se usa randomBytes().toString('hex') aquí (generaría letras a-f).
    const code = crypto.randomInt(100000, 1000000).toString();
    const token = generateToken({ code }, '15m');

    res.cookie('ForgotCookie', token, shortLivedCookieOptions);
    await sendOTPEmail(email, code);

    return success(res, {}, 'Código enviado al correo');
  } catch (err) { next(err); }
};

// POST /api/auth/validar-pin
const validatePin = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return badRequest(res, 'Correo y código son requeridos');

    const pendingToken = req.cookies.ForgotCookie;
    const decoded = pendingToken ? verifyToken(pendingToken) : null;
    if (!decoded) return badRequest(res, 'El código expiró o no existe. Solicita uno nuevo.');

    if (code !== decoded.code) return badRequest(res, 'Código inválido o expirado');

    const newToken = generateToken({ email, verified: true }, '15m');
    res.cookie('ValidatedCookie', newToken, shortLivedCookieOptions);
    res.clearCookie('ForgotCookie');

    return success(res, {}, 'Código válido');
  } catch (err) { next(err); }
};

// POST /api/auth/nueva-contrasena
const resetPassword = async (req, res, next) => {
  try {
    const { password } = req.body;
    if (!password) return badRequest(res, 'La contraseña es requerida');
    if (password.length < 8) return badRequest(res, 'La contraseña debe tener al menos 8 caracteres');

    const validatedToken = req.cookies.ValidatedCookie;
    const decoded = validatedToken ? verifyToken(validatedToken) : null;
    if (!decoded || !decoded.verified)
      return badRequest(res, 'El código de verificación expiró. Repite el proceso de recuperación.');

    const found = await findUserByEmail(decoded.email);
    if (!found) return notFound(res, 'Usuario no encontrado');

    const hashed = await hashPassword(password);
    found.user.password = hashed;
    await found.user.save();

    res.clearCookie('ValidatedCookie');

    return success(res, {}, 'Contraseña actualizada exitosamente');
  } catch (err) { next(err); }
};

export default {
  registerInitialAdmin,
  completeAdminProfile,
  login,
  registerCustomer,
  verifyAccount,
  forgotPassword,
  validatePin,
  resetPassword,
};
