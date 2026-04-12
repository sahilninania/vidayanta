import { useEffect, useState } from "react";
//import API from "../config/api";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";

export default function StudentAttendance() {
  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});
  const [info, setInfo] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const studentId = localStorage.getItem("studentId");

        const res = await axios.get(
          `http://localhost:5000/api/attendance/student?studentId=${studentId}`
        );

        setData(res.data.records || []);
        setSummary(res.data.summary || {});
        setInfo({
          className: res.data.className,
          teacherName: res.data.teacherName,
        });
      } catch (error) {
        console.log("Error:", error);
      }
    };

    fetchData();
  }, []);

  // 🔹 LOADING
  if (!summary) {
    return <p className="p-6 font-bold">Loading...</p>;
  }

  return (
    <StudentLayout title="Attendance">
      <div className="p-6 space-y-6 bg-gray-100 min-h-screen">

        {/* 🔥 TITLE */}
        <h2 className="text-2xl font-bold text-[#1fa2a6]">
          Attendance Details
        </h2>

        {/* 🔥 INFO BOX */}
        <div className="bg-white rounded-xl shadow border p-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">

            <div className="p-3 border rounded">
              <b>Class Name:</b> {info?.className || "N/A"}
            </div>

            <div className="p-3 border rounded">
              <b>Class Incharge:</b> {info?.teacherName || "N/A"}
            </div>

            <div className="p-3 border rounded">
              <b>Total Classes:</b> {summary?.total || 0}
            </div>

            <div className="p-3 border rounded">
              <b>Present:</b> {summary?.present || 0}
            </div>

            <div className="p-3 border rounded">
              <b>Absent:</b> {summary?.absent || 0}
            </div>

            <div className="p-3 border rounded">
              <b>Percentage:</b>{" "}
              <span className="text-green-600 font-semibold">
                {summary?.percentage || 0}%
              </span>
            </div>
          </div>
        </div>

        {/* 🔥 TABLE */}
        <div className="bg-white p-4 rounded-xl shadow border overflow-x-auto">
          <table className="w-full text-sm text-center">

            <thead className="bg-gray-200">
              <tr>
                <th className="border p-2">#</th>
                <th className="border p-2">Date</th>
                <th className="border p-2">Status</th>
              </tr>
            </thead>

            <tbody>
              {(data || []).length > 0 ? (
                data.map((item, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">

                    <td className="p-2">{index + 1}</td>

                    <td className="p-2">
                      {new Date(item.date).toLocaleDateString()}
                    </td>

                    <td
                      className={`p-2 font-semibold ${
                        item.status === "present"
                          ? "text-green-600"
                          : "text-red-500"
                      }`}
                    >
                      {item.status?.toUpperCase()}
                    </td>

                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="3" className="p-4 text-gray-500">
                    📭 No attendance records
                  </td>
                </tr>
              )}
            </tbody>

          </table>
        </div>
      </div>
    </StudentLayout>
  );
}