// reviewRoutes.js
import express from "express";
import { createReview ,getAllReviews,deleteReviews } from "../controllers/reviewcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.post("/create",emailLimiter, createReview);
router.get("/reviews", getAllReviews);
router.delete("/:id", deleteReviews);
export default router;

