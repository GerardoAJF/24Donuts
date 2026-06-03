import { Schema, model } from 'mongoose';

const billSchema = new Schema({
  date: { type: Date, default: Date.now },
  ingredients: [{
    ingredient_id: { type: Schema.Types.ObjectId, ref: 'Ingredient', required: true },
    amount: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
  }],
  total: { type: Number, required: true },
}, { timestamps: true });

export default model('Bill', billSchema);
