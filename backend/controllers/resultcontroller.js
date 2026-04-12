import Result from "../models/resultmodel.js";
import mongoose from "mongoose";
import Student from "../models/studentmodel.js";

// ✅ CREATE RESULT WITH % + RANK
export const createResult = async (req, res) => {
  try {
    const {
      teacherId,
      institutionCode,
      className,
      section,
      subject,
      testType,
      maxMarks,
      results
    } = req.body;

    // ✅ VALIDATION (NEW ADD)
    if (
      !teacherId ||
      !institutionCode ||
      !className ||
      !section ||
      !subject ||
      !testType ||
      !maxMarks ||
      !results?.length
    ) {
      return res.status(400).json({
        message: "All fields required"
      });
    }

    const date = new Date().toISOString().split("T")[0];

    
    const processed = results.map(r => ({
      ...r,
      percentage: r.status === "absent"
        ? 0
        : (r.obtainedMarks / maxMarks) * 100
    }));

    // 🔥 sort once
    processed.sort((a, b) => b.obtainedMarks - a.obtainedMarks);

    // 🔥 rank optimized (no repeated lookup)
    let rank = 1;
    for (let i = 0; i < processed.length; i++) {
      if (i > 0 && processed[i].obtainedMarks < processed[i - 1].obtainedMarks) {
        rank = i + 1;
      }

      processed[i].rank = processed[i].status === "absent" ? null : rank;
    }
    // ✅ SAVE (MULTIPLE ALLOWED NOW)
    await Result.create({
      teacherId,
      institutionCode,
      className,
      section,
      subject,
      testType,
      maxMarks,
      date,
      results: processed
    });

    res.json({
      message: "Result uploaded successfully"
    });

  } catch (error) {
    // console.log(error);
    res.status(500).json({
      message: error.message
    });
  }
};
// ✅ GET RESULT (TEACHER)
export const getMyResults = async (req, res) => {
  try {
    const { teacherId } = req.query;

    const data = await Result.find({ teacherId })
      .populate("results.studentId", "name rollNumber")
      .sort({ date: -1 }).lean();

    res.json({ data });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
//student
export const getStudentResults = async (req, res) => {
  try {
    const { studentId } = req.query;

    if (!studentId) {
      return res.status(400).json({
        message: "Student ID required"
      });
    }

    // 🔥 Convert to ObjectId
    const objectId = new mongoose.Types.ObjectId(studentId);

    // 🔥 Find all results where this student exists
    let results = await Result.find({
        "results.studentId": objectId
      })
        .populate("results.studentId", "name rollNumber")
        .sort({ date: -1 })
        .lean();

    if (!results.length) {
      return res.status(200).json({
        message: "No results found",
        data: []
      });
    }

    results = results.map(test => {
      const sorted = [...test.results].sort(
        (a, b) => b.obtainedMarks - a.obtainedMarks
      );

      let rank = 1;

      const updatedResults = sorted.map((r, index) => {
        if (index > 0 && r.obtainedMarks < sorted[index - 1].obtainedMarks) {
          rank = index + 1;
        }

        return {
          ...r,
          rank: r.status === "absent" ? "-" : rank
        };
      });

      return {
        ...test,
        results: updatedResults
      };
    });

    res.status(200).json({
      message: "Student results fetched",
      data: results
    });

  } catch (error) {
    // console.log("❌ Fetch Student Results Error:", error);
    res.status(500).json({
      message: "Server Error"
    });
  }
};


export const getStudentsResultsSummary = async (req, res) => {
  try {
    const { className, section, institutionCode } = req.query;

    const students = await Student.find({
      className,
      section,
      institutionCode
    }).lean();

    const results = await Result.find({
      className,
      section,
      institutionCode
    }).lean();

    const summary = students.map(stu => {
      let totalMarks = 0;
      let totalMax = 0;

      results.forEach(r => {
        const studentData = r.results.find(
          s => s.studentId.toString() === stu._id.toString()
        );

        if (studentData) {
          totalMarks += studentData.obtainedMarks;
          totalMax += r.maxMarks;
        }
      });

      const percentage = totalMax > 0 ? (totalMarks / totalMax) * 100 : 0;
      return {
        _id: stu._id,
        name: stu.name,
        rollNumber: stu.rollNumber,
        percentage,
        mobile: stu.mobile,     // ✅ ADD
        email: stu.email,
      };
    });
    summary.sort((a, b) => b.percentage - a.percentage);
    summary.forEach((stu, index) => {
      stu.rank = index + 1;
    });
    return res.json({
      success: true,
      data: summary
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
// DELETE RESULT
export const deleteResult = async (req, res) => {
  try {
    await Result.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Result deleted"
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// UPDATE RESULT
export const updateResult = async (req, res) => {
  try {
    const { results, maxMarks } = req.body;

    const processed = results.map(r => ({
      ...r,
      percentage: r.status === "absent"
        ? 0
        : (r.obtainedMarks / maxMarks) * 100
    }));

    processed.sort((a, b) => b.obtainedMarks - a.obtainedMarks);

    let rank = 1;
    for (let i = 0; i < processed.length; i++) {
      if (i > 0 && processed[i].obtainedMarks < processed[i - 1].obtainedMarks) {
        rank = i + 1;
      }

      processed[i].rank = processed[i].status === "absent" ? null : rank;
    }

    const updated = await Result.findByIdAndUpdate(
      req.params.id,
      { ...req.body, results: processed },
      { new: true }
    );

    return res.json({
      success: true,
      data: updated
    });

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};