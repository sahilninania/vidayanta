import express from "express";
import {createStudent,
  getStudentByClass,
  getStudentsByClassSection,
  updateStudent, deleteStudent
} from "../controllers/createstudent.js"
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();
router.post("/create-student",emailLimiter,createStudent);
router.get("/class/:className/:section",getStudentByClass);
router.post("/by-class-section", emailLimiter,getStudentsByClassSection);
router.put("/:id",emailLimiter, updateStudent);
router.delete("/:id", deleteStudent);
export default router;
