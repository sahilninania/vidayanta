// import { useEffect, useState } from "react";
// import API_URL from "../config/api.js";
// import StudentLayout from "../layout/studentdashboardlayout";
// import axios from "axios";

// export default function StudentAttendance() {
//   const [data, setData] = useState([]);
//   const [summary, setSummary] = useState({});
//   const [info, setInfo] = useState({});

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentId = localStorage.getItem("studentId");

//         const res = await axios.get(
//           `${API_URL}/api/attendance/student?studentId=${studentId}`
//         );

//         setData(res.data.records || []);
//         setSummary(res.data.summary || {});
//         setInfo({
//           className: res.data.className,
//           teacherName: res.data.teacherName,
//         });
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // 🔹 LOADING
//   if (!summary) {
//     return <p className="p-6 font-bold">Loading...</p>;
//   }

//   return (
//     <StudentLayout title="Attendance">
//       <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

//         {/* 🔥 TITLE */}
//         <h2 className="text-2xl font-bold text-[#1fa2a6]">
//           Attendance Details
//         </h2>

//         {/* 🔥 INFO BOX */}
//         <div className="bg-white rounded-xl shadow border p-4">
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

//             <div className="p-3 border rounded">
//               <b>Class Name:</b> {info?.className || "N/A"}
//             </div>

//             <div className="p-3 border rounded">
//               <b>Class Incharge:</b> {info?.teacherName || "N/A"}
//             </div>

//             <div className="p-3 border rounded">
//               <b>Total Classes:</b> {summary?.total || 0}
//             </div>

//             <div className="p-3 border rounded">
//               <b>Present:</b> {summary?.present || 0}
//             </div>

//             <div className="p-3 border rounded">
//               <b>Absent:</b> {summary?.absent || 0}
//             </div>

//             <div className="p-3 border rounded">
//               <b>Percentage:</b>{" "}
//               <span className="text-green-600 font-semibold">
//                 {summary?.percentage || 0}%
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* 🔥 TABLE */}
//         <div className="bg-white p-4 rounded-xl shadow border overflow-x-auto">
//           <table className="w-full text-sm text-center">

//             <thead className="bg-gray-200">
//               <tr>
//                 <th className="border p-2">#</th>
//                 <th className="border p-2">Date</th>
//                 <th className="border p-2">Status</th>
//               </tr>
//             </thead>

//             <tbody>
//               {(data || []).length > 0 ? (
//                 data.map((item, index) => (
//                   <tr key={index} className="border-t hover:bg-gray-50">

//                     <td className="p-2">{index + 1}</td>

//                     <td className="p-2">
//                       {new Date(item.date).toLocaleDateString()}
//                     </td>

//                     <td
//                       className={`p-2 font-semibold ${
//                         item.status === "present"
//                           ? "text-green-600"
//                           : "text-red-500"
//                       }`}
//                     >
//                       {item.status?.toUpperCase()}
//                     </td>

//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="3" className="p-4 text-gray-500">
//                     📭 No attendance records
//                   </td>
//                 </tr>
//               )}
//             </tbody>

//           </table>
//         </div>
//       </div>
//     </StudentLayout>
//   );
// }

// // import { useEffect, useState, useMemo } from "react";
// // import StudentLayout from "../layout/studentdashboardlayout";
// // import axios from "axios";
// // import API_URL from "../config/api.js";
// // export default function StudentHomework() {

// //   // ✅ STATE (object because backend grouped data bhej raha hai)
// //   const [data, setData] = useState({});

// //   const studentId = useMemo(() => {
// //     return localStorage.getItem("studentId");
// //   }, []);

// //   useEffect(() => {
// //     const fetchHomework = async () => {
// //       try {
// //         if (!studentId) return;

// //         const res = await axios.get(
// //           `${API_URL}/api/homework/student?studentId=${studentId}`
// //         );

// //         // ✅ direct set (no array check)
// //         setData(res?.data?.data || {});

// //       } catch (error) {
// //         console.log("Homework Error:", error);
// //       }
// //     };

// //     fetchHomework();
// //   }, [studentId]);

// //   return (
// //     <StudentLayout>
// //       <div className="p-4">

// //         {/* 🔥 TITLE */}
// //         <h1 className="text-2xl font-bold text-[#1fa2a6] mb-6">
// //           Homework
// //         </h1>

// //         {/* ❌ NO DATA */}
// //         {Object.keys(data).length === 0 ? (
// //           <p className="text-gray-500">No Homework</p>
// //         ) : (

