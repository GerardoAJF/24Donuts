const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
  ingredient_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient', required: true },
  amount:        { type: Number, required: true, min: 1 },
  subtotal:      { type: Number, required: true },
}, { _id: false });

const billSchema = new mongoose.Schema({
  date:        { type: Date, default: Date.now },
  ingredients: [billItemSchema],
  total:       { type: Number, required: true },
}, { timestamps: true });

module.exports = mongoose.model('Bill', billSchema);
