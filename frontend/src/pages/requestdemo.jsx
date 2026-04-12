import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useState, useCallback } from "react";
import axios from "axios";
//import API from "../config/api";

export default function RequestDemo() {

  const initialState = {
    name: "",
    schoolName: "",
    email: "",
    mobile: "",
    address: "",
    message: "",
  };

  const [form, setForm] = useState(initialState);
  const [loading, setLoading] = useState(false);

  // ✅ optimized handler
  const handleChange = useCallback((field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: e.target.value
    }));
  }, []);

  // ✅ FIX: prevent double click + validation
  const handleSubmit = async () => {

    if (loading) return; // ✅ prevent multiple clicks

    if (!form.name || !form.email || !form.mobile || !form.schoolName) {
      return alert("Please fill required fields ❌");
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/demo/request", form);

      alert("Demo Request Sent ✅");

      setForm(initialState);

    } catch (error) {
      console.error(error);
      alert("Error sending request ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-16 mt-4"> {/* ✅ spacing fix */}

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-[#1fa2a6]">Request Demo</h2>
          <p className="text-gray-600 mt-2">
            Book a free demo for your school
          </p>
        </div>

        {/* FORM */}
        <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow">
          <h2 className="text-3xl md:text-5xl font-semibold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>
          <Input label="Name" value={form.name} onChange={handleChange("name")} />
          <Input label="School Name" value={form.schoolName} onChange={handleChange("schoolName")} />
          <Input label="Email" type="email" value={form.email} onChange={handleChange("email")} />
          <Input label="Mobile Number" type="tel" value={form.mobile} onChange={handleChange("mobile")} />
          <Input label="Address" value={form.address} onChange={handleChange("address")} />

          {/* MESSAGE */}
          <label className="block font-semibold mb-2">Message</label>
          <textarea
            placeholder="Message (optional)"
            value={form.message}
            onChange={handleChange("message")}
            className="border p-2 w-full mb-4 rounded "
          />

          {/* BUTTON */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-[#1fa2a6] text-white w-full py-2 rounded hover:bg-[#178b8e] transition disabled:opacity-50"
          >
            {loading ? "Sending..." : "Request Demo"}
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}

/* 🔥 REUSABLE INPUT */
function Input({ label, type = "text", value, onChange }) {
  return (
    <>
      <label className="block font-semibold mb-2">{label}</label>
      <input
        type={type}
        value={value}
        onChange={onChange}
        placeholder={label}
        className="border p-2 w-full mb-3 rounded "
      />
    </>
  );
}