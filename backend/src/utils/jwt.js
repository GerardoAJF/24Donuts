import jsonwebtoken from 'jsonwebtoken';
import config from '../../config.js';

export const generateToken = (payload) => {
  return jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn: config.jwtExpiresIn });
};

export const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, config.jwtSecret);
  } catch {
    return null;
  }
};
