import mongoose from "mongoose";

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true
    },
    schoolName: {
      type: String,
      trim: true
    },
    email: {
      type: String,
      trim: true
    },
    mobile: {
      type: String // ✅ number nahi, string (important)
    },
    address: String,
    message: String
  },
  { timestamps: true }
);

export default mongoose.models.Contact ||
  mongoose.model("Contact", contactSchema);