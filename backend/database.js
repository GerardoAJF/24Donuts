import { connect } from 'mongoose';
import { mongoUri } from "./config.js";

const connectDB = async () => {
    const conn = await connect(mongoUri);
  console.log(`MongoDB conectado: ${conn.connection.host}`);
};

export default { connectDB };
