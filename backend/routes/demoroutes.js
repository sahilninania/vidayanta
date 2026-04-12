import express from "express";
import { requestDemo,getAllDemoRequests,deleteDemo } from "../controllers/democontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.post("/request",emailLimiter, requestDemo);
router.get("/all", getAllDemoRequests);
router.delete("/:id", deleteDemo);
export default router;