import { useState, useEffect } from "react";
import TeacherLayout from "../layout/teacherdashboardlayout";
// import API from "../config/api";
import { useNavigate } from 'react-router-dom';
import axios from "axios";

export default function AddStudent() {
  const navigate = useNavigate();

  const teacherId = localStorage.getItem("teacherId");
  const institutionCode = localStorage.getItem("institutionCode");
  const branch = localStorage.getItem("branch");

  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    className: "",
    section: "",
    rollNumber: ""
  });

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  useEffect(() => {
    const fetchClass = async () => {
      if (!teacherId) return;

      try {
        const res = await axios.post(
          "http://localhost:5000/api/classes/get-my-class",
          { teacherId }
        );

        setForm((prev) => ({
          ...prev,
          className: res.data.className,
          section: res.data.section
        }));
      } catch (error) {
        console.log("Class fetch error 👉", error);
      }
    };

    fetchClass();
  }, [teacherId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.mobile ||
      !form.className ||
      !form.section ||
      !form.rollNumber
    ) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post(
        "http://localhost:5000/api/student/create-student",
        { ...form, institutionCode, branch, teacherId },
        { withCredentials: true }
      );

      alert(`Student Created`);
      navigate("/teacher/dashboard");

    } catch (error) {
      alert(error.response?.data?.message || "Error creating student");
      console.log(error);
    }
  };

  return (
    <TeacherLayout title="teacher layout">
      <div className='min-h-[80vh] flex justify-center items-center'>
        <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-6">

          <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">Vidayanta</h1>

          <form onSubmit={handleSubmit}>
             <label htmlFor="form.name"className='block font-normal mb-1'>Student Name</label>
            <input name="name" placeholder="Student Name" className='w-full border rounded-lg px-2 py-1 mb-2' value={form.name} onChange={handleChange} />
            <label htmlFor="form.email"className='block font-normal mb-1'>Email</label>
            <input name="email" type="email" placeholder="Email" className='w-full border rounded-lg px-2 py-1 mb-2' value={form.email} onChange={handleChange} />
            <label htmlFor="form.mobile"className='block font-normal mb-1'>Mobile</label>
            <input name="mobile" type="number" placeholder="Mobile" className='w-full border rounded-lg px-2 py-1 mb-2' value={form.mobile} onChange={handleChange} />
            <label htmlFor="form.className"className='block font-normal mb-1'>Class Name</label>
            <input value={form.className} readOnly className="w-full border rounded-lg px-2 py-1 mb-2 bg-gray-200" />
            <label htmlFor="form.section"className='block font-normal mb-1'>Section</label>
            <input value={form.section} readOnly className="w-full border rounded-lg px-2 py-1 mb-2 bg-gray-200" />
            <label htmlFor="form.rollNumber"className='block font-normal mb-1'>Rollnumber</label>
            <input name="rollNumber" placeholder="Roll Number" className='w-full border rounded-lg px-2 py-1 mb-2' value={form.rollNumber} onChange={handleChange} />

            <button className="w-full bg-[#1fa2a6] text-white py-3 rounded-lg">
              Create Student
            </button>

          </form>

        </div>
      </div>
    </TeacherLayout>
  );
}

