import adminModel from '../models/Admin.js';
import employeeModel from '../models/Employee.js';
import customerModel from '../models/Customer.js';
import { comparePassword } from '../utils/bcrypt.js';
import { generateToken } from '../utils/jwt.js';

export const findUserByEmail = async (email) => {
  const admin = await adminModel.findOne({ email });
  if (admin) return { user: admin, role: 'admin' };

  const employee = await employeeModel.findOne({ email });
  if (employee) return { user: employee, role: 'employee' };

  const customer = await customerModel.findOne({ email });
  if (customer) return { user: customer, role: 'customer' };

  return null;
};

export const loginUser = async (email, password) => {
  const found = await findUserByEmail(email);
  if (!found) return null;

  const match = await comparePassword(password, found.user.password);
  if (!match) return null;

  if (found.role === 'customer' && !found.user.isVerified) {
    return { unverified: true };
  }

  const token = generateToken({
    id: found.user._id,
    role: found.role,
    email: found.user.email,
  });

  return { token, role: found.role, user: found.user };
};
