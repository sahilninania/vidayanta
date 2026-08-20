// import "./config/env.js"; // 🔥 FIRST LINE
// import express from "express";
// import dns from "dns";
// dns.setDefaultResultOrder("ipv4first");

// const app = express();
// app.set("trust proxy", 1);

// import cors from "cors";
// import "./workers/emailworker.js";
// import path from "path";
// import { fileURLToPath } from "url";
// import { errorHandler } from "./middlerwars/errormiddleware.js";
// import cookieParser from "cookie-parser";
// import connectDB from "./config/db.js";

// // ================= IMPORT ROUTES =================
// import createInstitutionRoutes from "./routes/createinstitutionroutes.js";
// import createTeacherRoutes from "./routes/createteacherroutes.js";
// import createStudentRoutes from "./routes/createstudentroutes.js";
// import authRouter from "./routes/authroutes.js";
// import superAdminRoutes from "./routes/superadminroutes.js";
// import classRoutes from "./routes/classroutes.js";
// import userRoutes from "./routes/userroutes.js";
// import assignmentRoutes from "./routes/assignmentroutes.js";
// import homeworkRoutes from "./routes/homeworkroutes.js";
// import attendanceRoutes from "./routes/attendanceroutes.js";
// import resultRoutes from "./routes/resultroutes.js";
// import announcementRoutes from "./routes/announcementroutes.js";
// import contactRoutes from "./routes/contactroutes.js";
// import feedbackRoutes from "./routes/feedbackroutes.js";
// import reviewRoutes from "./routes/reviewroutes.js";
// import demoRoutes from "./routes/demoroutes.js";
// import dashboardRoutes from "./routes/dashboardroutes.js";
// import teacherRoutes from "./routes/teacherroutes.js";
// import studentRoutes from "./routes/studentdashboard.js";
// import otpRoutes from "./routes/otproutes.js";

// // ================= BASIC SETUP =================
// const port = process.env.PORT || 8000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// // ================= MIDDLEWARE =================
// app.use(express.json());
// app.use(cookieParser());

// // ================= CORS =================
// const allowedOrigins = [
//   "http://localhost:5173",
//   "https://vidayanta.nsjbgroups.com"
// ];

// app.use(cors({
//   origin: function (origin, callback) {
//     if (!origin) return callback(null, true);

//     if (allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("CORS blocked: " + origin));
//     }
//   },
//   credentials: true,
// }));

// // ================= API ROUTES =================
// app.use("/api/auth/institution", createInstitutionRoutes);
// app.use("/api/teachers", createTeacherRoutes);
// app.use("/api/student", createStudentRoutes);
// app.use("/api/auth", authRouter);
// app.use("/api/superadmin", superAdminRoutes);
// app.use("/api/classes", classRoutes);
// app.use("/api/users", userRoutes);
// app.use("/api", assignmentRoutes);
// app.use("/api/homework", homeworkRoutes);
// app.use("/api/attendance", attendanceRoutes);
// app.use("/api/result", resultRoutes);
// app.use("/api/contact", contactRoutes);
// app.use("/api/announcement", announcementRoutes);
// app.use("/api/feedback", feedbackRoutes);
// app.use("/api/review", reviewRoutes);
// app.use("/api/demo", demoRoutes);
// app.use("/api/dashboard", dashboardRoutes);
// app.use("/api/teacher", teacherRoutes);
// app.use("/api/student/dashboard", studentRoutes);
// app.use("/api/forgot", otpRoutes);

// // ================= ERROR HANDLER =================
// app.use(errorHandler);

// // ================= FRONTEND SERVE =================
// const distPath = path.join(__dirname, "dist");

// // // 🔥 serve static files
// // app.use(express.static(distPath));

// // // 🔥 SPA fallback (IMPORTANT)
// // app.use((req, res) => {
// //   res.sendFile(path.join(distPath, "index.html"));
// // });

// // ================= START SERVER =================
// app.listen(port, () => {
//   connectDB();
//   console.log(`🚀 Server running on port ${port}`);
// });

import "./config/env.js"; // 🔥 FIRST LINE

import express from "express";
import dns from "dns";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import "./workers/emailworker.js";

import { errorHandler } from "./middlerwars/errormiddleware.js";
import connectDB from "./config/db.js";

