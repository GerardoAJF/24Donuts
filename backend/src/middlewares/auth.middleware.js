import { verifyToken } from '../utils/jwt.js';
import { unauthorized, forbidden } from '../utils/responses.js';

// Lee el JWT de sesión desde "Authorization: Bearer <token>" y valida el rol.
export const validateAuth = (allowedRoles = []) => {
  return (req, res, next) => {
    const header = req.headers.authorization || '';
    const token = header.startsWith('Bearer ') ? header.slice(7) : null;
    if (!token) return unauthorized(res, 'Token requerido');

    const decoded = verifyToken(token);
    if (!decoded) return unauthorized(res, 'Sesión inválida o expirada');

    if (allowedRoles.length && !allowedRoles.includes(decoded.role))
      return forbidden(res, 'Acceso denegado');

    req.user = decoded; // { id, role, email }
    next();
  };
};
