import { Schema, model } from 'mongoose';

const ingredientSchema = new Schema({
  name:  { type: String, required: true, trim: true },
  stock: { type: Number, required: true, default: 0, min: 0 },
}, { timestamps: true });

export default model('Ingredient', ingredientSchema);
