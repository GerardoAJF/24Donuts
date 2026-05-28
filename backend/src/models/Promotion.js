const mongoose = require('mongoose');

const promotionSchema = new mongoose.Schema({
  name:                { type: String, required: true, trim: true },
  init_date:           { type: Date, required: true },
  end_date:            { type: Date, required: true },
  tags:                [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
  products:            [{ type: mongoose.Schema.Types.ObjectId, ref: 'Product' }],
  discount_percentage: { type: Number, required: true, min: 0, max: 100 },
}, { timestamps: true });

module.exports = mongoose.model('Promotion', promotionSchema);
