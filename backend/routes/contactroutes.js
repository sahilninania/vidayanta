import express from "express";
import { sendContact, getAllContacts,deleteContact } from "../controllers/contactcontroller.js";
import { asyncHandler } from "../middlerwars/asynchandler.js";
import { emailLimiter } from "../middlerwars/ratelimter.js";
import { validateContact } from "../middlerwars/contactmiddlerwars.js";

const router = express.Router();

// 🔥 SAME WORKING + middleware added
router.post(
  "/send",
  emailLimiter,
  validateContact,
  asyncHandler(sendContact)
);

router.get(
  "/contacts",
  
  asyncHandler(getAllContacts)
);

router.delete("/:id", deleteContact);
export default router;