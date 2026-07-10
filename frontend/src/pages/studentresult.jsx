// import { useEffect, useState, useMemo } from "react";
// import StudentLayout from "../layout/studentdashboardlayout";
// import axios from "axios";
// import API_URL from "../config/api.js";
// // ✅ TABLE COMPONENT (NO "NO DATA" INSIDE)
// const Table = ({ list, title }) => (
//   <div className="mb-8">
//     <h2 className="text-xl font-bold mb-3 text-[#1fa2a6]">{title}</h2>

//     <div className="bg-white shadow rounded border overflow-x-auto">
//       <table className="w-full text-sm">
//         <thead className="bg-gray-200">
//           <tr>
//             <th className="p-2 border">Subject</th>
//             <th className="p-2 border">Marks</th>
//             <th className="p-2 border">Position</th>
//             <th className="p-2 border">Date</th>
//           </tr>
//         </thead>

//         <tbody>
//           {list.map((item, index) => (
//             <tr key={index} className="text-center border-t">
//               <td className="p-2">{item.subject}</td>

//               <td className="p-2 font-semibold">
//                 {item.marks} / {item.maxMarks}
//               </td>

//               <td className="p-2 font-bold text-blue-600">
//                 {item.rank}
//               </td>

//               <td className="p-2">
//                 {new Date(item.date).toLocaleDateString()}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   </div>
// );

// // ✅ MAIN COMPONENT
// export default function StudentResult() {
//   const [data, setData] = useState([]);

//   const studentId = useMemo(() => {
//     return localStorage.getItem("studentId");
//   }, []);

//   useEffect(() => {
//     const fetchResults = async () => {
//       try {
//         if (!studentId) return;

//         const res = await axios.get(
//           `${API_URL}/api/result/student?studentId=${studentId}`
//         );

//         setData(res?.data?.data || []);
//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchResults();
//   }, [studentId]);

//   // ✅ PROCESS DATA
//   const processedData = useMemo(() => {
//     return data.map(item => {
//       const student = item.results?.find(
//         r => String(r.studentId?._id) === String(studentId)
//       );

//       return {
//         ...item,
//         marks: student?.obtainedMarks ?? "-",
//         rank: student?.rank ?? "-"
//       };
//     });
//   }, [data, studentId]);

//   // ✅ FILTERS
//   const classTests = useMemo(
//     () => processedData.filter(d => d.testType === "class test"),
//     [processedData]
//   );

//   const unitTests = useMemo(
//     () => processedData.filter(d => d.testType === "unit test"),
//     [processedData]
//   );

//   const semesterTests = useMemo(
//     () => processedData.filter(d => d.testType === "semester"),
//     [processedData]
//   );

//   const finalTests = useMemo(
//     () => processedData.filter(d => d.testType === "final"),
//     [processedData]
//   );

//   return (
//     <StudentLayout>
//       <div className="p-4">
//         <h1 className="text-2xl font-bold text-[#1fa2a6] mb-6">
//           Results
//         </h1>

//         {/* ✅ SHOW ONLY IF DATA EXISTS */}
//         {classTests.length > 0 && (
//           <Table list={classTests} title="Class Tests" />
//         )}

//         {unitTests.length > 0 && (
//           <Table list={unitTests} title="Unit Tests" />
//         )}

//         {semesterTests.length > 0 && (
//           <Table list={semesterTests} title="Semester Exams" />
//         )}

//         {finalTests.length > 0 && (
//           <Table list={finalTests} title="Final Exams" />
//         )}

//         {/* ✅ IF ALL EMPTY */}
//         {!classTests.length &&
//           !unitTests.length &&
//           !semesterTests.length &&
//           !finalTests.length && (
//             <p className="text-center text-gray-500 mt-10">
//               No Results Available
//             </p>
//           )}
//       </div>
//     </StudentLayout>
//   );
// }

import { useEffect, useState, useMemo } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

