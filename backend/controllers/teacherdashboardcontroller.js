import Teacher from "../models/teachermodel.js";
import Class from "../models/classmodel.js";
import Student from "../models/studentmodel.js";
import Homework from "../models/homeworkmodel.js";
import Announcement from "../models/announcementmodel.js";
import Result from "../models/resultmodel.js";

export const getTeacherDashboard = async (req, res) => {
  try {
    const { teacherId } = req.query;

    if (!teacherId) {
      return res.status(400).json({ message: "Teacher ID required" });
    }

    // 🔥 get teacher
    const teacher = await Teacher.findById(teacherId).lean();
    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    // 🔥 parallel queries
    const [
      allClasses,
      inchargeClasses,
      homework,
      announcements,
      latestResultData
    ] = await Promise.all([
      Class.find({ teacherId }).lean(),

      Class.find({ classIncharge: teacherId }).lean(),

      Homework.find({ teacherId })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean(),

      Announcement.find({
        $or: [
          { createdBy: teacherId },
          { institutionCode: teacher.institutionCode }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(3)
        .lean(),

      Result.findOne({ teacherId })
        .sort({ createdAt: -1 })
        .lean()
    ]);

    // 🔥 students (only if class incharge)
    let students = [];
    if (inchargeClasses.length > 0) {
      const classNames = inchargeClasses.map(c => c.className);
      const sections = inchargeClasses.map(c => c.section);

      const rawStudents = await Student.find({
        className: { $in: classNames },
        section: { $in: sections }
      }).lean();

      // ✅ remove duplicates (optimized)
      const map = new Map();
      rawStudents.forEach(s => map.set(s.rollNumber, s));
      students = [...map.values()];
    }

    const recentStudents = students.slice(0, 5);

    // 🔥 latest result formatting
    let latestResult = "No result";
    if (latestResultData) {
      latestResult = `${latestResultData.subject} (${latestResultData.testType})`;
    }

    // 🔥 response
   res.json({
      success: true,
      data: {
        teacherName: teacher.teacherName || "Sir",

        // ✅ SHOW ONLY INCHARGE CLASSES
        totalClasses: inchargeClasses.length,
        classes: inchargeClasses.map(
          c => `${c.className} ${c.section}`
        ),

        totalStudents: students.length,
        latestResult,

        students: recentStudents,
        homework,
        announcements
      }
    });

  } catch (error) {
    console.error("Teacher Dashboard Error:", error);
    res.status(500).json({ message: error.message });
  }
};