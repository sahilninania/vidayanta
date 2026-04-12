import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
// import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";
import InstitutionSidebar from "../components/institutionsidebar";
import Institutionheader from "../components/institutionheader";

export default function InstitutionDashboard() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState({
    totalTeachers: 0,
    totalStudents: 0,
    totalClasses: 0,
    recentStudents: [],
    recentTeachers: [],
    recentAnnouncements: []
  });

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const institutionCode = localStorage.getItem("institutionCode");

        const res = await axios.get(
          `${API_URL}/api/dashboard?institutionCode=${institutionCode}`
        );

        setData(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchDashboard();
  }, []);

  return (
    <div className="flex " >
          <InstitutionSidebar open={open} setOpen={setOpen} />
    
          <div className="flex-1">
            <Institutionheader setOpen={setOpen} />

      <div className="  bg-gray-100 min-h-screen space-y-6 md:ml-64 p-4 ">

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">

          <Card icon="👨‍🏫" title="Teachers" value={data?.totalTeachers} color="text-teal-500" />
          <Card icon="🎓" title="Students" value={data?.totalStudents} color="text-blue-500" />
          <Card icon="📚" title="Classes" value={data?.totalClasses} color="text-yellow-500" />

          <div className="bg-gradient-to-r from-[#1fa2a6] to-[#1ed3d9] text-white p-4 rounded-xl shadow flex flex-col justify-center">
            <a href="/institution/announcement/create">
                <p className="text-xs opacity-80">Quick Action</p>
                <h1 className="text-sm sm:text-lg font-bold">Send Notification</h1>
            </a>
          </div>

        </div>

        {/* ================= MAIN ================= */}
        <div className="grid lg:grid-cols-3 gap-5">

          {/* ================= STUDENTS ================= */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow overflow-hidden">

            <div className="flex justify-between items-center px-4 sm:px-6 py-3 border-b">
              <div>
                <h2 className="font-semibold text-base sm:text-lg">
                  Recent Students
                </h2>
                <p className="text-xs text-gray-500">Last entries</p>
              </div>

              <span className="bg-gray-900 text-white px-2 py-1 rounded text-xs">
                {data.totalStudents}
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-xs sm:text-sm">

                <thead className="bg-gray-50 text-gray-400">
                  <tr>
                    <th className="px-4 py-2 text-left">ID</th>
                    <th className="px-4 py-2 text-left">Name</th>
                    <th className="px-4 py-2 text-left">Class</th>
                    <th className="px-4 py-2 text-left hidden sm:table-cell">Date</th>
                  </tr>
                </thead>

                <tbody>
                  {data.recentStudents.slice(0, 6).map((s, i) => (
                    <tr key={i} className="hover:bg-gray-50">

                      <td className="px-4 py-3 text-gray-500">
                        {s.rollNumber || `S00${i + 1}`}
                      </td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">

                          <div className="w-8 h-8 rounded-full bg-[#1fa2a6] text-white flex items-center justify-center text-xs">
                            {s.name?.charAt(0)}
                          </div>

                          <span>{s.name}</span>

                        </div>
                      </td>

                      <td className="px-4 py-3 text-gray-600">
                        {s.className}-{s.section || "A"}
                      </td>

                      <td className="px-4 py-3 text-gray-400 hidden sm:table-cell">
                        {new Date(s.createdAt).toLocaleDateString()}
                      </td>

                    </tr>
                  ))}
                </tbody>

              </table>
            </div>

          </div>

          {/* ================= RIGHT SIDE ================= */}
          <div className="space-y-5">

            {/* TEACHERS */}
            <div className="bg-white rounded-xl shadow">

              <div className="flex justify-between px-4 py-3 border-b">
                <h2 className="font-semibold text-sm sm:text-base">
                  Teachers
                </h2>

                <span className="bg-gray-900 text-white px-2 py-1 text-xs rounded">
                  {data.recentTeachers.length}
                </span>
              </div>

              <div className="p-3 space-y-3">
                {data.recentTeachers.slice(0, 5).map((t, i) => (
                  <div key={i} className="flex justify-between items-center">

                    <div className="flex items-center gap-2">

                      <div className="w-8 h-8 bg-[#1fa2a6] text-white rounded-full flex items-center justify-center text-xs">
                        {t.teacherName?.charAt(0)}
                      </div>

                      <span className="text-sm">{t.teacherName}</span>

                    </div>

                    <span className="text-xs text-gray-500">
                      {t.classesCount||t.subjects?.length || 0}
                    </span>

                  </div>
                ))}
              </div>

            </div>

            {/* ANNOUNCEMENTS */}
            <div className="bg-white rounded-xl shadow p-4">

              <div className="flex justify-between mb-3">
                <h2 className="font-semibold text-sm sm:text-base">
                  📢 Announcements
                </h2>

                <span className="bg-green-100 text-green-600 px-2 py-1 text-xs rounded">
                  {data.recentAnnouncements.length}
                </span>
              </div>

              <div className="space-y-2">
                {data.recentAnnouncements.slice(0, 4).map((a, i) => (
                  <div key={i} className="p-2 rounded hover:bg-gray-50">

                    <p className="text-sm font-medium">
                      {a.title}
                    </p>

                    <p className="text-xs text-gray-400">
                      {new Date(a.createdAt).toLocaleDateString()}
                    </p>

                  </div>
                ))}
              </div>

            </div>

          </div>

        </div>

      </div>
      </div>
    </div>

    // </InstitutionLayout>
  );
}

/* 🔥 CARD COMPONENT */
function Card({ icon, title, value, color }) {
  return (
    <div className="bg-white p-4 rounded-xl shadow flex items-center gap-3">
      <div className="text-2xl">{icon}</div>
      <div>
        <p className="text-gray-400 text-xs">{title}</p>
        <h1 className={`text-lg font-bold ${color}`}>
          {value}
        </h1>
      </div>
    </div>
  );
}