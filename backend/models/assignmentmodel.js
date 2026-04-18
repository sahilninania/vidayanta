import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema({
    classId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Class",
        requried:true,
        index:true,
    },
    teacherId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Teacher",
        reuired:true,
        index:true,
    },
    subject:{
        type:String,
        requried:true,
        trim:true
    },
    insititutionCode:{
        type:String,
        requried:true,
        index:true
    }
},{timestamps:true});
assignmentSchema.index({
  classId: 1,
  teacherId: 1,
  institutionCode: 1
});

export default mongoose.models.Assignment || mongoose.model("Assignment", assignmentSchema);

