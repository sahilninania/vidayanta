import "./config/env.js"; // 🔥 FIRST LINE
import express from "express";
const app = express();
import cors from "cors";
import { errorHandler } from "./middlerwars/errormiddleware.js";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
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



const port = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// app.use(cors({
//   origin: "http://localhost:5173",
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true
// }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"], // 🔥 ADD OPTIONS
}));
// app.get("/",(req,res)=>{
//   res.send("backend running ")})


// Routes
app.use("/api/auth/institution", createInstitutionRoutes);
app.use("/api/teachers", createTeacherRoutes);
app.use("/api/student", createStudentRoutes);
app.use("/api/auth", authRouter);
app.use("/api/superadmin", superAdminRoutes);
app.use("/api/classes",classRoutes);
app.use("/api/users", userRoutes);
app.use("/api",assignmentRoutes);
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
app.use(errorHandler);
// Start server
app.listen(port, () => {
  connectDB();
  console.log(`Server is running on port ${port}`);
});