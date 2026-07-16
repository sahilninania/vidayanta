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
import axios from "axios";
import API_URL from "../config/api.js";
import StudentLayout from "../layout/studentdashboardlayout";

export default function StudentAnnouncement() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
          setData(res.data?.data || []);
        }
      } catch (error) {
        console.error("Announcement Error:", error);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchAnnouncements();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StudentLayout title="Announcements">
      <div className="min-h-screen bg-gray-100 p-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white shadow-lg mb-8">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center">

            <div>
              <h1 className="text-3xl font-bold">
                📢 Announcements
              </h1>

              <p className="mt-2 text-teal-100">
                Stay updated with the latest notices from your school.
              </p>
            </div>

            <div className="mt-5 md:mt-0 bg-white/20 rounded-xl px-6 py-4 text-center">
              <p className="text-sm">Total Announcements</p>

              <h2 className="text-3xl font-bold">
                {data.length}
              </h2>
            </div>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-14 w-14 border-4 border-teal-500 border-t-transparent"></div>
          </div>
        )}

        {/* Announcement List */}
        {!loading && data.length > 0 && (
          <div className="space-y-6">
            {data.map((item, index) => {
              const createdDate = new Date(item.createdAt);

              const isNew =
                Date.now() - createdDate.getTime() <
                24 * 60 * 60 * 1000;

              return (
                <div
                  key={item._id || index}
                  className="bg-white rounded-2xl shadow-md border border-gray-200 hover:shadow-xl hover:-translate-y-1 transition duration-300"
                >
                  <div className="p-6">

                    {/* Top */}
                    <div className="flex justify-between items-start">

                      <div className="flex items-start">

                        <div className="w-14 h-14 rounded-full bg-teal-100 flex items-center justify-center text-2xl">
                          📢
                        </div>

                        <div className="ml-4">

                          <h2 className="text-xl font-bold text-gray-800">
                            {item.title}
                          </h2>

                          <p className="text-sm text-gray-500 mt-1">
                            {createdDate.toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            })}
                            {" • "}
                            {createdDate.toLocaleTimeString("en-IN", {
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </p>

                        </div>

                      </div>

                      {isNew && (
                        <span className="bg-red-500 text-white text-xs font-semibold px-3 py-1 rounded-full animate-pulse">
                          NEW
                        </span>
                      )}

                    </div>

                    {/* Message */}
                    <div className="mt-6 border-l-4 border-teal-500 pl-4">

                      <p className="text-gray-700 leading-7 whitespace-pre-line">
                        {item.message || "No announcement message."}
                      </p>

                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Empty */}
        {!loading && data.length === 0 && (
          <div className="bg-white rounded-2xl shadow-md p-16 text-center">

            <div className="text-6xl mb-4">
              📭
            </div>

            <h2 className="text-2xl font-bold text-gray-700">
              No Announcements
            </h2>

            <p className="text-gray-500 mt-2">
              There are no announcements available right now.
            </p>

          </div>
        )}

      </div>
    </StudentLayout>
  );
}