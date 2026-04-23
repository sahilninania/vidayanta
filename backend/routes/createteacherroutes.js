import express from "express";
import {
  createTeacher,
  getTeacherByInstitution,
  updateTeacher,
  deleteTeacher,
  getSingleTeacher,
  getAllTeachers 
} from "../controllers/createteacher.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";

const router = express.Router();

router.post("/create",emailLimiter, createTeacher);  
router.get("/all", getAllTeachers);
router.get("/by-institution", getTeacherByInstitution); // ✅
router.post("/by-institution",emailLimiter, getTeacherByInstitution); // ✅
router.put("/:id",emailLimiter, updateTeacher);
router.delete("/:id",deleteTeacher);
router.get("/:id", getSingleTeacher); 
export default router;