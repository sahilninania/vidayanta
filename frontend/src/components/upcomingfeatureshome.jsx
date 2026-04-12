import { useMemo } from "react";

export default function UpcomingFeatures() {

  // ✅ stable data (no re-create)
  const features = useMemo(() => [
    {
      icon: "🤖",
      title: "AI Report Card",
      desc: "Smart analysis with performance insights & suggestions",
    },
    {
      icon: "📲",
      title: "WhatsApp Alerts",
      desc: "Real-time updates for parents via SMS & WhatsApp",
    },
    {
      icon: "🧾",
      title: "Online Fee System",
      desc: "Collect and manage fees digitally",
    },
    {
      icon: "📱",
      title: " Mobile App",
      desc: "Detailed App for more better exprience",
    },
  ], []);

  return (
    <section id="features" className="bg-gray-50 scroll-mt-24 mt-10">

      {/* TITLE */}
      <div className="text-center mb-16">
        <h1 className="text-3xl font-bold text-gray-800">
          Upcoming Features
        </h1>

        <div className="w-80 h-1 bg-teal-500 mx-auto mt-4 rounded"></div>

        <p className="text-gray-600 mt-4 max-w-xl mx-auto">
          Powerful new features are coming soon to make school management smarter and easier.
        </p>
      </div>

      {/* CARDS */}
      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8 px-6">

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