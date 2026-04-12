import mongoose from "mongoose";
import Student from "../models/studentmodel.js";
import Result from "../models/resultmodel.js";
import Attendance from "../models/attendancemodel.js";
import Homework from "../models/homeworkmodel.js";
import Announcement from "../models/announcementmodel.js";

export const getStudentDashboard = async (req, res) => {
  try {
    const { id: studentId } = req.params;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID required"
      });
    }

    const objectId = new mongoose.Types.ObjectId(studentId);

    // ✅ STEP 1: GET STUDENT
    const student = await Student.findById(objectId).lean();

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // ✅ STEP 2: PARALLEL FETCH
    const [
      attendanceData,
      resultsData,
      homework,
      announcements
    ] = await Promise.all([

      // 🔥 Attendance
      Attendance.find({
        "records.studentId": objectId
      }).lean(),

      // 🔥 Results
      Result.find({
        "results.studentId": objectId
      }).lean(),

      // 🔥 Homework (class based)
      Homework.find({
        className: student.className,
        section: student.section,
        institutionCode: student.institutionCode
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean(),

      // 🔥 🔥 ANNOUNCEMENT (FINAL FILTER LOGIC)
      Announcement.find({
        institutionCode: student.institutionCode,

        $or: [
          // ✅ Teacher specific
          {
            targetType: "teacher",
            teacherId: student.teacherId
          },

          // ✅ Class specific
          {
            targetType: "class",
            className: student.className,
            section: student.section
          },

          // ✅ Student specific (optional future use)
          {
            targetType: "student",
            studentId: objectId
          },

          // ✅ Global (optional)
          {
            targetType: "all"
          }
        ]
      })
        .sort({ createdAt: -1 })
        .limit(5)
        .lean()
    ]);

    // 🔥 ATTENDANCE CALCULATION
    let total = 0;
    let present = 0;

    attendanceData.forEach(doc => {
      const record = doc.records.find(
        r => r.studentId.toString() === studentId
      );

      if (record) {
        total++;
        if (record.status === "present") present++;
      }
    });

    const attendance =
      total === 0 ? 0 : ((present / total) * 100).toFixed(1);

    // 🔥 RESULTS
    let results = [];

    resultsData.forEach(test => {
      const r = test.results.find(
        r => r.studentId.toString() === studentId
      );

      if (r) {
        results.push({
          subject: test.subject,
          obtainedMarks: r.obtainedMarks,
          maxMarks: test.maxMarks
        });
      }
    });

    // ✅ FINAL RESPONSE
    return res.json({
      success: true,
      data: {
        student,
        attendance,
        results: results.slice(0, 5),
        homework,
        announcements
      }
    });

  } catch (error) {
    console.log("🔥 Dashboard Error:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};