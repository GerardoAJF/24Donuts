const dotenv = require("dotenv")

dotenv.configDotenv()

module.exports = {
  port: process.env.PORT || 3000,
  mongoUri: process.env.MONGODB_URI || 'mongodb://localhost:27017/24donuts',
  jwtSecret: process.env.JWT_Secret_key,
  jwtExpiresIn: '7d',
  senderEmail: process.env.SENDER_EMAIL,
  senderPassword: process.env.SENDER_PASSWORD,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
};
