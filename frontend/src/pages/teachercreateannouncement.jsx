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

        {/* TITLE */}
        <label className="block mb-1">Title</label>
        <input
          value={form.title}
          placeholder="Title"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm(prev => ({ ...prev, title: e.target.value }))
          }
        />

        {/* MESSAGE */}
        <label className="block mb-1">Message</label>
        <textarea
          value={form.message}
          placeholder="Message"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm(prev => ({ ...prev, message: e.target.value }))
          }
        />

        {/* CLASS */}
        <label className="block mb-1">Class</label>
        <select
          value={form.className}
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) => handleClassChange(e.target.value)}
        >
          <option value="">Select Class</option>
          {uniqueClasses.map((cls, i) => (
            <option key={i}>{cls}</option>
          ))}
        </select>

        {/* SECTION */}
        <label className="block mb-1">Section</label>
        <select
          value={form.section}
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm(prev => ({ ...prev, section: e.target.value }))
          }
        >
          <option value="">Select Section</option>
          {sections.map((sec, i) => (
            <option key={i}>{sec}</option>
          ))}
        </select>

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          className="bg-[#14b8a6] text-white w-full p-2 rounded hover:bg-[#249487]"
        >
          Send Announcement
        </button>

           </div>

    </div>

  </div>
</TeacherLayout>
  );
}