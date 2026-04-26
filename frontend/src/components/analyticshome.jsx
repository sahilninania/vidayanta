import { useEffect, useState, useMemo } from "react";

export default function Analytics() {

  // ✅ Image + SEO Text mapping
  const slides = useMemo(() => [
    {
      img: "/images/vidayanta (1).webp",
      title: "Smart Analytics for School ERP",
      desc: "Vidayanta school ERP system provides real-time student insights, attendance tracking and performance analytics for institutions.",
      points: [
        "✔ Student performance analytics",
        "✔ Attendance tracking system",
        "✔ School ERP dashboard insights",
        "✔ Data-driven decision making"
      ]
    },
    {
      img: "/images/vidayanta (4).webp",
      title: "Content Creation & Learning Module",
      desc: "Create lessons, quizzes and digital content easily using Vidayanta ERP software for schools and teachers.",
      points: [
        "✔ Lesson planning tools",
        "✔ Quiz & exam builder",
        "✔ Media content library",
        "✔ Digital classroom support"
      ]
    },
    {
      img: "/images/vidayanta (5).webp",
      title: "Secure School Management System",
      desc: "Vidayanta ERP ensures secure school management with role-based access, data protection and reliable system control.",
      points: [
        "✔ Role-based access control",
        "✔ Secure student data",
        "✔ Admin & teacher control",
        "✔ Safe cloud-based ERP"
      ]
    }
  ], []);

  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(slider);
  }, [slides.length]);

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

        {/* IMAGE */}
        <div className="flex-1">
          <img
            src={slides[current].img}
            alt={slides[current].title} // ✅ SEO IMPORTANT
            loading="lazy"
            className="w-full rounded-xl shadow-lg transition duration-700"
          />
        </div>

        {/* TEXT */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {slides[current].title}
          </h2>

          <p className="text-gray-600 mb-6">
            {slides[current].desc}
          </p>

          <ul className="space-y-3 text-gray-700">
            {slides[current].points.map((p, i) => (
              <li key={i}>{p}</li>
            ))}
          </ul>
        </div>

      </div>

    </section>
  );
}