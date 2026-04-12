// routes/authRoutes.js

import express from "express";
import signInController from "../controllers/authcontroller.js";
import { isAuthenticated, authorizeRoles } from "../middlerwars/authmiddlerwars.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

// 🔓 LOGIN
router.post("/login", emailLimiter,signInController);

// 🔥 SUPER ADMIN
router.get(
  "/superadmin/dashboard",
  
  isAuthenticated,
  authorizeRoles("superadmin"),
  (req, res) => {
    res.json({ message: "Super Admin Dashboard 🚀" });
  }
);

// 🏫 INSTITUTION ADMIN
router.get(
  "/admin/dashboard",
 
  isAuthenticated,
  authorizeRoles("admin"),
  (req, res) => {
    res.json({ message: "Institution Admin Dashboard 🏫" });
  }
);

// 👨‍🏫 TEACHER
router.get(
  "/teacher/dashboard",
 
  isAuthenticated,
  authorizeRoles("teacher"),
  (req, res) => {
    res.json({ message: "Teacher Dashboard 👨‍🏫" });
  }
);

// 👨‍🎓 STUDENT
router.get(
  "/student/dashboard",
 
  isAuthenticated,
  authorizeRoles("student"),
  (req, res) => {
    res.json({ message: "Student Dashboard 👨‍🎓" });
  }
);

export default router;