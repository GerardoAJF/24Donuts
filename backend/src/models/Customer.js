import { Schema, model } from 'mongoose';

const customerSchema = new Schema({
  first_name: { type: String, required: true, trim: true },
  last_name:  { type: String, required: true, trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String, required: true },
  phone:      { type: String, required: true, trim: true },
}, { timestamps: true });

export default model('Customer', customerSchema);
