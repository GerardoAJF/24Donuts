const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
  email:      { type: String, required: true, lowercase: true },
  code:       { type: String, required: true },
  expires_at: { type: Date, required: true },
}, { timestamps: true });

otpSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('OTP', otpSchema);
