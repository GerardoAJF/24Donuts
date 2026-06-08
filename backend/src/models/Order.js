import { Schema, model } from 'mongoose';

const orderSchema = new Schema({
  datetime:         { type: Date, default: Date.now },
  shopping_cart_id: { type: Schema.Types.ObjectId, ref: 'ShoppingCart', required: true },
  pay_method:       { type: String, enum: ['Efectivo', 'Tarjeta'], required: true },
  status:           { type: String, enum: ['Pendiente', 'Aceptado', 'Rechazado', 'Completado'], default: 'Pendiente' },
  delivery:         { type: Boolean, default: false },
  address_delivery: { type: String, default: '' },
}, { timestamps: true });

export default model('Order', orderSchema);
