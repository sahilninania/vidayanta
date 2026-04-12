export const validateContact = (req, res, next) => {
  const { name, email, mobile, message } = req.body;

  if (!name || !email || !mobile || !message) {
    return res.status(400).json({
      message: "Required fields missing",
    });
  }

  next();
};