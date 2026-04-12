import axios from "axios";
import { useEffect, useState } from "react";
//import API from "../config/api";
import { useParams } from "react-router-dom";

export default function ClassAttendance() {
  const { id } = useParams();

  const [students, setStudents] = useState([]);
  const [month, setMonth] = useState(
    new Date().toISOString().slice(0, 7)
  );

  useEffect(() => {
    if (!id) return;

    const fetchAttendance = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/students/attendance/${id}?month=${month}`
        );

        setStudents(res.data.data || []);
      } catch (err) {
        console.error("Attendance fetch error 👉", err);
      }
    };

    fetchAttendance();

  }, [id, month]);

  const mark = async (studentId, status) => {
    try {
      await axios.post("/api/students/attendance", {
        studentId,
        date: new Date().toISOString().slice(0, 10),
        status
      });

      // refresh data
      const res = await axios.get(
        `http://localhost:5000/api/students/attendance/${id}?month=${month}`
      );
      setStudents(res.data.data || []);

    } catch (err) {
      console.error("Mark attendance error 👉", err);
    }
  };

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">
        Attendance
      </h2>

      {/* MONTH SELECT */}
      <input
        type="month"
        value={month}
        onChange={(e) => setMonth(e.target.value)}
        className="mb-4 border p-2"
      />

      {/* LIST */}
      <div className="grid gap-4">

        {students.length === 0 ? (
          <p className="text-center text-gray-500">
            No students found
          </p>
        ) : (
          students.map((stu) => (
            <div
              key={stu._id}
              className="bg-white p-4 rounded shadow flex justify-between items-center"
            >
              <div>
                <h3>{stu.userId?.name}</h3>
                <p>Roll: {stu.rollNumber}</p>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => mark(stu._id, "Present")}
                  className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 transition"
                >
                  Present
                </button>

                <button
                  onClick={() => mark(stu._id, "Absent")}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Absent
                </button>
              </div>
            </div>
          ))
        )}

      </div>
    </div>
  );
}