// //           // ✅ DIRECT OBJECT RENDER (NO GROUPING AGAIN)
// //           Object.entries(data).map(([date, items]) => (

// //             <div key={date} className="mb-6">

// //               {/* 📅 DATE */}
// //               <h2 className="text-lg font-semibold mb-2 text-gray-700">
// //                 {date}
// //               </h2>

// //               {/* 📦 TABLE */}
// //               <div className="bg-white shadow-2 rounded border overflow-x-auto">

// //                 <table className="w-full text-m text-start table-fixed">
// //                   <thead className="bg-gray-200 ">
// //                     <tr>
// //                       <th className="p-2  text-start border w-2/6">Subject</th>
// //                       <th className="p-2  text-start border w-4/6">Homework</th>
// //                     </tr>
// //                   </thead>

// //                   <tbody>
// //                     {items.map((hw, i) => (
// //                       <tr key={i} className="border-t">
// //                         <td className="p-2 border">{hw.subject}</td>
// //                         <td className="p-2 border whitespace-pre-line">{hw.description}</td>
// //                       </tr>
// //                     ))}
// //                   </tbody>

// //                 </table>

// //               </div>

// //             </div>
// //           ))
// //         )}

// //       </div>
// //     </StudentLayout>
// //   );
// // }

// import { useEffect, useState, useMemo } from "react";
// import StudentLayout from "../layout/studentdashboardlayout";
// import axios from "axios";
// import API_URL from "../config/api.js";

// export default function StudentHomework() {
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

//         setData(res?.data?.data || {});
//       } catch (error) {
//         console.log("Homework Error:", error);
//       }
//     };

//     fetchHomework();
//   }, [studentId]);

//   return (
//     <StudentLayout>
//       <div className="min-h-screen bg-gray-100 p-4 md:p-6">

//         {/* Header */}
//         <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-6 text-white shadow-lg mb-8">
//           <h1 className="text-3xl font-bold">📚 Homework</h1>
//           <p className="mt-2 text-cyan-100">
//             View all homework assigned by your teachers.
//           </p>
//         </div>

//         {/* Empty State */}
//         {Object.keys(data).length === 0 ? (
//           <div className="bg-white rounded-2xl shadow p-10 text-center">
//             <div className="text-6xl mb-4">📭</div>
//             <h2 className="text-xl font-semibold text-gray-700">
//               No Homework Found
//             </h2>
//             <p className="text-gray-500 mt-2">
//               Your teachers haven't assigned any homework yet.
//             </p>
//           </div>
//         ) : (
//           Object.entries(data).map(([date, items]) => (
//             <div key={date} className="mb-10">

//               {/* Date */}
//               <div className="flex items-center gap-3 mb-5">
//                 <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center text-white">
//                   📅
//                 </div>

//                 <div>
//                   <h2 className="font-bold text-xl text-gray-800">
//                     {new Date(date).toLocaleDateString("en-IN", {
//                       day: "numeric",
//                       month: "long",
//                       year: "numeric",
//                     })}
//                   </h2>

//                   <p className="text-gray-500 text-sm">
//                     Homework assigned on this date
//                   </p>
//                 </div>
//               </div>

//               {/* Homework Cards */}
//               <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

//                 {items.map((hw) => (
//                   <div
//                     key={hw._id}
//                     className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border"
//                   >

//                     {/* Card Header */}
//                     <div className="bg-cyan-500 text-white px-5 py-4">
//                       <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
//                         {hw.subject}
//                       </span>
//                     </div>

//                     {/* Card Body */}
//                     <div className="p-5">

//                       <h3 className="font-semibold text-gray-800 mb-3">
//                         Homework
//                       </h3>

//                       <p className="text-gray-600 whitespace-pre-line leading-7">
//                         {hw.description}
//                       </p>

//                     </div>

//                   </div>
//                 ))}

//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </StudentLayout>
//   );
// }

import { useEffect, useMemo, useState } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import API_URL from "../config/api.js";
import axios from "axios";

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
} from "recharts";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import {
  FaUserCheck,
  FaUserTimes,
  FaChartLine,
  FaFire,
  FaTrophy,
  FaExclamationTriangle,
} from "react-icons/fa";

