// import { useEffect, useState } from "react";
// import StudentLayout from "../layout/studentdashboardlayout";
// import axios from "axios";
// import API_URL from "../config/api.js";

// export default function StudentDashboard() {
//   const [data, setData] = useState(null);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const studentId = localStorage.getItem("studentId");

//         const res = await axios.get(
//           `${API_URL}/api/student/dashboard/${studentId}`
//         );

//         setData(res.data.data);
//       } catch (error) {
//         console.log("Error:", error);
//       }
//     };

//     fetchData();
//   }, []);

//   // ✅ LOADING CHECK
//   const isLoading = !data || !data.student;

//   // 🔹 GREETING
//   const hour = new Date().getHours();
//   const greeting =
//     hour < 12 ? "Good Morning" :
//     hour < 18 ? "Good Afternoon" :
//     "Good Evening";

//   // 🔹 RESULT COLOR
//   const getColor = (marks, total) => {
//     const percent = (marks / total) * 100;

//     if (percent >= 85) return "text-green-600";
//     if (percent >= 60) return "text-blue-600";
//     if (percent >= 40) return "text-yellow-600";
//     return "text-red-500";
//   };

//   return (
//     <StudentLayout title="Dashboard">
//       <div className="bg-gray-100 min-h-screen p-4space-y-6">

//         {/* 🔥 BANNER */}
//         <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow mr-4 ml-4">
//           <h2 className="text-xl font-bold">
//             {greeting}, {data?.student?.name || "Student"} 👋
//           </h2>
//           <p className="text-sm opacity-90 mt-1">
//             Class {data?.student?.className} / Section {data?.student?.section}
//           </p>
//         </div>

//         {/* 🔥 CARDS */}
//         <div className="grid grid-cols-2 md:grid-cols-4 gap-5 m-4">
//           {isLoading ? (
//             <>
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//               <SkeletonCard />
//             </>
//           ) : (
//             <>
//               <Card title="Attendance" value={`${data?.attendance || 0}%`} />
//               <Card title="Results" value={(data?.results || []).length} />
//               <Card title="Homework" value={(data?.homework || []).length} />
//               <Card title="Announcements" value={(data?.announcements || []).length} />
//             </>
//           )}
//         </div>

//         {/* 🔥 MAIN GRID */}
//         <div className="grid md:grid-cols-3 gap-6 m-4">

//           {/* 📊 RESULTS */}
//           <div className="md:col-span-2">
//             {isLoading ? (
//               <SkeletonTable />
//             ) : (
//               <div className="bg-white rounded-xl shadow p-4">
//                 <h2 className="font-bold mb-4 text-lg">Latest Results</h2>

//                 <table className="w-full text-sm">
//                   <thead className="bg-gray-100">
//                     <tr>
//                       <th className="text-left p-3">Subject</th>
//                       <th className="text-center p-3">Marks</th>
//                     </tr>
//                   </thead>

//                   <tbody>
//                     {(data?.results || []).length > 0 ? (
//                       data.results.map((r, i) => (
//                         <tr key={i} className="border-b hover:bg-gray-50">
//                           <td className="p-3 font-medium">{r.subject}</td>
//                           <td
//                             className={`p-3 text-center font-semibold ${getColor(
//                               r.obtainedMarks,
//                               r.maxMarks
//                             )}`}
//                           >
//                             {r.obtainedMarks} / {r.maxMarks}
//                           </td>
//                         </tr>
//                       ))
//                     ) : (
//                       <tr>
//                         <td colSpan="2" className="text-center p-4 text-gray-500">
//                           📭 No results yet
//                         </td>
//                       </tr>
//                     )}
//                   </tbody>
//                 </table>
//               </div>
//             )}
//           </div>

//           {/* 📚 RIGHT SIDE */}
//           <div className="space-y-6">
//             {isLoading ? (
//               <>
//                 <SkeletonTable />
//                 <SkeletonTable />
//               </>
//             ) : (
//               <>
//                 {/* 📝 HOMEWORK */}
//                 <div className="bg-white p-4 rounded-xl shadow">
//                   <h2 className="font-bold mb-3">Homework</h2>

//                   {(data?.homework || []).length > 0 ? (
//                     data.homework.map((h, i) => (
//                       <div key={i} className="border-b pb-2 mb-2">
//                         <p className="font-semibold text-blue-600">{h.subject}</p>
//                         <p className="text-sm text-gray-600 whitespace-pre-line">{h.description}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-sm">No homework</p>
//                   )}
//                 </div>

//                 {/* 📢 ANNOUNCEMENTS */}
//                 <div className="bg-white p-4 rounded-xl shadow">
//                   <h2 className="font-bold mb-3">Announcements</h2>

//                   {(data?.announcements || []).length > 0 ? (
//                     data.announcements.map((a, i) => (
//                       <div key={i} className="border-b pb-2 mb-2">
//                         <p className="font-semibold text-purple-600">{a.title}</p>
//                         <p className="text-sm text-gray-600">{a.message}</p>
//                       </div>
//                     ))
//                   ) : (
//                     <p className="text-gray-500 text-sm">No announcements</p>
//                   )}
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </StudentLayout>
//   );
// }

