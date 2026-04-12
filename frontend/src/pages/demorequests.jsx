import { useEffect, useState } from "react";
// import API from "../config/api";
import SuperAdminLayout from "../layout/superadmindashboardlayout";
import axios from "axios";

export default function DemoRequests() {

  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/demo/all");
      setData(res.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    // ✅ FIX: async wrapper
    const loadData = async () => {
      await fetchData();
    };

    loadData();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/demo/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <SuperAdminLayout title="Demo Requests">

      <div className=" min-h-screen">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold text-[#1fa2a6] mb-6">
            📩 Demo Requests
          </h1>

          {data.length === 0 ? (
            <div className="bg-white p-10 text-center rounded-xl shadow text-gray-500">
              No demo requests found
            </div>
          ) : (

            <div className="space-y-4">

              {data.map((d) => (

                <div
                  key={d._id}
                  className="bg-white p-5 rounded-2xl shadow border"
                >

                  <div className="flex justify-between mb-2">
                    <h2 className="font-bold text-lg">{d.name}</h2>

                    <span className="text-xs text-gray-400">
                      {new Date(d.createdAt).toLocaleDateString()}
                    </span>
                  </div>

                  <p className="text-sm text-gray-600">
                    <b>Email:</b> {d.email}
                  </p>

                  <p className="text-sm text-gray-600">
                    <b>Mobile:</b> {d.mobile}
                  </p>

                  <p className="text-sm text-gray-600">
                    <b>School:</b> {d.schoolName}
                  </p>

                  <p className="text-sm text-gray-600">
                    <b>Address:</b> {d.address}
                  </p>

                  <p className="text-sm text-gray-700 mt-2">
                    {d.message}
                  </p>

                  {/* 🔥 DELETE BUTTON */}
                  <div className="flex justify-end mt-3">
                    <button
                      onClick={() => handleDelete(d._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </div>

                </div>

              ))}

            </div>

          )}

        </div>

      </div>

    </SuperAdminLayout>
  );
}