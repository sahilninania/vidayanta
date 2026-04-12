// middlewares/authMiddleware.js

import jwt from "jsonwebtoken";

// 🔐 Auth
export const isAuthenticated = async(req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Unauthorized - No token",
      });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role === "superadmin") {
      req.user = decoded;
      return next();
    }
    const user = await User.findById(decoded.userId);
    if (!user || !user.isActive) {
      return res.status(403).json({
        message: "User disabled",
      });
    }

    // 🔥 INSTITUTION CHECK
    const institution = await Institution.findOne({
      institutionCode: user.institutionCode,
    });

    if (!institution || institution.status === "disabled") {
      return res.status(403).json({
        message: "Institution disabled",
      });
    }

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

// 🛡️ Role Based Access
export const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied for role: ${req.user.role}`,
      });
    }
    next();
  };
};