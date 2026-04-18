import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useParams, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignTeacher() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [classData, setClassData] = useState(null);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [form, setForm] = useState({
    teacherId: "",
    subject: ""
  });

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH CLASS
  useEffect(() => {
    const fetchClass = async () => {
      const res = await axios.get(`${API_URL}/api/classes/${id}`);
      setClassData(res.data.class);
    };

    fetchClass();
  }, [id]);

  // ✅ FETCH TEACHERS
  useEffect(() => {
    const fetchTeachers = async () => {
      const res = await axios.get(
        `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
      );

      setTeachers(res.data.teachers || []);
    };

    fetchTeachers();
  }, []);

  // ✅ TEACHER CHANGE
  const handleTeacherChange = (teacherId) => {
    const teacher = teachers.find(t => t._id === teacherId);

    setSubjects(teacher?.subjects || []);

    setForm({
      teacherId,
      subject: ""
    });
  };

  // ✅ SUBJECT CHANGE
  const handleSubjectChange = (subject) => {
    setForm(prev => ({
      ...prev,
      subject
    }));
  };

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.teacherId || !form.subject) {
      alert("Select teacher & subject");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/assign`, {
        classId: id,
        teacherId: form.teacherId,
        subject: form.subject,
        institutionCode
      });

      alert("Assigned ✅");
      navigate("/institution/assign-class");

    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <InstitutionLayout>
      <div className="p-6 flex justify-center">

        <div className="w-full max-w-md p-4 border rounded shadow">

          <h1 className="text-xl font-bold text-[#1fa2a6] mb-4">
            Assign Teacher
          </h1>

          {/* CLASS INFO */}
          {classData && (
            <div className="mb-4 p-3 bg-gray-100 rounded">
              Class {classData.className} - {classData.section}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* TEACHER */}
            <select
              value={form.teacherId}
              onChange={(e) => handleTeacherChange(e.target.value)}
              className="border p-2 w-full"
            >
              <option value="">Select Teacher</option>
              {teachers.map(t => (
                <option key={t._id} value={t._id}>
                  {t.teacherName}
                </option>
              ))}
            </select>

            {/* SUBJECT */}
            <select
              value={form.subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              className="border p-2 w-full"
              disabled={!subjects.length}
            >
              <option value="">Select Subject</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            <button className="bg-green-600 text-white w-full py-2 rounded">
              Assign
            </button>

            <button
              type="button"
              onClick={() => navigate("/institution/assign-class")}
              className="bg-gray-400 text-white w-full py-2 rounded"
            >
              Back
            </button>

          </form>

        </div>
      </div>
    </InstitutionLayout>
  );
}