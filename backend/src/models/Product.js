const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name:        { type: String, required: true, trim: true },
  description: { type: String, trim: true },
  price:       { type: Number, required: true, min: 0 },
  img_link:    { type: String, trim: true },
  tags:        [{ type: mongoose.Schema.Types.ObjectId, ref: 'Tag' }],
}, { timestamps: true });

module.exports = mongoose.model('Product', productSchema);
