import bcrypt from "bcryptjs";
import OTP from "../models/otpmodel.js";
import Student from "../models/studentmodel.js";
import Teacher from "../models/teachermodel.js";
import Institution from "../models/institutionmodel.js";
import User from "../models/usermodel.js";
import emailQueue from "../queue/emailqueue.js";


// ================= SEND OTP =================
export const sendotp = async (req, res) => {
  try {
    const { email, name, role, className, section, institutionName } = req.body;

    // 🔥 model select
    const modelMap = {
      student: Student,
      teacher: Teacher,
      institution: Institution
    };

    const Model = modelMap[role];

    if (!Model) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // 🔥 correct query
    let query = { email };

    if (role === "student") {
      query = {
        email,
        name,
        className,
        section
      };
    }

    if (role === "teacher") {
      query = {
        email,
        teacherName: name // 🔥 IMPORTANT
      };
    }

    if (role === "institution") {
      query = {
        email,
        institutionName
      };
    }

    // console.log("QUERY 👉", query);

    const user = await Model.findOne(query).lean();

    if (!user) {
      return res.status(404).json({ message: "Details not matched" });
    }

    // 🔥 generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const hashedOtp = await bcrypt.hash(otp, 10);

    await Promise.all([
      OTP.deleteMany({ email }),
      OTP.create({
        email,
        otp: hashedOtp,
        expiresAt: Date.now() + 5 * 60 * 1000
      })
    ]);

    // 🔥 send email
    await emailQueue.add({
      type: "OTP",
      email,
      data: {
        otp
      }
    });

    return res.json({
      success: true,
      message: "OTP sent"
    });

  } catch (error) {
    // console.log("OTP ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};



// ================= VERIFY OTP =================
export const verifyotp = async (req, res) => {
  try {
    const { email, otp, role } = req.body;

    // 🔥 get record
    const record = await OTP.findOne({ email });
    const user = await User.findOne({ email });

    if (!record) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // 🔥 compare hashed OTP
    const isMatch = await bcrypt.compare(otp, record.otp);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (record.expiresAt < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    // 🔥 model select
    const modelMap = {
      student: Student,
      teacher: Teacher,
      institution: Institution
    };

    const Model = modelMap[role];

    const userDetails = await Model.findOne({ email }).lean();

    if (!userDetails) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user) {
      return res.status(404).json({ message: "Login account not found" });
    }

    // 🔥 new password
    const newPassword = Math.random().toString(36).slice(-6);

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    // 🔥 delete OTP
    await OTP.deleteMany({ email });

    // 🔥 send credentials email
    await emailQueue.add({
      type: "FORGOT_PASSWORD",
      email: user.email,
      data: {
        name: user.name,
        username: user.username,
        newPassword
      }
    });

    return res.json({
      success: true,
      message: "Credentials sent to email"
    });

  } catch (error) {
    // console.log("VERIFY ERROR:", error);
    return res.status(500).json({ message: error.message });
  }
};