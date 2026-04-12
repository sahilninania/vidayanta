import { useMemo } from "react";

export default function Stats() {

  // ✅ stable data (no re-create on every render)
  const stats = useMemo(() => [
    {
      img: "/images/howitsworks (2).png",
      value: "250+",
      label: "Institutions",
    },
    {
      img: "/images/howitsworks (4).png",
      value: "1200+",
      label: "Teachers",
    },
    {
      img: "/images/howitsworks (3).png",
      value: "15000+",
      label: "Students",
    },
    {
      img: "/images/howitsworks (1).png",
      value: "99%",
      label: "Uptime",
    },
  ], []);

  return (
    <section className="px-4 md:px-6 -mt-10 relative z-10">

      <div className="max-w-6xl mx-auto bg-white rounded-2xl shadow-xl p-4 md:p-6">

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">

          {stats.map((item) => (
            <div
              key={item.label} // ✅ better key
              className="flex flex-col sm:flex-row items-center justify-center gap-3"
            >

              <div className="bg-[#14b8a6]/20 p-2 rounded-full">
                <img
                  src={item.img}
                  loading="lazy"
                  alt={item.label}
                  className="w-20 h-20 md:w-16 md:h-16"
                />
              </div>

              <div>
                <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-gray-800">
                  {item.value}
                </h2>
                <p className="text-gray-600 text-xs md:text-sm">
                  {item.label}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}