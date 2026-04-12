import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
{
  username: {
    type: String,
    required: true,
    
  },

  password: {
    type: String,
    required: true
  },
  branch: {
    type: String,
    required: true   
  },
  role: {
    type: String,
    enum: ["superadmin", "instituteadmin", "teacher", "student"],
    required: true
  },

  institutionCode: {
    type: String,
    required: true,
    default: "0000" // super admin will have 0000
  },

  mustChangePassword: {
    type: Boolean,
    default: true
  },

  isActive: {
    type: Boolean,
    default: true
  },

  lastLogin: {
    type: Date,
    default: Date.now
  },
  email: {
    type: String,
    required: true,
  },
  institutionId: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "Institution"
}
},

{ timestamps: true }
);
userSchema.index({ username: 1 }, { unique: true });
userSchema.index({ email: 1 });
userSchema.index({ institutionCode: 1 });
const User = mongoose.models.User || mongoose.model("User", userSchema);
export default User;