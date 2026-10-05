import adminModel from '../models/Admin.js';
import employeeModel from '../models/Employee.js';
import customerModel from '../models/Customer.js';
import { hashPassword, comparePassword } from '../utils/bcrypt.js';
import { findUserByEmail } from '../services/auth.service.js';
import { success, badRequest, notFound } from '../utils/responses.js';

const modelForRole = (role) =>
  role === 'admin' ? adminModel : role === 'employee' ? employeeModel : customerModel;

const toPublic = (user, role) => ({
  id: user._id,
  first_name: user.first_name,
  last_name: user.last_name,
  email: user.email,
  phone: user.phone,
  role,
  createdAt: user.createdAt,
});

// GET /api/profile
const getProfile = async (req, res, next) => {
  try {
    const user = await modelForRole(req.user.role).findById(req.user.id);
    if (!user) return notFound(res, 'Usuario no encontrado');
    return success(res, { user: toPublic(user, req.user.role) });
  } catch (err) { next(err); }
};

// PUT /api/profile
const updateProfile = async (req, res, next) => {
  try {
    const { first_name, last_name, phone, email } = req.body;
    const user = await modelForRole(req.user.role).findById(req.user.id);
    if (!user) return notFound(res, 'Usuario no encontrado');

    if (email !== undefined) {
      const normalized = String(email).trim().toLowerCase();
      if (!normalized) return badRequest(res, 'El correo no puede estar vacío');
      if (normalized !== user.email) {
        const taken = await findUserByEmail(normalized);
        if (taken) return badRequest(res, 'El correo ya está registrado');
        user.email = normalized;
      }
    }
    if (first_name !== undefined) user.first_name = first_name;
    if (last_name !== undefined) user.last_name = last_name;
    if (phone !== undefined) user.phone = phone;

    await user.save();
    return success(res, { user: toPublic(user, req.user.role) }, 'Perfil actualizado');
  } catch (err) { next(err); }
};

// PUT /api/profile/password
const changePassword = async (req, res, next) => {
  try {
    const { current_password, new_password } = req.body;
    if (!current_password || !new_password)
      return badRequest(res, 'Contraseña actual y nueva son requeridas');
    if (String(new_password).length < 8)
      return badRequest(res, 'La nueva contraseña debe tener al menos 8 caracteres');

    const user = await modelForRole(req.user.role).findById(req.user.id);
    if (!user) return notFound(res, 'Usuario no encontrado');

    const match = await comparePassword(current_password, user.password);
    if (!match) return badRequest(res, 'La contraseña actual es incorrecta');

    user.password = await hashPassword(new_password);
    await user.save();
    return success(res, {}, 'Contraseña actualizada');
  } catch (err) { next(err); }
};

export default { getProfile, updateProfile, changePassword };
