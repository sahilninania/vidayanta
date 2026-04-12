import mongoose from "mongoose";

const demoSchema = new mongoose.Schema(
  {
    name: String,
    schoolName: String,
    email: String,
    mobile: String,
    address: String,
    message: String
  },
  { timestamps: true }
);

export default mongoose.models.Demo ||
  mongoose.model("Demo", demoSchema);