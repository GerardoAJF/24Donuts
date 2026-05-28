const { verifyToken } = require('../utils/jwt');
const { unauthorized } = require('../utils/responses');

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return unauthorized(res, 'Token no proporcionado');
  }

  const token = authHeader.split(' ')[1];
  const decoded = verifyToken(token);
  if (!decoded) {
    return unauthorized(res, 'Token inválido o expirado');
  }

  req.user = decoded;
  next();
};

module.exports = { authMiddleware };
