import { Link, useLocation, useNavigate } from "react-router-dom";
import { useCallback, useMemo } from "react";
import { FaHome, FaPlus, FaList, FaChartLine } from "react-icons/fa";
import { MdFeedback,MdContacts ,MdOutlineRateReview, MdRequestPage} from "react-icons/md";
import { RxCross2 } from "react-icons/rx";


const useMenu = () =>
  useMemo(() => [
    { name: "Dashboard", path: "/superadmin/dashboard", icon: <FaHome /> },
    { name: "Add Institute", path: "/superadmin/create-institution", icon: <FaPlus /> },
    { name: "View Institutes", path: "/superadmin/institutions", icon: <FaList /> },
    { name: "Analytics", path: "/superadmin/analytics", icon: <FaChartLine /> },
    { name: "Demo Requests", path: "/superadmin/demo", icon: <MdRequestPage /> },
    { name: "Contacts", path: "/superadmin/contacts", icon: <MdContacts /> },
    { name: "Feedbacks", path: "/superadmin/feedbacks", icon: <MdFeedback /> },
    { name: "Reviews", path: "/superadmin/reviews", icon: <MdOutlineRateReview /> },
  ], []);

export default function SuperadminSidebar({ open, setOpen }) {
  const location = useLocation();
  const navigate = useNavigate();
  const menu = useMenu();

  const isLogout = location.pathname === "/";

  const closeSidebar = useCallback(() => setOpen(false), [setOpen]);
  const handleLogout = useCallback(() => {
    localStorage.clear();
    navigate("/");
  }, [navigate]);

  return (
    <>
      {/* 🔥 Overlay (mobile only) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* 🔥 Sidebar */}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0f2942] text-white z-50
          flex flex-col px-4 py-4

          ${open ? "translate-x-0" : "-translate-x-full"}
          transform transition-transform duration-300 ease-in-out

          md:translate-x-0  md:top-0
        `}
      >

        {/* 🔥 Mobile Close */}
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={closeSidebar}>
            <RxCross2 size={22} />
          </button>
        </div>

        {/* 🔥 Logo */}
        <div className="flex items-center gap-2 mb-4">
          <img src="/images/logo (1).webp" alt="logo" className="w-9 h-9" />
          <h1 className="text-lg md:text-xl font-bold text-[#1fa2a6]">
            Vidayanta
          </h1>
        </div>

        {/* 🔥 Divider */}
        <div className="w-full h-[1px] bg-[#1fa2a6] mb-3"></div>

        {/* 🔥 Menu */}
        <div className="flex flex-col gap-1 flex-1 overflow-y-auto min-h-0">

          {menu.map((item) => {
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                onClick={closeSidebar} // 🔥 auto close mobile
                className={`
                  flex items-center gap-3 px-3 py-2 rounded-md text-m md:text-base transition

                  ${isActive
                    ? "bg-[#1fa2a6] text-white shadow"
                    : "hover:bg-[#1c3b55] hover:text-[#5eead4]"
                  }
                `}
              >
                <span className="text-lg">{item.icon}</span>
                {item.name}
              </Link>
            );
          })}

        </div>

        {/* 🔥 Logout */}
        <div className="mt-auto pt-3 pb-2">
          <button
            onClick={handleLogout}
            className={`
              w-full py-2 rounded-lg text-sm md:text-base font-semibold transition
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