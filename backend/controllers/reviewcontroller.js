import Review from "../models/reviewmodel.js";

export const createReview = async (req, res) => {
  try {
    const { name, message, rating } = req.body;

    // 🔥 validation
    if (!name || !message) {
      return res.status(400).json({
        message: "Name and message are required"
      });
    }

    const data = await Review.create({
      name,
      message,
      rating: rating || 5 // default rating
    });

    return res.status(201).json({
      success: true,
      data
    });

  } catch (error) {
    // console.log("CREATE REVIEW ERROR:", error);
    return res.status(500).json({
      message: error.message
    });
  }
};
export const getAllReviews = async (req, res) => {
  try {
    const data = await Review.find()
      .sort({ createdAt: -1 })
      .lean(); // 🔥 performance boost

    return res.json({
      success: true,
      count: data.length,
      data
    });

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};
export const deleteReviews = async (req, res) => {
  try {
    await Review.findByIdAndDelete(req.params.id);

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