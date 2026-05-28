const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({
  product_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
  amount:     { type: Number, required: true, min: 1 },
  subtotal:   { type: Number, required: true },
}, { _id: false });

const shoppingCartSchema = new mongoose.Schema({
  customer_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Customer', required: true },
  products:    [cartItemSchema],
  total:       { type: Number, default: 0 },
  actual:      { type: Boolean, default: true },
}, { timestamps: true });

module.exports = mongoose.model('ShoppingCart', shoppingCartSchema);
