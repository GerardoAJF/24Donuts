import { Schema, model } from 'mongoose';

const promotionSchema = new Schema({
  name:                { type: String, required: true, trim: true },
  init_date:           { type: Date, required: true },
  end_date:            { type: Date, required: true },
  tags:                [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
  products:            [{ type: Schema.Types.ObjectId, ref: 'Product' }],
  discount_percentage: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

export default model('Promotion', promotionSchema);
