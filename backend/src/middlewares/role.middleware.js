const { forbidden } = require('../utils/responses');

const requireRole = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user?.role)) {
    return forbidden(res, 'No tienes permisos para realizar esta acción');
  }
  next();
};

module.exports = { requireRole };
