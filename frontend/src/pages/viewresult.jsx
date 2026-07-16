// import { useEffect, useState, useCallback, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import TeacherLayout from "../layout/teacherdashboardlayout";
// import axios from "axios";
// import API_URL from "../config/api.js";

// export default function ViewResult() {
//   const [data, setData] = useState([]);
//   const [filtered, setFiltered] = useState([]);

//   const [subject, setSubject] = useState("");
//   const [testType, setTestType] = useState("");

//   const navigate = useNavigate();

//   // 🔥 FETCH
//   const fetchData = useCallback(async () => {
//     try {
//       const teacherId = localStorage.getItem("teacherId");
//       if (!teacherId) return;

//       const res = await axios.get(
//         `${API_URL}/api/result/my?teacherId=${teacherId}`
//       );

//       const results = res?.data?.data || [];
//       setData(results);
//       setFiltered(results);
//     } catch (err) {
//       console.log("Error fetching:", err);
//     }
//   }, []);

//   useEffect(() => {
//       const loadData = async () => {
//         await fetchData();
//       };

//       loadData();
//     }, [fetchData]);

//   // 🔥 FILTER
//   const handleFilter = useCallback(() => {
//     let temp = [...data];

//     if (subject) {
//       temp = temp.filter((r) =>
//         r.subject.toLowerCase().includes(subject.toLowerCase())
//       );
//     }

//     if (testType) {
//       temp = temp.filter((r) => r.testType === testType);
//     }

//     setFiltered(temp);
//   }, [data, subject, testType]);

//   // 🔥 DELETE
//   const handleDelete = useCallback(async (id) => {
//     if (!window.confirm("Delete this result?")) return;

//     try {
//       await axios.delete(`${API_URL}/api/result/${id}`);

//       setFiltered((prev) => prev.filter((r) => r._id !== id));
//       setData((prev) => prev.filter((r) => r._id !== id));

//       alert("Deleted ✅");
//     } catch (err) {
//       console.log(err);
//       alert("Error deleting ❌");
//     }
//   }, []);

//   // 🔥 RENDER
//   const renderedResults = useMemo(() => {
//     return filtered.map((res, i) => (
//       <div
//         key={i}
//         className="bg-white p-4 sm:p-5 mb-6 rounded-2xl shadow-md hover:shadow-lg transition"
//       >
//         {/* HEADER */}
//         <div className="flex justify-between items-start">

// <div>

// <h2 className="text-2xl font-bold text-gray-800">
// 🎓 {res.className} - {res.section}
// </h2>

// <p className="text-gray-500 mt-1">
// 📖 {res.subject}
// </p>

// <p className="text-sm text-gray-400">
// 📝 {res.testType} • 📅 {res.date}
// </p>

// </div>

// <div className="text-right">

// <p className="text-sm text-gray-500">
// Max Marks
// </p>

// <h2 className="text-3xl font-bold text-teal-600">
// {res.maxMarks}
// </h2>

// </div>

// </div>

//           {/* ACTION BUTTONS */}
//           <div className="flex gap-2">
//             <button
//               onClick={() =>
//                 navigate("/teacher/result/edit", { state: res })
//               }
//               className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm"
//             >
//               ✏️ Edit
//             </button>

//             <button
//               onClick={() => handleDelete(res._id)}
//               className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm"
//             >
//               🗑 Delete
//             </button>
//           </div>
//         </div>

//         {/* TABLE */}
//         <div className="overflow-x-auto mt-4">
//           <table className="w-full text-xs sm:text-sm border rounded-lg overflow-hidden">
//             <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">
//               <tr className="hover:bg-cyan-50 transition">
//                 <th className="p-2 sm:p-3 border text-left">Roll</th>
//                 <th className="p-2 sm:p-3 border text-left">Name</th>
//                 <th className="p-2 sm:p-3 border text-center">Marks</th>
//                 <th className="p-2 sm:p-3 border text-center">%</th>
//                 <th className="p-2 sm:p-3 border text-center">Rank</th>
//               </tr>
//             </thead>

//             <tbody>
//               {res.results?.map((r, idx) => (
//                 <tr
//                   key={idx}
//                   className="text-center hover:bg-gray-50 transition"
//                 >
//                   <td className="p-2 border">
//                     {r.studentId?.rollNumber}
//                   </td>

//                   <td
//                     className="p-2 border text-left cursor-pointer hover:text-[#1fa2a6] hover:underline"
//                     onClick={() =>
//                       navigate(`/teacher/student-result/${r.studentId?._id}`)
//                     }
//                   >
//                     {r.studentId?.name}
//                   </td>

//                   {/* MARKS */}
//                   <td className="p-2 border font-medium">
//                     {r.status === "absent" ? (
//                       <span className="text-red-500 font-bold">A</span>
//                     ) : (
//                       r.obtainedMarks
//                     )}
//                   </td>

//                   {/* PERCENT */}
//                   <td className="p-2 border text-[#1fa2a6] font-semibold">
//                     {Number(r.percentage || 0).toFixed(2)}%
//                   </td>

