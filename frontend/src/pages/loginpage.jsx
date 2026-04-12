import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useState, useCallback } from "react";
import API_URL from "../config/api.js";
import { useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";

export default function Login() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  // ✅ optimized handler (no re-creation every render)
  const handleChange = useCallback(
    (field) => (e) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    },
    []
  );

  // ✅ optimized login
  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // reset

    try {
      const res = await axios.post(
       `${API_URL}/api/auth/login`,
        form,
        { withCredentials: true }
      );
          console.log("FULL RESPONSE 👉", res);
          console.log("DATA 👉", res.data);
          const data = res.data;

      // 🔥 COMMON STORAGE (batch)
      const {
        token,
        role,
        userId,
        institutionName,
        institutionCode,
        branch,
        teacherId,
        studentName,
        studentId,
      } = data;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("userId", userId);
      localStorage.setItem("institutionName", institutionName || "");
      localStorage.setItem("institutionCode", institutionCode || "");
      localStorage.setItem("branch", branch || "");

      // 🔥 CLEAN OLD DATA
      localStorage.removeItem("teacherName");
      localStorage.removeItem("teacherId");
      localStorage.removeItem("studentName");
      localStorage.removeItem("studentId");

      // 🔥 ROLE BASED NAVIGATION
      switch (role) {
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;

        // case "admin": // ⚠️ fix naming (important)
        case "instituteadmin":
          navigate("/institution/dashboard");
          break;

        case "teacher":
          if (teacherId) {
            localStorage.setItem("teacherId", teacherId);
          }
          navigate("/teacher/dashboard");
          break;

        case "student":
          if (studentName) localStorage.setItem("studentName", studentName);
          if (studentId) localStorage.setItem("studentId", studentId);
          if (data.className) localStorage.setItem("className", data.className);
          if (data.section) localStorage.setItem("section", data.section);

          navigate("/student/dashboard");
          break;

        default:
          navigate("/");
      }

    } catch (error) {
      console.log("LOGIN ERROR 👉",error.response?.data || error.message);;
      setError(error?.response?.data?.message || "Login failed");
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen px-4 py-20 bg-gradient-to-br from-[#0f2942] via-[#184b7a] to-[#159196] flex justify-center items-center mt-14">

        <div className="w-full max-w-5xl bg-white rounded-2xl shadow-2xl flex overflow-hidden flex-col md:flex-row">

          {/* LEFT IMAGE */}
          <div className="hidden md:flex md:w-1/2 bg-[#e6f7f7] items-center justify-center">
            <div className="text-center p-6">
              <img
                src="/images/institutioncreation.jpeg"
                alt="institution"
                loading="lazy" // ✅ performance boost
                className="w-full max-w-sm rounded-xl shadow-md"
              />
              <p className="mt-4 text-[#1fa2a6] font-semibold">
                Learn. Teach. Grow.
              </p>
            </div>
          </div>

          {/* RIGHT FORM */}
          <div className="w-full md:w-1/2 p-6 md:p-10">

            <h2 className="text-5xl md:text-7xl font-semibold text-[#1fa2a6] mb-1 text-center md:text-left">
              Vidayanta
            </h2>

            <h2 className="text-gray-400 font-semibold text-center md:text-left mb-6">
              Login Form
            </h2>

            {/* ERROR */}
            {error && (
              <div className="bg-red-300 text-black p-2 mb-3 text-sm rounded-2xl">
                {error}
              </div>
            )}

            <form onSubmit={handleLogin}>

              {/* USERNAME */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">
                  Username
                </label>

                <input
                  type="text"
                  placeholder="Enter Username"
                  className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
                  value={form.username}
                  onChange={handleChange("username")}
                  required
                />
              </div>

              {/* PASSWORD */}
              <div className="mb-6">
                <label className="block font-semibold mb-3">
                  Password
                </label>

                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Password"
                    className="w-full border rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#1fa2a6]"
                    value={form.password}
                    onChange={handleChange("password")}
                    required
                  />

                  <span
                    onClick={() => setShowPassword((prev) => !prev)}
                    className="absolute right-3 top-4 cursor-pointer text-gray-500"
                  >
                    {showPassword ? <FaEye /> : <FaEyeSlash />}
                  </span>
                </div>
              </div>

              {/* LINKS */}
              <div className="flex justify-between text-sm mb-6">
                <a href="/forgot-password" className="text-teal-600 hover:underline">
                  Forgot Password?
                </a>

                <a href="/" className="text-teal-600 hover:underline">
                  Back to Home Page
                </a>
              </div>

              {/* BUTTON */}
              <button
                type="submit"
                className="w-full bg-[#1fa2a6] text-white font-bold py-3 rounded-lg hover:bg-[#0f7c8f] transition"
              >
                Login
              </button>

            </form>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}