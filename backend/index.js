import app from "./app.js"
import config from "./config.js"


import { connectDB } from './database.js';

const PORT = config.port;

const main = async () => {
  try {
    await connectDB()
    app.listen(PORT, () => console.log("Servidor corriendo en el puerto: " + PORT))
  }
  catch (error) {
    console.error('Error al conectar a la base de datos:', error)
  }
}

main()
