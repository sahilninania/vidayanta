import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import API_URL from "../config/api.js";
import axios from "axios";

export default function EditTeacher() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    teacherName: state?.teacherName || "",
    email: state?.email || "",
    mobile: state?.mobile || "",
    subjects: state?.subjects?.join(", ") || "",
    gender: state?.gender || ""
  });

  if (!state?._id) {
    return <p>No data found</p>;
  }

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/api/teachers/${state._id}`,
        {
          ...form,
          subjects: form.subjects.split(",").map(s => s.trim())
        }
      );

      alert("Updated successfully ✅");
      navigate(-1);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <InstitutionLayout title="Edit Teacher">

      <form onSubmit={handleUpdate} className="p-6 max-w-md mx-auto bg-white rounded-xl shadow">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>
        <h1 className="text-xl font-bold mb-4 text-[#1fa2a6]">
          Edit Teacher
        </h1>
        <label className='block mb-1'>Teacher Name </label>
        <input
          name="teacherName"
          value={form.teacherName}
          onChange={handleChange}
          placeholder="Teacher Name"
          className="w-full border p-2 mb-3 rounded"
        />
        <label className='block mb-1'>Email</label>
        <input
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
        />
        <label className='block mb-1'>Mobile</label>
        <input
          name="mobile"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full border p-2 mb-3 rounded"
        />
        {/* <label className='block mb-1'>Subject</label>
        <input
          name="subjects"
          value={form.subjects}
          onChange={handleChange}
          placeholder="Subjects (comma separated)"
          className="w-full border p-2 mb-3 rounded"
        /> */}
        <label className='block mb-1'>Gender</label>
        <input
          name="gender"
          value={form.gender}
          onChange={handleChange}
          placeholder="Gender"
          className="w-full border p-2 mb-3 rounded"
        />

        <button className="w-full bg-[#1fa2a6] text-white py-2 rounded">
          Update Teacher
        </button>

      </form>

    </InstitutionLayout>
  );
}