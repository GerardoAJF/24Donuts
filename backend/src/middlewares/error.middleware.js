const errorMiddleware = (err, req, res, next) => {
  console.error(err.stack);

  if (err.name === 'ValidationError') {
    return res.status(400).json({ success: false, message: err.message });
  }
  if (err.code === 11000) {
    return res.status(400).json({ success: false, message: 'El correo ya está registrado' });
  }

  res.status(err.status || 500).json({
    success: false,
    message: err.message || 'Error interno del servidor',
  });
};

module.exports = { errorMiddleware };
