import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
  name: {
    type:String,
    required:true
  },
  rating:{
    type: Number,
    required:true,
    min:1,
    max:5
  },  
  message: {
    type:String,
    required :true,
    maxlength:500
  }   
}, { timestamps: true });

export default mongoose.models.Review ||
  mongoose.model("Review", reviewSchema)