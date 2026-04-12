// feedbackRoutes.js
import express from "express";
import { emailLimiter } from "../middlerwars/ratelimter.js";
import { createFeedback, getAllFeedback ,deleteFeedback} from "../controllers/feedbackcontroller.js";

const router = express.Router();

router.post("/create",emailLimiter, createFeedback);
// router.get("/", getFeedbacks);
router.get("/feedback", getAllFeedback);
router.delete("/:id", deleteFeedback);
export default router;
