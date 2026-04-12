import jwt from "jsonwebtoken";

const generateToken = (user_id) => {
  try {
    const token = jwt.sign(
      { user_id }, // ✅ correct payload
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    return token;
  } catch (error) {
    console.error("Error generating token:", error.message);
    throw error;
  }
};

export default generateToken;