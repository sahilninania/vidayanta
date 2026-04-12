import mongoose from "mongoose";

const announcementSchema = new mongoose.Schema({
  title: {
    type :String,
    required:true,
    trim:true 
  },
  message:{
    type :String,
    required:true,
    trim:true 
  },
  targetType: {
    type: String,
    enum: ["all", "teachers", "students", "class", "teacher", "student"],
    required :true,
    index:true
  },

  className: {
    type:String,
    default:null
  },
  section: {
    type:String,
    default:null

  },

  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    default:null
  },

  studentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Student",
    default:null
  },

  institutionCode:{
    type :String,
    required:true,
    index:true
  },

  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required:true
  }

}, { timestamps: true });
announcementSchema.index({
  institutionCode: 1,
  targetType: 1,
  className: 1,
  section: 1,
  teacherId: 1 ,
  createdBy: 1 
});

export default mongoose.models.Announcement || mongoose.model("Announcement", announcementSchema);