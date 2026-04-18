import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useParams } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignTeacher() {
  const { id } = useParams();

  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    teacherId: "",
    subject: ""
  });

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH TEACHERS
  useEffect(() => {
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
        );

        setTeachers(res.data.teachers || []);
      } catch (err) {
        console.error("Error fetching teachers", err);
      }
    };

    fetchTeachers();
  }, []);

  // ✅ TEACHER CHANGE
  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;

    const teacher = teachers.find((t) => t._id === teacherId);

    setSubjects(teacher?.subjects || []);

    setForm((prev) => ({
      ...prev,
      teacherId,
      subject: ""
    }));
  };

  // ✅ SUBJECT CHANGE
  const handleSubjectChange = (e) => {
    const subject = e.target.value;

    setForm((prev) => ({
      ...prev,
      subject
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.teacherId || !form.subject) {
      alert("Please select teacher and subject");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/assign`, {
        classId: id,
        teacherId: form.teacherId,
        subject: form.subject,
        institutionCode
      });

      alert("Teacher Assigned ✅");

      setForm({ teacherId: "", subject: "" });
      setSubjects([]);

    } catch (err) {
      alert(err?.response?.data?.message || "Error assigning");
    }
  };

  return (
    <InstitutionLayout title="Assign Teacher">
      <div className="max-w-md mx-auto bg-white shadow rounded p-6">

        <h1 className="text-xl font-bold mb-4 text-[#1fa2a6]">
          Assign Teacher
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          {/* ✅ TEACHER */}
          <label>Teacher</label>
          <select
            value={form.teacherId}
            onChange={handleTeacherChange}
            className="border p-2 w-full rounded"
          >
            <option value="">Select Teacher</option>

            {teachers.map((t) => (
              <option key={t._id} value={t._id}>
                {t.teacherName}
              </option>
            ))}
          </select>

          {/* ✅ SUBJECT */}
          <label>Subject</label>
          <select
            value={form.subject}
            onChange={handleSubjectChange}
            className="border p-2 w-full rounded"
            disabled={!subjects.length}
          >
            <option value="">Select Subject</option>

            {subjects.map((sub) => (
              <option key={sub} value={sub}>
                {sub}
              </option>
            ))}
          </select>

          <button className="bg-[#1fa2a6] text-white px-3 py-2 rounded w-full">
            Assign Teacher
          </button>

        </form>
      </div>
    </InstitutionLayout>
  );
}