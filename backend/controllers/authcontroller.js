import User from "../models/usermodel.js";
import Institution from "../models/institutionmodel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Teacher from "../models/teachermodel.js";
import Student from "../models/studentmodel.js";

const signInController = async (req, res) => {
  try {
    const { username, password } = req.body;

    // 🔒 validation
    if (!username || !password) {
      return res.status(400).json({
        message: "Username and password are required",
      });
    }

    // 🔥 SUPER ADMIN LOGIN
    if (
      username === process.env.SUPER_ADMIN_USERNAME &&
      password === process.env.SUPER_ADMIN_PASSWORD
    ) {
      const token = jwt.sign(
        { role: "superadmin", userId: "superadmin" },
        process.env.JWT_SECRET_KEY,
        { expiresIn: "7d" }
      );
      res.header("Access-Control-Allow-Credentials", "true");
      res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "lax",
          path : "/"
      });

      return res.status(200).json({
        message: "Super Admin Login",
        role: "superadmin",
        token,
      });
    }

    // 🔍 find user
    const user = await User.findOne({ username }).lean();
    if (!user) {
      return res.status(400).json({
        message: "User not found",
      });
    }
    if (!user.isActive) {
      return res.status(403).json({
        message: "Your account is disabled. Contact admin.",
      });
    }
    // 🔐 check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Username and password is wrong",
      });
    }
    
    // 🏫 institution
    const institution = await Institution.findOne({
      institutionCode: user.institutionCode,
    }).lean();

    // ❌ BLOCK IF INSTITUTION DISABLED
    if (!institution || institution.status === "disabled") {
      return res.status(403).json({
        message: "Institution is disabled. Contact admin.",
      });
    }
    const institutionName = institution?.institutionName || "";
    let branch = institution?.branch || "";

    let teacherName = "";
    let teacherId = null;
    let studentName = "";
    let studentId = null;
    let className = "";
    let section = "";

    // 👨‍🏫 TEACHER
    if (user.role === "teacher") {
      const teacher = await Teacher.findOne({ userId: user._id }).lean();

      if (!teacher) {
        return res.status(404).json({ message: "teacher not found" });
      }

      if (!teacher.branch) {
        return res.status(400).json({
          message: "Branch not assigned to teacher",
        });
      }

      teacherName = teacher.teacherName;
      teacherId = teacher._id;
      branch = teacher.branch;
    }

    // 👨‍🎓 STUDENT
    if (user.role === "student") {
      const student = await Student.findOne({ userId: user._id }).lean();

      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }

      if (!user.branch) {
        return res.status(400).json({
          message: "Branch not assigned to student",
        });
      }

      studentName = student.name;
      studentId = student._id;
      branch = user.branch;
      className = student.className;
      section = student.section;
    }

    // 🔑 token
    const token = jwt.sign(
      {
        userId: user._id,
        role: user.role,
        institutionCode: user.institutionCode,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    // 🍪 cookie
    res.cookie("token", token, {
      httpOnly: true,
      // secure: process.env.NODE_ENV === "production",
      // sameSite: "lax",
       secure: false,       // local ke liye
       sameSite: "lax",
       path :"/"
    });

    // ✅ response
    return res.status(200).json({
      message: "Login successful",
      role: user.role,
      userId: user._id,
      token,
      institutionName,
      institutionCode: user.institutionCode,
      teacherName,
      teacherId,
      branch,
      studentName,
      studentId,
      className,   
      section
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);
    return res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export default signInController;