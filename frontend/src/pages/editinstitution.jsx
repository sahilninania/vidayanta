import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API_URL from "../config/api.js";
import Superadminlayout from "../layout/superadmindashboardlayout";
import axios from "axios";

export default function EditInstitution() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    institutionName: "",
    branch: "",
    email: "",
    mobile: "",
    address: ""
  });

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/superadmin/institution/${id}`
        );

        const data = res.data?.data;

        setForm({
          institutionName: data?.institutionName || "",
          branch: data?.branch || "",
          email: data?.email || "",
          mobile: data?.mobile || "",
          address: data?.address || ""
        });

      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(
        `${API_URL}/api/superadmin/institution/${id}`,
        form
      );

      alert("Updated Successfully");
      navigate("/superadmin/institutions");

    } catch (err) {
      console.log(err);
      alert("Update failed");
    }
  };

  return (
    <Superadminlayout>
      <div className="p-6 max-w-xl mx-auto w-full bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl  md:p-4">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>
        <h1 className="text-2xl font-semibold mb-4">
          Edit Institution
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4">

          <label className='block mb-1'>Institution Name</label>
          <input
            type="text"
            name="institutionName"
            value={form.institutionName}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
          />

          <label className='block mb-1'>Branch</label>
          <input
            type="text"
            name="branch"
            value={form.branch}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
          />

          <label className='block mb-1'>Email</label>
          <input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
          />

          <label className='block mb-1'>Mobile</label>
          <input
            type="number"
            name="mobile"
            value={form.mobile}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
          />

          <label className='block mb-1'>Address</label>
          <textarea
            name="address"
            value={form.address}
            onChange={handleChange}
            className="w-full border p-2 rounded focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
          />

          <button
            type="submit"
            className="bg-[#1fa2a6] text-white px-4 py-2 rounded"
          >
            Update
          </button>

        </form>

      </div>
    </Superadminlayout>
  );
}