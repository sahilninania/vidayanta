import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useState, useCallback } from "react";
// import API from "../config/api";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Contact() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    schoolName: "",
    email: "",
    mobile: "",
    address: "",
    message: ""
  });

  // ✅ single handler (clean)
  const handleChange = useCallback((e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  }, []);

  // ✅ FIXED submit
  const handleSubmit = async (e) => {
    e.preventDefault(); // ✅ FIX

    try {
      if (!form.name || !form.email || !form.mobile || !form.message) {
        return alert("Required fields missing ❌");
      }

      await axios.post("http://localhost:5000/api/contact/send", form);

      alert("Message Sent ✅");

      setForm({
        name: "",
        schoolName: "",
        email: "",
        mobile: "",
        address: "",
        message: ""
      });

    } catch (error) {
      console.log(error);
      alert("Error sending message ❌");
    }
  };

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 py-10 mt-14">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="text-gray-600 mt-2">
            Have questions about Vidayanta? <br />We'd love to help.
          </p>
          <div className="w-80 h-1 bg-teal-500 mx-auto mt-3 rounded"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 px-6">

          {/* LEFT */}
          <div className="space-y-6">

            <Info icon="📍" title="Address" value="Sonipat, Haryana, India" />
            <Info icon="📞" title="Phone" value="+91 9991549208" />

            <Info 
              icon="✉️" 
              title="Email" 
              value="support@vidayanta.com" 
              link="mailto:support@vidayanta.com"
            />

            <Info 
              icon="🐦" 
              title="Twitter" 
              value="@Vidayanta" 
              link="https://x.com/vidayanta"
            />

            <Info 
              icon="💼" 
              title="LinkedIn" 
              value="Vidayanta" 
              link="https://www.linkedin.com/company/113414019"
            />

            {/* CTA */}
            <div className="bg-white p-6 rounded-xl shadow text-center">
              <h3 className="font-bold mb-2">Share Your Experience</h3>
              <p className="text-gray-600 text-sm mb-4">
                Help us improve by giving feedback or review
              </p>

              <button
                onClick={() => navigate("/feedback")}
                className="bg-[#14a8a3] text-white w-full py-2 rounded mb-3 hover:bg-[#25748a]"
              >
                Give Feedback
              </button>

              <button
                onClick={() => navigate("/reviews")}
                className="bg-[#20b988] text-white w-full py-2 rounded hover:bg-[#115f5f]"
              >
                Give Review
              </button>
            </div>

          </div>

          {/* RIGHT (FORM) */}
          <div className="bg-white p-6 rounded-xl shadow">
            <h2 className="text-3xl font-bold text-teal-600 flex justify-center">Contact Us</h2>
            <form onSubmit={handleSubmit}>
              <h1 className="text-xl font-semibold mb-4 text-gray-600">Send Message</h1>

              <Input label="Name" name="name" value={form.name} onChange={handleChange} />
              <Input label="School Name" name="schoolName" value={form.schoolName} onChange={handleChange} />
              <Input label="Email" name="email" value={form.email} onChange={handleChange} />
              <Input label="Mobile Number" name="mobile" value={form.mobile} onChange={handleChange} />
              <Input label="Address" name="address" value={form.address} onChange={handleChange} />

              <label className="block font-semibold mb-2">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                className="border p-2 w-full mb-3 rounded"
                rows={4}
              />

              <button
                type="submit" // ✅ FIX
                className="bg-[#1fa2a6] text-white px-4 py-2 rounded w-full hover:bg-[#178b8f]"
              >
                Send Message
              </button>

            </form>

          </div>

        </div>

      </section>

      <Footer />
    </>
  );
}

/* 🔥 REUSABLE COMPONENTS */

function Info({ icon, title, value, link }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow flex gap-4 items-center">
      <div className="text-3xl">{icon}</div>
      <div>
        <h3 className="font-bold">{title}</h3>
        {link ? (
          <a href={link} className="text-gray-600 text-sm" target="_blank" rel="noopener noreferrer">
            {value}
          </a>
        ) : (
          <p className="text-gray-600 text-sm">{value}</p>
        )}
      </div>
    </div>
  );
}

function Input({ label, name, value, onChange }) {
  return (
    <>
      <label className="block font-semibold mb-2">{label}</label>
      <input
        name={name}
        value={value}
        onChange={onChange}
        className="border p-2 w-full mb-3 rounded "
      />
    </>
  );
}