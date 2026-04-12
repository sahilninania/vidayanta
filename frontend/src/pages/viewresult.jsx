import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function ViewResult() {
  const [data, setData] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [subject, setSubject] = useState("");
  const [testType, setTestType] = useState("");

  const navigate = useNavigate();

  // 🔥 FETCH
  const fetchData = useCallback(async () => {
    try {
      const teacherId = localStorage.getItem("teacherId");
      if (!teacherId) return;

      const res = await axios.get(
        `http://localhost:5000/api/result/my?teacherId=${teacherId}`
      );

      const results = res?.data?.data || [];
      setData(results);
      setFiltered(results);
    } catch (err) {
      console.log("Error fetching:", err);
    }
  }, []);

  useEffect(() => {
      const loadData = async () => {
        await fetchData();
      };

      loadData();
    }, [fetchData]);

  // 🔥 FILTER
  const handleFilter = useCallback(() => {
    let temp = [...data];

    if (subject) {
      temp = temp.filter((r) =>
        r.subject.toLowerCase().includes(subject.toLowerCase())
      );
    }

    if (testType) {
      temp = temp.filter((r) => r.testType === testType);
    }

    setFiltered(temp);
  }, [data, subject, testType]);

  // 🔥 DELETE
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this result?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/result/${id}`);

      setFiltered((prev) => prev.filter((r) => r._id !== id));
      setData((prev) => prev.filter((r) => r._id !== id));

      alert("Deleted ✅");
    } catch (err) {
      console.log(err);
      alert("Error deleting ❌");
    }
  }, []);

  // 🔥 RENDER
  const renderedResults = useMemo(() => {
    return filtered.map((res, i) => (
      <div
        key={i}
        className="bg-white p-4 sm:p-5 mb-6 rounded-2xl shadow-md hover:shadow-lg transition"
      >
        {/* HEADER */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
          <div>
            <h3 className="font-bold text-lg text-[#1fa2a6]">
              Class {res.className} - {res.section}
            </h3>

            <p className="text-sm text-gray-500">
              {res.subject} | {res.testType}
            </p>

            <p className="text-xs text-gray-400">
              {res.date} | Max: {res.maxMarks}
            </p>
          </div>

          {/* ACTION BUTTONS */}
          <div className="flex gap-2">
            <button
              onClick={() =>
                navigate("/teacher/result/edit", { state: res })
              }
              className="bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm"
            >
              ✏️ Edit
            </button>

            <button
              onClick={() => handleDelete(res._id)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs sm:text-sm"
            >
              🗑 Delete
            </button>
          </div>
        </div>

        {/* TABLE */}
        <div className="overflow-x-auto mt-4">
          <table className="w-full text-xs sm:text-sm border rounded-lg overflow-hidden">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="p-2 sm:p-3 border text-left">Roll</th>
                <th className="p-2 sm:p-3 border text-left">Name</th>
                <th className="p-2 sm:p-3 border text-center">Marks</th>
                <th className="p-2 sm:p-3 border text-center">%</th>
                <th className="p-2 sm:p-3 border text-center">Rank</th>
              </tr>
            </thead>

            <tbody>
              {res.results?.map((r, idx) => (
                <tr
                  key={idx}
                  className="text-center hover:bg-gray-50 transition"
                >
                  <td className="p-2 border">
                    {r.studentId?.rollNumber}
                  </td>

                  <td
                    className="p-2 border text-left cursor-pointer hover:text-[#1fa2a6] hover:underline"
                    onClick={() =>
                      navigate(`/teacher/student-result/${r.studentId?._id}`)
                    }
                  >
                    {r.studentId?.name}
                  </td>

                  {/* MARKS */}
                  <td className="p-2 border font-medium">
                    {r.status === "absent" ? (
                      <span className="text-red-500 font-bold">A</span>
                    ) : (
                      r.obtainedMarks
                    )}
                  </td>

                  {/* PERCENT */}
                  <td className="p-2 border text-[#1fa2a6] font-semibold">
                    {Number(r.percentage || 0).toFixed(2)}%
                  </td>

                  {/* RANK */}
                  <td className="p-2 border font-bold">
                    {r.rank === 1 ? "🥇" : r.rank === 2 ? "🥈" : r.rank === 3 ? "🥉" : r.rank}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    ));
  }, [filtered, navigate, handleDelete]);

  return (
    <TeacherLayout title="View Result">
      <div className="p-4 sm:p-6 bg-gray-100 min-h-screen">

        {/* TITLE */}
        <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-[#1fa2a6]">
          View Results
        </h2>

        {/* FILTER */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6 flex flex-col sm:flex-row gap-3 sm:items-center">

          <input
            type="text"
            placeholder="Search Subject..."
            className="border p-2 rounded-lg w-full sm:flex-1"
            onChange={(e) => setSubject(e.target.value)}
          />

          <select
            className="border p-2 rounded-lg w-full sm:w-48"
            onChange={(e) => setTestType(e.target.value)}
          >
            <option value="">Test Type</option>
            <option>class test</option>
            <option>unit test</option>
            <option>semester</option>
            <option>final</option>
          </select>

          <button
            onClick={handleFilter}
            className="bg-[#1fa2a6] hover:bg-[#178b8f] text-white px-4 py-2 rounded-lg"
          >
            Search
          </button>
        </div>

        {/* RESULTS */}
        {filtered.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            No results found 😕
          </div>
        ) : (
          renderedResults
        )}
      </div>
    </TeacherLayout>
  );
}