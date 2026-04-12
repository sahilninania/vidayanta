import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function Pricing() {
  const navigate = useNavigate();

  // ✅ stable features (performance boost)
  const features = useMemo(() => [
    {
      title: "Institution Management",
      desc: "Manage institutions, branches and administrators.",
    },
    {
      title: "Teacher Dashboard",
      desc: "Teachers can manage classes and track students.",
    },
    {
      title: "Attendance Tracking",
      desc: "Track student attendance and generate reports.",
    },
    {
      title: "Reports & Analytics",
      desc: "Real-time analytics and performance reports.",
    },
  ], []);

  return (
    <>
      <Navbar />

      <section className="py-20 bg-gray-50 mt-14"> {/* ✅ FIX mt-15 → mt-16 */}

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            Simple Pricing
          </h2>

          <div className="w-72 h-1 bg-teal-500 mx-auto mt-3 rounded-2xl"></div> {/* ✅ FIX w-70 */}

          <p className="text-gray-700 mt-2">
            Only pay for the number of students in your institution
          </p>
        </div>

        {/* PRICE CARD */}
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white shadow-lg rounded-xl p-10 text-center">
            <h1 className="text-5xl font-bold text-teal-600">
              ₹49
            </h1>

            <p className="text-gray-700 mt-2">
              Per Student / Per Month
            </p>

            <p className="text-gray-700 mt-4">
              Pay only for the student you manage. No hidden charges.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-6 px-6">

          {features.map((f) => (
            <Feature key={f.title} title={f.title} desc={f.desc} />
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-20">
          <h2 className="text-2xl font-bold text-gray-800">
            Start Managing Your Institution Smarter
          </h2>

          <p className="text-gray-600 mt-2">
            Join hundreds of institutions using Vidayanta.
          </p>

          <button
            onClick={() => navigate("/request-demo")}
            className="mt-6 bg-teal-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-teal-600 transition"
          >
            Request Demo
          </button>
        </div>

      </section>

      <Footer />
    </>
  );
}

/* 🔥 REUSABLE COMPONENT */
function Feature({ title, desc }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300">
      <h3 className="font-bold text-lg text-gray-800">
        ✔ {title}
      </h3>
      <p className="text-gray-600 mt-1">{desc}</p>
    </div>
  );
}