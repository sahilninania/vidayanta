import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";

export default function About() {
  const navigate = useNavigate();

  // ✅ SEO: dynamic title + meta
  useEffect(() => {
    document.title = "About Vidayanta - School ERP System by NSJB Groups";

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Learn about Vidayanta, a school management ERP system developed by NSJB Groups to manage students, teachers and school operations digitally."
      );
    }
  }, []);

  // ✅ reusable cards (unchanged)
  const features = useMemo(() => [
    {
      icon: "⚡",
      title: "Fast & Reliable",
      desc: "Built with modern technologies for fast and secure performance.",
    },
    {
      icon: "📊",
      title: "Smart Analytics",
      desc: "Track student performance and institution growth easily.",
    },
    {
      icon: "🎓",
      title: "Better Learning",
      desc: "Improve collaboration between teachers and students.",
    },
  ], []);

  return (
    <>
      <Navbar />

      <section className="bg-gray-50 p-8 mt-14 ">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-800">
            About Vidayanta - School Management ERP System
          </h1>

          <p className="text-gray-600 mt-2">
            Vidayanta is a modern school management ERP platform developed by NSJB Groups,
            designed for institutions, teachers and students.
          </p>

          <div className="w-60 h-1 bg-teal-500 mx-auto mt-3 rounded"> </div>
        </div>

        {/* IMAGE + TEXT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

          <img
            src="/images/vidayanta (7).png"
            loading="lazy"
            alt="Vidayanta School ERP System dashboard"
            className="rounded-xl shadow"
          />

          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Transforming Education Management Digitally
            </h2>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Vidayanta is a powerful school ERP system developed by NSJB Groups.
              It helps institutions manage students, teachers, attendance, performance and reports
              through a centralized digital dashboard.
            </p>

            <p className="text-gray-600 mt-3">
              Our school management software is designed to reduce paperwork and improve efficiency
              using modern digital tools.
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
              To provide a secure and modern school management ERP system
              for institutions to simplify education processes.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-800">
              🚀 Our Vision
            </h3>

            <p className="text-gray-600 mt-3">
              To become a leading school ERP software platform helping institutions
              manage education efficiently across the world.
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

              <h3 className="font-bold text-lg">
                {f.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {f.desc}
              </p>

            </div>
          ))}

        </div>

        {/* CTA */}
        <div className="text-center mt-20">

          <h2 className="text-2xl font-bold text-gray-800">
            Start Managing Your Institution Smarter
          </h2>

          <p className="text-gray-600 mt-2">
            Join institutions using Vidayanta school ERP system.
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