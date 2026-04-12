import Homework from "../models/homeworkmodel.js";
import Student from "../models/studentmodel.js";
import mongoose from "mongoose";
// ✅ CREATE HOMEWORK
export const createHomework = async (req, res) => {
  try {
    const {
      className,
      section,
      subject,
      description,
      teacherId,
      institutionCode
    } = req.body;

    // console.log("REQ BODY 👉", req.body);

    // ✅ validation
    if (!className || !section || !subject || !description) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    // ✅ save in DB
    const homework = await Homework.create({
      className,
      section,
      subject,
      description,
      teacherId,
      institutionCode
    });

    // console.log("✅ Homework Saved:", homework);

    res.status(201).json({
      success: true,
      message: "Homework assigned successfully",
      data: homework
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};
// ✅ GET HOMEWORK BY CLASS
export const getHomeworkByClass = async (req, res) => {
  try {
    const { className, section, institutionCode } = req.query;

    if (!className || !section || !institutionCode) {
      return res.status(400).json({
        message: "Missing fields"
      });
    }

    const homework = await Homework.find({
      className,
      section,
      institutionCode
    }).sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      data: homework
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const getHomeworkByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.query;

    if (!teacherId) {
      return res.status(400).json({
        message: "Teacher ID required"
      });
    }

    const homework = await Homework.find({ teacherId })
      .sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      data: homework
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);
    res.status(500).json({
      message: error.message
    });
  }
};
export const getMyHomework = async (req, res) => {
  try {
    const { teacherId } = req.query;

    if (!teacherId) {
      return res.status(400).json({
        message: "Teacher ID required"
      });
    }

    const homework = await Homework.find({ teacherId })
      .sort({ createdAt: -1 }).lean();

    res.json({
      success: true,
      data: homework
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
//✅ DELETE
export const deleteHomework = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const deleted = await Homework.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({
        message: "Homework not found"
      });
    }

    res.json({
      success: true,
      message: "Deleted successfully"
    });

  } catch (error) {
    // console.log("DELETE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ UPDATE (🔥 MOST IMPORTANT)
export const updateHomework = async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    if (!description) {
      return res.status(400).json({
        message: "Description required"
      });
    }

    const updated = await Homework.findByIdAndUpdate(
      id,
      { description },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({
        message: "Homework not found"
      });
    }

    res.json({
      success: true,
      message: "Updated successfully",
      data: updated
    });

  } catch (error) {
    // console.log("UPDATE ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

// ✅ GET STUDENT HOMEWORK (DATE-WISE GROUPING 🔥)
export const getStudentHomework = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID required"
      });
    }

    // 🔥 1. student find
    const student = await Student.findById(studentId).lean();

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // 🔥 2. class + section homework fetch
    const homework = await Homework.find({
      className: student.className,
      section: student.section,
      institutionCode: student.institutionCode
    }).sort({ createdAt: -1 }).lean();

    // 🔥 3. GROUP BY DATE (VERY IMPORTANT)
    const grouped = homework.reduce((acc, hw) => {
      const date = hw.createdAt.toISOString().split("T")[0];

      if (!acc[date]) acc[date] = [];
      acc[date].push(hw);

      return acc;
    }, {});

    res.json({
      success: true,
      data: grouped
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};