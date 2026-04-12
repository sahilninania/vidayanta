import express from "express";
import {
  assignTeacher,
  getAssignments
} from "../controllers/assignmentcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.post("/assign",emailLimiter , assignTeacher);
router.post("/assignments", emailLimiter ,getAssignments);

export default router;