import jsonwebtoken from 'jsonwebtoken';
import config from '../../config.js';

export const generateToken = (payload, expiresIn = config.jwtExpiresIn) => {
  return jsonwebtoken.sign(payload, config.jwtSecret, { expiresIn });
};

export const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, config.jwtSecret);
  } catch {
    return null;
  }
};
