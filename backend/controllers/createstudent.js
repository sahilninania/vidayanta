import generateUsername from "../utils/generateusername.js";
import generatePassword from "../utils/generatepassword.js";
import bcrypt from "bcryptjs";
import Student from "../models/studentmodel.js";
import User from "../models/usermodel.js";
import Institution from "../models/institutionmodel.js";
import Class from "../models/classmodel.js"; 
import emailQueue from "../queue/emailqueue.js";
import mongoose from "mongoose";
export const createStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    let {
      name,
      email,
      mobile,
      className,
      section,
      rollNumber,
      institutionCode,
      teacherId   
    } = req.body;
    if (
      !institutionCode ||
      !name ||
      !email ||
      ! mobile||
      !className ||
      !section ||
      !rollNumber
    ) {
      return res.status(400).json({
        message: "All fields are required"
      });
    }
    if (String(mobile).length !== 10) {
      return res.status(400).json({
        message: "Invalid mobile number"
      });
    }
    const [classData, existingStudent, institution] = await Promise.all([
      teacherId
        ? Class.findOne({ classIncharge: teacherId }).session(session)
        : null,

      Student.findOne({
        className,
        section,
        rollNumber,
        institutionCode
      }).session(session),

      Institution.findOne({ institutionCode }).session(session)
    ]);
    if (classData) {
      className = classData.className;
      section = classData.section;
    }

    if (existingStudent) {
      return res.status(400).json({
        message: "Roll number already exists"
      });
    }

    if (!institution) {
      return res.status(404).json({
        message: "Institution not found"
      });
    }
    // ✅ 3. Get branch from DB
    let branch = String(institution.branch).padStart(2, "0");
    // ✅ 4. Generate username (FIXED)
    const username = await generateUsername(
      "student",
      institutionCode,
      branch,
      className,
      section
    );
    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    // ✅ 5. FIX → branch add karo
      const user = await User.create([{
        username,
        password: hashedPassword,
        role: "student",
        institutionCode,
        branch,
        email
      }], { session });
    const student = await Student.create([{
      name,
      email,
      mobile,
      className,
      section,
      rollNumber,
      userId: user._id,
      institutionCode,
      branch,
      username,
      password: hashedPassword
    }],{session});
    await session.commitTransaction();
    session.endSession();
    await emailQueue.add({
      type: "CREDENTIALS",
      email,
      data: {
        name,
        username,
        password: plainPassword,
      },
    });
    return res.status(201).json({
      message: "Student created successfully",
      username,
      // password: plainPassword,
      
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    // console.log("🔥 ERROR:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};


export const getStudentByClass = async (req, res) => {
  try {
    const { className, section } = req.params;
    const { institutionCode } = req.query;
    if(!className || !section ||!institutionCode){
      return res.status(400).json({
        message:"Missing fields"
      })    }
    const students = await Student.find({
      className,
      section, 
      institutionCode
    }).select("name rollNumber email students mobile").sort({ rollNumber: 1 }).lean();

    res.json({
      success: true,
      data: students
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};

export const getMyClass = async (req, res) => {
  try {
     const { teacherId } = req.body; 

    if (!teacherId) {
      return res.status(400).json({
        message: "Teacher ID required"
      });
    }

    const classData = await Class.findOne({
      classIncharge: teacherId
    }).lean();

    if (!classData) {
      return res.status(404).json({
        message: "No class assigned"
      });
    }

    res.json({
      success: true,
      className: classData.className,
      section: classData.section
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getStudentsByClassSection = async (req, res) => {
  try {
    const { className, section, institutionCode } = req.body;

    if (!className || !section || !institutionCode) {
      return res.status(400).json({
        message: "Missing fields"
      });
    }

    const students = await Student.find({
      className,
      section,
      institutionCode
    }).select("name rollNumber email mobile").sort({ rollNumber: 1 }).lean();

    const sortedStudents = students.sort(
      (a, b) => Number(a.rollNumber) - Number(b.rollNumber)
    );

    res.json({ students: sortedStudents });

  } catch (error) {
    // console.log("🔥 ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};


// ✅ UPDATE
export const updateStudent = async (req, res) => {
  try {
    const updated = await Student.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true ,runValidators:true}
    ).select("-password");

    if (!updated) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE
export const deleteStudent = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { id } = req.params;

    const student = await Student.findById(id).session(session);

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    await User.findByIdAndDelete(student.userId).session(session);
    await Student.findByIdAndDelete(id).session(session);

    await session.commitTransaction();
    session.endSession();

    res.json({ success: true, message: "Deleted successfully" });

  } catch (err) {
    await session.abortTransaction();
    session.endSession();

    res.status(500).json({ message: err.message });
  }
};