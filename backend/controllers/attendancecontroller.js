import Student from "../models/studentmodel.js";
import Class from "../models/classmodel.js";
import Attendance from "../models/attendancemodel.js";
import Teacher from "../models/teachermodel.js";
// ✅ GET STUDENTS (ONLY CLASS INCHARGE)
export const getStudentsForAttendance = async (req, res) => {
  try {
    const { teacherId, institutionCode } = req.body;

    const cls = await Class.findOne({
      classIncharge: teacherId
    }).select("className section").lean();

    if (!cls) {
      return res.status(404).json({
        message: "No class assigned to this teacher"
      });
    }

    const students = await Student.find({
      className: cls.className,
      section: cls.section,
      institutionCode
    }).sort({ rollNumber: 1 }).lean(); 
  //  const sortedStudents = students.sort(
  //   (a, b) => Number(a.rollNumber) - Number(b.rollNumber)
  //  );
    res.status(200).json({
      className: cls.className,
      section: cls.section,
      students: students
    });

  } catch (error) {
      // console.log("🔥 REAL ERROR:", error);   // 👈 ADD THIS
      res.status(500).json({
        message: error.message   // 👈 CHANGE THIS
      });
    }
};

// ✅ SAVE ATTENDANCE (FIXED 🔥)
export const uploadAttendance = async (req, res) => {
  try {
    const {
      teacherId,
      institutionCode,
      className,
      section,
      attendance   
    } = req.body;

    const today = new Date().toISOString().split("T")[0];

    // ❌ prevent duplicate
    const exist = await Attendance.findOne({
      className,
      section,
      institutionCode,
      date: today
    }).lean();

    if (exist) {
      return res.status(400).json({
        message: "Attendance already uploaded today"
      });
    }

    // ✅ convert object → array
    const records = Object.entries(attendance).map(([id,status]) => ({
      studentId: id,
      status
    }));

    // ✅ SAVE IN ATTENDANCE MODEL
    await Attendance.create({
      teacherId,
      institutionCode,
      className,
      section,
      date: today,
      records
    });

    res.status(200).json({
      message: "Attendance saved successfully"
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);   // 🔥 DEBUG
    res.status(500).json({
      message: error.message
    });
  }
};

// ✅ GET ATTENDANCE
export const getMyAttendance = async (req, res) => {
  try {
    const { teacherId } = req.query;

    const data = await Attendance.find({ teacherId })
      .populate("records.studentId", "name rollNumber")
      .sort({ date: -1 }).lean();

    res.json({ data });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};



export const getStudentAttendance = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID required"
      });
    }

    // ✅ STEP 1: student find
    const student = await Student.findById(studentId);

    if (!student) {
      return res.status(404).json({
        message: "Student not found"
      });
    }

    // ✅ STEP 2: class find
    const classData = await Class.findOne({
      className: student.className,
      section: student.section,
      institutionCode: student.institutionCode
    }).lean();

    let teacherName = "N/A";

    // ✅ STEP 3: teacher find
    if (classData?.classIncharge) {
      const teacher = await Teacher.findById(classData.classIncharge);
      teacherName = teacher?.teacherName || "N/A";
    }

    // ✅ STEP 4: attendance find (FIXED)
    const data = await Attendance.find({
      "records.studentId": studentId
    });

    let allRecords = [];

    data.forEach(doc => {
      const filtered = doc.records.filter(
        r => r.studentId.toString() === studentId
      );

      filtered.forEach(r => {
        allRecords.push({
          date: doc.date,
          status: r.status
        });
      });
    });

    // ✅ SUMMARY
    let total = allRecords.length;
    let present = allRecords.filter(r => r.status === "present").length;
    let absent = allRecords.filter(r => r.status === "absent").length;

    let percentage =
      total === 0 ? 0 : ((present / total) * 100).toFixed(2);

    // ✅ FINAL RESPONSE (🔥 IMPORTANT)
    res.json({
      className: student.className,
      teacherName,
      summary: { total, present, absent, percentage },
      records: allRecords
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: "Server error"
    });
  }
};

export const getStudentsAttendanceInstitution = async (req, res) => {
  try {
    const { className, section, institutionCode } = req.query;

    const students = await Student.find({
      className,
      section,
      institutionCode,
    }).lean();

    const attendanceDocs = await Attendance.find({
      className,
      section,
      institutionCode,
    }).lean();

    const result = students.map((stu) => {
      let total = 0;
      let present = 0;

      attendanceDocs.forEach((doc) => {
        doc.records.forEach((r) => {
          if (r.studentId.toString() === stu._id.toString()) {
            total++;
            if (r.status === "present") present++;
          }
        });
      });

      const percentage =
        total > 0 ? ((present / total) * 100).toFixed(1) : 0;

      return {
        _id: stu._id,
        name: stu.name,
        rollNumber: stu.rollNumber,
        percentage,
      };
    });

    return res.json({
      success: true,
      data: result,
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
export const getStudentAttendanceDetails = async (req, res) => {
  try {
    const { studentId } = req.query;

    const attendanceDocs = await Attendance.find({
        "records.studentId": studentId
      }).sort({ date: -1 }).lean();

      let allRecords = [];

      attendanceDocs.forEach(doc => {
        doc.records.forEach(r => {
          if (r.studentId.toString() === studentId.toString()) {
            allRecords.push({
              date: doc.date,
              status: r.status
            });
          }
        });
      });

      const total = allRecords.length;
      const present = allRecords.filter(r => r.status.toLowerCase() === "present").length;
      const absent = total - present;

      const percentage = total > 0
        ? ((present / total) * 100).toFixed(1)
        : 0;

    res.json({
      success: true,
      records: allRecords,   // 🔥 IMPORTANT
      summary: {
        total,
        present,
        absent,
        percentage
      }
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// ✅ UPDATE
export const updateAttendance = async (req, res) => {
  const { id } = req.params;

  const updated = await Attendance.findByIdAndUpdate(
    id,
    { records: req.body.records },
    { new: true }
  ).lean();

  res.json({ success: true, data: updated });
};

// ✅ DELETE
export const deleteAttendance = async (req, res) => {
  const { id } = req.params;

  await Attendance.findByIdAndDelete(id).lean();

  res.json({ success: true });
};