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

        {results.map((r, index) => (

  <div
    key={r._id || r.studentId?._id}
    className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 mb-5 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
  >

    <div className="flex flex-col lg:flex-row justify-between lg:items-center gap-6">

      {/* Student */}

      <div className="flex-1">

  <h2 className="text-lg font-bold text-gray-800">
    {r.studentId?.name}
  </h2>

  <p className="text-sm text-gray-500">
    Roll No. {r.studentId?.rollNumber}
  </p>

</div>

      {/* Marks + Status */}

      <div className="flex items-center gap-2 flex-nowrap">

        <input
          type="number"
          value={r.status === "absent" ? 0 : r.obtainedMarks}
          disabled={r.status === "absent"}
          onChange={(e) =>
            handleMarkChange(index, e.target.value)
          }
          className="w-16 md:w-20 rounded-xl border border-gray-300 px-2 py-2 text-center outline-none focus:ring-2 focus:ring-teal-500 disabled:bg-gray-100"
        />

        {/* Present */}

        <button
          type="button"
          onClick={() => handleStatusChange(index, "present")}
          className={`w-10 h-10 rounded-xl font-bold transition ${
  r.status === "present"
    ? "bg-green-600 text-white"
    : "bg-green-100 text-green-700 hover:bg-green-200"
}`}
        >
          ✅ P
        </button>

        {/* Absent */}

        <button
          type="button"
          onClick={() => handleStatusChange(index, "absent")}
          className={`w-10 h-10 rounded-xl font-bold transition ${
  r.status === "absent"
    ? "bg-red-600 text-white"
    : "bg-red-100 text-red-700 hover:bg-red-200"
}`}
        >
          ❌ A
        </button>

      </div>

    </div>

  </div>

))}

       {/* ================= Summary ================= */}

<div className="bg-white rounded-3xl shadow-lg p-6 mt-8">

  <h2 className="text-xl font-bold text-gray-800 mb-5">
    📊 Result Summary
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

    {/* Total */}

    <div className="rounded-2xl bg-blue-50 p-5">

      <p className="text-sm text-gray-500">
        Total Students
      </p>

      <h2 className="text-4xl font-bold text-blue-600 mt-2">
        {results.length}
      </h2>

    </div>

    {/* Present */}

    <div className="rounded-2xl bg-green-50 p-5">

      <p className="text-sm text-gray-500">
        Present
      </p>

      <h2 className="text-4xl font-bold text-green-600 mt-2">
        {results.filter(r => r.status === "present").length}
      </h2>

    </div>

    {/* Absent */}

    <div className="rounded-2xl bg-red-50 p-5">

      <p className="text-sm text-gray-500">
        Absent
      </p>

      <h2 className="text-4xl font-bold text-red-600 mt-2">
        {results.filter(r => r.status === "absent").length}
      </h2>

    </div>

  </div>

</div>

{/* ================= Buttons ================= */}

<div className="flex flex-col md:flex-row gap-4 mt-8">

  <button
    type="button"
    onClick={() => navigate(-1)}
    className="flex-1 rounded-2xl border border-gray-300 py-4 text-lg font-semibold hover:bg-gray-100 transition"
  >
    ← Cancel
  </button>

  <button
    type="submit"
    className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
  >
    💾 Update Result
  </button>

</div>
      </form>

    </TeacherLayout>
  );
}