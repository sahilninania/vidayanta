import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// import API from "../config/api";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function EditAttendance() {
  const location = useLocation();
  const navigate = useNavigate();

  const att = location.state;

  const [records, setRecords] = useState(() => att?.records || []);

  if (!att) {
    return <p>No data found</p>;
  }

  const changeStatus = (studentId, value) => {
    setRecords((prev) =>
      prev.map((r) =>
        r.studentId._id === studentId
          ? { ...r, status: value }
          : r
      )
    );
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    await axios.put(
      `http://localhost:5000/api/attendance/update/${att._id}`,
      { records }
    );

    alert("Updated ✅");
    navigate(-1);
  };

  return (
    <TeacherLayout title="Edit Attendance">
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 rounded"
        >
          ← Back
        </button>

        <h1 className="text-2xl font-bold mb-4 text-[#1fa2a6]">
          Edit Attendance
        </h1>

        <form onSubmit={handleUpdate} className="bg-white p-5 rounded-2xl shadow">

          {records.map((rec) => (
            <div
              key={rec._id}
              className="flex justify-between items-center border p-3 mb-2 rounded"
            >
              <span>
                {rec.studentId?.name}
              </span>

              <select
                value={rec.status}
                onChange={(e) =>
                  changeStatus(rec.studentId._id, e.target.value)
                }
                className="border px-2 py-1 rounded"
              >
                <option value="present">Present</option>
                <option value="absent">Absent</option>
                <option value="leave">Leave</option>
              </select>
            </div>
          ))}

          <button
            type="submit"
            className="mt-4 w-full bg-[#1fa2a6] text-white py-2 rounded"
          >
            Save Changes
          </button>

        </form>

      </div>
    </TeacherLayout>
  );
}