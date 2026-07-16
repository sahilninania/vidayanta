import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function EditResult() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [results, setResults] = useState(() => state?.results || []);
  const [maxMarks, setMaxMarks] = useState(() => state?.maxMarks || 0);

  if (!state) {
    return <p>No data found</p>;
  }

  const handleMarkChange = (index, value) => {
    setResults((prev) =>
      prev.map((r, i) =>
        i === index
          ? { ...r, obtainedMarks: Number(value) }
          : r
      )
    );
  };

  const handleStatusChange = (index, status) => {
    setResults((prev) =>
      prev.map((r, i) =>
        i === index
          ? {
              ...r,
              status,
              obtainedMarks: status === "absent" ? 0 : r.obtainedMarks
            }
          : r
      )
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${API_URL}/api/result/${state._id}`, {
        ...state,
        maxMarks,
        results
      });

      alert("Updated Successfully ✅");
      navigate("/teacher/view-results");

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <TeacherLayout title="Edit Result">

      <form onSubmit={handleSubmit} className="p-4 md:p-6 bg-gray-100 min-h-screen">

        {/* ================= Header ================= */}

<div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white p-8 shadow-xl mb-8">

  <div className="flex flex-col lg:flex-row justify-between items-center">

    <div>

      <h1 className="text-4xl font-bold">
        ✏️ Edit Result
      </h1>

      <p className="mt-3 text-cyan-100">
        Update student marks and attendance easily.
      </p>

    </div>

    <div className="hidden md:block text-7xl">
      📝
    </div>

  </div>

</div>

       <div className="bg-white rounded-3xl shadow-lg p-6 mb-8">

  <label className="block text-sm font-semibold text-gray-700 mb-3">
    🎯 Maximum Marks
  </label>

  <input
    type="number"
    value={maxMarks}
    onChange={(e) => setMaxMarks(Number(e.target.value))}
    className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none focus:ring-2 focus:ring-teal-500"
  />

</div>

        {results.map((r) => (
          <div
            key={r._id || r.studentId?._id}
            className="flex justify-between items-center bg-white p-3 mb-2 rounded shadow"
          >
            <span>
              {r.studentId?.rollNumber}. {r.studentId?.name}
            </span>

            <div className="flex items-center gap-2">

              <input
                type="number"
                value={r.status === "absent" ? 0 : r.obtainedMarks}
                disabled={r.status === "absent"}
                onChange={(e) =>
                  handleMarkChange(
                    results.findIndex((x) => x === r),
                    e.target.value
                  )
                }
                className="border p-1 w-20 rounded"
              />

              <button
                type="button"
                onClick={() => handleStatusChange(
                  results.findIndex((x) => x === r),
                  "present"
                )}
                className={`px-2 py-1 rounded text-white ${
                  r.status === "present"
                    ? "bg-green-600"
                    : "bg-green-400"
                }`}
              >
                P
              </button>

              <button
                type="button"
                onClick={() => handleStatusChange(
                  results.findIndex((x) => x === r),
                  "absent"
                )}
                className={`px-2 py-1 rounded text-white ${
                  r.status === "absent"
                    ? "bg-red-600"
                    : "bg-red-400"
                }`}
              >
                A
              </button>

            </div>

          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 mt-4 rounded"
        >
          Update Result
        </button>

      </form>

    </TeacherLayout>
  );
}