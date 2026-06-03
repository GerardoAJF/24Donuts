import { Schema, model } from 'mongoose';

const productSchema = new Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price:       { type: Number, required: true, min: 0 },
  img_link:    { type: String, trim: true },
  tags:        [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true });

export default model('Product', productSchema);
