import Institution from "../models/institutionmodel.js";
import Teacher from "../models/teachermodel.js";
import Student from "../models/studentmodel.js";
import Class from "../models/classmodel.js";
// 🔥 reusable growth function
const getMonthlyGrowth = async (Model) => {
  return Model.aggregate([
    {
      $group: {
        _id: { $month: "$createdAt" },
        count: { $sum: 1 }
      }
    },
    {
      $project: {
        month: "$_id",
        count: 1,
        _id: 0
      }
    },
    { $sort: { month: 1 } }
  ]);
};

// 🔥 SUPER ADMIN DASHBOARD
export const superAdminDashboard = async (req, res) => {
  try {
    // ⚡ Parallel execution (very important optimization)
    const [
      totalInstitution,
      totalTeacher,
      totalStudent,
      recentInstitution,
      recentTeacher,
      recentStudent,
      institutionGrowth,
      teacherGrowth,
      studentGrowth
    ] = await Promise.all([
      Institution.countDocuments(),
      Teacher.countDocuments(),
      Student.countDocuments(),

      Institution.find().sort({ createdAt: -1 }).limit(10).lean(),
      Teacher.find().sort({ createdAt: -1 }).limit(5).lean(),
      Student.find().sort({ createdAt: -1 }).limit(5).lean(),

      getMonthlyGrowth(Institution),
      getMonthlyGrowth(Teacher),
      getMonthlyGrowth(Student)
    ]);

    res.json({
      success: true,
      data: {
        totalInstitution,
        totalTeacher,
        totalStudent,
        recentInstitution,
        recentTeacher,
        recentStudent,
        graphData: {
          institutions: institutionGrowth,
          teachers: teacherGrowth,
          students: studentGrowth
        }
      }
    });

  } catch (error) {
    console.error("Dashboard Error:", error);
    res.status(500).json({ message: "Dashboard error" });
  }
};

export const getInstitution =async(req,res)=>{
  try{
    const institution =await Institution.find().sort({createdAt:-1}).lean();
    res.status(200).json({
      success :true,
      data : institution})
  }catch(error){
    // console.log(error)
    res.status(500).json({message:"ERROR in institution"})
  }
}

export const deleteInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Institution.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ message: "Institution not found" });
    }

    res.status(200).json({
      success: true,
      message: "Institution deleted successfully"
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error deleting institution" });
  }
};

export const updateInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const updated = await Institution.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Institution not found" });
    }

    res.status(200).json({
      success: true,
      data: updated
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error updating institution" });
  }
};

export const getSingleInstitution = async (req, res) => {
  try {
    const { id } = req.params;

    const institution = await Institution.findById(id).lean();

    if (!institution) {
      return res.status(404).json({ message: "Institution not found" });
    }

    res.status(200).json({
      success: true,
      data: institution
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error fetching institution" });
  }
};

export const getInstitutionFull = async (req, res) => {
  try {
    const { id } = req.params;

    // 👉 1. get institution
    const institution = await Institution.findById(id);

    if (!institution) {
      return res.status(404).json({ message: "Not found" });
    }

    const code = institution.institutionCode;

    // 👉 2. count using code
    const totalTeacher = await Teacher.countDocuments({
      institutionCode: code
    });

    const totalStudent = await Student.countDocuments({
      institutionCode: code
    });

    // 👉 agar class model hai to
    const totalClass = await Class.countDocuments({
      institutionCode: code
    });

    // 👉 class wise students
    const classData = await Student.aggregate([
      {
        $match: { institutionCode: code }
      },
      {
        $group: {
          _id: "$className",
          count: { $sum: 1 }
        }
      }
    ]);

    res.json({
      success: true,
      data: {
        ...institution.toObject(),
        totalTeacher,
        totalStudent,
        totalClass,
        classData: classData.map(c => ({
          className: c._id,
          count: c.count
        }))
      }
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({ message: "Error" });
  }
};

export const getAnalytics = async (req, res) => {
  try {
    const { type } = req.query; // week / month / year

    let groupFormat;

    if (type === "week") {
      groupFormat = { $week: "$createdAt" };
    } else if (type === "year") {
      groupFormat = { $year: "$createdAt" };
    } else {
      // default = month
      groupFormat = { $month: "$createdAt" };
    }

    const getData = async (Model) => {
      return Model.aggregate([
        {
          $group: {
            _id: groupFormat,
            count: { $sum: 1 },
          },
        },
        {
          $project: {
            label: "$_id",
            count: 1,
            _id: 0,
          },
        },
        { $sort: { label: 1 } },
      ]);
    };

    const [institutions, teachers, students] = await Promise.all([
      getData(Institution),
      getData(Teacher),
      getData(Student),
    ]);

    res.json({
      success: true,
      data: {
        institutions,
        teachers,
        students,
      },
    });

  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "Analytics error" });
  }
};