//                   {/* RANK */}
//                   <td className="p-2 border font-bold">
//                    <span className="font-bold">
//                     {r.rank===1 && "🥇"}
//                     {r.rank===2 && "🥈"}
//                     {r.rank===3 && "🥉"}
//                     {r.rank>3 && `#${r.rank}`}
//                     </span>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>
//     ));
//   }, [filtered, navigate, handleDelete]);

//   return (
//     <TeacherLayout title="View Result">
//       <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

//         {/* TITLE */}
//         <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white p-8 shadow-xl">

//   <div className="flex flex-col lg:flex-row justify-between items-center">

//     <div>

//       <h1 className="text-4xl font-bold">
//         📊 View Results
//       </h1>

//       <p className="mt-3 text-cyan-100">
//         Manage, edit and review student examination results.
//       </p>

//     </div>

//     <div className="hidden md:block text-7xl">
//       📚
//     </div>

//   </div>

// </div>

// <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">

//   <div className="bg-white rounded-3xl shadow-lg p-6">

//     <p className="text-gray-500 uppercase text-xs">
//       Total Results
//     </p>

//     <h2 className="text-4xl font-bold text-blue-600 mt-2">
//       {data.length}
//     </h2>

//   </div>

//   <div className="bg-white rounded-3xl shadow-lg p-6">

//     <p className="text-gray-500 uppercase text-xs">
//       Subjects
//     </p>

//     <h2 className="text-4xl font-bold text-green-600 mt-2">
//       {new Set(data.map(r=>r.subject)).size}
//     </h2>

//   </div>

//   <div className="bg-white rounded-3xl shadow-lg p-6">

//     <p className="text-gray-500 uppercase text-xs">
//       Tests
//     </p>

//     <h2 className="text-4xl font-bold text-purple-600 mt-2">
//       {new Set(data.map(r=>r.testType)).size}
//     </h2>

//   </div>

// </div>

//         {/* FILTER */}
//         <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

// <div className="grid md:grid-cols-3 gap-4">

// <input
// type="text"
// placeholder="🔍 Search Subject..."
// className="rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
// onChange={(e)=>setSubject(e.target.value)}
// />

// <select
// className="rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
// onChange={(e)=>setTestType(e.target.value)}
// >

// <option value="">All Tests</option>
// <option>class test</option>
// <option>unit test</option>
// <option>semester</option>
// <option>final</option>

// </select>

// <button
// onClick={handleFilter}
// className="rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:scale-105 transition"
// >
// 🔍 Search
// </button>

// </div>

// </div>

//         {/* RESULTS */}
//         {filtered.length === 0 ? (
//           <div className="text-center text-gray-500 mt-10">
//            <div className="bg-white rounded-3xl shadow-lg p-12 text-center mt-8">

// <div className="text-7xl">
// 📊
// </div>

// <h2 className="text-2xl font-bold mt-4">
// No Results Found
// </h2>

// <p className="text-gray-500 mt-2">
// Try changing your search filters.
// </p>

// </div>
//           </div>
//         ) : (
//           renderedResults
//         )}
//       </div>
//     </TeacherLayout>
//   );
// }

import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

