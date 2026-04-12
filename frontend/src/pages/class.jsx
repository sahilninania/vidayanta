import { useState, useEffect } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AddClass() {

  const [form, setForm] = useState({
    className: "",
    section: "",
    classIncharge: ""   // ✅ NEW FIELD
  });

  const [teachers, setTeachers] = useState([]); // ✅ store teachers

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
  const institutionCode = localStorage.getItem("institutionCode");
  // ✅ FETCH TEACHERS
  useEffect(() => {
    if (!institutionCode) return;
    const fetchTeachers = async () => {
      try {
        const res = await axios.get(
       `${API_URL}/api/teachers/by-institution?institutionCode=${localStorage.getItem("institutionCode")}`,
          { withCredentials: true }
        );

        setTeachers(res.data?.teachers || []);

      } catch (error) {
        console.log("Error fetching teachers 👉", error);
      }
    };

    fetchTeachers();
  }, [institutionCode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      ...form,
      institutionCode
    };

    console.log("🚀 Sending 👉", data);

    try {
      const res = await axios.post(
        `${API_URL}/api/classes/add-class`,
        data,
        { withCredentials: true }
      );

      console.log("✅ SUCCESS 👉", res.data);
      alert("Class Created");

    } catch (error) {
      console.log("❌ ERROR 👉", error.response?.data || error.message);
    }
  };

  return (
    <InstitutionLayout title="Add Class">
      <div className='min-h-[80vh] flex justify-center items-center'>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">
          
          <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
            Vidayanta
          </h1>

          <h2 className="text-xl text-[#1fa2a6] font-bold mb-4">
            Add Class
          </h2>

          <form onSubmit={handleSubmit} className="space-y-3">

            {/* CLASS NAME */}
            <div className='mb-2'>
              <label className='block mb-1'>Class</label>
              <input
                name="className"
                placeholder="Class"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* SECTION */}
            <div className='mb-2'>
              <label className='block mb-1'>Class Section</label>
              <input
                name="section"
                placeholder="Section"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            </div>

            {/* ✅ CLASS TEACHER DROPDOWN */}
            <div className='mb-2'>
              <label className='block mb-1'>Class Teacher</label>

              <select
                name="classIncharge"
                onChange={handleChange}
                className="w-full border p-2 rounded"
              >
                <option value="">Select Teacher</option>

                {teachers.map((teacher) => (
                  <option key={teacher._id} value={teacher._id}>
                    {teacher.teacherName }
                  </option>
                ))}
              </select>
            </div>

            <button className="w-full bg-[#1fa2a6] text-white py-3 rounded-lg">
              Create Class
            </button>

          </form>

        </div>
      </div>
    </InstitutionLayout>
  );
}