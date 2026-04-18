import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignedTeachers() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClass, setSelectedClass] = useState(null); // 🔥 KEY

  const [form, setForm] = useState({
    teacherId: "",
    subject: ""
  });

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH DATA
  useEffect(() => {
    const fetchData = async () => {
      const classRes = await axios.post(
        `${API_URL}/api/classes/by-institution`,
        { institutionCode }
      );

      const teacherRes = await axios.get(
        `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
      );

      setClasses(classRes.data.classes || []);
      setTeachers(teacherRes.data.teachers || []);
    };

    fetchData();
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

  // ✅ ASSIGN
  const handleAssign = async () => {
    if (!form.teacherId || !form.subject) {
      alert("Select teacher & subject");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/assign`, {
        classId: selectedClass._id,
        teacherId: form.teacherId,
        subject: form.subject,
        institutionCode
      });

      alert("Assigned ✅");

      // reset
      setSelectedClass(null);
      setForm({ teacherId: "", subject: "" });
      setSubjects([]);

    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <InstitutionLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6 text-[#1fa2a6]">
          Assign Teacher
        </h1>

        {/* 🔥 IF CLASS SELECTED → SHOW ONLY FORM */}
        {selectedClass ? (
          <div className="max-w-md mx-auto p-4 border rounded shadow">

            <h2 className="font-bold text-lg mb-3">
              Class {selectedClass.className} - {selectedClass.section}
            </h2>

            {/* TEACHER */}
            <select
              className="border p-2 w-full mb-2"
              value={form.teacherId}
              onChange={(e) => handleTeacherChange(e.target.value)}
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
              className="border p-2 w-full mb-2"
              value={form.subject}
              onChange={(e) => handleSubjectChange(e.target.value)}
              disabled={!subjects.length}
            >
              <option value="">Select Subject</option>
              {subjects.map(sub => (
                <option key={sub} value={sub}>
                  {sub}
                </option>
              ))}
            </select>

            {/* BUTTONS */}
            <button
              onClick={handleAssign}
              className="bg-green-600 text-white px-3 py-1 rounded w-full mb-2"
            >
              Assign
            </button>

            <button
              onClick={() => setSelectedClass(null)}
              className="bg-gray-400 text-white px-3 py-1 rounded w-full"
            >
              Back
            </button>

          </div>
        ) : (
          /* 🔥 SHOW ALL CLASSES */
          <div className="grid md:grid-cols-2 gap-4">

            {classes.map(cls => (
              <div
                key={cls._id}
                className="p-4 border rounded shadow cursor-pointer hover:shadow-lg"
                onClick={() => setSelectedClass(cls)}
              >
                <h2 className="font-bold text-lg">
                  Class {cls.className} - {cls.section}
                </h2>
              </div>
            ))}

          </div>
        )}

      </div>
    </InstitutionLayout>
  );
}