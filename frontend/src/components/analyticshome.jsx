import { useEffect, useState, useMemo } from "react";

export default function Analytics() {

  // ✅ stable array (performance boost)
  const images = useMemo(() => [
    "/images/vidayanta (1).png",
    "/images/vidayanta (4).png",
    "/images/vidayanta (5).png",
  ], []);

  const [current, setCurrent] = useState(0);

  // ✅ optimized slider
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 5000);

    return () => clearInterval(slider);
  }, [images.length]);

  return (
    <section className="py-20 bg-white">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

        {/* IMAGE */}
        <div className="flex-1">
          <img
            src={images[current]}
            alt="Analytics Dashboard"
            loading="lazy" // ✅ performance boost
            className="w-full rounded-xl shadow-lg transition duration-700"
          />
        </div>

        {/* TEXT */}
        <div className="flex-1">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Smart Analytics & Reports
          </h2>

          <p className="text-gray-600 mb-6">
            Get real-time insights about attendance,
            student performance, and institutional
            growth with powerful analytics tools.
          </p>

          {/* LIST */}
          <ul className="space-y-3 text-gray-700">
            <li>✔ Real-time attendance tracking</li>
            <li>✔ Student performance reports</li>
            <li>✔ Teacher activity monitoring</li>
            <li>✔ Institution growth analytics</li>
          </ul>
        </div>

      </div>

    </section>
  );
}