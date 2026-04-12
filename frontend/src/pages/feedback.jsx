import { useState, useCallback } from "react";
// import API from "../config/api";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import axios from "axios";

export default function FeedbackPage() {

  const [form, setForm] = useState({
    name: "",
    message: ""
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ✅ optimized change handler
  const handleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  // ✅ FIX: prevent multiple submit
  const submit = async (e) => {
    e.preventDefault();

    if (loading) return; // 🔥 important

    if (!form.name.trim() || !form.message.trim()) {
      alert("Please fill all fields ❌");
      return;
    }

    try {
      setLoading(true);

      await axios.post("http://localhost:5000/api/feedback/create", form);

      alert("Feedback Submitted ✅");

      setForm({ name: "", message: "" });

    } catch (err) {
      console.log(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-100 to-blue-50 px-4 py-10 relative mt-16">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-sm font-medium text-gray-600 hover:text-black transition"
        >
          ← Go Back
        </button>

        {/* FORM */}
        <form
          onSubmit={submit}
          className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6 md:p-4"
        >

          <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#1fa2a6] mb-6">
            Feedback
          </h1>
          <h2 className="text-3xl md:text-2xl font-semibold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>

          {/* NAME */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700">
              Name
            </label>

            <input
              name="name"
              value={form.name}
              placeholder="Enter your name"
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
            />
          </div>

          {/* MESSAGE */}
          <div className="mb-6">
            <label className="block font-semibold mb-1 text-gray-700">
              Message
            </label>

            <textarea
              name="message"
              value={form.message}
              rows="4"
              placeholder="Write your feedback..."
              onChange={handleChange}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2a6] resize-none"
            />
          </div>

          {/* BUTTON */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#1fa2a6] text-white py-3 rounded-lg font-semibold hover:bg-[#178b8f] transition disabled:opacity-50"
          >
            {loading ? "Submitting..." : "Submit Feedback"}
          </button>

        </form>

      </div>

      <Footer />
    </>
  );
}