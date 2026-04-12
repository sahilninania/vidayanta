import User from "../models/usermodel.js";

export const getTeachers = async (req, res) => {
  try {
    // ✅ safe extraction
    const institutionCode = req.user?.institutionCode;

    if (!institutionCode) {
      return res.status(400).json({
        success: false,
        message: "Institution code missing"
      });
    }

    // ✅ optimized query
    const teachers = await User.find({
      institutionCode,
      role: "teacher"
    })
      .select("_id name")   // only required fields
      .lean();              // ⚡ faster

    res.status(200).json({
      success: true,
      count: teachers.length,
      data: teachers
    });

  } catch (error) {
    console.error("Get Teachers Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error"
    });
  }
};