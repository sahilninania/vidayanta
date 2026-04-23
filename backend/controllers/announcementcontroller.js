import Announcement from "../models/announcementmodel.js";
import mongoose from "mongoose";

// 🔥 CREATE
export const createAnnouncement = async (req, res) => {
  try {
    const {
      title,
      message,
      targetType,
      className,
      section,
      teacherId,
      studentId,
      institutionCode,
      userId
    } = req.body;

    const announcement = await Announcement.create({
      title,
      message,
      targetType,
      className: className || null,
      section: section || null,
      teacherId: teacherId || null,
      studentId: studentId || null,
      institutionCode,
      createdBy: userId
    });

    return res.status(201).json({ success: true, data: announcement });

  } catch (error) {
    console.error("Create Error:", error.message);
    return res.status(500).json({ message: error.message });
  }
};


// 🔥 GET FOR TEACHER (Optimized)
export const getTeacherAnnouncements = async (req, res) => {
  try {
    const { teacherId, institutionCode } = req.query;

    if (!mongoose.Types.ObjectId.isValid(teacherId)) {
      return res.status(400).json({ message: "Invalid teacherId" });
    }

    const teacherObjectId = new mongoose.Types.ObjectId(teacherId);

    const query = {
      institutionCode,
      $or: [
        { createdBy: teacherObjectId },
        { targetType: "all" },
        { targetType: "teachers" },
        { teacherId: teacherObjectId },
        { targetType: "class" }
      ]
    };

    const data = await Announcement.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ success: true, data });

  } catch (error) {
    console.error("Fetch Teacher Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


// 🔥 UPDATE (Optimized)
export const updateAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, ...updateData } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const ann = await Announcement.findById(id).lean();

    if (!ann) return res.status(404).json({ message: "Not found" });

    if (ann.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const updated = await Announcement.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    ).lean();

    return res.json({ success: true, data: updated });

  } catch (error) {
    console.error("Update Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


// 🔥 DELETE (Optimized)
export const deleteAnnouncement = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const ann = await Announcement.findById(id).lean();

    if (!ann) return res.status(404).json({ message: "Not found" });

    if (ann.createdBy.toString() !== userId) {
      return res.status(403).json({ message: "Not allowed" });
    }

    await Announcement.findByIdAndDelete(id);

    return res.json({ success: true });

  } catch (error) {
    console.error("Delete Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};


// 🔥 GET (FIXED + OPTIMIZED)
export const getAnnouncements = async (req, res) => {
  try {
    const { role, institutionCode, userId, className, section } = req.query;

    let query = { institutionCode };

    // ✅ ADMIN
    if (role === "instituteadmin") {
      query.createdBy = userId;
    }

    // ✅ STUDENT
    if (role === "student") {
      query.$or = [
        { targetType: "all" },
        { targetType: "students" },

        {
          targetType: "class",
          className,
          section
        },

        {
          targetType: "student",
          studentId: userId
        }
      ];
    }

    // ✅ TEACHER
    if (role === "teacher") {
      query.$or = [
        { targetType: "all" },
        { targetType: "teachers" },

        {
          targetType: "class",
          className,
          section
        },

        {
          targetType: "teacher",
          teacherId: userId
        }
      ];
    }

    const data = await Announcement.find(query)
      .sort({ createdAt: -1 })
      .lean();

    return res.json({ success: true, data });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getAnnouncementById = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: "Invalid ID" });
    }

    const ann = await Announcement.findById(id).lean();

    if (!ann) {
      return res.status(404).json({ message: "Not found" });
    }

    return res.json(ann);

  } catch (error) {
    console.error("Fetch One Error:", error.message);
    return res.status(500).json({ message: "Server error" });
  }
};

