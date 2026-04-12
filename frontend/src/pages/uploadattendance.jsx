import { useEffect, useState, useCallback, useMemo } from "react";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function UploadAttendance() {
  const [students, setStudents] = useState([]);
  const [attendance, setAttendance] = useState({});
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [loading, setLoading] = useState(false);

  // 🔥 optimize localStorage (only once)
  const teacherId = useMemo(() => localStorage.getItem("teacherId"), []);
  const institutionCode = useMemo(() => localStorage.getItem("institutionCode"), []);

  // 🔥 fetch students (stable function)
  const fetchData = useCallback(async () => {
    try {
      const res = await axios.post(`${API_URL}/api/attendance/students`, {
        teacherId,
        institutionCode
      });

      const sorted = res.data.students.sort(
        (a, b) => a.rollNumber - b.rollNumber
      );

      setStudents(sorted);
      setClassName(res.data.className);
      setSection(res.data.section);

      // default attendance
      const initial = {};
      for (let i = 0; i < sorted.length; i++) {
        initial[sorted[i]._id] = "present";
      }

      setAttendance(initial);

    } catch (err) {
      console.log(err);
    }
  }, [teacherId, institutionCode]);

 useEffect(() => {
  const loadData = async () => {
    await fetchData();
  };

  loadData();
}, [fetchData]);

  // 🔥 mark all optimized
  const markAll = useCallback((status) => {
    const updated = {};
    for (let i = 0; i < students.length; i++) {
      updated[students[i]._id] = status;
    }
    setAttendance(updated);
  }, [students]);

  // 🔥 update single (avoid unnecessary re-render)
  const handleStatus = useCallback((id, status) => {
    setAttendance((prev) => {
      if (prev[id] === status) return prev;
      return { ...prev, [id]: status };
    });
  }, []);

  // 🔥 submit optimized
  const handleSubmit = useCallback(async () => {
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/attendance/create`, {
        teacherId,
        institutionCode,
        className,
        section,
        attendance
      });

      alert("Attendance Saved Successfully");
    } catch (err) {
      console.log(err);
      alert("Error saving attendance");
    } finally {
      setLoading(false);
    }
  }, [teacherId, institutionCode, className, section, attendance]);

  return (
  <TeacherLayout title="Upload Attendance">
    <div className="min-h-screen bg-gray-100 p-6">

      {/* Card */}
      <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-6">

        {/* Header */}
        <h1 className="text-2xl font-bold text-[#1fa2a6] mb-2">
          Upload Attendance
        </h1>

        <p className="text-gray-600 mb-4">
          Class <span className="font-semibold">{className}</span> -{" "}
          <span className="font-semibold">{section}</span>
        </p>

        <p className="text-sm text-gray-500 mb-6">
          Date: {new Date().toLocaleDateString()}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 mb-6 flex-wrap">
          <button
            onClick={() => markAll("present")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg transition"
          >
            All Present
          </button>

          <button
            onClick={() => markAll("absent")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            All Absent
          </button>

          <button
            onClick={() => markAll("leave")}
            className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg transition"
          >
            All Leave
          </button>
        </div>

        {/* Students List */}
        <div className="space-y-3 max-h-[400px] overflow-y-auto pr-2">
          {students.map((stu, i) => (
            <div
              key={stu._id}
              className="flex justify-between items-center bg-gray-50 p-3 rounded-lg shadow-sm"
            >
              <span className="font-medium">
                {i + 1}. {stu.name}
              </span>

              <div className="flex gap-2">

                <button
                  onClick={() => handleStatus(stu._id, "present")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    attendance[stu._id] === "present"
                      ? "bg-green-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <span className="sm:hidden">P</span>
                  <span className="hidden sm:inline">Present</span>
                </button>

                <button
                  onClick={() => handleStatus(stu._id, "absent")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    attendance[stu._id] === "absent"
                      ? "bg-red-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <span className="sm:hidden">A</span>
                  <span className="hidden sm:inline">Absent</span>
                </button>

                <button
                  onClick={() => handleStatus(stu._id, "leave")}
                  className={`px-3 py-1 rounded-md text-sm ${
                    attendance[stu._id] === "leave"
                      ? "bg-yellow-500 text-white"
                      : "bg-gray-200"
                  }`}
                >
                  <span className="sm:hidden">L</span>
                  <span className="hidden sm:inline">Leave</span>
                </button>

              </div>
            </div>
          ))}
        </div>

        {/* Submit Button */}
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full mt-6 bg-[#1fa2a6] hover:bg-[#178b8f] text-white py-3 rounded-lg font-semibold transition"
        >
          {loading ? "Saving..." : "Upload Attendance"}
        </button>

      </div>
    </div>
  </TeacherLayout>
  );
}