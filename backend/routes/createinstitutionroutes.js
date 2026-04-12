import express from "express";
import { emailLimiter } from "../middlerwars/ratelimter.js";
import createInstitution from "../controllers/createinstitution.js";
const router = express.Router();
router.post("/create-institution",emailLimiter,createInstitution);
export default router;