export default function ViewResult() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [subject, setSubject] = useState("");
  const [testType, setTestType] = useState("");

  const navigate = useNavigate();

  // ================= FETCH =================
  const fetchData = useCallback(async () => {
    try {
      const teacherId = localStorage.getItem("teacherId");

      if (!teacherId) return;

      const res = await axios.get(
        `${API_URL}/api/result/my?teacherId=${teacherId}`
      );

      const results = res?.data?.data || [];

      setData(results);
      setFiltered(results);

    } catch (err) {
      console.log("Error fetching:", err);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, [fetchData]);

  // ================= FILTER =================

  const handleFilter = useCallback(() => {

    let temp = [...data];

    if (subject) {
      temp = temp.filter((r) =>
        r.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    if (testType) {
      temp = temp.filter((r) => r.testType === testType);
    }

    setFiltered(temp);

  }, [data, subject, testType]);

  // ================= DELETE =================

  const handleDelete = useCallback(async (id) => {

    if (!window.confirm("Delete this result?")) return;

    try {

      await axios.delete(`${API_URL}/api/result/${id}`);

      setFiltered((prev) =>
        prev.filter((r) => r._id !== id)
      );

      setData((prev) =>
        prev.filter((r) => r._id !== id)
      );

      alert("Deleted Successfully ✅");

    } catch (err) {

      console.log(err);
      alert("Error deleting ❌");

    }

  }, []);

  // ================= RESULT CARD =================

  const renderedResults = useMemo(() => {
        return filtered.map((res, i) => (

      <div
        key={i}
        className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-8 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
      >

        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between items-start gap-6">

          <div>

            <h2 className="text-2xl font-bold text-gray-800">
              🎓 Class {res.className} - {res.section}
            </h2>

            <p className="text-gray-500 mt-2">
              📖 {res.subject}
            </p>

            <p className="text-sm text-gray-400 mt-1">
              📝 {res.testType}
            </p>

            <p className="text-sm text-gray-400">
              📅 {res.date}
            </p>

          </div>

          <div className="flex flex-col md:flex-row items-center gap-5">

            <div className="text-center">

              <p className="text-gray-500 text-sm">
                Max Marks
              </p>

              <h2 className="text-4xl font-bold text-teal-600">
                {res.maxMarks}
              </h2>

            </div>

            <div className="flex gap-3">

              <button
                onClick={() =>
                  navigate("/teacher/result/edit", { state: res })
                }
                className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-xl transition"
              >
                ✏️ Edit
              </button>

              <button
                onClick={() => handleDelete(res._id)}
                className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-xl transition"
              >
                🗑 Delete
              </button>

            </div>

          </div>

        </div>

        {/* Table */}

        <div className="overflow-x-auto mt-8">

          <table className="w-full rounded-2xl overflow-hidden">

            <thead className="bg-gradient-to-r from-teal-500 to-cyan-500 text-white">

              <tr>

                <th className="p-3 text-left">Roll</th>

                <th className="p-3 text-left">
                  Student
                </th>

                <th className="p-3 text-center">
                  Marks
                </th>

                <th className="p-3 text-center">
                  Percentage
                </th>

                <th className="p-3 text-center">
                  Rank
                </th>

              </tr>

            </thead>

            <tbody>

              {res.results?.map((r, idx) => (

                <tr
                  key={idx}
                  className="hover:bg-cyan-50 transition"
                >

                  <td className="border p-3">
                    {r.studentId?.rollNumber}
                  </td>

                  <td
                    className="border p-3 cursor-pointer hover:text-teal-600 hover:underline"
                    onClick={() =>
                      navigate(`/teacher/student-result/${r.studentId?._id}`)
                    }
                  >
                    {r.studentId?.name}
                  </td>

                  <td className="border p-3 text-center">

                    {r.status === "absent" ? (
                      <span className="text-red-600 font-bold">
                        A
                      </span>
                    ) : (
                      r.obtainedMarks
                    )}

                  </td>

                  <td className="border p-3 text-center font-semibold text-teal-600">
                    {Number(r.percentage || 0).toFixed(2)}%
                  </td>

                  <td className="border p-3 text-center">

                    {r.rank === 1 && "🥇"}

                    {r.rank === 2 && "🥈"}

                    {r.rank === 3 && "🥉"}

                    {r.rank > 3 && `#${r.rank}`}

                  </td>

                </tr>

              ))}

            </tbody>

          </table>

        </div>

      </div>

    ));

  }, [filtered, navigate, handleDelete]);

  return (
    <TeacherLayout title="View Result">

  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white p-6">

    {/* ================= Header ================= */}

    <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white p-8 shadow-xl">

      <div className="flex flex-col lg:flex-row justify-between items-center">

        <div>

          <h1 className="text-4xl font-bold">
            📊 View Results
          </h1>

          <p className="mt-3 text-cyan-100">
            Manage, edit and review student examination results.
          </p>

        </div>

        <div className="hidden md:block text-7xl">
          📚
        </div>

      </div>

    </div>

    {/* ================= Statistics ================= */}

    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-8">

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <p className="text-gray-500 uppercase text-xs tracking-widest">
          Total Results
        </p>

        <h2 className="text-4xl font-bold text-blue-600 mt-2">
          {data.length}
        </h2>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <p className="text-gray-500 uppercase text-xs tracking-widest">
          Subjects
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">
          {new Set(data.map((r) => r.subject)).size}
        </h2>

      </div>

      <div className="bg-white rounded-3xl shadow-lg p-6">

        <p className="text-gray-500 uppercase text-xs tracking-widest">
          Tests
        </p>

        <h2 className="text-4xl font-bold text-purple-600 mt-2">
          {new Set(data.map((r) => r.testType)).size}
        </h2>

      </div>

    </div>

    {/* ================= Search ================= */}

    <div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

      <div className="grid md:grid-cols-3 gap-4">

        <input
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="🔍 Search Subject..."
          className="rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
        />

        <select
          value={testType}
          onChange={(e) => setTestType(e.target.value)}
          className="rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
        >

          <option value="">All Tests</option>
          <option>class test</option>
          <option>unit test</option>
          <option>semester</option>
          <option>final</option>

        </select>

        <button
          onClick={handleFilter}
          className="rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white font-semibold hover:scale-105 transition"
        >
          🔍 Search
        </button>

      </div>

    </div>

    {/* ================= Results ================= */}

    <div className="mt-8">

      {filtered.length === 0 ? (

        <div className="bg-white rounded-3xl shadow-lg p-12 text-center">

          <div className="text-7xl">
            📊
          </div>

          <h2 className="text-2xl font-bold mt-5">
            No Results Found
          </h2>

          <p className="text-gray-500 mt-2">
            Try changing your search filters.
          </p>

        </div>

      ) : (

        renderedResults

      )}

    </div>

  </div>

</TeacherLayout>

  );
}