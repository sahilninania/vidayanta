import Counter from "../models/contermodel.js";

const generateUsername = async (role, institutionCode = "0000", branch = "01") => {
  try {
    role = role?.toString().trim().toLowerCase();

    const year = new Date().getFullYear().toString().slice(-2);
    const branchCode = String(branch).padStart(2, "0");

    // 🏫 Institution Admin
    if (role === "instituteadmin") {
      return `2${institutionCode}${branchCode}`;
    }

    // 👨‍🏫 Teacher
    if (role === "teacher") {
      const counterName = `${year}_teacher_${institutionCode}_${branchCode}`;

      const counter = await Counter.findOneAndUpdate(
        { name: counterName },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );

      const serial = String(counter.value).padStart(4, "0");

      return `${year}3${institutionCode}${branchCode}${serial}`;
    }

    // 👨‍🎓 Student
    if (role === "student") {
      const counterName = `${year}_student_${institutionCode}_${branchCode}`;

      const counter = await Counter.findOneAndUpdate(
        { name: counterName },
        { $inc: { value: 1 } },
        { new: true, upsert: true }
      );

      const serial = String(counter.value).padStart(4, "0");

      return `${year}4${institutionCode}${branchCode}${serial}`;
    }

    throw new Error("Invalid role");

  } catch (error) {
    console.error("🔥 Error generating username:", error);
    throw error;
  }
};

export default generateUsername;