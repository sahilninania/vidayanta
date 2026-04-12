import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function CreateAnnouncement() {

  const [form, setForm] = useState({
    title: "",
    message: "",
    targetType: "all",
    className: "",
    section: "",
    teacherId: "",
    studentId: ""
  });

  const [classes, setClasses] = useState([]);
  const [sections, setSections] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [students, setStudents] = useState([]);

  const institutionCode = localStorage.getItem("institutionCode");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    axios.get(
      `${API_URL}/api/classes/institution-classes?institutionCode=${institutionCode}`
    ).then(res => setClasses(res.data.data));
  }, []);

  const handleClassChange = (cls) => {
    setForm((prev) => ({
      ...prev,
      className: cls,
      section: "",
      teacherId: "",
      studentId: ""
    }));

    const filtered = classes.filter(c => c.className === cls);
    setSections([...new Set(filtered.map(c => c.section))]);
  };

  const handleSectionChange = async (sec, cls) => {
    setForm((prev) => ({
      ...prev,
      section: sec
    }));

    const tRes = await axios.get(
      `${API_URL}/api/teachers/by-class?className=${cls}&section=${sec}&institutionCode=${institutionCode}`
    );
    setTeachers(tRes.data.data);

    const sRes = await axios.get(
      `${API_URL}/api/classes/students-by-class?className=${cls}&section=${sec}&institutionCode=${institutionCode}`
    );
    setStudents(sRes.data.data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (!form.title || !form.message) {
        alert("Title & Message required ❌");
        return;
      }

      await axios.post(`${API_URL}/api/announcement/create `, {
        ...form,
        institutionCode,
        userId
      });

      alert("✅ Announcement Sent");

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <InstitutionLayout>

      <form onSubmit={handleSubmit} className="p-6 m-8 max-w-xl mx-auto bg-white rounded-xl shadow">

        <h1 className="text-xl font-bold mb-4">
          📢 Send Announcement
        </h1>

        <input
          value={form.title}
          placeholder="Title"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />

        <textarea
          value={form.message}
          placeholder="Message"
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
        />

        <select
          className="border p-2 w-full mb-3 rounded"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, targetType: e.target.value }))
          }
        >
          <option value="all">All</option>
          <option value="teachers">All Teachers</option>
          <option value="students">All Students</option>
          <option value="class">Specific Class</option>
          <option value="teacher">Specific Teacher</option>
          <option value="student">Specific Student</option>
        </select>

        {(form.targetType !== "all") && (
          <select
            className="border p-2 w-full mb-2 rounded"
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option>Select Class</option>
            {[...new Set(classes.map(c => c.className))].map((cls) => (
              <option key={cls}>{cls}</option>
            ))}
          </select>
        )}

        {sections.length > 0 && (
          <select
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) => handleSectionChange(e.target.value, form.className)}
          >
            <option>Select Section</option>
            {sections.map((sec) => (
              <option key={sec}>{sec}</option>
            ))}
          </select>
        )}

        {form.targetType === "teacher" && (
          <select
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, teacherId: e.target.value }))
            }
          >
            <option>Select Teacher</option>
            {teachers.map(t => (
              <option key={t._id} value={t._id}>
                {t.teacherName}
              </option>
            ))}
          </select>
        )}

        {form.targetType === "student" && (
          <select
            className="border p-2 w-full mb-3 rounded"
            onChange={(e) =>
              setForm((prev) => ({ ...prev, studentId: e.target.value }))
            }
          >
            <option>Select Student</option>
            {students.map(s => (
              <option key={s._id} value={s._id}>
                {s.name} - {s.rollNumber}
              </option>
            ))}
          </select>
        )}

        <button
          type="submit"
          className="bg-[#14b8a6] text-white w-full p-2 rounded"
        >
          Send Announcement
        </button>

      </form>

    </InstitutionLayout>
  );
}