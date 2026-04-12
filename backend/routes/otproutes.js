import express from "express";
import { sendotp, verifyotp } from "../controllers/forgotpasswordcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();
// console.log("OTP Routes Loaded");
router.post("/send-otp",emailLimiter, sendotp);
router.post("/verify-otp",emailLimiter, verifyotp);
export default router;