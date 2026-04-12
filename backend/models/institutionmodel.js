import mongoose from "mongoose";
const institutionSchema = new mongoose.Schema({
  institutionName:{
    type:String,
    required:true,
    trim:true
  },
  institutionCode:{
    type:String,
    required:true,
    unique:true,
    index:true
  },
  branch:{
    type:Number,
    required:true
  },
  email:{
   type:String,
   required:true,
   lowercase:true,
   trim:true
  },
  mobile:{
    type:Number,
    required:true
  },
    address:{
    type:String,
    required:true
  },
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
    index:true
  },
  status: {
      type: String,
      enum: ["active", "disabled"],
      default: "active"
    }
},
{ timestamps: true }
);
export default mongoose.models.Institution ||
  mongoose.model("Institution", institutionSchema);