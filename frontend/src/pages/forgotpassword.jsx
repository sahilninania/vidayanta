import { useState } from "react";
import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import axios from "axios";

export default function ForgotPassword() {

  const [step, setStep] = useState(1);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    className: "",
    section: "",
    institutionName: ""
  });

  const [otp, setOtp] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= SEND OTP =================
  const sendOtp = async () => {
    try {
      setLoading(true);

      // 🔥 validation
      if (!form.role || !form.email) {
        alert("Please fill required fields ❌");
        return;
      }

      if (form.role === "student") {
        if (!form.name || !form.className || !form.section) {
          alert("Fill all student details ❌");
          return;
        }
      }

      if (form.role === "teacher") {
        if (!form.name) {
          alert("Enter teacher name ❌");
          return;
        }
      }

      if (form.role === "institution") {
        if (!form.institutionName) {
          alert("Enter institution name ❌");
          return;
        }
      }

      const res = await axios.post(
        "http://localhost:5000/api/forgot/send-otp",
        form
      );

      alert(res.data.message || "OTP sent 📩");
      setStep(2);

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "Error sending OTP ❌");
    } finally {
      setLoading(false);
    }
  };

  // ================= VERIFY OTP =================
  const verifyOtp = async () => {
    try {
      setLoading(true);

      if (!otp) {
        alert("Enter OTP ❌");
        return;
      }

      const res = await axios.post(
        "http://localhost:5000/api/forgot/verify-otp",
        {
          email: form.email,
          otp,
          role: form.role
        }
      );

      alert(res.data.message || "Password sent to email ✅");

      // 🔥 reset form
      setStep(1);
      setOtp("");
      setForm({
        name: "",
        email: "",
        role: "",
        className: "",
        section: "",
        institutionName: ""
      });

    } catch (err) {
      console.log(err);
      alert(err.response?.data?.message || "OTP verification failed ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#e0f7fa] to-[#f1f5f9]">

        <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md space-y-4">
          <h1 className="text-2xl md:text-3xl font-semibold text-center text-[#1fa2a6] mb-6">
            Vidayanta 
          </h1>
          <h2 className="text-2xl font-bold text-center text-[#1fa2a6]">
            🔐 Forgot Password
          </h2>

          {/* ================= STEP 1 ================= */}
          {step === 1 && (
            <>
              <label className="block font-semibold mb-1 text-gray-700">
              Role 
            </label>
              <select
                name="role"
                value={form.role}
                className="w-full p-2 border rounded"
                onChange={handleChange}
              >
                <option value="">Select Role</option>
                <option value="student">Student</option>
                <option value="teacher">Teacher</option>
                <option value="institution">Institution</option>
              </select>

              {form.role && (
                <>
                  {/* NAME */}
                  {form.role !== "institution" && (
                    <>
                    <label className="block font-semibold mb-1 text-gray-700">
                       Name
                    </label>
                    <input
                      name="name"
                      value={form.name}
                      placeholder="Name"
                      className="w-full p-2 border rounded"
                      onChange={handleChange}
                    />

                    </>
                  )}

                  {/* EMAIL */}
                  <label className="block font-semibold mb-1 text-gray-700">
                    Email
                  </label>
                  <input
                    name="email"
                    value={form.email}
                    placeholder="Email"
                    className="w-full p-2 border rounded"
                    onChange={handleChange}
                  />
                  
                  {/* STUDENT */}
                  {form.role === "student" && (
                    <>
                      <label className="block font-semibold mb-1 text-gray-700">
                        Class
                      </label>
                      <input
                        name="className"
                        value={form.className}
                        placeholder="Class"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                      />
                      <label className="block font-semibold mb-1 text-gray-700">
                        Section
                      </label>
                      <input
                        name="section"
                        value={form.section}
                        placeholder="Section"
                        className="w-full p-2 border rounded"
                        onChange={handleChange}
                      />
                    </>
                  )}

                  {/* INSTITUTION */}
                  {form.role === "institution" && (
                    <>
                    <label className="block font-semibold mb-1 text-gray-700">
                      Institution Name
                    </label>
                    <input
                      name="institutionName"
                      value={form.institutionName}
                      placeholder="Institution Name"
                      className="w-full p-2 border rounded"
                      onChange={handleChange}
                    />
                    </>
                  )}

                  <button
                    onClick={sendOtp}
                    disabled={loading}
                    className="w-full bg-[#1fa2a6] text-white py-2 rounded hover:bg-[#178f92] disabled:opacity-50"
                  >
                    {loading ? "Sending..." : "Send OTP"}
                  </button>
                </>
              )}
            </>
          )}

          {/* ================= STEP 2 ================= */}
          {step === 2 && (
            <>
              <input
                placeholder="Enter OTP"
                className="w-full p-2 border rounded"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />

              <button
                onClick={verifyOtp}
                disabled={loading}
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 disabled:opacity-50"
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </>
          )}

        </div>

      </div>

      <Footer />
    </>
  );
}