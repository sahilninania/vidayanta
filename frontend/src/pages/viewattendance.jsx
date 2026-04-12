import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function ViewAttendance() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  // 🔥 FETCH (stable)
  const fetchAttendance = useCallback(async () => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      if (!teacherId) return;

      const res = await axios.get(
        `${API_URL}/api/attendance/my?teacherId=${teacherId}`
      );

      setData(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

   useEffect(() => {
    const loadData = async () => {
      await   fetchAttendance()
    };
  
    loadData();
  }, [  fetchAttendance]);
  
  // 🔥 DELETE (instant UI update)
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this attendance?")) return;

    try {
      await axios.delete(`${API_URL}/api/attendance/delete/${id}`);

      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 🔥 MEMOIZED UI
  const renderedAttendance = useMemo(() => {
    return data.map((att) => (
      <div
        key={att._id}
        className="bg-white rounded-2xl shadow border p-5"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-4">
          <div>
            <h2 className="font-bold text-lg text-[#1fa2a6]">
              {att.className} - {att.section}
            </h2>
            <p className="text-sm text-gray-500">{att.date}</p>
          </div>

          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate("/teacher/attendance/edit", { state: att })
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded text-sm"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(att._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Delete
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="bg-gray-50 rounded-xl p-3 border">
          <table className="w-full text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="p-3 text-left">Roll</th>
                <th className="p-3 text-left">Name</th>
                <th className="p-3 text-center">Status</th>
              </tr>
            </thead>

            <tbody>
              {att.records?.map((rec, i) => (
                <tr
                  key={rec._id}
                  className="border-t hover:bg-white"
                >
                  <td className="p-3">
                    {rec.studentId?.rollNumber || i + 1}
                  </td>

                  <td className="p-3">
                    {rec.studentId?.name || "N/A"}
                  </td>

                  <td className="p-3 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        rec.status === "present"
                          ? "bg-green-100 text-green-600"
                          : rec.status === "absent"
                          ? "bg-red-100 text-red-600"
                          : "bg-yellow-100 text-yellow-600"
                      }`}
                    >
                      {rec.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ));
  }, [data, navigate, handleDelete]);

  return (
    <TeacherLayout title="View Attendance">
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
          Attendance Records
        </h1>

        {data.length === 0 ? (
          <p className="text-center text-gray-500">
            No attendance found
          </p>
        ) : (
          <div className="space-y-6">
            {renderedAttendance}
          </div>
        )}
      </div>
    </TeacherLayout>
  );
}