
import dotenv from "dotenv";
dotenv.config(); 
// import emailQueue from "../queue/emailqueue.js";
const { default: emailQueue } = await import("../queue/emailqueue.js");
import { transporter } from "../utils/sendemail.js";

console.log("🔥 Worker started...");

// 🔥 GLOBAL ERROR HANDLING (important)
emailQueue.on("error", (err) => {
  console.log("❌ Queue Error:", err);
});

emailQueue.on("failed", (job, err) => {
  console.log("❌ Job Failed:", job.id, err.message);
});

emailQueue.on("completed", (job) => {
  console.log("✅ Job Completed:", job.id);
});

emailQueue.process(async (job) => {

  console.log("📥 Job received:", job.data); // 🔥 DEBUG

  const { type, email, data } = job.data;

  let subject = "";
  let html = "";

  // ================== CREDENTIALS ==================
  if (type === "CREDENTIALS") {
    subject = "Your Login Credentials – Vidayanta";

    let roleText = "";

    if (data.role === "institution") {
      roleText = "your institution account";
    }

    if (data.role === "teacher") {
      roleText = "your teacher account";
    }

    if (data.role === "student") {
      roleText = "your student account";
    }

    html = `
      <div style="font-family: Arial;">
        <h2>Welcome to Vidayanta 🎓</h2>
        <p>"Your Login Credentials – Vidayanta"<p>

        <p>Dear ${data.name},</p>

        <p>Your account has been successfully created.</p>
        <p> We are pleased to inform you that your ${data.role } account has been successfully created on Vidayanta.<p>
        <p>Please find your login credentials below:<p>
        <p><b>Username:</b> ${data.username}</p>
        <p><b>Password:</b> ${data.password}</p>
        <p>You can access your account using the link below:<p>
        <p> 
          <a href="https://vidayanta.nsjbgroups.com">
            vidayanta.nsjbgroups.com
          </a>
        </p>
        <p>We recommend keeping your login credentials secure and not sharing them with anyone.<p>
        <p>If you require any assistance, please contact your institution.<p>
        <p>Best regards,<p>  
        <p>Team Vidayanta<p>  
        <p>Smart School Management System<p>
      </div>
    `;
  }

  // ================== DEMO REQUEST ==================
  if (type === "DEMO_REQUEST") {
    subject = "New Demo Request – Vidayanta 📩";

    html = `
      <div style="font-family: Arial;">
        <h2 style="color:#4CAF50;">New Demo Request</h2>

        <p><b>School Name:</b> ${data.schoolName}</p>
        <p><b>Contact Person:</b> ${data.name}</p>
        <p><b>Email:</b> ${data.email}</p>
        <p><b>Phone:</b> ${data.phone}</p>

        <br/>
        <p>Please contact them for demo scheduling.</p>
      </div>
    `;
  }

  // ================== FORGOT PASSWORD ==================
  if (type === "FORGOT_PASSWORD") {
    subject = "Reset Your Password – Vidayanta 🔐";

    html = `
      <div style="font-family: Arial;">
        <h2 style="color:#FF5722;">Password Reset Request</h2>

        <p>Dear ${data.name || "User"}</p>

        <p>
          We received a request to reset your password.
        </p>

        <p>
          Your password has been reset successfully:
        </p>
        <h3>Username: ${data.username}<h3>
        <h3>Password: ${data.newPassword}<h3>

        <p style="margin-top:15px;">
          If you did not request this, please ignore this email.
        </p>

        <br/>
        <p>Team Vidayanta</p>
      </div>
    `;
  }

  // ================== OTP ==================
  if (type === "OTP") {
    subject = "Your OTP Code 🔐";

    html = `
      <h2>Your OTP is: ${data.otp}</h2>
    `;
  }

  // ================== SEND EMAIL ==================
  try {
    await transporter.sendMail({
      from: process.env.EMAIL, // 👈 unchanged
      to: email,
      subject,
      html,
    });

    console.log("✅ Email sent:", email);

  } catch (error) {
    console.log("❌ Email error:", error.message);
  }
});