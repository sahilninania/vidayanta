import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useLocation, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AttendanceStudents() {

  const [students, setStudents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const cls = location.state;
  const institutionCode = localStorage.getItem("institutionCode");
  const handleRowClick = (stu) => () => {
  navigate("/institution/attendance/view", { state: stu });
};
  useEffect(() => {
    if (!cls || !institutionCode) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/attendance/students-attendance?className=${cls.className}&section=${cls.section}&institutionCode=${institutionCode}`
        );
        setStudents(res.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [cls, institutionCode]);

  return (
    <InstitutionLayout title="Attendance">

      <div className="p-3 sm:p-4 md:p-6 bg-gray-100 min-h-screen">

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">

          {/* 🔥 BACK */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition"
          >
            ← Back
          </button>

          {/* 🔥 HEADER */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1fa2a6]">
               Students Attendance
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Class {cls?.className} - {cls?.section}
            </p>
          </div>

          {/* 🔥 TABLE */}
          <div className="overflow-x-auto rounded-xl border">

            <table className="w-full text-sm">

              {/* HEADER */}
              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">Roll No</th>
                  <th className="p-3 text-left">Attendance</th>
                </tr>
              </thead>

              {/* BODY */}
              <tbody>

                {students.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="text-center p-6 text-gray-500">
                      No data found
                    </td>
                  </tr>
                ) : (
                  students.map((stu, i) => (
                    <tr
                      key={stu._id}
                      onClick={handleRowClick(stu)
                      }
                      className="border-t hover:bg-gray-50 cursor-pointer transition"
                    >

                      {/* INDEX */}
                      <td className="p-3 font-medium">
                        {i + 1}
                      </td>

                      {/* NAME + AVATAR */}
                      <td className="p-3 flex items-center gap-3">
                        <span className="font-medium text-gray-800">
                          {stu.name}
                        </span>

                      </td>

                      {/* ROLL */}
                      <td className="p-3 text-gray-600">
                        {stu.rollNumber}
                      </td>

                      {/* ATTENDANCE */}
                      <td className="p-3">

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            stu.percentage >= 75
                              ? "bg-green-100 text-green-600"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {stu.percentage}%
                        </span>

                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>

        </div>

      </div>

    </InstitutionLayout>
  );
}