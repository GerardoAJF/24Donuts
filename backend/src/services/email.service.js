const nodemailer = require('nodemailer');
const { senderEmail, senderPassword } = require('../config/config');

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: senderEmail,
    pass: senderPassword,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

transporter.verify((error) => {
  if (error) {
    console.error('Error de conexión con el servidor de correo:', error.message);
  } else {
    console.log('Servidor de correo conectado correctamente');
  }
});

const sendOTPEmail = async (to, code) => {
  try {
    const info = await transporter.sendMail({
      from: `"24Donuts" <${senderEmail}>`,
      to,
      subject: 'Código de recuperación de contraseña - 24Donuts',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 400px; margin: auto;">
          <h2 style="color: #e85d04;">24Donuts</h2>
          <p>Tu código de verificación es:</p>
          <h1 style="letter-spacing: 8px; color: #333;">${code}</h1>
          <p>Este código expira en <strong>10 minutos</strong>.</p>
          <p>Si no solicitaste este código, ignora este correo.</p>
        </div>
      `,
    });
    console.log('Correo enviado:', info.messageId);
  } catch (error) {
    console.error('Error enviando correo:', error.message);
    throw error;
  }
};

module.exports = { sendOTPEmail };
