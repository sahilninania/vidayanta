import express from "express";
import { getTeachers } from "../controllers/usercontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.get("/teachers", getTeachers);

export default router;