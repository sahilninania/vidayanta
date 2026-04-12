import { useMemo } from "react";

export default function Features() {

  // ✅ stable data (performance boost)
  const features = useMemo(() => [
    {
      icon: "🏫",
      title: "Institution Management",
      desc: "Manage institutions, branches, and administrators easily from a centralized dashboard."
    },
    {
      icon: "👩‍🏫",
      title: "Teacher Dashboard",
      desc: "Teachers can manage classes, mark attendance and track performance."
    },
    {
      icon: "🎓",
      title: "Student Management",
      desc: "Add and manage students with automatic ID generation."
    },
    {
      icon: "📊",
      title: "Attendance Tracking",
      desc: "Track daily student attendance and generate reports instantly."
    },
    {
      icon: "📑",
      title: "Reports & Analytics",
      desc: "Powerful analytics dashboard for institutional insights."
    },
    {
      icon: "🔐",
      title: "Secure System",
      desc: "Role based authentication for admin, teacher and students."
    }
  ], []);

  return (
    <section id="features" className="bg-gray-50 scroll-mt-24">

      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-800">
          Powerful Features
        </h1>

        <div className="w-80 h-1 bg-teal-500 mx-auto mt-4 rounded"></div>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Everything your institution needs to manage education efficiently and digitally.
        </p>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-6">

        {features.map((feature) => (
          <div
            key={feature.title} // ✅ better key
            className="bg-white rounded-xl shadow-md p-6 text-center flex flex-row items-center gap-3 justify-center hover:shadow-xl transition duration-300"
          >

            <div className="text-4xl">
              {feature.icon}
            </div>

            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-gray-800">
                {feature.title}
              </h3>

              <p className="text-gray-600 text-sm mt-2">
                {feature.desc}
              </p>
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}