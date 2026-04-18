import Assignment from "../models/assignmentmodel.js";
import Teacher from "../models/teachermodel.js";
import mongoose from "mongoose";
import Class from "../models/classmodel.js";

// ✅ ASSIGN TEACHER TO CLASS
export const assignTeacher = async (req, res) => {
  try {
    const { classId, teacherId, institutionCode, subject } = req.body;

    // 🔹 VALIDATION
    if (!classId || !teacherId || !institutionCode || !subject) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(classId) ||
      !mongoose.Types.ObjectId.isValid(teacherId)
    ) {
      return res.status(400).json({
        message: "Invalid IDs"
      });
    }

    // 🔹 GET TEACHER
    const teacher = await Teacher.findById(teacherId)
      .select("subjects")
      .lean();

    if (!teacher) {
      return res.status(404).json({
        message: "Teacher not found"
      });
    }

    // 🔹 VALIDATE SUBJECT
    if (!teacher.subjects.includes(subject)) {
      return res.status(400).json({
        message: "Teacher does not teach this subject"
      });
    }

    // 🔹 CHECK DUPLICATE IN ASSIGNMENT
    const existingAssignment = await Assignment.findOne({
      classId,
      subject,
      institutionCode
    });

    if (existingAssignment) {
      return res.status(400).json({
        message: "Subject already assigned to this class"
      });
    }

    // 🔹 CHECK DUPLICATE IN CLASS MODEL (IMPORTANT)
    const classData = await Class.findById(classId);

    const already = classData.subjectTeachers.find(
      (s) => s.subject === subject
    );

    if (already) {
      return res.status(400).json({
        message: "Subject already exists in class"
      });
    }

    // 🔹 CREATE ASSIGNMENT
    const assignment = await Assignment.create({
      classId,
      teacherId,
      subject,
      institutionCode
    });

    // 🔥 UPDATE CLASS MODEL (MAIN FIX)
    await Class.findByIdAndUpdate(classId, {
      $push: {
        subjectTeachers: {
          subject,
          teacher: teacherId
        }
      }
    });

    return res.status(201).json({
      success: true,
      message: "Teacher assigned successfully",
      assignment
    });

  } catch (error) {
    console.error("ASSIGN ERROR 👉", error.message);
    return res.status(500).json({
      message: "Server Error"
    });
  }
};


// ✅ GET ALL ASSIGNMENTS
export const getAssignments = async (req, res) => {
  try {
    const { institutionCode } = req.query;

    if (!institutionCode) {
      return res.status(400).json({
        message: "Institution code required"
      });
    }

    const assignments = await Assignment.find({ institutionCode })
      .populate("teacherId", "teacherName subjects")
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