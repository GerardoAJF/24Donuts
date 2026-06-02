const mongoose = require('mongoose');
const { mongoUri } = require("./config.js")

const connectDB = async () => {
    const conn = await mongoose.connect(mongoUri);
  console.log(`MongoDB conectado: ${conn.connection.host}`);
};

module.exports = { connectDB };
