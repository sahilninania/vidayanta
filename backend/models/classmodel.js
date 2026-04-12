import mongoose from "mongoose";
const classSchema =new mongoose.Schema({
    className:{
        type:String,
        required:true,
        trim:true
    },
    section:{
        type:String,
        required:true,
        trim:true
    },
    classIncharge:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher"
    },
    institutionCode:{
        type:String,
        required:true,
        index:true
    },
    subjectTeachers:[{
        subject:{
             type:String,
             required:true,
        },
        teacher:{
            type:mongoose.Schema.Types.ObjectId,
            ref:'Teacher',
            required:true
        }
    }]
},{timestamps:true})
classSchema.index(
  { className: 1, section: 1, institutionCode: 1 },
  { unique: true }
);

export default mongoose.models.Class ||
  mongoose.model("Class", classSchema);