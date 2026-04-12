import Teacher from "../models/teachermodel.js";
import Student from "../models/studentmodel.js";
import Class from "../models/classmodel.js";
import Announcement from "../models/announcementmodel.js";

export const getDashboardData = async (req, res) => {
  try {

    const institutionCode = req.query.institutionCode;
    if(!institutionCode){
      return res.status(400).json({message:"Institution code requried"})
    }

    const [
      totalTeachers,
      totalStudents,
      totalClasses,
      recentStudents,
      recentTeachers,
      recentAnnouncements,
    ] = await Promise.all([
      Teacher.countDocuments({ institutionCode }),
      Student.countDocuments({ institutionCode }),
      Class.countDocuments({ institutionCode }),

      Student.find({ institutionCode })
        .sort({ createdAt: -1 })
        .limit(10),

      Teacher.find({ institutionCode })
        .sort({ createdAt: -1 })
        .limit(10),

      Announcement.find({ institutionCode })
        .sort({ createdAt: -1 })
        .limit(10),
    ]);
    res.json({
      success: true,
      data: {
        totalTeachers,
        totalStudents,
        totalClasses,
        recentStudents,
        recentTeachers,
        recentAnnouncements
      }
    });

  } catch (error) {
    // console.log("Dashboard Error :" ,error);
    res.status(500).json({ message: error.message });
  }
};