export default function StudentAttendance() {
  const [records, setRecords] = useState([]);
  const [summary, setSummary] = useState({});
  const [info, setInfo] = useState({});
  const [achievement, setAchievement] = useState(null);
  const [warning, setWarning] = useState(null);
  const [monthlyTrend, setMonthlyTrend] = useState({});
  const [calendar, setCalendar] = useState([]);

  const studentId = useMemo(
    () => localStorage.getItem("studentId"),
    []
  );

  useEffect(() => {
    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/attendance/student?studentId=${studentId}`
        );

        setRecords(res.data.records || []);

        setSummary(res.data.summary || {});

        setInfo({
          className: res.data.className,
          teacherName: res.data.teacherName,
        });

        setAchievement(res.data.achievement);

        setWarning(res.data.warning);

        setMonthlyTrend(res.data.monthlyTrend || {});

        setCalendar(res.data.calendar || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAttendance();
  }, [studentId]);

    const pieData=[
  {
  name:"Present",
  value:summary.present||0
  },
  {
  name:"Absent",
  value:summary.absent||0
  },
  {
  name:"Leave",
  value:summary.leave||0
  }
  ];  

      const COLORS=[
    "#22c55e",
    "#ef4444",
    "#facc15"
    ];

 const lineData = Object.keys(monthlyTrend).map(month => ({
  month,
  Present: monthlyTrend[month].present,
  Absent: monthlyTrend[month].absent,
  Leave: monthlyTrend[month].leave,
}));

  const attendanceDates = {};

  calendar.forEach((item) => {
    attendanceDates[item.date] = item.status;
  });

  return (
    <StudentLayout title="Attendance">

      <div className="min-h-screen bg-slate-100 p-6">

        {/* HEADER */}

        <div className="rounded-3xl bg-gradient-to-r from-cyan-600 to-teal-500 p-8 shadow-xl text-white">

          <h1 className="text-4xl font-bold">
            Attendance Dashboard
          </h1>

          <p className="mt-2 opacity-90">
            Monitor your attendance and academic performance.
          </p>

        </div>

        {/* INFO */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Class
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {info.className || "-"}
            </h2>

          </div>

          <div className="bg-white rounded-2xl p-6 shadow">

            <p className="text-gray-500">
              Class Incharge
            </p>

            <h2 className="text-3xl font-bold mt-2">
              {info.teacherName || "-"}
            </h2>

          </div>

        </div>

        {/* SUMMARY */}

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          <div className="bg-white rounded-2xl shadow p-6">

            <FaUserCheck
              className="text-green-600 text-4xl"
            />

            <p className="text-gray-500 mt-4">
              Present
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {summary.present || 0}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

          <div className="text-5xl">

          🟡

          </div>

          <p className="text-gray-500 mt-4">

          Leave

          </p>

          <h2 className="text-4xl font-bold text-yellow-500">

          {summary.leave||0}

          </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FaUserTimes
              className="text-red-500 text-4xl"
            />

            <p className="text-gray-500 mt-4">
              Absent
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {summary.absent || 0}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FaChartLine
              className="text-cyan-600 text-4xl"
            />

            <p className="text-gray-500 mt-4">
              Attendance
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {summary.percentage || 0}%
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow p-6">

            <FaFire
              className="text-orange-500 text-4xl"
            />

            <p className="text-gray-500 mt-4">
              Streak
            </p>

            <h2 className="text-4xl font-bold mt-2">
              {summary.streak || 0}
            </h2>

          </div>

        </div>
                {/* ========================= */}
        {/* ATTENDANCE PROGRESS */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-8">

          <div className="flex justify-between items-center">

            <div>

              <h2 className="text-2xl font-bold">
                Attendance Percentage
              </h2>

              <p className="text-gray-500 mt-1">
                Your overall attendance
              </p>

            </div>

            <div className="text-4xl font-bold text-cyan-600">

              {summary.percentage || 0}%

            </div>

          </div>

          <div className="w-full bg-gray-200 rounded-full h-5 mt-6 overflow-hidden">

            <div
              className={`h-5 rounded-full transition-all duration-1000 ${
                summary.percentage >= 90
                  ? "bg-green-500"
                  : summary.percentage >= 75
                  ? "bg-yellow-500"
                  : "bg-red-500"
              }`}
              style={{
                width: `${summary.percentage || 0}%`,
              }}
            />

          </div>

        </div>

        {/* ========================= */}
        {/* ACHIEVEMENT & WARNING */}
        {/* ========================= */}

        <div className="grid lg:grid-cols-2 gap-6 mt-8">

          {achievement && (

            <div className="bg-green-100 border border-green-300 rounded-2xl p-6 shadow">

              <div className="flex items-center gap-4">

                <FaTrophy className="text-5xl text-green-600" />

                <div>

                  <h2 className="text-2xl font-bold text-green-700">

                    {achievement.title}

                  </h2>

                  <p className="text-green-700 mt-2">

                    Congratulations! Keep maintaining this performance.

                  </p>

                </div>

              </div>

            </div>

          )}

          {warning && (

            <div className="bg-red-100 border border-red-300 rounded-2xl p-6 shadow">

              <div className="flex items-center gap-4">

                <FaExclamationTriangle className="text-5xl text-red-600" />

                <div>

                  <h2 className="text-2xl font-bold text-red-700">

                    {warning.title}

                  </h2>

                  <p className="text-red-700 mt-2">

                    {warning.message}

                  </p>

                </div>

              </div>

            </div>

          )}

        </div>

        {/* ========================= */}
        {/* CHARTS */}
        {/* ========================= */}

        <div className="grid xl:grid-cols-2 gap-8 mt-10">

          {/* PIE CHART */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

              Attendance Overview

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <PieChart>

                <Pie
                  data={pieData}
                  dataKey="value"
                  outerRadius={120}
                  label
                >

                  {pieData.map((entry, index) => (

                    <Cell
                      key={index}
                      fill={COLORS[index]}
                    />

                  ))}

                </Pie>

                <Tooltip />

                <Legend />

              </PieChart>

            </ResponsiveContainer>

          </div>

          {/* LINE CHART */}

          <div className="bg-white rounded-2xl shadow-lg p-6">

            <h2 className="text-2xl font-bold mb-6">

              Monthly Attendance

            </h2>

            <ResponsiveContainer width="100%" height={320}>

              <LineChart data={lineData}>

                <CartesianGrid strokeDasharray="3 3" />

                <XAxis dataKey="month" />

                <YAxis />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="Present"
                  stroke="#10b981"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="Absent"
                  stroke="#ef4444"
                  strokeWidth={3}
                />

                <Line
                  type="monotone"
                  dataKey="Leave"
                  stroke="#facc15"
                  strokeWidth={3}
                />

              </LineChart>

            </ResponsiveContainer>

          </div>

        </div>
                {/* ========================= */}
        {/* ATTENDANCE CALENDAR */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">
            Attendance Calendar
          </h2>

          <Calendar
            tileClassName={({ date }) => {
              const key = date.toISOString().split("T")[0];

               if(attendanceDates[key]=="present")
                return "bg-green-500 text-white rounded-full";

                if(attendanceDates[key]=="absent")
                return "bg-red-500 text-white rounded-full";

                if(attendanceDates[key]=="leave")
                return "bg-yellow-400 text-white rounded-full";

              return "";
            }}
          />

          <div className="flex flex-wrap gap-6 mt-6">

  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded bg-green-500"></div>
    <span>Present</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded bg-red-500"></div>
    <span>Absent</span>
  </div>

  <div className="flex items-center gap-2">
    <div className="w-5 h-5 rounded bg-yellow-400"></div>
    <span>Leave</span>
  </div>

</div>

        </div>

        {/* ========================= */}
        {/* ATTENDANCE HISTORY */}
        {/* ========================= */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mt-10">

          <h2 className="text-2xl font-bold mb-6">

            Attendance History

          </h2>

          <div className="space-y-4">

            {records.length > 0 ? (

              records
                .slice()
                .reverse()
                .map((item, index) => (

                  <div
                    key={index}
                    className="flex justify-between items-center border rounded-xl p-4 hover:bg-gray-50 transition"
                  >

                    <div>

                      <h3 className="font-semibold">

                        {new Date(item.date).toLocaleDateString(
                          "en-IN",
                          {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }
                        )}

                      </h3>

                    </div>

                    <span
                      className={`px-4 py-2 rounded-full text-white font-semibold ${
                        item.status=="present"
                        ?"bg-green-500"
                        :item.status=="leave"
                        ?"bg-yellow-500"
                        :"bg-red-500"
                      }`}
                    >
                      {item.status=="present"
                      ?"Present"
                      :item.status=="leave"
                      ?"Leave"
                      :"Absent"}
                    </span>

                  </div>

                ))

            ) : (

              <div className="text-center py-10">

                <div className="text-6xl">

                  📭

                </div>

                <h2 className="text-2xl font-bold mt-4">

                  No Attendance Found

                </h2>

              </div>

            )}

          </div>

        </div>

      </div>

    </StudentLayout>

  );

}