import React from "react";
import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";
export default function Blog1() {
  return (
    <>
        <Navbar />
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-md">

        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Best School ERP System in India
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          A school management system helps schools manage students, teachers,
          attendance and results efficiently. <span className="font-semibold text-blue-600">Vidayanta</span> is a modern
          school ERP system designed for digital school management.
        </p>

        <div className="bg-blue-50 p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-semibold text-blue-700 mb-3">
            Why Schools Need ERP Software?
          </h2>

          <ul className="list-disc pl-6 text-gray-700 space-y-2">
            <li>Reduce paperwork</li>
            <li>Save time and effort</li>
            <li>Better data management</li>
            <li>Centralized system for all operations</li>
          </ul>
        </div>

        <div className="bg-gray-100 p-6 rounded-xl mb-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Why Choose Vidayanta?
          </h2>

          <p className="text-gray-700">
            Vidayanta provides a complete digital solution for schools,
            making management easy, fast and secure. It helps institutions
            move towards a paperless and efficient system.
          </p>
        </div>

        <div className="text-center mt-8">
          <p className="text-gray-700 mb-4 font-medium">
            Looking for the best school ERP system in India?
          </p>

          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-blue-700 transition"
          >
            Explore Vidayanta
          </a>
        </div>

      </div>
    </div>
    <Footer />
    </>
  );
}