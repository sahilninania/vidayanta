import { useState } from "react";
import TeacherSidebar from "../components/teachersidebar";
import TeacherHeader from "../components/teacherheader";
export default function TeacherLayout({ children }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <TeacherSidebar open={open} setOpen={setOpen} />
      <TeacherHeader setOpen={setOpen} />
      <div className=" md:ml-64 pt-12 bg-gray-50 min-h-screen">
        {children}
      </div>
    </>
  );
}