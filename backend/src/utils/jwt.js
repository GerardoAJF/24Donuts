import jsonwebtoken from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../../config.js';

const generateToken = (payload) => {
  return jsonwebtoken.sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

const verifyToken = (token) => {
  try {
    return jsonwebtoken.verify(token, jwtSecret);
  } catch {
    return null;
  }
};

export default { generateToken, verifyToken };
