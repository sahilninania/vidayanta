import express from "express";
import { getDashboardData } from "../controllers/institutiondashboard.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.get("/", getDashboardData);

export default router;