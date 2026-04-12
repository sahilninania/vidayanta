import { useEffect, useState } from "react";
// import API from "../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AttendanceView() {

  const [data, setData] = useState([]);
  const [summary, setSummary] = useState({});

  const location = useLocation();
  const navigate = useNavigate();

  const student = location.state;

  useEffect(() => {
    if (!student) return;

    const fetchData = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/attendance/student-details?studentId=${student._id}`
      );

      setData(res.data?.records || []);
      setSummary(res.data?.summary || {});
    };

    fetchData();
  }, [student?._id]);

  return (
    <InstitutionLayout>
      <div className="p-4">

        {/* 🔙 BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 rounded"
        >
          ← Back
        </button>

        {/* 🔥 TITLE */}
        <h1 className="text-2xl font-bold text-[#1fa2a6] mb-2">
          Attendance Details
        </h1>

        <p className="mb-4">
          {student?.name} (Roll: {student?.rollNumber})
        </p>

        {/* 🔥 SUMMARY */}
        <div className="bg-white p-4 rounded shadow mb-4 flex gap-6">

          <div>
            <p>Total</p>
            <b>{summary.total}</b>
          </div>

          <div>
            <p>Present</p>
            <b className="text-green-600">{summary.present}</b>
          </div>

          <div>
            <p>Absent</p>
            <b className="text-red-600">{summary.absent}</b>
          </div>

          <div>
            <p>%</p>
            <b>{summary.percentage}%</b>
          </div>

        </div>

        {/* 🔥 TABLE */}
        <div className="bg-white p-4 rounded shadow">

          <table className="w-full text-sm">

            <thead className="bg-gray-200">
              <tr>
                <th className="p-2 border">#</th>
                <th className="p-2 border">Date</th>
                <th className="p-2 border">Status</th>
              </tr>
            </thead>

            <tbody>
              {data.map((item, i) => (
                <tr key={item._id || item.date} className="text-center border-t">

                  <td className="p-2">{i + 1}</td>

                  <td className="p-2">
                    {new Date(item.date).toLocaleDateString()}
                  </td>

                  <td className={`p-2 font-bold ${
                    item.status === "present"
                      ? "text-green-600"
                      : "text-red-600"
                  }`}>
                    {item.status.toUpperCase()}
                  </td>

                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>
    </InstitutionLayout>
  );
}