import { Link, useLocation } from "react-router-dom";
import {
  FaHome,
  FaUserGraduate,
  FaClipboardList,
  FaCalendarCheck,
  FaBullhorn
} from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { SiGoogleclassroom } from "react-icons/si";
import { GiNotebook } from "react-icons/gi";
import { TbNotebook } from "react-icons/tb";
import { LuListTodo } from "react-icons/lu";
import { IoDocumentAttachSharp } from "react-icons/io5";
import { IoSettings } from "react-icons/io5";

  const menu = [
    { name: "Dashboard", path: "/teacher/dashboard", icon: <FaHome/> },
    { name: "Add Students", path: "/teacher/add-students", icon: <FaUserGraduate/> },
    { name :"My Class" , path: "/teacher/my-class", icon:<SiGoogleclassroom/>},
    { name :"Give Homework" , path: "/teacher/give-homework", icon:<GiNotebook/>},
    { name :"View homework" , path: "/teacher/view-homework", icon:<TbNotebook/>},
    { name: "Upload Attendance", path: "/teacher/upload-attendance", icon: <FaCalendarCheck/> },
    { name: "View Attendance", path: "/teacher/view-attendance", icon: <LuListTodo/> },
    { name: "Upload Results", path: "/teacher/upload-results", icon: <FaClipboardList/> },
    { name: "View Results", path: "/teacher/view-results", icon: <IoDocumentAttachSharp/> },
    { name: "Announcements", path: "/teacher/announcement", icon: <FaBullhorn/> },
    // { name: "Setting" , path :"/teacher/setting" , icon :<IoSettings/>}
  ];
  export default function TeacherSidebar({ open, setOpen }) {
  const location = useLocation();
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setOpen(false)}
        />
      )}
      <div
        className={`
          fixed top-0 left-0 h-screen w-64 bg-[#0f2942] text-white z-50
          flex flex-col px-4 py-4
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        <div className="md:hidden flex justify-end mb-2">
          <button onClick={() => setOpen(false)}>
            <RxCross2 size={20}/>
          </button>
        </div>
        <div className="flex items-center gap-2 mb-2">
          <img 
          src="/images/logo.png"
          loading="lazy"
          alt="Vidayanta Logo"
          className="w-9 h-9"/>
          <h1 className="text-xl font-bold text-[#1fa2a6]">
            Vidayanta
          </h1>
        </div>
        <div className="w-full h-1px bg-[#1fa2a6] mb-2"></div>
        <div className="flex flex-col gap-1 overflow-y-auto">
          {menu.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`
                flex items-center gap-3 px-3 py-2 rounded-md text-sm transition
                ${location.pathname === item.path
                  ? "bg-[#1fa2a6] text-white"
                  : "hover:bg-[#1c3b55] hover:text-[#5eead4]"
                }
              `}
            >
              {item.icon}
              {item.name}
            </Link>
          ))}

        <div className="absolute bottom-4 w-full px-4 flex justify-center">
          <button
            className="w-full bg-[#1fa2a6] py-2 rounded-md mr-10"
            onClick={() => {
              localStorage.clear();
              window.location.href = "/";
            }}
          >
            Logout
          </button>
        </div>
        </div>
      </div>
    </>
  );
}