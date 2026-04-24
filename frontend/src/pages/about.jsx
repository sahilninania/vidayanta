import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function About() {
  const navigate = useNavigate();

  const features = useMemo(() => [
    {
      icon: "⚡",
      title: "Fast & Reliable",
      desc: "Modern school ERP system built for speed, security and performance.",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      desc: "Track student performance, attendance and institution growth easily.",
    },
    {
      icon: "🎓",
      title: "Better Learning",
      desc: "Improve collaboration between teachers and students digitally.",
    },
  ], []);

  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className=" text-white py-20 px-6 text-center mt-14">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          About Vidayanta
        </h1>
        <p className="text-lg max-w-2xl mx-auto text-gray-200">
          Vidayanta is a modern school management ERP system developed by NSJB Groups,
          designed to simplify education management digitally.
        </p>
      </div>

      <section className="bg-gray-50 py-16">

        {/* IMAGE + TEXT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

          <img
            src="/images/vidayanta (7).png"
            loading="lazy"
            alt="Vidayanta School ERP System"
            className="rounded-xl shadow-lg"
          />

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Transforming School Management Digitally
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Vidayanta is a powerful school management software that helps institutions
              manage students, teachers, attendance and academic operations efficiently.
              It is developed by NSJB Groups as a complete digital solution for schools.
            </p>

            <p className="text-gray-600 mt-3">
              Our platform enables institutions to reduce paperwork and improve efficiency
              through automation and real-time data management.
            </p>
          </div>

        </div>

        {/* MISSION / VISION */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 mt-20 px-6">

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-800">
              🎯 Our Mission
            </h3>
            <p className="text-gray-600 mt-3">
              To provide a smart and secure school ERP system that simplifies
              education management for institutions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-800">
              🚀 Our Vision
            </h3>
            <p className="text-gray-600 mt-3">
              To become a leading school management software platform helping
              institutions worldwide manage education digitally.
            </p>
          </div>

        </div>

        {/* WHY CHOOSE */}
        <div className="text-center mt-20">
          <h2 className="text-3xl font-bold text-gray-800">
            Why Choose Vidayanta
          </h2>
          <div className="w-20 h-1 bg-teal-500 mx-auto mt-3 rounded"></div>
        </div>

        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 mt-12 px-6">

          {features.map((f) => (
            <div
              key={f.title}
              className="bg-white p-6 rounded-xl shadow text-center hover:shadow-lg transition duration-300"
            >
              <div className="text-4xl mb-3">{f.icon}</div>
              <h3 className="font-bold text-lg">{f.title}</h3>
              <p className="text-gray-600 text-sm mt-2">{f.desc}</p>
            </div>
          ))}

        </div>

        {/* PREMIUM CTA */}
        <div className="mt-20 max-w-4xl mx-auto text-center bg-gradient-to-r from-[#0f2942] via-[#184b7a] to-[#159196] text-white p-10 rounded-2xl shadow-lg">

          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            Start Managing Your School Smarter
          </h2>

          <p className="text-gray-200 mb-6">
            Join institutions using Vidayanta to simplify school management.
          </p>

          <button
            onClick={() => navigate("/request-demo")}
            className="bg-white text-[#0f2942] px-8 py-3 rounded-full font-semibold hover:bg-gray-200 transition"
          >
            🚀 Request Demo
          </button>

        </div>

      </section>

      <Footer />
    </>
  );
}