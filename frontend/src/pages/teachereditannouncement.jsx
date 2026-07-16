import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

export default function TeacherEditAnnouncement() {

  const { state } = useLocation();
  const navigate = useNavigate();

  const teacherId = localStorage.getItem("teacherId");

  const [form, setForm] = useState({
    title: state?.title || "",
    message: state?.message || "",
    className: state?.className || "",
    section: state?.section || ""
  });

  if (!state?._id) {
    return <p>No data found</p>;
  }

  // ✅ handle change
  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  // ✅ update
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/api/announcement/${state._id}`,
        {
          ...form,
          userId: teacherId
        }
      );

      alert("Updated successfully ✅");
      navigate(-1);

    } catch (error) {
      console.log(error);
      alert("Update failed ❌");
    }
  };
return (
  <TeacherLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white p-6">

      <div className="max-w-4xl mx-auto">

        {/* Header */}
        <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 p-8 text-white shadow-xl">

          <div className="flex justify-between items-center">

            <div>
              <h1 className="text-4xl font-bold">
                ✏️ Edit Announcement
              </h1>

              <p className="mt-2 text-cyan-100">
                Update your announcement before sending it to students.
              </p>
            </div>

            <div className="hidden md:block text-7xl">
              📢
            </div>

          </div>

        </div>

        {/* Card */}

        <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">

          <div className="mb-8">

            <h2 className="text-2xl font-bold text-gray-800">
              Announcement Details
            </h2>

            <p className="text-gray-500 mt-2">
              Modify the announcement information below.
            </p>

          </div>

          <form onSubmit={handleUpdate}>

            {/* Title */}

            <div className="mb-6">

              <label className="block text-sm font-semibold text-gray-700 mb-2">
                📝 Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Announcement Title"
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />

            </div>

            {/* Message */}

            <div className="mb-6">

              <div className="flex justify-between mb-2">

                <label className="text-sm font-semibold text-gray-700">
                  📄 Message
                </label>

                <span className="text-xs text-gray-400">
                  {form.message.length} characters
                </span>

              </div>

              <textarea
                rows={6}
                name="message"
                value={form.message}
                onChange={handleChange}
                placeholder="Write announcement..."
                className="w-full rounded-2xl border border-gray-300 px-4 py-3 resize-none outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
              />

            </div>

            {/* Read Only Info */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">

              <div className="rounded-2xl bg-cyan-50 border border-cyan-100 p-4">

                <p className="text-sm text-gray-500">
                  🎓 Class
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  {form.className}
                </h3>

              </div>

              <div className="rounded-2xl bg-teal-50 border border-teal-100 p-4">

                <p className="text-sm text-gray-500">
                  📚 Section
                </p>

                <h3 className="text-xl font-bold text-gray-800 mt-1">
                  {form.section}
                </h3>

              </div>

            </div>

            {/* Preview */}

            <div className="mb-8">

              <h3 className="text-xl font-bold text-gray-800 mb-4">
                👀 Live Preview
              </h3>

              <div className="rounded-3xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-teal-50 p-6">

                <div className="flex justify-between">

                  <div>

                    <h2 className="text-xl font-bold text-gray-800">
                      {form.title || "Announcement Title"}
                    </h2>

                    <p className="text-sm text-gray-400 mt-1">
                      {form.className} - {form.section}
                    </p>

                  </div>

                  <div className="text-4xl">
                    📣
                  </div>

                </div>

                <p className="mt-5 text-gray-600 whitespace-pre-line leading-7">
                  {form.message || "Announcement preview will appear here."}
                </p>

              </div>

            </div>

            {/* Buttons */}

            <div className="flex flex-col md:flex-row gap-4">

              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 rounded-2xl border border-gray-300 py-4 font-semibold hover:bg-gray-100 transition"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="flex-1 rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              >
                ✅ Update Announcement
              </button>

            </div>

          </form>

        </div>

      </div>

    </div>
  </TeacherLayout>
);
}