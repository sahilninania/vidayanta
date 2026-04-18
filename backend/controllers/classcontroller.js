import Class from "../models/classmodel.js";
import Student from "../models/studentmodel.js";
export const createClass = async (req, res) => {
  try {
    const { className, section, institutionCode, classIncharge } = req.body;
    // console.log("📥 REQ BODY 👉", req.body);
    if (!className || !section || !institutionCode) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }
    // 🔥 Prevent same teacher assigned twice
    const exists = await Class.findOne({ className, section, institutionCode });
    if (exists) {
      return res.status(400).json({ message: "Class already exists" });
    }

    // Prevent same teacher assigned twice
    if (classIncharge) {
      const teacherExists = await Class.findOne({ classIncharge });
      if (teacherExists) {
        return res.status(400).json({
          message: "Teacher already assigned to another class",
        });
      }
    }
    const newClass = await Class.create({
      className,
      section,
      institutionCode,
      classIncharge
    });
    res.status(201).json({
      success: true,
      message: "Class created successfully",
      data: newClass,
    });
  } catch (error) {
    console.error("❌ ERROR 👉", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
// ✅ Get all classes
export const getAllClasses = async (req, res) => {
  try {
    const {institutionCode} =req.query;
    const classes = await Class.find({institutionCode})
      .populate({
        path:"classIncharge",
        populate:{
          path:"userId",
          select:"name email"
        }
      })
      .populate({
        path:"subjectTeachers.teacher",
        populate:{
          path:"userId",
          select:"name email"
        }
      });
    res.status(200).json({
      success: true,
      data: classes,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
export const deleteClass = async (req, res) => {
  try {
    await Class.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Class deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const updateClass = async (req, res) => {
  try {
    const { className, section, classIncharge, subjectTeachers } = req.body;

    const updated = await Class.findByIdAndUpdate(
      req.params.id,
      {
        className,
        section,
        classIncharge,
        subjectTeachers: subjectTeachers.map(st => ({
          subject: st.subject,
          teacher: st.teacher
        }))
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const assignTeacher = async (req, res) => {
  try {
    const { classId, teacherId, subject } = req.body;

    const updated = await Class.findByIdAndUpdate(
      classId,
      {
        $push: {
          subjectTeachers: {
            teacher: teacherId,
            subject
          }
        }
      },
      { new: true }
    );

    res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassesByInstitution = async (req, res) => {
  try {
    const { institutionCode } = req.body;

    const classes = await Class.find({ institutionCode })
      .populate("classIncharge")
      .populate("subjectTeachers.teacher");

    res.status(200).json({
      success: true,
      classes
    });

  } catch (error) {
    // console.log("ERROR 👉", error);
    res.status(500).json({
      message: error.message
    });
  }
};
export const getMyClass = async (req, res) => {
  try {
    const { teacherId } = req.body
    // console.log("👉 teacherId:", teacherId);
    const classData = await Class.findOne({
      classIncharge: teacherId
    });

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
export const getTeacherClasses = async (req, res) => {
  try {
    const { teacherId } = req.body;

    // console.log("👉 teacherId:", teacherId);

    if (!teacherId) {
      return res.status(400).json({
        message: "Teacher ID required"
      });
    }

    // ✅ find classes where teacher is assigned
    const classes = await Class.find({
      "subjectTeachers.teacher": teacherId
    }).lean();

    // ✅ filter subjects per class
    const result = classes.map((cls) => {
      const subjects = cls.subjectTeachers
        .filter(st => st.teacher.toString() === teacherId)
        .map(st => st.subject);

      return {
        className: cls.className,
        section: cls.section,
        subjects
      };
    });

    res.json({
      success: true,
      data: result
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);

    res.status(500).json({
      message: error.message
    });
  }
};
//institution student 
export const getInstitutionClasses = async (req, res) => {
  try {
    const { institutionCode } = req.query;

    if (!institutionCode) {
      return res.status(400).json({
        message: "Institution code required"
      });
    }

    const classes = await Class.find({ institutionCode })
      .select("className section");

    res.json({
      success: true,
      data: classes
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const getStudentsByClass = async (req, res) => {
  try {
    const { className, section, institutionCode } = req.query;

    if (!className || !section || !institutionCode) {
      return res.status(400).json({
        message: "Missing fields"
      });
    }

    const students = await Student.find({
      className,
      section,
      institutionCode
    }).sort({ rollNumber: 1 }).lean();

    res.json({
      success: true,
      data: students
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};
export const getSingleClass = async (req, res) => {
  try {
    const cls = await Class.findById(req.params.id)
      .populate("classIncharge", "teacherName")
      .populate("subjectTeachers.teacher", "teacherName"); // 🔥 FIX

    res.json({
      success: true,
      data: cls
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getClassById = async (req, res) => {
  try {
    const data = await Class.findById(req.params.id)
      .populate("classIncharge")
      .populate("subjectTeachers.teacher");

    res.json({
      success: true,
      data
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};