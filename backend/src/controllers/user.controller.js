import adminModel from '../models/Admin.js';
import employeeModel from '../models/Employee.js';
import customerModel from '../models/Customer.js';
import { hashPassword } from '../utils/bcrypt.js';
import { success, created, badRequest, notFound } from '../utils/responses.js';

// ── ADMINS ──────────────────────────────────────────────────────────────────

const getAdmins = async (req, res, next) => {
  try {
    const admins = await adminModel.find().select('-password');
    return success(res, { admins });
  } catch (err) { next(err); }
};

const createAdmin = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone } = req.body;
    if (!first_name || !last_name || !email || !phone)
      return badRequest(res, 'Todos los campos son requeridos');

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashed = await hashPassword(tempPassword);
    const admin = await adminModel.create({ first_name, last_name, email, password: hashed, phone });

    return created(res, { admin: { ...admin.toObject(), password: undefined }, tempPassword }, 'Admin creado');
  } catch (err) { next(err); }
};

// ── EMPLOYEES ────────────────────────────────────────────────────────────────

const getEmployees = async (req, res, next) => {
  try {
    const { day, turn } = req.query;
    const filter = {};
    if (day) filter.days = day;
    if (turn) filter.turn = turn;
    const employees = await employeeModel.find(filter).select('-password');
    return success(res, { employees });
  } catch (err) { next(err); }
};

const createEmployee = async (req, res, next) => {
  try {
    const { first_name, last_name, email, phone, salary, days, turn } = req.body;
    if (!first_name || !last_name || !email || !phone || salary === undefined || !turn)
      return badRequest(res, 'Todos los campos son requeridos');

    const tempPassword = Math.random().toString(36).slice(-8);
    const hashed = await hashPassword(tempPassword);
    const employee = await employeeModel.create({ first_name, last_name, email, password: hashed, phone, salary, days: days || [], turn });

    return created(res, { employee: { ...employee.toObject(), password: undefined }, tempPassword }, 'Empleado creado');
  } catch (err) { next(err); }
};

const updateEmployee = async (req, res, next) => {
  try {
    const { password, ...rest } = req.body;
    const employee = await employeeModel.findByIdAndUpdate(req.params.id, rest, { new: true, runValidators: true }).select('-password');
    if (!employee) return notFound(res, 'Empleado no encontrado');
    return success(res, { employee });
  } catch (err) { next(err); }
};

const deleteEmployee = async (req, res, next) => {
  try {
    const employee = await employeeModel.findByIdAndDelete(req.params.id);
    if (!employee) return notFound(res, 'Empleado no encontrado');
    return success(res, {}, 'Empleado eliminado');
  } catch (err) { next(err); }
};

// ── CUSTOMERS ────────────────────────────────────────────────────────────────

const getCustomers = async (req, res, next) => {
  try {
    const customers = await customerModel.find().select('-password');
    return success(res, { customers });
  } catch (err) { next(err); }
};

// PATCH /api/users/:role/:id/reset-password  (admin only)
const resetUserPassword = async (req, res, next) => {
  try {
    const { role, id } = req.params;
    const { password } = req.body;
    if (!password) return badRequest(res, 'Nueva contraseña es requerida');

    const Model = role === 'admin' ? adminModel : role === 'employee' ? employeeModel : customerModel;
    const hashed = await hashPassword(password);
    const user = await Model.findByIdAndUpdate(id, { password: hashed }, { new: true });
    if (!user) return notFound(res, 'Usuario no encontrado');

    return success(res, {}, 'Contraseña actualizada');
  } catch (err) { next(err); }
};

export default {
  getAdmins, createAdmin,
  getEmployees, createEmployee, updateEmployee, deleteEmployee,
  getCustomers, resetUserPassword,
};
