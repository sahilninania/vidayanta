import express from "express";
// import superAdminDashboard from "../controllers/superAdminDashboardController.js";
import {getInstitution,deleteInstitution,updateInstitution,superAdminDashboard,getSingleInstitution,getInstitutionFull, getAnalytics} from "../controllers/superadmindashboard.js";
import createInstitution from "../controllers/createinstitution.js";
import Institution from "../models/institutionmodel.js";
import { isAuthenticated, authorizeRoles } from "../middlerwars/authmiddlerwars.js";
import { sendEmailToInstitutions } from "../controllers/email.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";



const router = express.Router();

router.get("/dashboard", superAdminDashboard);
router.get("/institutions",getInstitution);
router.delete("/institution/:id", deleteInstitution);
router.put("/institution/:id",emailLimiter, updateInstitution);
router.post("/create-institution", emailLimiter, createInstitution);
router.get("/institution/:id", getSingleInstitution);
router.post("/send-email", emailLimiter, sendEmailToInstitutions);
router.get("/analytics", getAnalytics);
router.get("/institution-full/:id", getInstitutionFull);
router.put("/institution/:id/toggle",
  isAuthenticated,
  emailLimiter,
  authorizeRoles("superadmin"),
  async (req, res) => {
    try {
      const inst = await Institution.findById(req.params.id);

      if (!inst) {
        return res.status(404).json({ message: "Institution not found" });
      }

      inst.status = inst.status === "active" ? "disabled" : "active";
      await inst.save();

      res.json({
        message: `Institution ${inst.status}`,
        status: inst.status,
      });

    } catch (error) {
      res.status(500).json({ message: "Server error" });
    }
  }
);


export default router;

