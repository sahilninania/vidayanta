import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  FaHome,
  FaChalkboardTeacher,
  FaSchool,
  FaTasks,
  FaUserGraduate,
  FaClipboardList,
  FaCalendarCheck,
} from "react-icons/fa";
import { PiChalkboardTeacherBold } from "react-icons/pi";
import { GiTeacher } from "react-icons/gi";
import { GrAnnounce } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";

// ✅ memo menu (better for large apps)
const useMenu = () =>
  useMemo(() => [
    { name: "Dashboard", path: "/institution/dashboard", icon: <FaHome /> },
    { name: "Add Teacher", path: "/institution/add-teacher", icon: <FaChalkboardTeacher /> },
    { name: "View Teacher", path: "/teachers/by-institution", icon: <PiChalkboardTeacherBold /> },
    { name: "Add Class", path: "/institution/add-class", icon: <FaSchool /> },
    { name: "Assign Class", path: "/institution/assign-class", icon: <FaTasks /> },
    { name: "View Class", path: "/institution/class", icon: <GiTeacher /> },
    { name: "View Students", path: "/institution/classes", icon: <FaUserGraduate /> },
    { name: "Attendance", path: "/institution/attendance/classes", icon: <FaCalendarCheck /> },
    { name: "View Results", path: "/institution/results/classes", icon: <FaClipboardList /> },
    { name: "Announcement", path: "/institution/announcement", icon: <GrAnnounce /> },
  ], []);

export default function Sidebar({ open, setOpen }) {

  const location = useLocation();
  const navigate = useNavigate();
  const menu = useMenu();

  const isLogout = location.pathname === "/";

  // ✅ optimized handlers
  const closeSidebar = useCallback(() => setOpen(false), [setOpen]);
  // console.log("❌ INSTITUTION SIDEBAR");
  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  return (
    <>
      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0f2942] text-white z-50
          flex flex-col px-4 py-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >

        {/* Close */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={closeSidebar}>
            <RxCross2 size={20} />
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-2 mb-2">
          <img
            src="/images/logo.png"
            loading="lazy"
            alt="Vidayanta Logo"
            className="w-9 h-9"
          />
          <h1 className="text-xl font-bold text-[#1fa2a6]">
            Vidayanta
          </h1>
        </div>

        {/* Line */}
        <div className="w-full h-[1px] bg-[#1fa2a6] mb-2"></div>

        {/* Menu */}
        <div className="flex flex-col gap-1 overflow-y-auto">

          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                  ${isActive
                    ? "bg-[#1fa2a6] text-white"
                    : "hover:bg-[#1c3b55] hover:text-[#5eead4]"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}

        </div>

        {/* Logout */}
        <div className="mt-auto pt-3">
          <button
            onClick={handleLogout}
            className={`
              w-full py-2 rounded-lg text-sm font-semibold transition
              ${isLogout
                ? "bg-red-500 text-white"
                : "bg-teal-500 hover:bg-[#0d9488]"
              }
            `}
          >
            Logout
          </button>
        </div>

      </div>
    </>
  );
}