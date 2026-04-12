import { useEffect, useState } from "react";
// import API from "../config/api";
import { useParams } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignTeacher() {
  const { id } = useParams();

  const [teachers, setTeachers] = useState([]);
  const [_selectedTeacher, setSelectedTeacher] = useState(null);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    teacherId: "",
    subject: ""
  });

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH TEACHERS
  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/teachers/by-institution?institutionCode=${institutionCode}`
      );

      setTeachers(res.data.teachers);
    };

    fetchTeachers();
  }, []);

  // ✅ HANDLE TEACHER CHANGE
  const handleTeacherChange = (e) => {
    const teacherId = e.target.value;

    const teacher = teachers.find(t => t._id === teacherId);

    setSelectedTeacher(teacher);
    setSubjects(teacher?.subjects || []);

    setForm({
      ...form,
      teacherId,
      subject: "" // reset subject
    });
  };

  // ✅ HANDLE SUBJECT CHANGE
  const handleSubjectChange = (e) => {
    setForm({
      ...form,
      subject: e.target.value
    });
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.teacherId || !form.subject) {
      alert("Please select teacher and subject");
      return;
    }

    await axios.post("http://localhost:5000/api/classes/assign", {
      classId: id,
      teacherId: form.teacherId,
      subject: form.subject
    });

    alert("Teacher Assigned ✅");

    // reset
    setForm({ teacherId: "", subject: "" });
    setSubjects([]);
  };

  return (
    <InstitutionLayout title="Assign Teacher">
      
    <div className=" max-w-md mx-auto bg-white shadow rounded p-6 ">
      <h2 className="text-3xl md:text-4xl font-bold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>
      <h1 className="text-xl font-bold mb-4 text-[#1fa2a6]">Assign Teacher</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* ✅ TEACHER DROPDOWN */}
        <label className='block mb-1'>Subject Teacher</label>
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

        {/* ✅ SUBJECT DROPDOWN */}
        <label className='block mb-1'>Subject</label>
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
          Assign
        </button>

      </form>
    </div>
    </InstitutionLayout>
  );
}