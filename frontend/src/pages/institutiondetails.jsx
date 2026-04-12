import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import API_URL from "../config/api.js";
import Superadminlayout from "../layout/superadmindashboardlayout";

import { FaPhone, FaEnvelope, FaMapMarkerAlt ,} from "react-icons/fa";
import { FaBuildingFlag } from "react-icons/fa6";

export default function InstitutionDetails() {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${API_URL}/api/superadmin/institution-full/${id}`)
      .then((res) => setData(res.data.data))
      .catch((err) => console.log(err));
  }, [id]);

  // 🔥 SKELETON UI (INLINE)
  if (!data) {
    return (
      <Superadminlayout>
        <div className="p-4 md:p-6 space-y-6 animate-pulse">

          {/* HEADER */}
          <div className="bg-white p-6 rounded-2xl shadow border space-y-3">
            <div className="h-6 w-1/3 bg-gray-300 rounded"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/2 bg-gray-200 rounded"></div>
            <div className="h-4 w-1/3 bg-gray-200 rounded"></div>
          </div>

          {/* STATS */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white p-5 rounded-xl shadow border text-center space-y-3">
                <div className="h-4 w-1/2 mx-auto bg-gray-200 rounded"></div>
                <div className="h-8 w-1/3 mx-auto bg-gray-300 rounded"></div>
              </div>
            ))}
          </div>

          {/* CLASS */}
          <div className="bg-white p-6 rounded-2xl shadow border space-y-4">
            <div className="h-5 w-1/4 bg-gray-300 rounded"></div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-100 p-4 rounded-lg space-y-2">
                  <div className="h-4 w-1/2 bg-gray-300 rounded"></div>
                  <div className="h-3 w-1/3 bg-gray-200 rounded"></div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </Superadminlayout>
    );
  }

  return (
    <Superadminlayout>
      <div className=" md:p-6 space-y-6">
       <h1 className="text-4xl font-bold text-teal-600 mb-6">Institutiton Details</h1>
        {/* 🔥 HEADER */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">
          <h1 className="text-2xl font-bold text-teal-600 mb-2">
            {data.institutionName}
          </h1>

          <div className="space-y-1 text-sm text-gray-600">
            <p className="flex items-center gap-2">
              <FaMapMarkerAlt /> {data.address}
            </p>
            <p className="flex items-center gap-2">
              <FaBuildingFlag /> {data.branch}
            </p>

            <p className="flex items-center gap-2">
              <FaPhone className="text-teal-500" /> {data.mobile}
            </p>

            <p className="flex items-center gap-2">
              <FaEnvelope className="text-blue-500" /> {data.email}
            </p>
          </div>
        </div>

        {/* 🔥 STATS */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">

          <div className="bg-white p-5 rounded-xl shadow border text-center">
            <p className="text-gray-500 text-sm">Total Teachers</p>
            <h2 className="text-3xl font-bold text-blue-500 mt-1">
              {data.totalTeacher}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border text-center">
            <p className="text-gray-500 text-sm">Total Students</p>
            <h2 className="text-3xl font-bold text-green-500 mt-1">
              {data.totalStudent}
            </h2>
          </div>

          <div className="bg-white p-5 rounded-xl shadow border text-center">
            <p className="text-gray-500 text-sm">Total Classes</p>
            <h2 className="text-3xl font-bold text-purple-500 mt-1">
              {data.totalClass}
            </h2>
          </div>

        </div>

        {/* 🔥 CLASS DATA */}
        <div className="bg-white p-6 rounded-2xl shadow border border-gray-100">

          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            Class Wise Students
          </h2>

          {data.classData?.length === 0 ? (
            <p className="text-gray-400 text-sm">
              No Class Data Available
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

              {data.classData.map((c) => (
                <div
                  key={c.className}
                  className="bg-gray-50 p-4 rounded-lg border hover:shadow-md transition"
                >
                  <h3 className="font-medium text-gray-700">
                    {c.className}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1">
                    Students:{" "}
                    <span className="font-semibold text-teal-600">
                      {c.count}
                    </span>
                  </p>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </Superadminlayout>
  );
}