import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useNavigate } from "react-router-dom";
import { useMemo } from "react";

export default function About() {
  const navigate = useNavigate();

  // ✅ reusable cards (clean + scalable)
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

      <section className="bg-gray-50 py-20 mt-14">

        {/* HEADER */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-800">
            About Vidayanta
          </h2>

          <p className="text-gray-600 mt-2">
            A modern School ERP platform designed for institutions, teachers and students.
          </p>

          <div className="w-20 h-1 bg-teal-500 mx-auto mt-3 rounded"></div>
        </div>

        {/* IMAGE + TEXT */}
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-10 items-center px-6">

          <img
            src="/images/vidayanta (7).png"
            loading="lazy"
            alt="About Vidayanta"
            className="rounded-xl shadow"
          />

          <div>
            <h3 className="text-2xl font-bold text-gray-800">
              Transforming Education Management
            </h3>

            <p className="text-gray-600 mt-4 leading-relaxed">
              Vidayanta is a powerful School ERP platform designed to simplify the management of institutions.
              Our system helps institutions manage teachers, students, attendance, performance and reports
              through a centralized dashboard.
            </p>

            <p className="text-gray-600 mt-3">
              We aim to make education management easier, faster and more efficient using modern digital tools.
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
              To simplify education management by providing a secure and modern ERP platform for institutions.
            </p>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-bold text-gray-800">
              🚀 Our Vision
            </h3>

            <p className="text-gray-600 mt-3">
              To become a trusted digital platform that helps institutions manage education efficiently across the world.
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