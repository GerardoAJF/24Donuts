import { connect } from 'mongoose';
import config from "./config.js";

export const connectDB = async () => {
    const conn = await connect(config.mongoUri);
  console.log(`MongoDB conectado: ${conn.connection.host}`);
};
