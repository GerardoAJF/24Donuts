const Admin = require('../models/Admin');
const Employee = require('../models/Employee');
const Customer = require('../models/Customer');
const { comparePassword } = require('../utils/bcrypt');
const { generateToken } = require('../utils/jwt');

const findUserByEmail = async (email) => {
  const admin = await Admin.findOne({ email });
  if (admin) return { user: admin, role: 'admin' };

  const employee = await Employee.findOne({ email });
  if (employee) return { user: employee, role: 'employee' };

  const customer = await Customer.findOne({ email });
  if (customer) return { user: customer, role: 'customer' };

  return null;
};

const loginUser = async (email, password) => {
  const found = await findUserByEmail(email);
  if (!found) return null;

  const match = await comparePassword(password, found.user.password);
  if (!match) return null;

  const token = generateToken({
    id: found.user._id,
    role: found.role,
    email: found.user.email,
  });

  return { token, role: found.role, user: found.user };
};

module.exports = { findUserByEmail, loginUser };
