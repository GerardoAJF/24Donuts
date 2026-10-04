import { verifyToken } from '../utils/jwt.js';
import { unauthorized, forbidden } from '../utils/responses.js';

// Lee "Authorization: Bearer <token>" y deja el payload en req.user
export const authenticate = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) return unauthorized(res, 'Token requerido');

  const payload = verifyToken(token);
  if (!payload?.id) return unauthorized(res, 'Token inválido o expirado');

  req.user = payload;
  next();
};

export const requireRole = (...roles) => (req, res, next) => {
  if (!req.user || !roles.includes(req.user.role)) return forbidden(res);
  next();
};
