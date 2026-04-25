import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import { useState, useEffect, useMemo } from "react";

export default function Hero() {

  // ✅ stable array (no re-create every render)
  const images = useMemo(() => [
    "/images/vidayanta (7).webp",
    "/images/vidayanta (10).webp",
    "/images/vidayanta (12).webp",
    "/images/vidayanta (15).png",
    "/images/vidayanta (16).webp"
  ], []);

  const [current, setCurrent] = useState(0);

  // ✅ optimized slider
  useEffect(() => {
    const slider = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => clearInterval(slider);
  }, [images.length]);

  return (
    <section className="bg-gradient-to-br from-[#0f2942] via-[#184b7a] to-[#159196] text-white pt-20 pb-12 mt-14 px-2">

      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-10">

        {/* LEFT */}
        <div className="max-w-xl text-center md:text-left">

          <h1 className="text-xl md:text-3xl font-bold leading-tight mb-6">
            Vidayanta ERP - Smart School Management System
            <br />
            <span className="text-[#2dd4bf]">
              Empowering Education, <br/>
              Simplifying Management
            </span>
          </h1>

          <p className="mt-1 text-gray-300">
            <b>The Complete </b>
            <span className="text-[#2dd4bf] font-bold">School ERP </span><br />
            Solution for Institutions, Teachers & Students
          </p>

          {/* PC BUTTONS */}
          <div className="hidden md:flex gap-4 mt-6 mb-6">
            <Link to="/request-demo">
              <button className="bg-yellow-400 hover:bg-yellow-500 text-black px-6 py-3 rounded-lg font-semibold">
                Request Demo
              </button>
            </Link>

            <Link to="/contact">
              <button className="bg-orange-600 hover:bg-orange-700 px-6 py-3 rounded-lg font-semibold">
                Contact Us
              </button>
            </Link>

            <Link to="/login">
              <button className="bg-[#14b8a6] hover:bg-[#0d9488] px-6 py-3 rounded-lg font-semibold">
                Login Now →
              </button>
            </Link>
          </div>

          {/* TRUST */}
          <div className="hidden md:flex items-center gap-3 text-sm text-gray-300 mt-6 mb-6">
            <p>
              Trusted by <span className="text-white font-semibold">500+</span> Institutions
            </p>

            <div className="flex text-yellow-400 gap-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>

        </div>

        {/* RIGHT IMAGE */}
        <div className="w-full max-w-sm md:max-w-md">
          <img
            src={images[current]}
            alt="Vidayanta ERP School Management Dashboard" 
            // loading="lazy" // ✅ performance boost
            className="w-full rounded-xl shadow-xl transition duration-700"
          />
        </div>

        {/* MOBILE */}
        <div className="w-full md:hidden flex flex-col items-center text-center">

          <div className="flex flex-col gap-3 mt-6 w-full max-w-xs">

            <Link to="/request-demo">
              <button className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold w-full">
                Request Demo
              </button>
            </Link>

            <Link to="/contact">
              <button className="bg-orange-600 px-6 py-3 rounded-lg font-semibold w-full">
                Contact Us
              </button>
            </Link>

            <Link to="/login">
              <button className="bg-[#14b8a6] px-6 py-3 rounded-lg font-semibold w-full">
                Login Now
              </button>
            </Link>

          </div>

          <div className="mt-5 text-gray-300 text-sm flex flex-col items-center gap-2">
            <p>
              Trusted by <span className="text-white font-semibold">500+</span> Institutions
            </p>

            <div className="flex text-yellow-400 gap-1">
              <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}