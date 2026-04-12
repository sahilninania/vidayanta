import { useState, useEffect } from "react";
import axios from "axios";
import Superadminlayout from "../layout/superadmindashboardlayout";

import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

import { FaPhone, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export default function Analytics() {

  const [type, setType] = useState("month");
  const [analytics, setAnalytics] = useState([]);
  const [institutions, setInstitutions] = useState([]);

  const fetchData = async () => {
    try {
      const res1 = await axios.get(
        `http://localhost:5000/api/superadmin/analytics?type=${type}`
      );

      const res2 = await axios.get(
        `http://localhost:5000/api/superadmin/institutions`
      );

      setAnalytics(res1?.data?.data?.institutions || []);
      setInstitutions(res2?.data?.data || []);

    } catch (error) {
      console.log("ERROR 👉", error);
    }
  };

  useEffect(() => {
  const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, [type]);

  const chartData = {
    labels: analytics.map(item => item.label || "N/A"),
    datasets: [
      {
        label: `Institutions (${type})`,
        data: analytics.map(item => item.count || 0),
        borderColor: "#14b8a6",
        backgroundColor: "rgba(20,184,166,0.15)",
        tension: 0.4,
        fill: true
      }
    ]
  };

  return (
    <Superadminlayout>
      <div className="md:p-6 space-y-6">

        {/* 🔥 HEADER */}
        <div>
          <h1 className="text-4xl font-bold text-teal-600 mb-6">Analytics Dashboard</h1>
          <p className="text-sm text-gray-500">
            Track growth insights (Week / Month / Year)
          </p>
        </div>

        {/* 🔥 FILTER BUTTONS */}
        <div className="flex gap-3">
          {["week", "month", "year"].map((item) => (
            <button
              key={item}
              onClick={() => setType(item)}
              className={`px-4 py-1.5 rounded-lg text-sm font-medium transition-all duration-200
                ${type === item
                  ? "bg-teal-600 text-white shadow-md scale-105"
                  : "bg-gray-100 hover:bg-teal-100 text-gray-700"
                }`}
            >
              {item.toUpperCase()}
            </button>
          ))}
        </div>

        {/* 🔥 GRAPH */}
        <div className="bg-white p-5 rounded-2xl shadow-md border border-gray-100">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">
            Growth ({type})
          </h2>

          {analytics.length === 0 ? (
            <p className="text-gray-400 text-sm text-center py-10">
              No Data Available 📉
            </p>
          ) : (
            <Line data={chartData} />
          )}
        </div>

        {/* 🔥 CARDS */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {institutions.length === 0 && (
            <p className="text-gray-400">No Institutions Found</p>
          )}

          {institutions.map((inst) => (
            <div
              key={inst._id || inst.email}
              className="bg-white rounded-2xl p-5 shadow-md border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              {/* NAME */}
              <h2 className="text-lg font-semibold text-teal-600 mb-2">
                {inst.institutionName || "No Name"}
              </h2>

              {/* ADDRESS */}
              <p className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                <FaMapMarkerAlt className="text-gray-400" />
                {inst.address || "No Address"}
              </p>

              {/* MOBILE */}
              <p className="flex items-center gap-2 text-sm mb-1">
                <FaPhone className="text-teal-500" />
                {inst.mobile || "No Mobile"}
              </p>

              {/* EMAIL */}
              <p className="flex items-center gap-2 text-sm mb-3">
                <FaEnvelope className="text-blue-500" />
                {inst.email || "No Email"}
              </p>

              {/* BUTTON */}
              <button
                onClick={() =>
                  window.location.href = `/superadmin/institution/${inst._id}`
                }
                className="w-full mt-2 bg-gradient-to-r from-teal-500 to-teal-600 text-white py-2 rounded-lg text-sm font-medium hover:opacity-90 transition"
              >
                View Details →
              </button>
            </div>
          ))}

        </div>

      </div>
    </Superadminlayout>
  );
}