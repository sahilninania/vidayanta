import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
import { useNavigate } from "react-router-dom";
import { useMemo, useEffect } from "react";

export default function Pricing() {
  const navigate = useNavigate();

  // ✅ SEO (VERY IMPORTANT)
  useEffect(() => {
    document.title = "Vidayanta ERP Pricing | School Management Software Cost India";

    const metaDesc = document.querySelector("meta[name='description']");
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "Check Vidayanta ERP pricing for schools in India. Affordable school management software with student management, attendance tracking and analytics."
      );
    }
  }, []);

  const features = useMemo(() => [
    {
      title: "Institution Management",
      desc: "Manage schools, branches and administrators easily with Vidayanta ERP system.",
    },
    {
      title: "Teacher Dashboard",
      desc: "Teachers can manage classes, students and track performance.",
    },
    {
      title: "Attendance Tracking",
      desc: "Track student attendance with real-time school ERP software.",
    },
    {
      title: "Reports & Analytics",
      desc: "Advanced analytics for student performance and institution growth.",
    },
  ], []);

  return (
    <>
      <Navbar />

      <section className="py-20 bg-gray-50 mt-14">

        {/* 🔥 SEO H1 */}
        <div className="text-center mb-16">
          <h1 className="text-3xl font-bold text-gray-800">
            School ERP Pricing in India – Vidayanta ERP System
          </h1>

          <p className="text-gray-700 mt-2">
            Affordable school management software for institutions, teachers and students.
          </p>

          <div className="w-72 h-1 bg-teal-500 mx-auto mt-3 rounded-2xl"></div>
        </div>

        {/* PRICE */}
        <div className="max-w-xl mx-auto px-6">
          <div className="bg-white shadow-lg rounded-xl p-10 text-center">
            <h2 className="text-5xl font-bold text-teal-600">
              ₹49
            </h2>

            <p className="text-gray-700 mt-2">
              Per Student / Per Month
            </p>

            <p className="text-gray-700 mt-4">
              Vidayanta ERP offers one of the best school ERP pricing models in India.
              Pay only for the number of students you manage.
            </p>
          </div>
        </div>

        {/* FEATURES */}
        <div className="max-w-5xl mx-auto mt-16 grid md:grid-cols-2 gap-6 px-6">
          {features.map((f) => (
            <Feature key={f.title} title={f.title} desc={f.desc} />
          ))}
        </div>

        {/* EXTRA CONTENT (SEO BOOST) */}
        <div className="max-w-4xl mx-auto mt-16 px-6 text-gray-700">
          <p>
            Vidayanta ERP is one of the best school management software solutions in India.
            It helps institutions manage students, teachers, attendance and reports in a single platform.
          </p>

          <p className="mt-3">
            If you are looking for an affordable school ERP system with advanced analytics,
            Vidayanta provides the perfect solution for modern educational institutions.
          </p>
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