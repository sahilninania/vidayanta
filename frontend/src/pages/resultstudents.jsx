import { useEffect, useState } from "react";
//import API from "../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function ResultStudents() {
  const [students, setStudents] = useState([]);

  const { state: cls } = useLocation();
  const navigate = useNavigate();

  const institutionCode = localStorage.getItem("institutionCode");

  useEffect(() => {
    if (!cls?.className || !cls?.section) return;

    const fetchStudents = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/result/students-summary?className=${cls.className}&section=${cls.section}&institutionCode=${institutionCode}`
        );

        setStudents(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchStudents();
  }, [cls?.className, cls?.section, institutionCode]);

  return (
    <InstitutionLayout title="Results">
      <div className="p-3 sm:p-4 md:p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 sm:p-6">

          {/* BACK */}
          <button
            onClick={() => navigate(-1)}
            className="mb-4 px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg text-sm transition"
          >
            ← Back
          </button>

          {/* HEADER */}
          <div className="mb-5">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#1fa2a6]">
              Students Results
            </h1>

            <p className="text-sm text-gray-500 mt-1">
              Class {cls?.className} - {cls?.section}
            </p>
          </div>

          {/* TABLE */}
          <div className="overflow-x-auto rounded-xl border">
            <table className="w-full text-sm">

              <thead className="bg-gray-200 text-black">
                <tr>
                  <th className="p-3 text-left">#</th>
                  <th className="p-3 text-left">Student</th>
                  <th className="p-3 text-left">Roll</th>
                  <th className="p-3 text-left">Mobile</th>
                   {/* <th className="p-3 text-left">Email</th> */}
                </tr>
              </thead>

              <tbody>
                {students.length === 0 ? (
                  <tr>
                    <td colSpan="5" className="text-center p-6 text-gray-500">
                      No results found
                    </td>
                  </tr>
                ) : (
                  students.map((stu, i) => {
                    

                    

                    return (
                      <tr
                        key={stu._id}
                        onClick={() =>
                          navigate("/institution/results/view", { state: stu })
                        }
                        className="border-t hover:bg-gray-50 cursor-pointer transition"
                      >
                        <td className="p-3 font-medium">{i + 1}</td>

                        <td className="p-3 font-medium text-gray-800">
                          {stu.name}
                        </td>

                        <td className="p-3 text-gray-600">
                          {stu.rollNumber}
                        </td>

                       <td className="p-3 text-gray-600">
                          {stu.mobile?.toString() || "-"}
                        </td>

                        {/* <td className="p-3 text-gray-600">
                          {stu.email || "-"}
                        </td> */}
                      </tr>
                    );
                  })
                )}
              </tbody>

            </table>
          </div>

        </div>
      </div>
    </InstitutionLayout>
  );
}