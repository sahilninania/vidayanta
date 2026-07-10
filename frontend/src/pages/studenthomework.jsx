// import { useEffect, useState, useMemo } from "react";
// import StudentLayout from "../layout/studentdashboardlayout";
// import axios from "axios";
// import API_URL from "../config/api.js";
// export default function StudentHomework() {

//   // ✅ STATE (object because backend grouped data bhej raha hai)
//   const [data, setData] = useState({});

//   const studentId = useMemo(() => {
//     return localStorage.getItem("studentId");
//   }, []);

//   useEffect(() => {
//     const fetchHomework = async () => {
//       try {
//         if (!studentId) return;

//         const res = await axios.get(
//           `${API_URL}/api/homework/student?studentId=${studentId}`
//         );

//         // ✅ direct set (no array check)
//         setData(res?.data?.data || {});

//       } catch (error) {
//         console.log("Homework Error:", error);
//       }
//     };

//     fetchHomework();
//   }, [studentId]);

//   return (
//     <StudentLayout>
//       <div className="p-4">

//         {/* 🔥 TITLE */}
//         <h1 className="text-2xl font-bold text-[#1fa2a6] mb-6">
//           Homework
//         </h1>

//         {/* ❌ NO DATA */}
//         {Object.keys(data).length === 0 ? (
//           <p className="text-gray-500">No Homework</p>
//         ) : (

//           // ✅ DIRECT OBJECT RENDER (NO GROUPING AGAIN)
//           Object.entries(data).map(([date, items]) => (

//             <div key={date} className="mb-6">

//               {/* 📅 DATE */}
//               <h2 className="text-lg font-semibold mb-2 text-gray-700">
//                 {date}
//               </h2>

//               {/* 📦 TABLE */}
//               <div className="bg-white shadow-2 rounded border overflow-x-auto">

//                 <table className="w-full text-m text-start table-fixed">
//                   <thead className="bg-gray-200 ">
//                     <tr>
//                       <th className="p-2  text-start border w-2/6">Subject</th>
//                       <th className="p-2  text-start border w-4/6">Homework</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {items.map((hw, i) => (
//                       <tr key={i} className="border-t">
//                         <td className="p-2 border">{hw.subject}</td>
//                         <td className="p-2 border whitespace-pre-line">{hw.description}</td>
//                       </tr>
//                     ))}
//                   </tbody>

//                 </table>

//               </div>

//             </div>
//           ))
//         )}

//       </div>
//     </StudentLayout>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

export default function StudentHomework() {
  const [data, setData] = useState({});

  const studentId = useMemo(() => {
    return localStorage.getItem("studentId");
  }, []);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        if (!studentId) return;

        const res = await axios.get(
          `${API_URL}/api/homework/student?studentId=${studentId}`
        );

        setData(res?.data?.data || {});
      } catch (error) {
        console.log("Homework Error:", error);
      }
    };

    fetchHomework();
  }, [studentId]);

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-6 text-white shadow-lg mb-8">
          <h1 className="text-3xl font-bold">📚 Homework</h1>
          <p className="mt-2 text-cyan-100">
            View all homework assigned by your teachers.
          </p>
        </div>

        {/* Empty State */}
        {Object.keys(data).length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">
            <div className="text-6xl mb-4">📭</div>
            <h2 className="text-xl font-semibold text-gray-700">
              No Homework Found
            </h2>
            <p className="text-gray-500 mt-2">
              Your teachers haven't assigned any homework yet.
            </p>
          </div>
        ) : (
          Object.entries(data).map(([date, items]) => (
            <div key={date} className="mb-10">

              {/* Date */}
              <div className="flex items-center gap-3 mb-5">
                <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
                  📅
                </div>

                <div>
                  <h2 className="font-bold text-xl text-gray-800">
                    {new Date(date).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </h2>

                  <p className="text-gray-500 text-sm">
                    Homework assigned on this date
                  </p>
                </div>
              </div>

              {/* Homework Cards */}
              <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                {items.map((hw) => (
                  <div
                    key={hw._id}
                    className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border"
                  >

                    {/* Card Header */}
                    <div className="bg-cyan-500 text-white px-5 py-4">
                      <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                        {hw.subject}
                      </span>
                    </div>

                    {/* Card Body */}
                    <div className="p-5">

                      <h3 className="font-semibold text-gray-800 mb-3">
                        Homework
                      </h3>

                      <p className="text-gray-600 whitespace-pre-line leading-7">
                        {hw.description}
                      </p>

                    </div>

                  </div>
                ))}

              </div>
            </div>
          ))
        )}
      </div>
    </StudentLayout>
  );
}