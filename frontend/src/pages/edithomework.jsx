import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function EditHomework() {
  const location = useLocation();
  const navigate = useNavigate();

  const hw = location.state;

  const [form, setForm] = useState({
    description: hw?.description || "",
  });

  if (!hw) {
    return (
      <TeacherLayout>
        <div className="p-6 text-center text-red-500">
          No homework data found ❌
        </div>
      </TeacherLayout>
    );
  }

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/api/homework/update/${hw._id}`,
        form
      );

      alert("Updated Successfully ✅");
      navigate(-1);

    } catch (error) {
      console.log(error);
      alert("Error updating");
    }
  };

  return (
    <TeacherLayout title="Edit Homework">

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        <button
          onClick={() => navigate(-1)}
          className="mb-4 px-4 py-2 bg-gray-300 rounded-lg"
        >
          ← Back
        </button>

        <form onSubmit={handleUpdate} className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow-xl">

          <h1 className="text-2xl font-bold text-[#1fa2a6] mb-4">
            ✏️ Edit Homework
          </h1>

          <p className="text-sm text-gray-500">Class</p>
          <p className="mb-2 font-medium">
            {hw.className} - {hw.section}
          </p>

          <p className="text-sm text-gray-500">Subject</p>
          <p className="mb-4 font-medium">
            {hw.subject}
          </p>

          <textarea
            value={form.description}
            onChange={(e) =>
              setForm((prev) => ({
                ...prev,
                description: e.target.value
              }))
            }
            className="w-full border p-3 rounded-lg mb-4"
            rows="5"
            placeholder="Edit homework..."
          />

          <button
            type="submit"
            className="w-full bg-[#1fa2a6] text-white py-2 rounded-lg hover:bg-[#178a8d]"
          >
            Update Homework
          </button>

        </form>

      </div>

    </TeacherLayout>
  );
}