const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  first_name: { type: String, required: true, trim: true },
  last_name:  { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String, required: true },
  phone:      { type: String, required: true, trim: true },
  salary:     { type: Number, required: true },
  days:       [{ type: String, enum: ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado', 'Domingo'] }],
  turn:       { type: String, enum: ['Día', 'Noche'], required: true },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
