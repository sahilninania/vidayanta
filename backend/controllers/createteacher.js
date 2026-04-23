import generateUsername from "../utils/generateusername.js";
import generatePassword from "../utils/generatepassword.js";
import bcrypt from "bcryptjs";
import Teacher from "../models/teachermodel.js";
import User from "../models/usermodel.js";
import Institution from "../models/institutionmodel.js";
import emailQueue from "../queue/emailqueue.js";
export const createTeacher = async (req, res) => {
  try {
    // console.log("BODY:", req.body);
    const {teacherName,email,mobile,subjects,gender,institutionCode: bodyCode} = req.body;
    // ✅ Validation
    if (!teacherName ||!email ||String(mobile).length !==10||!subjects?.length ||!gender ||!subjects[0]?.trim()) {
      return res.status(400).json({ message: "All fields are required" });
    }
    if (String(mobile).length !== 10) {
      return res.status(400).json({
        message: "Mobile number must be 10 digits",
      });
    }

    // ✅ GET INSTITUTION CODE
    const institutionCode =
      bodyCode || req.user?.institutionCode;

    if (!institutionCode) {
      return res.status(400).json({
        message: "Institution code required",
      });
    }
    // // ✅ Institution Code
    // const institutionCode = bodyCode || req.user?.institutionCode;
    // ✅ Fetch Institution
    const institution = await Institution.findOne({ institutionCode });
    if (!institution) {
      return res.status(404).json({
        message: "Institution not found"
      });
    }
    // 🔥 FINAL BRANCH (ONLY FROM DB)
     const branch = String(institution.branch).padStart(2, "0");
    if (!branch) {
      return res.status(400).json({
        message: "Branch not assigned to institution"
      });
    }
    // ✅ Generate Username
    const username = await generateUsername("teacher", institutionCode, branch);
    const plainPassword = await generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    // ✅ Create User
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "teacher",
      institutionCode,
      branch,
      email
    });
    // ✅ Create Teacher
    const teacher = await Teacher.create({
      teacherName,
      email,
      mobile,
      subjects,
      gender,
      userId: user._id,
      institutionCode,
      branch
    });
      await emailQueue.add({
        type: "CREDENTIALS",
        email,
        data: {
          name: teacherName,
          username,
          password: plainPassword,
        },
      });
    return res.status(201).json({
      message: "Teacher created successfully",
      teacher,
      // username,
      // password: plainPassword
    });
  } catch (error) {
    // console.log("🔥 ERROR:", error);
    return res.status(500).json({
      message: `Create teacher error: ${error.message}`
    });
  }
};
export const getAllTeachers = async (req, res) => {
  try {
    const { institutionCode } = req.query;

    console.log("🔥 API HIT");
    console.log("institutionCode 👉", institutionCode);

    if (!institutionCode) {
      return res.status(400).json({
        message: "institutionCode required"
      });
    }

    // ✅ SAFE QUERY (no filter first)
    const teachers = await Teacher.find().select("_id teacherName institutionCode");

    console.log("DB DATA 👉", teachers);

    // ✅ FILTER MANUALLY (to avoid crash)
    const filtered = teachers.filter(
      t => t.institutionCode === institutionCode
    );

    res.json({
      success: true,
      data: filtered
    });

  } catch (error) {
    console.log("🔥 FULL ERROR:", error); // 👈 THIS WILL SHOW REAL ISSUE
    res.status(500).json({
      message: error.message
    });
  }
};
export const getTeacherByInstitution = async (req, res) => {
  try {
    const institutionCode =
      req.query?.institutionCode || req.body?.institutionCode;

    if (!institutionCode) {
      return res.status(400).json({
        message: "Institution code required"
      });
    }

    const teachers = await Teacher.find({ institutionCode })
      .select("teacherName email mobile subjects gender")
      .sort({ createdAt: -1 })   // ✅ FIX
      .lean();

    res.status(200).json({
      success: true,
      count: teachers.length,
      teachers
    });

  } catch (error) {
    // console.log("🔥 ERROR:", error);
    res.status(500).json({
      success: false,
      message: "server Error"
    });
  }
};
// ✅ UPDATE TEACHER
export const updateTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true , runValidators:true}
    );
    if(!teacher){
      return res.status(404).json({
        message:"teacher not found"
      })
    }
    res.json({ success: true, data: teacher });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ✅ DELETE TEACHER
export const deleteTeacher = async (req, res) => {
  try {
    await Teacher.findByIdAndDelete(req.params.id);

    res.json({ success: true, message: "Deleted" });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export const getSingleTeacher = async (req, res) => {
  try {
    const teacher = await Teacher.findById(req.params.id);

    if (!teacher) {
      return res.status(404).json({ message: "Teacher not found" });
    }

    res.json({
      success: true,
      data: teacher
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

