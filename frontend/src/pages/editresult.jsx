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

        <h2 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
          ✏️ Edit Result
        </h2>

        <input
          type="number"
          value={maxMarks}
          onChange={(e) => setMaxMarks(Number(e.target.value))}
          className="border p-2 mb-4 w-full rounded"
        />

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