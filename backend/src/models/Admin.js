import { Schema, model } from 'mongoose';

const adminSchema = new Schema({
  first_name: { type: String, default: '', trim: true },
  last_name:  { type: String, default: '', trim: true },
  email:      { type: String, required: true, unique: true, lowercase: true, trim: true },
  password:   { type: String, required: true },
  phone:      { type: String, default: '', trim: true },
}, { timestamps: true });

export default model('Admin', adminSchema);
