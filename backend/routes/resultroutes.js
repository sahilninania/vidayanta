import express from "express";
import {
  createResult,
  getMyResults,
  getStudentResults,
  getStudentsResultsSummary,
  deleteResult,
  updateResult
} from "../controllers/resultcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.post("/create",emailLimiter, createResult);
router.get("/my", getMyResults);
router.get("/student", getStudentResults);
router.get("/students-summary", getStudentsResultsSummary);
router.delete("/:id",deleteResult);
router.put("/:id",emailLimiter, updateResult);
export default router;