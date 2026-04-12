import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function StudentFullResult() {
  const [data, setData] = useState([]);
  const { id: studentId } = useParams(); // ✅ correct id

  useEffect(() => {
    const fetch = async () => {
      try {
        if (!studentId) return;

        const res = await axios.get(
          `http://localhost:5000/api/result/student?studentId=${studentId}`
        );

        setData(res?.data?.data || []);
      } catch (err) {
        console.log(err);
      }
    };

    fetch();
  }, [studentId]);

  return (
    <TeacherLayout title="Student Full Result">
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

        {/* HEADER */}
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1fa2a6] mb-6">
          Student Full Result
        </h1>

        {/* EMPTY */}
        {data.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No Results Found 😕
          </div>
        ) : (
          data.map((test, i) => {

            // ✅ filter only selected student
            const studentResults = (test.results || []).filter(
              r => r.studentId?._id?.toString() === studentId
            );

            // ✅ skip if no result for this test
            if (studentResults.length === 0) return null;

            return (
              <div
                key={i}
                className="bg-white p-4 sm:p-5 mb-5 rounded-2xl shadow-md hover:shadow-lg transition"
              >
                {/* SUBJECT HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2 mb-3">
                  <h3 className="font-bold text-lg text-[#1fa2a6]">
                    {test.subject} ({test.testType})
                  </h3>

                  <span className="text-xs text-gray-400">
                    {test.date}
                  </span>
                </div>

                {/* INFO */}
                <p className="text-sm text-gray-500 mb-3">
                  Max Marks: <b>{test.maxMarks}</b>
                </p>

                {/* RESULT */}
                {studentResults.map((r, idx) => (
                  <div
                    key={idx}
                    className="border-t pt-3 mt-3 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-2"
                  >
                    {/* LEFT */}
                    <div className="text-sm">
                      <p>
                        <b>Marks:</b>{" "}
                        {r.status === "absent" ? (
                          <span className="text-red-500 font-bold">A</span>
                        ) : (
                          r.obtainedMarks
                        )}
                      </p>

                      <p>
                        <b>Percentage:</b>{" "}
                        <span className="text-[#1fa2a6] font-semibold">
                          {Number(r.percentage || 0).toFixed(2)}%
                        </span>
                      </p>
                    </div>

                    {/* RIGHT */}
                    <div className="text-sm font-bold text-gray-700">
                      Rank:{" "}
                      {r.rank === 1
                        ? "🥇"
                        : r.rank === 2
                        ? "🥈"
                        : r.rank === 3
                        ? "🥉"
                        : r.rank || "-"}
                    </div>
                  </div>
                ))}
              </div>
            );
          })
        )}
      </div>
    </TeacherLayout>
  );
}