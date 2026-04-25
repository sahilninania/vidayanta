import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import {
  FaHome,
  FaClipboardList,
  FaBook,
  FaBullhorn,
} from "react-icons/fa";
import { MdOutlineAssignmentTurnedIn } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function StudentSidebar({ open, setOpen }) {

  const location = useLocation();
  const navigate = useNavigate();

  // ✅ inline memo (simpler + better)
  const menu = useMemo(() => [
    { name: "Dashboard", path: "/student/dashboard", icon: <FaHome /> },
    { name: "My Attendance", path: "/student/attendance", icon: <MdOutlineAssignmentTurnedIn /> },
    { name: "My Results", path: "/student/results", icon: <FaClipboardList /> },
    { name: "Homework", path: "/student/homework", icon: <FaBook /> },
    { name: "Announcements", path: "/student/announcement", icon: <FaBullhorn /> },
  ], []);

  // ✅ handlers
  const closeSidebar = useCallback(() => setOpen(false), [setOpen]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  return (
    <>
      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* SIDEBAR */}
      <div
        className={`fixed top-0 left-0 h-screen w-64 bg-[#0f2942] text-white z-40 transform transition-transform duration-300
        ${open ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}
      >

        {/* CLOSE */}
        <div className="md:hidden flex justify-end p-3">
          <button onClick={closeSidebar}>
            <IoClose size={24} />
          </button>
        </div>

        {/* LOGO */}
        <div className="flex items-center gap-2 p-3.5">
          <img
            src="/images/logo (1).webp"
            loading="lazy"
            alt="Vidayanta Logo"
            className="w-16 h-9"
          />
          <h1 className="text-lg font-bold text-[#1fa2a6]">
            Vidayanta
          </h1>
        </div>

        {/* LINE */}
        <div className="w-64 h-[1px] bg-[#1fa2a6] "></div>

        {/* MENU */}
        <div className="flex flex-col gap-1 px-2 m-2">
          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2 rounded-md text-m transition
                  ${isActive
                    ? "bg-[#1fa2a6] text-white"
                    : "hover:bg-[#1c3b55] hover:text-[#5eead4] "}
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </div>

        {/* LOGOUT */}
        <div className="absolute bottom-4 w-full px-4">
          <button
            onClick={handleLogout}
            className="w-full bg-[#1fa2a6] py-2 rounded-md hover:bg-[#0d9488] transition active:scale-95"
          >
            Logout
          </button>
        </div>

      </div>
    </>
  );
}