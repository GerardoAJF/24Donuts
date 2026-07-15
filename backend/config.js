import dotenv from "dotenv"

dotenv.configDotenv()

const isProd = process.env.NODE_ENV === 'production';

export default {
  port: process.env.PORT || 4000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/24donuts',
  jwtSecret: process.env.JWT_Secret_key,
  jwtExpiresIn: '7d',
  senderEmail: process.env.SENDER_EMAIL,
  senderPassword: process.env.SENDER_PASSWORD,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};

// Cookie de corta duración para los flujos de verificación de correo y recuperación de contraseña.
// httpOnly evita que JavaScript en el navegador lea el token (protege contra XSS robando la sesión).
export const shortLivedCookieOptions = {
  maxAge: 15 * 60 * 1000,
  httpOnly: true,
  secure: isProd,
  sameSite: isProd ? 'none' : 'lax',
};
