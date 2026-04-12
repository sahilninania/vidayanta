import { useEffect, useState } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";

export default function StudentDashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = localStorage.getItem("studentId");

        const res = await axios.get(
          `http://localhost:5000/api/student/dashboard/${studentId}`
        );

        setData(res.data.data);
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  // ✅ LOADING CHECK
  const isLoading = !data || !data.student;

  // 🔹 GREETING
  const hour = new Date().getHours();
  const greeting =
    hour < 12 ? "Good Morning" :
    hour < 18 ? "Good Afternoon" :
    "Good Evening";

  // 🔹 RESULT COLOR
  const getColor = (marks, total) => {
    const percent = (marks / total) * 100;

    if (percent >= 85) return "text-green-600";
    if (percent >= 60) return "text-blue-600";
    if (percent >= 40) return "text-yellow-600";
    return "text-red-500";
  };

  return (
    <StudentLayout title="Dashboard">
      <div className="bg-gray-100 min-h-screen p-4space-y-6">

        {/* 🔥 BANNER */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl shadow mr-4 ml-4">
          <h2 className="text-xl font-bold">
            {greeting}, {data?.student?.name || "Student"} 👋
          </h2>
          <p className="text-sm opacity-90 mt-1">
            Class {data?.student?.className} / Section {data?.student?.section}
          </p>
        </div>

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5 m-4">
          {isLoading ? (
            <>
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
              <SkeletonCard />
            </>
          ) : (
            <>
              <Card title="Attendance" value={`${data?.attendance || 0}%`} />
              <Card title="Results" value={(data?.results || []).length} />
              <Card title="Homework" value={(data?.homework || []).length} />
              <Card title="Announcements" value={(data?.announcements || []).length} />
            </>
          )}
        </div>

        {/* 🔥 MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-6 m-4">

          {/* 📊 RESULTS */}
          <div className="md:col-span-2">
            {isLoading ? (
              <SkeletonTable />
            ) : (
              <div className="bg-white rounded-xl shadow p-4">
                <h2 className="font-bold mb-4 text-lg">Latest Results</h2>

                <table className="w-full text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="text-left p-3">Subject</th>
                      <th className="text-center p-3">Marks</th>
                    </tr>
                  </thead>

                  <tbody>
                    {(data?.results || []).length > 0 ? (
                      data.results.map((r, i) => (
                        <tr key={i} className="border-b hover:bg-gray-50">
                          <td className="p-3 font-medium">{r.subject}</td>
                          <td
                            className={`p-3 text-center font-semibold ${getColor(
                              r.obtainedMarks,
                              r.maxMarks
                            )}`}
                          >
                            {r.obtainedMarks} / {r.maxMarks}
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td colSpan="2" className="text-center p-4 text-gray-500">
                          📭 No results yet
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* 📚 RIGHT SIDE */}
          <div className="space-y-6">
            {isLoading ? (
              <>
                <SkeletonTable />
                <SkeletonTable />
              </>
            ) : (
              <>
                {/* 📝 HOMEWORK */}
                <div className="bg-white p-4 rounded-xl shadow">
                  <h2 className="font-bold mb-3">Homework</h2>

                  {(data?.homework || []).length > 0 ? (
                    data.homework.map((h, i) => (
                      <div key={i} className="border-b pb-2 mb-2">
                        <p className="font-semibold text-blue-600">{h.subject}</p>
                        <p className="text-sm text-gray-600">{h.description}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No homework</p>
                  )}
                </div>

                {/* 📢 ANNOUNCEMENTS */}
                <div className="bg-white p-4 rounded-xl shadow">
                  <h2 className="font-bold mb-3">Announcements</h2>

                  {(data?.announcements || []).length > 0 ? (
                    data.announcements.map((a, i) => (
                      <div key={i} className="border-b pb-2 mb-2">
                        <p className="font-semibold text-purple-600">{a.title}</p>
                        <p className="text-sm text-gray-600">{a.message}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-sm">No announcements</p>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </StudentLayout>
  );
}

////////////////////////////////////////////////////////
// 🔥 SKELETON COMPONENTS
////////////////////////////////////////////////////////

function SkeletonCard() {
  return (
    <div className="bg-white p-5 rounded-xl shadow animate-pulse">
      <div className="h-4 bg-gray-300 rounded w-1/2 mx-auto mb-3"></div>
      <div className="h-6 bg-gray-300 rounded w-1/3 mx-auto"></div>
    </div>
  );
}

function SkeletonTable() {
  return (
    <div className="bg-white rounded-xl shadow p-4 animate-pulse">
      <div className="h-5 bg-gray-300 w-40 mb-4"></div>

      {[1,2,3].map((_, i) => (
        <div key={i} className="flex justify-between mb-3">
          <div className="h-4 bg-gray-300 w-1/3"></div>
          <div className="h-4 bg-gray-300 w-1/4"></div>
        </div>
      ))}
    </div>
  );
}

////////////////////////////////////////////////////////
// 🔥 CARD COMPONENT
////////////////////////////////////////////////////////

function Card({ title, value }) {
  return (
    <div className="bg-white p-5 rounded-xl shadow text-center hover:scale-105 transition duration-300">
      <p className="text-gray-500 text-sm">{title}</p>
      <h1 className="text-2xl font-bold text-[#1fa2a6] mt-1">{value}</h1>
    </div>
  );
}