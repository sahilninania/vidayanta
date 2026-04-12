import mongoose from "mongoose";

const teacherSchema = new mongoose.Schema(
  {
    teacherName: {
      type: String,
      required: true,
      trim:true
    },
    email: {
      type: String,
      required: true,
      unique:true,
      lowercase:true,
      trim:true
    },
    mobile: {
      type: Number,
      required: true,
    },
    subjects: {
      type: [String],
      required: true,
    },
    gender:{
      type:String,
      required:true
    },
    branch: {
    type: String,
    required: true
    },
    classTeacherOf: {
      className: {
        type: String,
      },
      section: {
        type: String,
      }
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    institutionCode: {
      type: String,
      required: true,
      index:true
    },
    
  },
  { timestamps: true }
);

export default mongoose.models.Teacher || mongoose.model("Teacher", teacherSchema);