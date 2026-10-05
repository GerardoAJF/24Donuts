import dotenv from "dotenv"

dotenv.configDotenv()

export default {
  port: process.env.PORT || 4000,
    mongoUri: process.env.DB_URI || 'mongodb://localhost:27017/24donuts',
  jwtSecret: process.env.JWT_Secret_key,
  jwtExpiresIn: '7d',
    senderEmail: process.env.USER_EMAIL,
    senderPassword: process.env.USER_PASSWORD,
  frontendUrl: process.env.FRONTEND_URL || 'http://localhost:5173',
  cloudinary: {
    cloudName: process.env.CLOUDINARY_CLOUD_NAME,
    apiKey: process.env.CLOUDINARY_API_KEY,
    apiSecret: process.env.CLOUDINARY_API_SECRET,
  },
};
