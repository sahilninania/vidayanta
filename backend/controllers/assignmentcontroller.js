import Assignment from "../models/assignmentmodel.js";
import Teacher from "../models/teachermodel.js";
import mongoose from "mongoose";

// ✅ ASSIGN TEACHER TO CLASS
export const assignTeacher = async (req, res) => {
  try {
    const { classId, teacherId, institutionCode } = req.body;

    // ✅ Validation
    if (!classId || !teacherId || !institutionCode) {
      return res.status(400).json({
        success: false,
        message: "All fields required"
      });
    }

    // ✅ ObjectId validation (important)
    if (
      !mongoose.Types.ObjectId.isValid(classId) ||
      !mongoose.Types.ObjectId.isValid(teacherId)
    ) {
      return res.status(400).json({
        message: "Invalid IDs"
      });
    }

    // 🔥 Get teacher (only needed field)
    const teacher = await Teacher.findById(teacherId)
      .select("subject")
      .lean();

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found"
      });
    }

    const subject = teacher.subject;

    // 🔥 Check duplicate assignment
    const existing = await Assignment.findOne({
      classId,
      subject,
      institutionCode
    }).lean();

    if (existing) {
      return res.status(400).json({
        message: "Subject already assigned to this class"
      });
    }

    // ✅ Create assignment
    const assignment = await Assignment.create({
      classId,
      teacherId,
      subject,
      institutionCode
    });

    return res.status(201).json({
      success: true,
      assignment
    });

  } catch (error) {
    console.error("ASSIGN ERROR 👉", error.message);
    return res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
};


// ✅ GET ALL ASSIGNMENTS (Optimized)
export const getAssignments = async (req, res) => {
  try {
    const { institutionCode } = req.query; // ✅ FIXED (GET → query)

    if (!institutionCode) {
      return res.status(400).json({
        message: "Institution code required"
      });
    }

    const assignments = await Assignment.find({ institutionCode })
      .populate("teacherId", "name subject")
      .populate("classId", "className section")
      .lean();

    return res.status(200).json({
      success: true,
      assignments
    });

  } catch (error) {
    console.error("GET ASSIGN ERROR 👉", error.message);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};