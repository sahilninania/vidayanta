import { FaArrowRight } from "react-icons/fa";
import React, { useMemo } from "react";

export default function HowItWorks() {

  // ✅ stable data (no re-create)
  const steps = useMemo(() => [
    {
      img: "/images/howitsworks (1).png",
      title: "Super Admin",
      points: [
        "Creates institutions",
        "Manages platform settings",
        "Controls the entire system",
      ],
    },
    {
      img: "/images/howitsworks (2).png",
      title: "Institution",
      points: [
        "Creates institutions",
        "Manages platform settings",
        "Controls the entire system",
      ],
    },
    {
      img: "/images/howitsworks (4).png",
      title: "Teacher",
      points: [
        "Creates institutions",
        "Manages platform settings",
        "Controls the entire system",
      ],
    },
    {
      img: "/images/howitsworks (3).png",
      title: "Student",
      points: [
        "Creates institutions",
        "Manages platform settings",
        "Controls the entire system",
      ],
    },
  ], []);

  return (
    <section id="howitworks" className="bg-gray-50 py-12 scroll-mt-24">

      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-gray-800">
          How Vidayanta Works
        </h2>

        <div className="w-80 h-1 bg-teal-500 mx-auto mt-4 rounded"></div>
      </div>

      {/* STEPS */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8">

        {steps.map((step, index) => (
          <React.Fragment key={step.title}>

            {/* CARD */}
            <div className="flex flex-col items-center text-center gap-4 p-6 rounded-xl w-56">

              <div className="bg-[#14b8a6]/20 shadow-md rounded-full w-24 h-24 flex items-center justify-center">
                <img
                  src={step.img}
                  loading="lazy"
                  alt={step.title}
                  className="w-24 h-24 object-contain"
                />
              </div>

              <div className="flex flex-col">
                <h3 className="font-bold text-lg text-gray-800">
                  {step.title}
                </h3>

                <ul className="text-sm text-gray-600 mt-3 mb-3 space-y-1">
                  {step.points.map((p) => (
                    <li key={p}>• {p}</li> // ✅ better key
                  ))}
                </ul>
              </div>

            </div>

            {/* ARROW */}
            {index !== steps.length - 1 && (
              <div className="text-teal-500 text-2xl hidden md:block">
                <FaArrowRight />
              </div>
            )}

          </React.Fragment>
        ))}

      </div>

    </section>
  );
}