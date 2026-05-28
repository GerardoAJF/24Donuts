const OTP = require('../models/OTP');

const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

const createOTP = async (email) => {
  await OTP.deleteMany({ email });
  const code = generateCode();
  const expires_at = new Date(Date.now() + 10 * 60 * 1000);
  await OTP.create({ email, code, expires_at });
  return code;
};

const validateOTP = async (email, code) => {
  const otp = await OTP.findOne({ email, code });
  if (!otp) return false;
  if (otp.expires_at < new Date()) {
    await OTP.deleteOne({ _id: otp._id });
    return false;
  }
  await OTP.deleteOne({ _id: otp._id });
  return true;
};

module.exports = { createOTP, validateOTP };
