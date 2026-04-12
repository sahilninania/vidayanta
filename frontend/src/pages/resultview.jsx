import { useEffect, useState } from "react";
//import API from "../config/api";
import { useLocation, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function ResultView() {
  const navigate = useNavigate();
  const { state: student } = useLocation();

  const [groupedResults, setGroupedResults] = useState({});

  useEffect(() => {
    if (!student?._id) return;

    const fetchResults = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/result/student?studentId=${student._id}`
        );

        const grouped = res.data.data.reduce((acc, test) => {
          const type = test.testType;

          if (!acc[type]) acc[type] = [];

          const studentData = test.results.find(
            (r) =>
              r.studentId === student._id ||
              r.studentId?._id === student._id
          );

          if (studentData) {
            acc[type].push({
              subject: test.subject,
              marks: studentData.obtainedMarks,
              total: test.maxMarks,
              rank: studentData.rank,
            });
          }

          return acc;
        }, {});

        setGroupedResults(grouped);
      } catch (err) {
        console.error(err);
      }
    };

    fetchResults();
  }, [student?._id]);

  return (
    <InstitutionLayout title="Result Details">
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">
        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <button
              onClick={() => navigate(-1)}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              ← Back
            </button>

            <h1 className="text-xl sm:text-2xl font-bold text-[#1fa2a6]">
              Result Overview
            </h1>
          </div>

          {/* STUDENT CARD */}
          <div className="bg-white p-5 rounded-2xl shadow mb-6 flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-[#1fa2a6] text-white flex items-center justify-center font-bold">
              {student?.name?.charAt(0) || "S"}
            </div>

            <div>
              <p className="font-semibold text-lg">{student?.name}</p>
              <p className="text-sm text-gray-500">
                Roll: {student?.rollNumber}
              </p>
            </div>
          </div>

          {/* GROUPED TABLES */}
          {Object.entries(groupedResults).map(([type, items]) => (
            <div key={type} className="mb-8">

              {/* SECTION TITLE */}
              <h2 className="text-lg font-bold mb-3 text-[#1fa2a6]">
                {type}
              </h2>

              <div className="bg-white rounded-xl shadow border overflow-x-auto">
                <table className="w-full text-sm">

                  <thead className="bg-gray-200 text-black">
                    <tr>
                      <th className="p-3 text-left">Subject</th>
                      <th className="p-3 text-center">Marks</th>
                      <th className="p-3 text-center">Rank</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((item, i) => (
                      <tr key={i} className="border-b hover:bg-gray-50">
                        <td className="p-3 font-medium">{item.subject}</td>

                        <td className="p-3 text-center font-semibold text-[#1fa2a6]">
                          {item.marks} / {item.total}
                        </td>

                        <td className="p-3 text-center font-bold">
                          {item.rank ?? "-"}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>
            </div>
          ))}

        </div>
      </div>
    </InstitutionLayout>
  );
}