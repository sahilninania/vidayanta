import { HiMenu } from "react-icons/hi";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useState, useCallback } from "react";

export default function StudentHeader({ setOpen }) {

  // ✅ safe + no re-render issue
  const [studentName] = useState(() => {
    return localStorage.getItem("studentName") || "Student";
  });

  // ✅ optimized handler
  const openSidebar = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 md:left-64 w-full md:w-[calc(100%-16rem)] h-16 bg-[#0f2942] border-b border-[#1fa2a6] flex items-center justify-between px-4 z-50">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <button
            onClick={openSidebar}
            className="md:hidden text-white"
          >
            <HiMenu size={26} />
          </button>

          <h1 className="text-white font-semibold text-lg">
            <span className="md:hidden text-[#1fa2a6]">
              Vidayanta
            </span>

            <span className="ml-2 hidden md:inline">
              Student Dashboard
            </span>
          </h1>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-4 text-white">
          <FaUserCircle size={22} />

          <span className="hidden md:block">
            {studentName}
          </span>

          <FaBell size={20} />
        </div>
      </div>

      {/* FIXED LINE */}
      <div className="w-full h-[1px] bg-[#1fa2a6] mt-16"></div>
    </>
  );
}