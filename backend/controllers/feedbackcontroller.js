import Feedback from "../models/feedbackmodel.js";


// ✅ CREATE FEEDBACK
export const createFeedback = async (req, res) => {
  try {
    const { name, email, message, rating } = req.body;

    // 🔒 VALIDATION
    if (!name?.trim() || !message?.trim()) {
      return res.status(400).json({
        message: "All required fields must be filled",
      });
    }

    const feedback = await Feedback.create({
      name,
      message,
    });

    // console.log("📝 Feedback:", feedback);

    res.status(201).json({
      success: true,
      message: "Feedback submitted successfully",
      data: feedback,
    });

  } catch (error) {
    // console.log("❌ FEEDBACK ERROR:", error);

    res.status(500).json({
      message: error.message,
    });
  }
};



// ✅ GET ALL FEEDBACKS
export const getAllFeedback = async (req, res) => {
  try {
    const feedbacks = await Feedback.find().sort({ createdAt: -1 });

    res.json({
      success: true,
      count: feedbacks.length,
      data: feedbacks,
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};



// ✅ DELETE FEEDBACK (ADMIN USE)
export const deleteFeedback = async (req, res) => {
  try {
    await Feedback.findByIdAndDelete(req.params.id);

    res.json({
      success: true,
      message: "Feedback deleted",
    });

  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};