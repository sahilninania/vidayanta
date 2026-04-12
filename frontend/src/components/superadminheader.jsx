import { HiMenu } from "react-icons/hi";
import { FaBell, FaUserCircle } from "react-icons/fa";
import { useCallback } from "react";

export default function SuperadminHeader({ setOpen }) {

  // ✅ optimized handler
  const openSidebar = useCallback(() => {
    setOpen(true);
  }, [setOpen]);

  return (
    <>
      <div className="fixed top-0 left-0 md:left-64 right-0 h-16 bg-[#0f2942] border-b border-[#1fa2a6] flex items-center justify-between px-4 md:px-6 z-40">

        {/* LEFT */}
        <div className="flex items-center gap-3">

          {/* Hamburger */}
          <button
            onClick={openSidebar}
            className="md:hidden text-white"
          >
            <HiMenu size={26} />
          </button>

          <h1 className="text-white text-lg md:text-xl font-semibold">

            {/* MOBILE */}
            <span className="md:hidden text-[#1fa2a6]">
              Vidayanta
            </span>

            {/* DESKTOP */}
            <span className="hidden md:inline">
              Super Admin Dashboard
            </span>

          </h1>

        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5 text-white">

          <div className="flex items-center gap-2">
            <FaUserCircle size={22} />
            <span className="hidden md:block">
              NSJB Groups
            </span>
          </div>

          <FaBell size={20} />

        </div>

      </div>

      {/* FIXED HEIGHT LINE */}
      <div className="w-full h-[1px] bg-[#1fa2a6] mt-16 mb-3"></div>
    </>
  );
}