// ===== Table Component =====
const Table = ({ list, title }) => {
  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

  const getRankColor = (rank) => {
    if (rank === 1) return "bg-yellow-100 text-yellow-700";
    if (rank === 2) return "bg-gray-200 text-gray-700";
    if (rank === 3) return "bg-orange-100 text-orange-700";
    return "bg-cyan-100 text-cyan-700";
  };

  return (
    <div className="mb-10">
      <div className="flex items-center gap-3 mb-4">
        <div className="h-10 w-10 rounded-full bg-cyan-500 text-white flex items-center justify-center">
          📚
        </div>

        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
      </div>

      <div className="overflow-x-auto rounded-2xl bg-white shadow-lg border">
        <table className="min-w-full">
          <thead className="bg-cyan-500 text-white">
            <tr>
              <th className="px-5 py-4 text-left">Subject</th>
              <th className="px-5 py-4 text-center">Marks</th>
              <th className="px-5 py-4 text-center">Rank</th>
              <th className="px-5 py-4 text-center">Date</th>
            </tr>
          </thead>

          <tbody>
            {list.map((item, index) => (
              <tr
                key={index}
                className="border-b hover:bg-cyan-50 transition"
              >
                <td className="px-5 py-4 font-semibold">
                  {item.subject}
                </td>

                <td className="px-5 py-4 text-center">
                  <span className="font-bold text-cyan-600">
                    {item.marks}
                  </span>
                  <span className="text-gray-500">
                    {" "}
                    / {item.maxMarks}
                  </span>
                </td>

                <td className="px-5 py-4 text-center">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-semibold ${getRankColor(
                      item.rank
                    )}`}
                  >
                    🏆 {item.rank}
                  </span>
                </td>

                <td className="px-5 py-4 text-center text-gray-600">
                  {formatDate(item.date)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ===== Main Component =====
export default function StudentResult() {
  const [data, setData] = useState([]);

  const studentId = useMemo(() => {
    return localStorage.getItem("studentId");
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!studentId) return;

        const res = await axios.get(
          `${API_URL}/api/result/student?studentId=${studentId}`
        );

        setData(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, [studentId]);

  const processedData = useMemo(() => {
    return data.map((item) => {
      const student = item.results?.find(
        (r) => String(r.studentId?._id) === String(studentId)
      );

      return {
        ...item,
        marks: student?.obtainedMarks ?? "-",
        rank: student?.rank ?? "-",
      };
    });
  }, [data, studentId]);

  const classTests = processedData.filter(
    (d) => d.testType === "class test"
  );

  const unitTests = processedData.filter(
    (d) => d.testType === "unit test"
  );

  const semesterTests = processedData.filter(
    (d) => d.testType === "semester"
  );

  const finalTests = processedData.filter(
    (d) => d.testType === "final"
  );

  return (
    <StudentLayout>
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-6 shadow-lg text-white mb-8">
          <h1 className="text-3xl font-bold">
            📊 My Results
          </h1>

          <p className="mt-2 text-cyan-100">
            View your academic performance and rankings.
          </p>
        </div>

        {classTests.length > 0 && (
          <Table
            list={classTests}
            title="Class Tests"
          />
        )}

        {unitTests.length > 0 && (
          <Table
            list={unitTests}
            title="Unit Tests"
          />
        )}

        {semesterTests.length > 0 && (
          <Table
            list={semesterTests}
            title="Semester Exams"
          />
        )}

        {finalTests.length > 0 && (
          <Table
            list={finalTests}
            title="Final Exams"
          />
        )}

        {!classTests.length &&
          !unitTests.length &&
          !semesterTests.length &&
          !finalTests.length && (
            <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
              <div className="text-6xl mb-5">📄</div>

              <h2 className="text-2xl font-bold text-gray-700">
                No Results Available
              </h2>

              <p className="text-gray-500 mt-2">
                Your exam results will appear here after they are published.
              </p>
            </div>
          )}
      </div>
    </StudentLayout>
  );
}