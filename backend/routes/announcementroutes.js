import express from "express";
import {
  createAnnouncement,
  getTeacherAnnouncements,
  updateAnnouncement,
  deleteAnnouncement,
  getAnnouncements,
  getAnnouncementById
} from "../controllers/announcementcontroller.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
const router = express.Router();

router.post("/create", emailLimiter ,createAnnouncement);
router.get("/teacher", getTeacherAnnouncements);
router.put("/:id",emailLimiter , updateAnnouncement);
router.delete("/:id", deleteAnnouncement);
router.get("/get", getAnnouncements);
router.get("/:id", getAnnouncementById);

export default router;