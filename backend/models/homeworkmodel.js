import mongoose from "mongoose";
const homeworkSchema = new mongoose.Schema(
  {
    className: {
      type: String,
      required: true,
      trim:true,
      index:true
    },
    section: {
      type: String,
      required: true,
      trim:true,
      index:true
    },
    subject: {
      type: String,
      required: true,
      index:true
    },
    description: {
      type: String,
      required: true
    },
    teacherId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Teacher",
      required: true
    },
    institutionCode: {
      type: String,
      required: true,
      index:true
    },
    date:{
      type:String
    }
  },
  { timestamps: true }
);
homeworkSchema.index({ className: 1, section: 1, institutionCode: 1 });

export default mongoose.models.Homework ||
  mongoose.model("Homework", homeworkSchema);