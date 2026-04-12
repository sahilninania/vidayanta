import mongoose from "mongoose";
const resultSchema = new mongoose.Schema({
  teacherId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Teacher",
    required: true,
    index:true
  },
  studentId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Student"
    },
  institutionCode: {
    type: String,
    required: true,
    index:true
  },
  className:{
    type: String,
    required: true,
    index:true
  },
  section: {
    type: String,
    required: true
  },
  subject: {
    type: String,
    required: true
  },
  testType: {
    type: String,
    enum: ["class test", "unit test", "semester", "final"],
    required: true
  },
  date: {
    type: String,
    required: true
  },
  maxMarks: {
    type: Number,
    required: true  
    },
//   results: [
//   {
//     studentId: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Student"
//     },
//     obtainedMarks: Number,
//     status: String,

//     percentage: Number,   // ✅ ADD
//     rank: mongoose.Schema.Types.Mixed  // ✅ ADD
//   }
// ]
// }, { timestamps: true });

// export default mongoose.model("Result", resultSchema);
results: [
      {
        studentId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Student",
          required: true
        },

        obtainedMarks: {
          type: Number,
          required: true
        },

        status: {
          type: String,
          enum: ["present", "absent"], 
        },

        percentage: {
          type: Number
        },

        rank: {
          type: Number ,
          default: null
        }
      }
    ]
  },
  { timestamps: true }
);

export default mongoose.models.Result ||
  mongoose.model("Result", resultSchema);