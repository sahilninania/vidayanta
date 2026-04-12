import express from "express";
import { getTeacherDashboard } from "../controllers/teacherdashboardcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.get("/dashboard", getTeacherDashboard);

export default router;