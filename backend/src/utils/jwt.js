import { sign, verify } from 'jsonwebtoken';
import { jwtSecret, jwtExpiresIn } from '../config/config';

const generateToken = (payload) => {
  return sign(payload, jwtSecret, { expiresIn: jwtExpiresIn });
};

const verifyToken = (token) => {
  try {
    return verify(token, jwtSecret);
  } catch {
    return null;
  }
};

export default { generateToken, verifyToken };
