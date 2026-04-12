import express from "express";
import {createClass,
    getAllClasses,
    assignTeacher,
    getClassesByInstitution,
    getMyClass,
    getTeacherClasses,
    getInstitutionClasses,
    getStudentsByClass,
    deleteClass,
    updateClass,
    getSingleClass,
    getClassById} 
from "../controllers/classcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router =express.Router();
router.post("/add-class",emailLimiter, createClass);
router.get("/all",getAllClasses);
router.post("/assign",emailLimiter, assignTeacher);
router.post("/by-institution",emailLimiter, getClassesByInstitution);
router.post("/get-my-class",emailLimiter, getMyClass);
router.post("/teacher-classes",emailLimiter, getTeacherClasses);
router.get("/institution-classes", getInstitutionClasses);
router.get("/students-by-class", getStudentsByClass);
router.get("/:id", getSingleClass);
router.put("/:id",emailLimiter, updateClass);
router.delete("/:id", deleteClass);
router.get("/:id", getClassById);
export default router;
