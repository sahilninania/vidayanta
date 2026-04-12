import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

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
        `http://localhost:5000/api/announcement/${state._id}`,
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
    <TeacherLayout title="Edit Announcement">

      <div className="p-6 max-w-md mx-auto bg-white rounded-xl m-6 shadow">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>
        <h1 className="text-xl font-bold mb-4 text-[#14b8a6]">
          Edit Announcement
        </h1>

        <form onSubmit={handleUpdate}>
          <label className="block mb-1">Title</label>
          {/* TITLE */}
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            placeholder="Title"
            className="w-full border p-2 mb-3 rounded"
          />

          {/* MESSAGE */}
          <label className="block mb-1">Message</label>
          <textarea
            name="message"
            value={form.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full border p-2 mb-3 rounded"
          />

          <button
            type="submit"
            className="w-full bg-[#14b8a6] text-white py-2 rounded"
          >
            Update Announcement
          </button>

        </form>

      </div>

    </TeacherLayout>
  );
}