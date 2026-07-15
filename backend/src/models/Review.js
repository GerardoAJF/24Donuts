import { Schema, model } from 'mongoose';

const reviewSchema = new Schema({
  customer_id: { type: Schema.Types.ObjectId, ref: 'Customer', required: true },
  product_id:  { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  rating:      { type: Number, required: true, min: 1, max: 5 },
  comment:     { type: String, trim: true },
  datetime:    { type: Date, default: Date.now },
});

// Un cliente solo puede dejar una reseña por producto.
reviewSchema.index({ customer_id: 1, product_id: 1 }, { unique: true });

export default model('Review', reviewSchema);
