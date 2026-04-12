import { useState, useCallback } from "react";
import API_URL from "../config/api.js";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import axios from "axios";

export default function ReviewPage() {

  const [form, setForm] = useState({
    name: "",
    message: "",
    rating: 5,
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // ✅ single handler
  const handleChange = useCallback((field) => (e) => {
    setForm((prev) => ({
      ...prev,
      [field]: field === "rating" ? Number(e.target.value) : e.target.value
    }));
  }, []);

  // ✅ FIXED submit
  const submit = async () => {

    if (loading) return; // 🔥 prevent spam

    if (!form.name || !form.message) {
      return alert("Please fill all fields ❌");
    }

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/review/create`, form);

      alert("Review Submitted ");

      setForm({
        name: "",
        message: "",
        rating: 5,
      });

    } catch (err) {
      console.error(err);
      alert("Something went wrong ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-blue-50 px-4 py-10 relative mt-16">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="absolute top-6 left-6 text-sm font-medium text-gray-600 hover:text-black"
        >
          ← Go Back
        </button>

        {/* CARD */}
        <div className="w-full max-w-md bg-white/80 backdrop-blur-md shadow-2xl rounded-2xl p-6">

          <h1 className="text-2xl md:text-3xl font-bold text-center text-[#1fa2a6] mb-6">
            Review
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
              value={form.name}
              placeholder="Enter your name"
              onChange={handleChange("name")}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
            />
          </div>

          {/* MESSAGE */}
          <div className="mb-4">
            <label className="block font-semibold mb-1 text-gray-700">
              Message
            </label>
            <textarea
              value={form.message}
              rows="4"
              onChange={handleChange("message")}
              className="border border-gray-300 p-3 w-full rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
            />
          </div>

          {/* RATING */}
          <div className="mb-6">
            <label className="block font-semibold mb-1 text-gray-700">
              Rating
            </label>
            <select
              value={form.rating}
              onChange={handleChange("rating")}
              className="border border-gray-300 p-3 w-full rounded-lg focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
            >
              <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
              <option value={4}>⭐⭐⭐⭐ Good</option>
              <option value={3}>⭐⭐⭐ Average</option>
              <option value={2}>⭐⭐ Poor</option>
              <option value={1}>⭐ Bad</option>
            </select>
          </div>

          {/* BUTTON */}
          <button
            onClick={submit}
            disabled={loading}
            className="w-full bg-[#1fa2a6] text-white py-3 rounded-lg font-semibold hover:bg-[#178b8f] transition disabled:opacity-60"
          >
            {loading ? "Submitting..." : "Submit Review"}
          </button>

        </div>
      </div>

      <Footer />
    </>
  );
}