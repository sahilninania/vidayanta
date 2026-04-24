import React from "react";
import Navbar from "../components/navbarhome";
import Footer from "../components/footerhome";

export default function Blog2() {
  return (
    <>
      <Navbar />

      {/* HERO */}
      <div className="bg-gradient-to-br from-[#0f2942] via-[#184b7a] to-[#159196] text-white py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          How to Manage School Digitally
        </h1>
        <p className="text-lg text-gray-200 max-w-2xl mx-auto">
          Learn how digital tools like Vidayanta can simplify school management.
        </p>
      </div>

      {/* CONTENT */}
      <div className="min-h-screen bg-gray-50 py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded-2xl shadow-lg">

          <p className="text-gray-700 text-lg mb-6">
            Managing a school manually can be difficult. Digital school management
            systems help automate tasks like attendance, student records and communication.
          </p>

          <h2 className="text-2xl font-semibold mb-4">
            Benefits of Digital School Management
          </h2>

          <ul className="list-disc pl-6 space-y-2 text-gray-700 mb-6">
            <li>Paperless operations</li>
            <li>Faster communication</li>
            <li>Better data security</li>
            <li>Real-time access to information</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">
            Why Use Vidayanta?
          </h2>

          <p className="text-gray-700 mb-6">
            Vidayanta is designed to help schools manage everything from a single platform,
            making administration simple and efficient.
          </p>

          <div className="text-center flex flex-row sm:flex-row gap-8 justify-center">
            <a
              href="/"
              className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-6 py-3 rounded-full font-semibold hover:bg-blue-700 transition"
            >
              Explore Vidayanta →
            </a>
            <a href="/best-school-erp" className="bg-[#14b8a6] hover:bg-[#0d9488] text-white px-8 py-3 rounded-full font-semibold hover:bg-blue-700 transition shadow-md">
                Read: Best School ERP System
            </a>
          </div>

        </div>
      </div>

      <Footer />
    </>
  );
}