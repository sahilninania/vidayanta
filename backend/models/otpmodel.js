import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true
    },

    otp: {
      type: String, // 🔥 store HASHED OTP (important)
      required: true
    },

    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 } // 🔥 auto delete after expiry
    }
  },
  { timestamps: true }
);

export default mongoose.models.OTP ||
  mongoose.model("OTP", otpSchema);