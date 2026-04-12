import { useState } from "react";
import StudentSidebar from "../components/studentsidebar";
import StudentHeader from "../components/studentheader";

export default function StudentLayout({ children }) {

  const [open, setOpen] = useState(false);

  return (
    <>
      <StudentSidebar open={open} setOpen={setOpen} />
      <StudentHeader setOpen={setOpen} />

      <div className=" md:ml-64 p-2 bg-gray-50 min-h-screen overflow-x-hidden">
        {children}
      </div>
    </>
  );
}