// ////////////////////////////////////////////////////////
// // 🔥 SKELETON COMPONENTS
// ////////////////////////////////////////////////////////

// function SkeletonCard() {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow animate-pulse">
//       <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-3"></div>
//       <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
//     </div>
//   );
// }

// function SkeletonTable() {
//   return (
//     <div className="bg-white rounded-xl shadow p-4 animate-pulse">
//       <div className="h-5 bg-gray-300 w-40 mb-4"></div>

//       {[1,2,3].map((_, i) => (
//         <div key={i} className="flex justify-between mb-3">
//           <div className="h-4 bg-gray-300 w-1/3"></div>
//           <div className="h-4 bg-gray-300 w-1/4"></div>
//         </div>
//       ))}
//     </div>
//   );
// }

// ////////////////////////////////////////////////////////
// // 🔥 CARD COMPONENT
// ////////////////////////////////////////////////////////

// function Card({ title, value }) {
//   return (
//     <div className="bg-white p-5 rounded-xl shadow text-center hover:scale-105 transition duration-300">
//       <p className="text-gray-500 text-sm">{title}</p>
//       <h1 className="text-2xl font-bold text-[#1fa2a6] mt-1">{value}</h1>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

export default function StudentDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = localStorage.getItem("studentId");

        const res = await axios.get(
          `${API_URL}/api/student/dashboard/${studentId}`
        );

        setData(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const isLoading = !data || !data.student;

  const hour = new Date().getHours();

  const greeting =
    hour < 12
      ? "Good Morning"
      : hour < 18
      ? "Good Afternoon"
      : "Good Evening";

  const attendance = data?.attendance || 0;

  return (
    <StudentLayout title="Dashboard">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white p-6">

        {/* ================= Banner ================= */}

        <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white p-8 shadow-xl">

          <div className="flex flex-col lg:flex-row justify-between items-center">

            <div>

              <h1 className="text-4xl font-bold">
                {greeting},{" "}
                {isLoading ? "Student" : data.student.name} 👋
              </h1>

              <p className="text-cyan-100 mt-3 text-lg">
                Welcome back!
              </p>

              <p className="text-cyan-100">
                Have a productive day.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">

                <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                  🎓 Class {data?.student?.className || "-"}
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                  🏫 Section {data?.student?.section || "-"}
                </span>

                <span className="bg-white/20 px-4 py-2 rounded-full backdrop-blur">
                  📈 Attendance {attendance}%
                </span>

              </div>

            </div>

            <div className="mt-8 lg:mt-0">

              <div className="h-36 w-36 rounded-full bg-white/20 flex items-center justify-center backdrop-blur text-6xl border-4 border-white/30">

                👨‍🎓

              </div>

            </div>

          </div>

        </div>

        {/* ================= Stats ================= */}

        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-8">

          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <StatsCard
                icon="📈"
                title="Attendance"
                value={`${attendance}%`}
                color="bg-blue-50"
                text="text-blue-600"
              />

              <StatsCard
                icon="🏆"
                title="Results"
                value={data.results.length}
                color="bg-green-50"
                text="text-green-600"
              />

              <StatsCard
                icon="📚"
                title="Homework"
                value={data.homework.length}
                color="bg-orange-50"
                text="text-orange-600"
              />

              <StatsCard
                icon="📢"
                title="Announcements"
                value={data.announcements.length}
                color="bg-purple-50"
                text="text-purple-600"
              />
            </>
          )}

        </div>

        {/* ================= MAIN CONTENT ================= */}

