import { useEffect, useState, useCallback, useMemo } from "react";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function TeacherDashboard() {
  const [data, setData] = useState(null);

  // 🔥 localStorage optimized (only once)
  const teacherId = useMemo(() => localStorage.getItem("teacherId"), []);

  // 🔥 stable fetch function
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/teacher/dashboard?teacherId=${teacherId}`);
      setData(res.data.data);
    } catch (err) {
      console.log(err);
    }
  }, [teacherId]);

  useEffect(() => {
    const loadData = async () => {
      await fetchData();
    };
  
    loadData();
  }, [fetchData]);
  

  // 🔥 memoized derived values (prevent recalculation)
  const stats = useMemo(() => {
    if (!data) return {};
    return {
      class:data.classes,
      totalClasses: data.totalClasses,
      totalStudents: data.totalStudents,
      homework: data.homework?.length || 0,
      announcements: data.announcements?.length || 0
    };
  }, [data]);

  if (!data) {
    return (
      <TeacherLayout>
        <DashboardSkeleton />
      </TeacherLayout>
    );
  }

  return (
    <TeacherLayout>
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6">

        {/* HERO */}
        <div className="bg-gradient-to-r from-[#1fa2a6] to-blue-600 text-white p-6 rounded-2xl flex justify-between">
          <div>
            <h2 className="text-xl font-bold">
              Hii, {data.teacherName} 👋
            </h2>
            <p className="text-sm opacity-80 mt-1">
              Latest Result: {data.latestResult}
            </p>
          </div>

          <div className="flex gap-6 mt-4 md:mt-0">
           <Stat 
  number={data.classes?.[0] || "N/A"} 
  label="Class" 
/>
            <Stat number={stats.totalStudents} label="Students" />
          </div>
        </div>

        {/* CARDS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card title="Classes" value={stats.totalClasses} />
          <Card title="Students" value={stats.totalStudents} />
          <Card title="Homework" value={stats.homework} />
          <Card title="Announcements" value={stats.announcements} />
        </div>

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-3 gap-6">

          {/* STUDENTS */}
          <div className="md:col-span-2 bg-white rounded-2xl shadow">
            <div className="p-4 border-b flex justify-between">
              <h2 className="font-semibold">Students</h2>
              <span className="text-xs bg-black text-white px-2 py-1 rounded">
                {data.totalStudents}
              </span>
            </div>

            {data.students?.map((s, i) => (
              <div
                key={s._id || i}
                className="flex justify-between p-4 hover:bg-gray-50"
              >
                <div className="flex gap-3 items-center">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center">
                    {s.name?.charAt(0)}
                  </div>
                  <div>
                    <p>{s.name}</p>
                    <p className="text-xs text-gray-500">
                      {s.className} - {s.section}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-6">
            <Box title="Homework" items={data.homework || []} />
            <Box title="Announcements" items={data.announcements || []} />
          </div>
        </div>
      </div>
    </TeacherLayout>
  );
}

//////////////////////////////////////
// 🔥 COMPONENTS (optimized)
//////////////////////////////////////

const Card = ({ title, value }) => (
  <div className="bg-white p-4 rounded-xl shadow text-center">
    <p className="text-gray-500 text-sm">{title}</p>
    <h1 className="text-xl font-bold">{value}</h1>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="text-center">
    <h1 className="text-2xl font-bold">{number}</h1>
    <p className="text-xs">{label}</p>
  </div>
);

const Box = ({ title, items }) => (
  <div className="bg-white p-4 rounded-xl shadow">
    <h2 className="font-semibold mb-3">{title}</h2>

    {items.length === 0 ? (
      <p className="text-sm text-gray-400">No data</p>
    ) : (
      items.map((item, i) => (
        <div
          key={item._id || i}
          className="mb-3 p-3 bg-gray-50 rounded-lg border hover:shadow-sm"
        >
          <p className="font-medium text-sm">
            {item.title || item.homework || item.description || "No title"}
          </p>

          <p className="text-xs text-gray-500 mt-1">
            {item.className || ""}
          </p>

          {item.createdAt && (
            <p className="text-[10px] text-gray-400 mt-1">
              {new Date(item.createdAt).toLocaleDateString()}
            </p>
          )}
        </div>
      ))
    )}
  </div>
);

//////////////////////////////////////
// 🔥 SKELETON (optimized)
//////////////////////////////////////

const DashboardSkeleton = () => (
  <div className="p-4 md:p-6 bg-gray-100 min-h-screen space-y-6 animate-pulse">
    <div className="h-24 bg-gray-300 rounded-2xl"></div>

    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="h-20 bg-white rounded-xl"></div>
      ))}
    </div>

    <div className="grid md:grid-cols-3 gap-6">
      <div className="md:col-span-2 h-60 bg-white rounded-xl"></div>
      <div className="h-60 bg-white rounded-xl"></div>
    </div>
  </div>
);