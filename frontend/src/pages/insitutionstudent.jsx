import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useLocation, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function InstitutionStudents() {

  const [students, setStudents] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  const cls = location.state;
  const institutionCode = localStorage.getItem("institutionCode");

  useEffect(() => {
    if (!cls) return;

    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/classes/students-by-class?className=${cls.className}&section=${cls.section}&institutionCode=${institutionCode}`
        );
        setStudents(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchStudents();
  }, [cls]);

  return (
    <InstitutionLayout title="Students">

      <div className="p-3 sm:p-4 md:p-6 bg-gray-100 min-h-screen">

        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6 md:p-8">

          {/* 🔥 BACK BUTTON TOP */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition"
          >
            ← Back
          </button>

          {/* 🔥 HEADER */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1fa2a6]">
              🎓 Students
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Class {cls?.className} - {cls?.section}
            </p>
          </div>

          {/* 🔥 STUDENTS */}
          {students.length === 0 ? (
            <div className="text-center text-gray-500 py-10">
              No students found
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

              {students.map((stu) => (
                <div
                  key={stu._id}
                  className="bg-gradient-to-br from-white to-gray-50 p-4 rounded-xl shadow-sm hover:shadow-md border transition"
                >

                  <div className="w-10 h-10 rounded-full bg-[#1fa2a6] text-white flex items-center justify-center font-bold mb-2">
                    {stu.name?.charAt(0)}
                  </div>

                  <h3 className="font-semibold text-[#1fa2a6] text-sm sm:text-base">
                    {stu.name}
                  </h3>

                  <p className="text-xs text-gray-600">
                    Roll: {stu.rollNumber}
                  </p>

                  <p className="text-xs text-gray-400 mt-1 break-all">
                    {stu.email}
                  </p>

                </div>
              ))}

            </div>
          )}

        </div>

      </div>

    </InstitutionLayout>
  );
}