import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignedTeachers() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [formData, setFormData] = useState({}); // 🔥 per class form state
  const [subjects, setSubjects] = useState({}); // 🔥 per class subjects

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH CLASSES
  const fetchClasses = async () => {
    const res = await axios.post(
      `${API_URL}/api/classes/by-institution`,
      { institutionCode }
    );
    setClasses(res.data.classes || []);
  };

  // ✅ FETCH TEACHERS
  const fetchTeachers = async () => {
    const res = await axios.get(
      `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
    );
    setTeachers(res.data.teachers || []);
  };

  useEffect(() => {
      // ✅ FIX: async wrapper
      const loadData = async () => {
        await fetchClasses();
        await fetchTeachers();
      };
  
      loadData();
    }, []);

  // ✅ TEACHER CHANGE (per class)
  const handleTeacherChange = (classId, teacherId) => {
    const teacher = teachers.find(t => t._id === teacherId);

    setSubjects(prev => ({
      ...prev,
      [classId]: teacher?.subjects || []
    }));

    setFormData(prev => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        teacherId,
        subject: ""
      }
    }));
  };

  // ✅ SUBJECT CHANGE
  const handleSubjectChange = (classId, subject) => {
    setFormData(prev => ({
      ...prev,
      [classId]: {
        ...prev[classId],
        subject
      }
    }));
  };

  // ✅ SUBMIT
  const handleAssign = async (classId) => {
    const data = formData[classId];

    if (!data?.teacherId || !data?.subject) {
      alert("Select teacher & subject");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/assign`, {
        classId,
        teacherId: data.teacherId,
        subject: data.subject,
        institutionCode
      });

      alert("Assigned ✅");

      // reset only this class
      setFormData(prev => ({
        ...prev,
        [classId]: { teacherId: "", subject: "" }
      }));

      setSubjects(prev => ({
        ...prev,
        [classId]: []
      }));

    } catch (err) {
      alert(err?.response?.data?.message || "Error");
    }
  };

  return (
    <InstitutionLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6 text-[#1fa2a6]">
          Assign Teachers
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          {classes.map(cls => (
            <div key={cls._id} className="p-4 border rounded shadow">

              {/* ✅ PREFILLED CLASS */}
              <h2 className="font-bold text-lg mb-2">
                Class {cls.className} - {cls.section}
              </h2>

              {/* TEACHER DROPDOWN */}
              <select
                className="border p-2 w-full mb-2"
                value={formData[cls._id]?.teacherId || ""}
                onChange={(e) =>
                  handleTeacherChange(cls._id, e.target.value)
                }
              >
                <option value="">Select Teacher</option>
                {teachers.map(t => (
                  <option key={t._id} value={t._id}>
                    {t.teacherName}
                  </option>
                ))}
              </select>

              {/* SUBJECT DROPDOWN */}
              <select
                className="border p-2 w-full mb-2"
                value={formData[cls._id]?.subject || ""}
                onChange={(e) =>
                  handleSubjectChange(cls._id, e.target.value)
                }
                disabled={!subjects[cls._id]?.length}
              >
                <option value="">Select Subject</option>
                {(subjects[cls._id] || []).map(sub => (
                  <option key={sub} value={sub}>
                    {sub}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleAssign(cls._id)}
                className="bg-[#1fa2a6] text-white px-3 py-1 rounded w-full"
              >
                Assign
              </button>

            </div>
          ))}

        </div>
      </div>
    </InstitutionLayout>
  );
}