import { Schema, model } from 'mongoose';

const otpSchema = new Schema({
  email:      { type: String, required: true, lowercase: true },
  code:       { type: String, required: true },
  expires_at: { type: Date, required: true },
}, { timestamps: true });

otpSchema.index({ expires_at: 1 }, { expireAfterSeconds: 0 });

export default model('OTP', otpSchema);
