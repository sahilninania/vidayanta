import React from "react";
import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";

export default function Blog1() {
  return (
    <>
      <Navbar />

      {/* PREMIUM HERO SECTION */}
      <div className="relative bg-gradient-to-br from-[#0f2942] via-[#184b7a] to-[#159196] text-white py-20 px-6 text-center overflow-hidden">

        {/* Glow Effect */}
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top,white,transparent)]"></div>

        <div className="relative z-10 max-w-4xl mx-auto">

          {/* Badge */}
          <span className="inline-block bg-white/10 backdrop-blur px-4 py-1 rounded-full text-sm mb-4">
            🚀 School ERP Solution
          </span>

          {/* Heading */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
            Best School ERP System in India
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-gray-200 mb-8">
            Manage students, teachers, attendance and operations seamlessly with
            <span className="font-semibold text-white"> Vidayanta</span>.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/"
              className="bg-white text-[#0f2942] px-6 py-3 rounded-full font-semibold hover:bg-gray-200 transition shadow-lg"
            >
              Explore Now →
            </a>

            <a
              href="/features"
              className="border border-white px-6 py-3 rounded-full font-semibold hover:bg-white hover:text-[#0f2942] transition"
            >
              View Features
            </a>
          </div>
        </div>
      </div>

      {/* BLOG CONTENT */}
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

          {/* Intro */}
          <p className="text-gray-700 text-lg mb-6 leading-relaxed">
            A school management system helps schools manage students, teachers,
            attendance and results efficiently.{" "}
            <span className="font-semibold text-blue-600">
              Vidayanta
            </span>{" "}
            is a modern school ERP system designed for digital school
            management.
          </p>

          {/* Features Box */}
          <div className="bg-blue-50 border border-blue-100 p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold text-blue-700 mb-4">
              Why Schools Need ERP Software?
            </h2>

            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Reduce paperwork and manual effort</li>
              <li>Save time with automation</li>
              <li>Better and secure data management</li>
              <li>Centralized control for all operations</li>
            </ul>
          </div>

          {/* Why Choose */}
          <div className="bg-gray-100 border p-6 rounded-xl mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Why Choose Vidayanta?
            </h2>

            <p className="text-gray-700 leading-relaxed">
              Vidayanta provides a complete digital solution for schools,
              enabling institutions to move towards a paperless system.
              It simplifies administration, improves communication, and
              ensures secure management of all academic data.
            </p>
          </div>

          {/* CTA */}
          <div className="text-center mt-10">
            <p className="text-gray-800 mb-4 font-medium text-lg">
              Ready to digitize your school?
            </p>

            <a
              href="/"
              className="inline-block bg-blue-600 text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-md"
            >
              Explore Vidayanta →
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}