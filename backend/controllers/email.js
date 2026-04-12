import Institution from "../models/institutionmodel.js";
import nodemailer from "nodemailer";

let lastRequestTime = {};

export const sendEmailToInstitutions = async (req, res) => {
  try {
    const userId = req.user?.userId || req.ip;
    const now = Date.now();
    if (lastRequestTime[userId] && now - lastRequestTime[userId] < 30000) {
        return res.status(429).json({
        message: "Wait 30 seconds",
        });
    }
    lastRequestTime[userId] = now;
    const { type, institutionId, subject, message } = req.body;
    
    let emails = [];

    if (type === "all") {
      const all = await Institution.find().select("email");
      emails = all.map((i) => i.email);
    } else {
      const inst = await Institution.findById(institutionId);
      emails = [inst.email];
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER_1,
        pass: process.env.EMAIL_PASS_1,
      },
    });

    for (let email of emails) {
      await transporter.sendMail({
        from: process.env.EMAIL_USER_1,
        to: email,
        subject,
        text: message,
      });
    }

    res.json({ success: true });

  } catch (err) {
    // console.log(err);
    res.status(500).json({ message: "error" });
  }
};