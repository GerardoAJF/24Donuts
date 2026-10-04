import express from 'express';
import cors from 'cors';
import routes from './src/routes/index.js';

const app = express();

// 5173: panel web (Vite) · 8081: app móvil en modo web (Expo). Las apps nativas no envían Origin.
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:8081'], credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', routes);

// Errores no controlados → JSON (en lugar de la página HTML por defecto de Express)
app.use((err, req, res, next) => {
  if (err.name === 'CastError') return res.status(400).json({ success: false, message: 'Identificador inválido' });
  if (err.name === 'ValidationError') return res.status(400).json({ success: false, message: err.message });
  console.error(err);
  return res.status(500).json({ success: false, message: 'Error interno del servidor' });
});


export default app;
