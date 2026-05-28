const Admin = require('../models/Admin');
const Customer = require('../models/Customer');
const { hashPassword } = require('../utils/bcrypt');
const { loginUser, findUserByEmail } = require('../services/auth.service');
const { createOTP, validateOTP } = require('../services/otp.service');
const { sendOTPEmail } = require('../services/email.service');
const { success, created, badRequest, unauthorized, notFound } = require('../utils/responses');

// POST /api/auth/registro-inicial
const registerInitialAdmin = async (req, res, next) => {
  try {
    const count = await Admin.countDocuments();
    if (count > 0) return badRequest(res, 'Ya existe un administrador registrado');

    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, 'Correo y contraseña son requeridos');

    const hashed = await hashPassword(password);
    const admin = await Admin.create({
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
    const admin = await Admin.findByIdAndUpdate(
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
    return success(res, {
      token,
      role,
      user: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
      },
    }, 'Login exitoso');
  } catch (err) { next(err); }
};

// POST /api/auth/register
const registerCustomer = async (req, res, next) => {
  try {
    const { first_name, last_name, email, password, phone } = req.body;
    if (!first_name || !last_name || !email || !password || !phone)
      return badRequest(res, 'Todos los campos son requeridos');

    const existing = await Customer.findOne({ email });
    if (existing) return badRequest(res, 'El correo ya está registrado');

    const hashed = await hashPassword(password);
    const customer = await Customer.create({ first_name, last_name, email, password: hashed, phone });

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

    const code = await createOTP(email);
    await sendOTPEmail(email, code);

    return success(res, {}, 'Código enviado al correo');
  } catch (err) { next(err); }
};

// POST /api/auth/validar-pin
const validatePin = async (req, res, next) => {
  try {
    const { email, code } = req.body;
    if (!email || !code) return badRequest(res, 'Correo y código son requeridos');

    const valid = await validateOTP(email, code);
    if (!valid) return badRequest(res, 'Código inválido o expirado');

    return success(res, {}, 'Código válido');
  } catch (err) { next(err); }
};

// POST /api/auth/nueva-contrasena
const resetPassword = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return badRequest(res, 'Correo y contraseña son requeridos');

    const found = await findUserByEmail(email);
    if (!found) return notFound(res, 'Usuario no encontrado');

    const hashed = await hashPassword(password);
    found.user.password = hashed;
    await found.user.save();

    return success(res, {}, 'Contraseña actualizada');
  } catch (err) { next(err); }
};

module.exports = {
  registerInitialAdmin,
  completeAdminProfile,
  login,
  registerCustomer,
  forgotPassword,
  validatePin,
  resetPassword,
};
