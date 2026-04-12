import mongoose from "mongoose";

const attendanceSchema = new mongoose.Schema({
  className: {
    type: String,
    required: true,
    index:true
  },
  section: {
    type: String,
    required: true,
    index:true
  },
  institutionCode: {
    type: String,
    required: true,
    index:true
  },
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
  },
  date: {
    type: String ,
    index:true  ,
    required: true,
  },
  records: [
    {
      studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true,
      },
      status: {
        type: String,
        enum: ["present", "absent", "leave"],
        default: "present"
      }
    }
  ]
}, { timestamps: true });

attendanceSchema.index(
  { className: 1, section: 1, date: 1 },
  { unique: true }
);

export default mongoose.models.Attendance ||
  mongoose.model("Attendance", attendanceSchema);