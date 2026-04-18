import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignedTeachers() {
  const [classes, setClasses] = useState([]);
  const [teachers, setTeachers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedClassId, setSelectedClassId] = useState(null); // 🔥 KEY
  const [form, setForm] = useState({
    teacherId: "",
    subject: ""
  });

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH CLASSES
  useEffect(() => {
    const fetchClasses = async () => {
      const res = await axios.post(
        `${API_URL}/api/classes/by-institution`,
        { institutionCode }
      );
      setClasses(res.data.classes || []);
    };

    const fetchTeachers = async () => {
      const res = await axios.get(
        `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
      );
      setTeachers(res.data.teachers || []);
    };

    fetchClasses();
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

  // ✅ ASSIGN
  const handleAssign = async () => {
    if (!form.teacherId || !form.subject) {
      alert("Select teacher & subject");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/assign`, {
        classId: selectedClassId,
        teacherId: form.teacherId,
        subject: form.subject,
        institutionCode
      });

      alert("Assigned ✅");

      // reset
      setSelectedClassId(null);
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
          Assign Teachers
        </h1>

        <div className="grid md:grid-cols-2 gap-4">

          {classes.map(cls => (
            <div key={cls._id} className="p-4 border rounded shadow">

              <h2 className="font-bold text-lg mb-2">
                Class {cls.className} - {cls.section}
              </h2>

              {/* 🔥 BUTTON */}
              {selectedClassId !== cls._id && (
                <button
                  onClick={() => setSelectedClassId(cls._id)}
                  className="bg-[#1fa2a6] text-white px-3 py-1 rounded"
                >
                  Assign Teacher
                </button>
              )}

              {/* 🔥 FORM ONLY FOR SELECTED CLASS */}
              {selectedClassId === cls._id && (
                <div className="mt-3">

                  {/* TEACHER */}
                  <select
                    className="border p-2 w-full mb-2"
                    value={form.teacherId}
                    onChange={(e) =>
                      handleTeacherChange(e.target.value)
                    }
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
                    onChange={(e) =>
                      handleSubjectChange(e.target.value)
                    }
                    disabled={!subjects.length}
                  >
                    <option value="">Select Subject</option>
                    {subjects.map(sub => (
                      <option key={sub} value={sub}>
                        {sub}
                      </option>
                    ))}
                  </select>

                  {/* ACTION BUTTONS */}
                  <button
                    onClick={handleAssign}
                    className="bg-green-600 text-white px-3 py-1 rounded mr-2"
                  >
                    Save
                  </button>

                  <button
                    onClick={() => setSelectedClassId(null)}
                    className="bg-gray-400 text-white px-3 py-1 rounded"
                  >
                    Cancel
                  </button>

                </div>
              )}

            </div>
          ))}

        </div>
      </div>
    </InstitutionLayout>
  );
}