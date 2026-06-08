import { Schema, model } from 'mongoose';

const shoppingCartSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  products: [{
    product_id: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    amount: { type: Number, required: true, min: 1 },
    subtotal: { type: Number, required: true },
  }],
  total: { type: Number, default: 0 },
  actual: { type: Boolean, default: true },
}, { timestamps: true });

export default model('ShoppingCart', shoppingCartSchema);