<div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-8">

  {/* LEFT SIDE */}
  <div className="xl:col-span-2 space-y-6">

    {/* Attendance Progress */}
    <div className="bg-white rounded-3xl shadow-md p-6">

      <div className="flex justify-between items-center mb-5">
        <h2 className="text-xl font-bold">
          📈 Attendance Progress
        </h2>

        <span className="text-2xl font-bold text-teal-600">
          {attendance}%
        </span>
      </div>

      <div className="w-full h-4 bg-gray-200 rounded-full overflow-hidden">

        <div
          className="h-full rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 transition-all duration-700"
          style={{ width: `${attendance}%` }}
        />

      </div>

      <p className="mt-4 text-gray-500">
        Maintain above 90% attendance for excellent academic performance.
      </p>

    </div>

    {/* Results */}
    <div className="bg-white rounded-3xl shadow-md overflow-hidden">

      <div className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white px-6 py-4">
        <h2 className="text-2xl font-bold">
          🏆 Latest Results
        </h2>
      </div>

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead className="bg-gray-100">

            <tr>
              <th className="px-6 py-4 text-left">
                Subject
              </th>

              <th className="px-6 py-4 text-center">
                Marks
              </th>

              <th className="px-6 py-4 text-center">
                Grade
              </th>
            </tr>

          </thead>

          <tbody>

            {(data?.results || []).length > 0 ? (

              data.results.map((item, index) => {

                const grade = getGrade(
                  item.obtainedMarks,
                  item.maxMarks
                );

                return (

                  <tr
                    key={index}
                    className="border-b hover:bg-cyan-50 transition"
                  >

                    <td className="px-6 py-4 font-medium">
                      {item.subject}
                    </td>

                    <td className="px-6 py-4 text-center font-semibold">
                      {item.obtainedMarks} / {item.maxMarks}
                    </td>

                    <td className="px-6 py-4 text-center">

                      <span
                        className={`${grade.className} px-3 py-1 rounded-full text-sm font-semibold`}
                      >
                        {grade.text}
                      </span>

                    </td>

                  </tr>

                );

              })

            ) : (

              <tr>

                <td
                  colSpan={3}
                  className="text-center py-8 text-gray-500"
                >
                  📭 No Results Available
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>

  </div>

  {/* RIGHT SIDE */}

<div className="space-y-6">

  {/* Student Profile */}

  <div className="bg-white rounded-3xl shadow-md p-6">

    <div className="flex flex-col items-center">

      <div className="h-28 w-28 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center text-white text-5xl">
        👨‍🎓
      </div>

      <h2 className="text-2xl font-bold mt-5">
        {data?.student?.name}
      </h2>

      <p className="text-gray-500">
        Student Profile
      </p>

    </div>

    <div className="mt-8 space-y-4">

      <ProfileItem
        title="Class"
        value={data?.student?.className}
      />

      <ProfileItem
        title="Section"
        value={data?.student?.section}
      />

      <ProfileItem
        title="Attendance"
        value={`${attendance}%`}
      />

    </div>

  </div>

  {/* Homework */}

  <div className="bg-white rounded-3xl shadow-md overflow-hidden">

    <div className="bg-gradient-to-r from-orange-500 to-amber-500 text-white px-6 py-4">

      <h2 className="text-xl font-bold">
        📚 Latest Homework
      </h2>

    </div>

    <div className="p-5">

      {(data?.homework || []).length > 0 ? (

        data.homework.slice(0, 4).map((hw, index) => (

          <div
            key={index}
            className="border-l-4 border-orange-500 bg-orange-50 rounded-xl p-4 mb-4"
          >

            <h3 className="font-semibold text-orange-700">
              {hw.subject}
            </h3>

            <p className="text-gray-600 mt-2 whitespace-pre-line">
              {hw.description}
            </p>

          </div>

        ))

      ) : (

        <p className="text-center text-gray-500 py-6">
          📭 No Homework
        </p>

      )}

    </div>

  </div>

  {/* Announcements */}

  <div className="bg-white rounded-3xl shadow-md overflow-hidden">

    <div className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-6 py-4">

      <h2 className="text-xl font-bold">
        📢 Latest Announcements
      </h2>

    </div>

    <div className="p-5">

      {(data?.announcements || []).length > 0 ? (

        data.announcements.slice(0, 3).map((item, index) => (

          <div
            key={index}
            className="border-l-4 border-purple-500 bg-purple-50 rounded-xl p-4 mb-4"
          >

            <h3 className="font-semibold text-purple-700">
              {item.title}
            </h3>

            <p className="text-gray-600 mt-2">
              {item.message}
            </p>

          </div>

        ))

      ) : (

        <p className="text-center text-gray-500 py-6">
          📭 No Announcements
        </p>

      )}

    </div>

  </div>

</div>

</div>

      </div>
    </StudentLayout>
  );
}

/* ================= Stats Card ================= */

function StatsCard({
  icon,
  title,
  value,
  color,
  text,
}) {
  return (
    <div
      className={`${color} rounded-3xl p-6 shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white`}
    >
      <div className="text-5xl">
        {icon}
      </div>

      <p className="uppercase text-xs tracking-widest text-gray-500 mt-5">
        {title}
      </p>

      <h2 className={`text-4xl font-bold mt-2 ${text}`}>
        {value}
      </h2>
    </div>
  );
}

/* ================= Skeleton ================= */

function SkeletonCard() {
  return (
    <div className="bg-white rounded-3xl p-6 shadow animate-pulse">

      <div className="w-16 h-16 rounded-full bg-gray-300"></div>

      <div className="h-4 w-24 bg-gray-300 rounded mt-6"></div>

      <div className="h-8 w-20 bg-gray-300 rounded mt-3"></div>

    </div>
  );
}

function ProfileItem({ title, value }) {
  return (
    <div className="flex justify-between border-b pb-3">
      <span className="text-gray-500">
        {title}
      </span>

      <span className="font-semibold">
        {value}
      </span>
    </div>
  );
}

function getGrade(marks, total) {
  const percent = (marks / total) * 100;

  if (percent >= 85)
    return {
      text: "Excellent",
      className: "bg-green-100 text-green-700",
    };

  if (percent >= 60)
    return {
      text: "Good",
      className: "bg-blue-100 text-blue-700",
    };

  if (percent >= 40)
    return {
      text: "Average",
      className: "bg-yellow-100 text-yellow-700",
    };

  return {
    text: "Poor",
    className: "bg-red-100 text-red-700",
  };
}