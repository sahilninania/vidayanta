import { useState, useEffect, useMemo, useCallback } from "react";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function TeacherCreateAnnouncement() {

  const [form, setForm] = useState({
    title: "",
    message: "",
    className: "",
    section: ""
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);

  // 🔥 localStorage optimized (only once)
  const teacherId = useMemo(() => localStorage.getItem("teacherId"), []);
  const institutionCode = useMemo(() => localStorage.getItem("institutionCode"), []);

  // 🔥 fetch classes optimized
  const fetchClasses = useCallback(async () => {
    try {
      const res = await axios.post(`${API_URL}/api/classes/teacher-classes`, { teacherId });
      setClasses(res.data.data || []);
    } catch (err) {
      console.log(err);
    }
  }, [teacherId]);

  useEffect(() => {
  const loadData = async () => {
    await fetchClasses();
  };

  loadData();
}, [fetchClasses]);


  // 🔥 derived unique class names (no recalculation)
  const uniqueClasses = useMemo(() => {
    return [...new Set(classes.map(c => c.className))];
  }, [classes]);

  // 🔥 handle class change optimized
  const handleClassChange = useCallback((value) => {
    setForm(prev => ({ ...prev, className: value, section: "" }));

    const filtered = classes.filter(c => c.className === value);
    const uniqueSections = [...new Set(filtered.map(c => c.section))];

    setSections(uniqueSections);
  }, [classes]);

  // 🔥 handle submit optimized
  const handleSubmit = useCallback(async () => {
    try {
      if (!form.title || !form.message || !form.className || !form.section) {
        alert("All fields required");
        return;
      }

      await axios.post(`${API_URL}/api/announcement/create`, {
        title: form.title,
        message: form.message,
        targetType: "class",
        className: form.className,
        section: form.section,
        teacherId,
        institutionCode,
        userId: teacherId
      });

      alert("Announcement Sent ✅");

      // reset form
      setForm({
        title: "",
        message: "",
        className: "",
        section: ""
      });

      setSections([]);

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  }, [form, teacherId, institutionCode]);

  return (
    <TeacherLayout>
  <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white p-6">

    <div className="max-w-4xl mx-auto">

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 p-8 text-white shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              📢 Create Announcement
            </h1>

            <p className="mt-3 text-cyan-100">
              Notify students quickly and efficiently.
            </p>

          </div>

          <div className="hidden md:flex text-7xl">
            📣
          </div>

        </div>

      </div>

      {/* Form Card */}
      <div className="bg-white rounded-3xl shadow-xl p-8 mt-8">
        {/* ================= Form Heading ================= */}
          <div className="mb-8">

            <h2 className="text-2xl font-bold text-gray-800">
              Announcement Details
            </h2>

            <p className="text-gray-500 mt-2">
              Fill in the details below to send an announcement to your students.
            </p>

          </div>
        {/* TITLE */}
        <label className="block text-sm font-semibold text-gray-700 mb-2">Title</label>
        <input
          value={form.title}
          placeholder="Title"
          className="w-full rounded-2xl border border-gray-300 px-4 py-3 mb-5 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent"
          onChange={(e) =>
            setForm(prev => ({ ...prev, title: e.target.value }))
          }
        />

        {/* MESSAGE */}
        <label className="block mb-1">Message</label>
        <textarea
  rows={5}
  value={form.message}
  placeholder="Write your announcement..."
  className="w-full rounded-2xl border border-gray-300 px-4 py-3 mb-5 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500 focus:border-transparent resize-none"
  onChange={(e) =>
    setForm(prev => ({ ...prev, message: e.target.value }))
  }
/>

        {/* ================= Class & Section ================= */}

<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  {/* Class */}

  <div>

    <label className="block text-sm font-semibold text-gray-700 mb-2">
      🎓 Class
    </label>

    <select
      value={form.className}
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500"
      onChange={(e) => handleClassChange(e.target.value)}
    >
      <option value="">Select Class</option>

      {uniqueClasses.map((cls, i) => (
        <option key={i}>
          {cls}
        </option>
      ))}

    </select>

  </div>

  {/* Section */}

  <div>

    <label className="block text-sm font-semibold text-gray-700 mb-2">
      📚 Section
    </label>

    <select
      value={form.section}
      className="w-full rounded-2xl border border-gray-300 px-4 py-3 outline-none transition-all duration-300 focus:ring-2 focus:ring-teal-500"
      onChange={(e) =>
        setForm((prev) => ({
          ...prev,
          section: e.target.value,
        }))
      }
    >
      <option value="">Select Section</option>

      {sections.map((sec, i) => (
        <option key={i}>
          {sec}
        </option>
      ))}

    </select>

  </div>

</div>

{/* ================= Preview ================= */}

<div className="mt-8">

  <h3 className="text-xl font-bold text-gray-800 mb-4">
    👀 Live Preview
  </h3>

  <div className="bg-gradient-to-r from-cyan-50 to-teal-50 rounded-3xl border border-cyan-100 p-6">

    <div className="flex justify-between items-start">

      <div>

        <h2 className="text-xl font-bold text-gray-800">
          {form.title || "Announcement Title"}
        </h2>

        <p className="text-sm text-gray-400 mt-1">
          {form.className || "Class"}
          {form.section && ` - ${form.section}`}
        </p>

      </div>

      <div className="text-4xl">
        📢
      </div>

    </div>

    <p className="mt-5 text-gray-600 leading-7 whitespace-pre-line">
      {form.message || "Your announcement preview will appear here."}
    </p>

  </div>

</div>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="mt-8 w-full rounded-2xl bg-gradient-to-r from-teal-500 to-cyan-500 text-white py-4 text-lg font-semibold shadow-lg hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
        >
          Send Announcement
        </button>

           </div>

    </div>

  </div>
</TeacherLayout>
  );
}