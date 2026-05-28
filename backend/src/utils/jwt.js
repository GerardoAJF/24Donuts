const jwt = require('jsonwebtoken');
const { jwtSecret, jwtExpiresIn } = require('../config/config');

const generateToken = (payload) => {
  return jwt.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, jwtSecret);
  } catch {
    return null;
  }
};

module.exports = { generateToken, verifyToken };
