import mongoose from "mongoose";
 const studentSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email:{
        type:String,
        required: true,
        lowercase:true,
        trim:true
    },
    mobile:{
        type:Number,
        required: true,
    },
    className:{
        type:String,
        required: true,
        index:true
    },
    section:{
        type:String,
        required: true,
        index:true
    },
    rollNumber:{
        type:Number,
        required:true
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    institutionCode:{
        type:String,
        required:true,
        index:true
      },
      attendence:[{
       date:String,
       status:String,
      }],
      result:[{
        examType:String,
        subject:String,
        markes:Number
      }],
 },{timestamps:true});

 studentSchema.index(
  { institutionCode: 1, className: 1, section: 1, rollNumber: 1 },
  { unique: true }
);

export default mongoose.models.Student ||
  mongoose.model("Student", studentSchema);