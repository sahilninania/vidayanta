import axios from "axios";
axios.defaults.withCredentials = true;
import "./index.css";
import { Route, Routes } from "react-router-dom";
import CreateInstitution from "./pages/createinstitution";
import Home from "./pages/home";
import Login from "./pages/loginpage";
import About from "./pages/about";
import ViewInstitutions from "./pages/viewinstituion";
import HowItWork from "./components/howitworkshome";
import Features from "./components/featureshome";
import Pricing from "./pages/pricing";
import Contact from "./pages/contact";
import SuperadminDashboard from "./pages/superadmin"
import EditStudent from "./pages/editstudent";
import AddTeacher from "./pages/createteacher"
import AddClass from "./pages/class";
import TeacherDashboard from "./pages/teacherdashboard"
import  AddStudent from "./pages/createstudent";
import ViewTeachers from "./pages/viewteacher";
// import InstitutionClasses from "./pages/insitutionclasses";
import ClassStudents from "./pages/insitutionstudent";
import Attendance from "./pages/insitutionattandence";
import ClassAttendance from "./pages/institutionclassattandence";
import Results from "./pages/institutionresults";
import ClassResults from "./pages/insitutionclassresults";
import AssignClass from "./pages/assignclass";
import AssignTeacher from "./pages/assignteacher";
import ViewClasses from "./pages/viewclass";
import MyClass from "./pages/myclass";
import GiveHomework from "./pages/givehomework";
import ViewHomework from "./pages/viewhomeworkteacher";
import UploadAttendance from "./pages/uploadattendance";
import ViewAttendance from "./pages/viewattendance";
import UploadResults from "./pages/uploadresult";
import ViewResult from "./pages/viewresult";
import StudentDashboard from "./pages/studentdashboard";
import StudentAttendance from "./pages/studentattendance";
import StudentResults from "./pages/studentresult";
import StudentHomework from "./pages/studenthomework";
import InstitutionClasses from "./pages/insitutionclasses";
import InstitutionStudents from "./pages/insitutionstudent";
import AttendanceClasses from "./pages/attendanceclasses";
import AttendanceStudents from "./pages/attendancestudent";
import AttendanceView from "./pages/attendanceview";
import ResultClasses from "./pages/resultclasses";
import ResultStudents from "./pages/resultstudents";
import ResultView from "./pages/resultview";
import Announcements from "./pages/insititutionannouncementlist";
import CreateAnnouncement from "./pages/insititutionannouncementcreate";
import TeacherAnnouncement from "./pages/teacherannouncement";
import TeacherCreateAnnouncement from "./pages/teachercreateannouncement";
import StudentAnnouncement from "./pages/studentannouncement";
import FeedbackPage from "./pages/feedback";
import ReviewPage from "./pages/review";
import RequestDemo from "./pages/requestdemo";
import ViewContacts from "./pages/superadmincontact";
import ViewFeedback from "./pages/superadminfeedback"
import ViewReviews from "./pages/superadminrewies";
import EditTeacher from "./pages/editteacher";
import InstitutionDashboard from "./pages/insitutiondashboard";
import ForgotPassword from "./pages/forgotpassword";
import ViewSingleClass from "./pages/insititutionviewsingleclass";
import EditClass from "./pages/insitutioneditclass";
import EditHomework from "./pages/edithomework";
import EditAttendance from "./pages/editattendance";
import EditResult from "./pages/editresult";
import EditInstitution from "./pages/editinstitution";
import StudentFullResult from "./pages/studentfullresult";
import EditAnnouncement from "./pages/editannouncement";
import DemoRequests from "./pages/demorequests";
import InstitutionDetails from "./pages/institutiondetails";
import Analytics from "./pages/analytics"
import TeacherEditAnnouncement from "./pages/teachereditannouncement"
// import Superadminlayout from "../layout/superadmindashboardlayout";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/feature" element={<Features/>}/>
      <Route path="/howitworks" element={<HowItWork/>}/>
      <Route path="/pricing" element={<Pricing/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route path="/superadmin/dashboard" element={<SuperadminDashboard  />} />
      <Route path="/superadmin/create-institution" element={<CreateInstitution/>}/>
      <Route path="/superadmin/institutions" element={<ViewInstitutions />}/>
       <Route path="/institution/add-teacher" element={<AddTeacher/>}/>
      <Route path="/institution/assign-class" element={<AssignClass />} />
      <Route path="/institution/assign/:id" element={<AssignTeacher />} />
      <Route path="/institution/class" element={<ViewClasses />} />
      <Route path="/institution/add-class" element={<AddClass />} />
      <Route path="/institution/classes" element={<InstitutionClasses />} />
      <Route path="/institution/students" element={<InstitutionStudents />} />
       <Route path="/teacher/dashboard" element={<TeacherDashboard/>}></Route>
       <Route path ="/classes" element={<ClassPage/>}></Route>
       <Route path ="/class/:id" element={<ClassStudents/>}></Route>
       <Route path="/teacher/add-students" element={<AddStudent/>}></Route>
       <Route path="/teachers/by-institution" element={<ViewTeachers/>}></Route>
       <Route path="/teacher/my-class" element={<MyClass />} />
       <Route path="/attendance" element={<Attendance />} />
       <Route path="/attendance/:id" element={<ClassAttendance />} />
       <Route path="/results" element={<Results />} />
       <Route path="/results/:id" element={<ClassResults />} />
       <Route path="/teacher/give-homework" element={<GiveHomework />} />
       <Route path="/teacher/view-homework" element={<ViewHomework />} />
       <Route path="/teacher/upload-attendance" element={<UploadAttendance />} />
       <Route path="/teacher/view-attendance" element={<ViewAttendance />} />
       <Route path="/teacher/upload-results" element={<UploadResults />} />
        <Route path="/teacher/view-results" element={<ViewResult />} />
        <Route path="/student/dashboard" element={<StudentDashboard />} />       
        <Route path="/student/attendance" element={<StudentAttendance />} />
        <Route path="/student/results" element={<StudentResults />} />
        <Route path="/student/homework" element={<StudentHomework />} />
        <Route path="/institution/attendance/classes" element={<AttendanceClasses />} />
        <Route path="/institution/attendance/students" element={<AttendanceStudents />} />
        <Route path="/institution/attendance/view" element={<AttendanceView />} />
        <Route path="/institution/results/classes" element={<ResultClasses />} />
        <Route path="/institution/results/students" element={<ResultStudents />} />
        <Route path="/institution/results/view" element={<ResultView />} />
        <Route path="/institution/announcement" element={<Announcements />} />
        <Route path="/institution/announcement/create" element={<CreateAnnouncement />} />
        <Route path="/teacher/announcement" element={<TeacherAnnouncement />} />
        <Route path="/teacher/announcement/create" element={<TeacherCreateAnnouncement />} />
        <Route path="/student/announcement" element={<StudentAnnouncement />} />
        <Route path="/feedback" element={<FeedbackPage />} />
         <Route path="/reviews" element={<ReviewPage />} />
         <Route path="/request-demo" element={<RequestDemo />} />
        <Route path="/superadmin/contacts" element={<ViewContacts />} />
        <Route path="/superadmin/feedbacks" element={<ViewFeedback />} />
        <Route path="/superadmin/reviews" element={<ViewReviews />} />
        <Route path="/institution/edit-teacher/:id" element={<EditTeacher />} />
        <Route path="/institution/dashboard" element={<InstitutionDashboard />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/institution/class/:id" element={<ViewSingleClass />} />
        <Route path="/institution/edit-class/:id" element={<EditClass />} />
        <Route path="/teacher/edit-student/:id" element={<EditStudent />} />
        <Route path="/teacher/homework/edit" element={<EditHomework />} />
        <Route path="/teacher/attendance/edit" element={<EditAttendance />} />
        <Route path="/teacher/result/edit" element={<EditResult />} />
        <Route path="/edit-institution/:id" element={<EditInstitution />} />
        <Route path="/teacher/student-result/:id" element={<StudentFullResult />}/>
        <Route path="/institution/announcement/edit/:id" element={<EditAnnouncement />} />
        <Route path="/superadmin/demo" element={<DemoRequests />} />
        <Route path="/superadmin/analytics" element={<Analytics />} />
        <Route path="/superadmin/institution/:id" element={<InstitutionDetails />} />  
        <Route path="/teacher/announcement/edit/:id" element={<TeacherEditAnnouncement />}/>
    </Routes>
  );
}

export default App;


 