// ================= DNS =================
dns.setDefaultResultOrder("ipv4first");

// ================= APP =================
const app = express();

app.set("trust proxy", 1);

// ================= PORT =================
const port = process.env.PORT || 8000;

// ================= PATH =================
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// =====================================================
// MIDDLEWARE
// =====================================================

// ================= CORS =================
const allowedOrigins = [
  "http://localhost:5173",
  "https://vidayanta.nsjbgroups.com",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests like Postman/server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("❌ CORS BLOCKED:", origin);

      return callback(new Error("CORS blocked: " + origin));
    },

    credentials: true,

    methods: [
      "GET",
      "POST",
      "PUT",
      "PATCH",
      "DELETE",
      "OPTIONS",
    ],

    allowedHeaders: [
      "Content-Type",
      "Authorization",
    ],
  })
);

// ================= PREFLIGHT =================
app.options("*", cors());

// ================= BODY PARSER =================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ================= COOKIE =================
app.use(cookieParser());

// ================= DEBUG REQUEST LOGGER =================
app.use((req, res, next) => {
  console.log("➡️", req.method, req.originalUrl);
  console.log("🌐 Origin:", req.headers.origin || "No Origin");
  next();
});

// =====================================================
// IMPORT ROUTES
// =====================================================

import createInstitutionRoutes from "./routes/createinstitutionroutes.js";
import createTeacherRoutes from "./routes/createteacherroutes.js";
import createStudentRoutes from "./routes/createstudentroutes.js";
import authRouter from "./routes/authroutes.js";
import superAdminRoutes from "./routes/superadminroutes.js";
import classRoutes from "./routes/classroutes.js";
import userRoutes from "./routes/userroutes.js";
import assignmentRoutes from "./routes/assignmentroutes.js";
import homeworkRoutes from "./routes/homeworkroutes.js";
import attendanceRoutes from "./routes/attendanceroutes.js";
import resultRoutes from "./routes/resultroutes.js";
import announcementRoutes from "./routes/announcementroutes.js";
import contactRoutes from "./routes/contactroutes.js";
import feedbackRoutes from "./routes/feedbackroutes.js";
import reviewRoutes from "./routes/reviewroutes.js";
import demoRoutes from "./routes/demoroutes.js";
import dashboardRoutes from "./routes/dashboardroutes.js";
import teacherRoutes from "./routes/teacherroutes.js";
import studentRoutes from "./routes/studentdashboard.js";
import otpRoutes from "./routes/otproutes.js";

// =====================================================
// API ROUTES
// =====================================================

app.use("/api/auth/institution", createInstitutionRoutes);

app.use("/api/teachers", createTeacherRoutes);

app.use("/api/student", createStudentRoutes);

app.use("/api/auth", authRouter);

app.use("/api/superadmin", superAdminRoutes);

app.use("/api/classes", classRoutes);

app.use("/api/users", userRoutes);

app.use("/api", assignmentRoutes);

app.use("/api/homework", homeworkRoutes);

app.use("/api/attendance", attendanceRoutes);

app.use("/api/result", resultRoutes);

app.use("/api/contact", contactRoutes);

app.use("/api/announcement", announcementRoutes);

app.use("/api/feedback", feedbackRoutes);

app.use("/api/review", reviewRoutes);

app.use("/api/demo", demoRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.use("/api/teacher", teacherRoutes);

app.use("/api/student/dashboard", studentRoutes);

app.use("/api/forgot", otpRoutes);

// =====================================================
// HEALTH CHECK
// =====================================================

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Vidayanta Backend is running 🚀",
  });
});

// =====================================================
// ERROR HANDLER
// =====================================================

app.use(errorHandler);

// =====================================================
// START SERVER
// =====================================================

const startServer = async () => {
  try {
    await connectDB();

    app.listen(port, () => {
      console.log("======================================");
      console.log("🚀 VIDYANTA BACKEND STARTED");
      console.log(`🚀 PORT: ${port}`);
      console.log(`🌐 Frontend: https://vidayanta.nsjbgroups.com`);
      console.log("======================================");
    });
  } catch (error) {
    console.error("❌ SERVER STARTUP FAILED");
    console.error(error);

    process.exit(1);
  }
};

startServer();