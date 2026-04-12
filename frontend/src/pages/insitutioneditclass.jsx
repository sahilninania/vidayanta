import { useState, useEffect } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EditClass() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    className: "",
    section: "",
    classIncharge: "",
    subjectTeachers: []
  });

  const [teachers, setTeachers] = useState([]);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        // ✅ GET CLASS
        const res = await axios.get(`${API_URL}/api/classes/${id}`);
        const data = res.data.data || {};

        setForm({
          className: data.className || "",
          section: data.section || "",
          classIncharge: data.classIncharge?._id || "",
          subjectTeachers: (data.subjectTeachers || []).map((st) => ({
            subject: st.subject,
            teacher: st.teacher?._id || ""
          }))
        });

        // ✅ GET TEACHERS
        const code = localStorage.getItem("institutionCode");

        if (!code) return;

        const t = await axios.get(
          `${API_URL}/api/teachers/by-institution?institutionCode=${code}`
        );

        setTeachers(t.data.teachers || []);

      } catch (error) {
        console.error("Fetch error 👉", error);
        alert("Error loading ❌");
      }
    };

    fetchData();
  }, [id]);

  const handleSubjectChange = (index, field, value) => {
    setForm((prev) => {
      const updated = [...prev.subjectTeachers];
      updated[index][field] = value;
      return { ...prev, subjectTeachers: updated };
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`${API_URL}/api/classes/${id}`, form);

      alert("Updated ✅");
      navigate("/institution/class");

    } catch (error) {
      console.error("Update error 👉", error);
      alert("Update failed ❌");
    }
  };

  return (
    <InstitutionLayout title="Edit Class">

      <div className="p-6 max-w-3xl mx-auto bg-white rounded-xl shadow space-y-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>
        <h2 className="text-xl font-bold text-[#1fa2a6]">
          Edit Class
        </h2>

        {/* CLASS */}
        <label className="block mb-1">Class</label>
        <input
          value={form.className}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, className: e.target.value }))
          }
          className="w-full border p-2 rounded"
          placeholder="Class"
        />

        {/* SECTION */}
        <label className="block mb-1">Section</label>
        <input
          value={form.section}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, section: e.target.value }))
          }
          className="w-full border p-2 rounded"
          placeholder="Section"
        />

        {/* INCHARGE */}
        <label className="block mb-1">Class Incharge</label>
        <select
          value={form.classIncharge}
          onChange={(e) =>
            setForm((prev) => ({ ...prev, classIncharge: e.target.value }))
          }
          className="w-full border p-2 rounded"
        >
          <option value="">Select Incharge</option>

          {teachers.map((t) => (
            <option key={t._id} value={t._id}>
              {t.teacherName}
            </option>
          ))}
        </select>

        {/* SUBJECTS */}
        {form.subjectTeachers.map((st, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Subject
              </label>

              <input
                value={st.subject}
                onChange={(e) =>
                  handleSubjectChange(i, "subject", e.target.value)
                }
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#1fa2a6] transition"
                placeholder="Subject"
              />
            </div>

            <div>
              <label className="block mb-1 text-gray-700 font-medium">
                Subject Teacher
              </label>

              <select
                value={st.teacher}
                onChange={(e) =>
                  handleSubjectChange(i, "teacher", e.target.value)
                }
                className="w-full border p-2 rounded-lg focus:ring-2 focus:ring-[#1fa2a6] transition"
              >
                <option value="">Select Teacher</option>

                {teachers.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.teacherName}
                  </option>
                ))}
              </select>
            </div>

          </div>
        ))}

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          className="bg-[#1fa2a6] hover:bg-[#178b8e] text-white p-2 w-full rounded"
        >
          Update Class
        </button>

      </div>

    </InstitutionLayout>
  );
}