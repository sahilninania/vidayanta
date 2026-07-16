// import { useEffect, useState } from "react";
// import API_URL from "../config/api.js";
// import StudentLayout from "../layout/studentdashboardlayout";
// import axios from "axios";

// export default function StudentAnnouncement() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     let isMounted = true; // prevent memory leak

//     const fetch = async () => {
//       try {
//         const institutionCode = localStorage.getItem("institutionCode");
//         const className = localStorage.getItem("className");
//         const section = localStorage.getItem("section");
//          console.log(
//               localStorage.getItem("className"),
//               localStorage.getItem("section")
//             );
//         const res = await axios.get(
//           `${API_URL}/api/announcement/get?role=student&institutionCode=${institutionCode}&className=${className}&section=${section}`
//         );
//         console.log("ANNOUNCEMENTS 👉", data);
//         if (isMounted) {
//           setData(res.data.data);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetch();

//     return () => {
//       isMounted = false;
//     };
//   }, []);

//   return (
//     <StudentLayout title="Announcements">
//       <div className="p-6 bg-gray-100 min-h-screen">

//         <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
//           Announcements
//         </h1>

//         {data.length > 0 ? (
//           <div className="space-y-4">
//             {data.map((item, i) => {
//               const formattedDate = new Date(
//                 item.createdAt
//               ).toLocaleString();

//               return (
//                 <div
//                   key={i}
//                   className="bg-white border rounded-xl shadow p-4"
//                 >
//                   <h2 className="font-bold text-lg text-[#1fa2a6]">
//                     {item.title}
//                   </h2>

//                   <p className="text-gray-700 mt-2  whitespace-pre-line">
//                     {item.message || "No description"}
//                   </p>

//                   <p className="text-sm text-gray-500 mt-2">
//                     {formattedDate}
//                   </p>
//                 </div>
//               );
//             })}
//           </div>
//         ) : (
//           <p className="text-gray-500 text-center mt-10">
//             No announcements available
//           </p>
//         )}

//       </div>
//     </StudentLayout>
//   );
// }

import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";
import {
  Megaphone,
  CalendarDays,
  BellRing,
  Inbox,
} from "lucide-react";

export default function StudentAnnouncement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true;

    const fetchAnnouncements = async () => {
      try {
        const institutionCode = localStorage.getItem("institutionCode");
        const className = localStorage.getItem("className");
        const section = localStorage.getItem("section");

        const res = await axios.get(
          `${API_URL}/api/announcement/get?role=student&institutionCode=${institutionCode}&className=${className}&section=${section}`
        );

        if (isMounted) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StudentLayout title="Announcements">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white p-6">

        {/* Header */}
        <div className="mb-8 rounded-3xl bg-gradient-to-r from-teal-500 to-cyan-600 p-6 text-white shadow-xl">
          <div className="flex items-center gap-4">
            <div className="rounded-2xl bg-white/20 p-4 backdrop-blur">
              <BellRing size={34} />
            </div>

            <div>
              <h1 className="text-3xl font-bold">
                Announcements
              </h1>

              <p className="text-teal-100 mt-1">
                Stay updated with the latest school announcements.
              </p>
            </div>

            <div className="ml-auto hidden md:flex">
              <div className="rounded-2xl bg-white/20 px-5 py-3 backdrop-blur">
                <p className="text-sm text-teal-100">
                  Total
                </p>

                <h2 className="text-3xl font-bold">
                  {data.length}
                </h2>
              </div>
            </div>
          </div>
        </div>

        {/* Cards */}
        {data.length > 0 ? (
          <div className="space-y-5">
            {data.map((item, i) => {
              const created = new Date(item.createdAt);

              const formattedDate = created.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "long",
                year: "numeric",
              });

              const formattedTime = created.toLocaleTimeString("en-IN", {
                hour: "2-digit",
                minute: "2-digit",
              });

              const isNew =
                Date.now() - created.getTime() <
                1000 * 60 * 60 * 24;

              return (
                <div
                  key={i}
                  className="group rounded-2xl bg-white border border-gray-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex justify-between items-start">

                    <div className="flex items-center gap-3">
                      <div className="rounded-xl bg-teal-100 p-3">
                        <Megaphone
                          className="text-teal-600"
                          size={22}
                        />
                      </div>

                      <div>
                        <h2 className="text-xl font-bold text-gray-800">
                          {item.title}
                        </h2>

                        <div className="flex items-center gap-2 text-gray-500 text-sm mt-1">
                          <CalendarDays size={15} />

                          {formattedDate} • {formattedTime}
                        </div>
                      </div>
                    </div>

                    {isNew && (
                      <span className="rounded-full bg-red-500 px-3 py-1 text-xs font-semibold text-white animate-pulse">
                        NEW
                      </span>
                    )}
                  </div>

                  <div className="mt-5 border-l-4 border-teal-500 pl-4">
                    <p className="text-gray-700 leading-7 whitespace-pre-line">
                      {item.message}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center rounded-3xl bg-white py-20 shadow">
            <div className="rounded-full bg-teal-100 p-6">
              <Inbox
                size={55}
                className="text-teal-600"
              />
            </div>

            <h2 className="mt-6 text-2xl font-bold text-gray-700">
              No Announcements
            </h2>

            <p className="mt-2 text-gray-500">
              You're all caught up! Check back later.
            </p>
          </div>
        )}
      </div>
    </StudentLayout>
  );
}