import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
// import API from "../config/api";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function EditStudent() {
  const { state } = useLocation();
  const navigate = useNavigate();

  const [form, setForm] = useState(() => ({
    name: state?.name || "",
    email: state?.email || "",
    mobile: state?.mobile || "",
    rollNumber: state?.rollNumber || ""
  }));

  if (!state?._id) {
    return <p>No data found</p>;
  }

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `http://localhost:5000/api/student/${state._id}`,
        form
      );

      alert("Updated successfully ✅");
      navigate(-1);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TeacherLayout title="Edit Student">

      <form className="p-6 m-6 max-w-md mx-auto bg-white rounded-xl shadow" onSubmit={handleUpdate}>

        <h1 className="text-xl font-bold mb-4 text-[#1fa2a6]">
          Edit Student
        </h1>
        <label className='block mb-1'>Student Name </label>
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="w-full border p-2 mb-3 rounded"
        />
        <label className='block mb-1'>Email</label>
        <input
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          placeholder="Email"
          className="w-full border p-2 mb-3 rounded"
        />
        <label className='block mb-1'>Mobile</label>
        <input
          name="mobile"
          type="number"
          value={form.mobile}
          onChange={handleChange}
          placeholder="Mobile"
          className="w-full border p-2 mb-3 rounded"
        />
        <label className='block mb-1'>Roll Number</label>
        <input
          name="rollNumber"
          value={form.rollNumber}
          onChange={handleChange}
          placeholder="Roll Number"
          className="w-full border p-2 mb-3 rounded"
        />

        <button
          type="submit"
          className="w-full bg-[#1fa2a6] text-white py-2 rounded"
        >
          Update Student
        </button>

      </form>

    </TeacherLayout>
  );
}