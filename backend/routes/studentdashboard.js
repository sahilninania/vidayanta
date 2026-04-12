import express from "express";
import { getStudentDashboard } from "../controllers/studentdashboardcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

// router.get("/dashboard/:id", getStudentDashboard);
router.get("/:id", getStudentDashboard);

export default router;