import generateUsername from "../utils/generateusername.js";
import generatePassword from "../utils/generatepassword.js";
import bcrypt from "bcryptjs";
import Student from "../models/studentmodel.js";
import User from "../models/usermodel.js";
import Institution from "../models/institutionmodel.js";
import Class from "../models/classmodel.js";
import emailQueue from "../queue/emailqueue.js";

export const createStudent = async (req, res) => {
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

    // ✅ 1. VALIDATION
    if (
      !institutionCode ||
      !name ||
      !email ||
      !mobile ||
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

    // ✅ 2. FETCH DATA
    const classData = teacherId
      ? await Class.findOne({ classIncharge: teacherId })
      : null;

    const existingStudent = await Student.findOne({
      className,
      section,
      rollNumber,
      institutionCode
    });

    const institution = await Institution.findOne({ institutionCode });

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

    // ✅ 3. GENERATE DATA
    const branch = String(institution.branch).padStart(2, "0");

    const username = await generateUsername(
      "student",
      institutionCode,
      branch,
      className,
      section
    );

    const plainPassword = generatePassword();
    const hashedPassword = await bcrypt.hash(plainPassword, 10);

    // ✅ 4. CREATE USER
    const user = await User.create({
      username,
      password: hashedPassword,
      role: "student",
      institutionCode,
      branch,
      email
    });

    // ✅ 5. CREATE STUDENT
    const student = await Student.create({
      name,
      email,
      mobile,
      className,
      section,
      rollNumber,
      userId: user._id, // ✅ FIXED
      institutionCode
    });

    // ✅ 6. SEND EMAIL (optional async)
    await emailQueue.add({
      type: "CREDENTIALS",
      email,
      data: {
        name,
        username,
        password: plainPassword
      }
    });

    // ✅ 7. RESPONSE
    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      username
    });

  } catch (error) {
    console.error("🔥 ERROR:", error);

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};