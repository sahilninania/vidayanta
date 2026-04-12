import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Announcements() {

  const [data, setData] = useState([]);
  const navigate = useNavigate();

  const institutionCode = localStorage.getItem("institutionCode");
  const userId = localStorage.getItem("userId");

  // 🔥 FETCH DATA
  const fetchData = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/announcement/get`,
        {
          params: {
            role: "instituteadmin",
            institutionCode,
            userId
          }
        }
      );

      setData(res.data.data);

    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
  const loadData = async () => {
    await fetchData();
  };

  loadData();
}, []);

  // 🔥 DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/announcement/${id}`,
        {
          params: { userId }
        }
      );

      alert("Deleted ✅");
      fetchData();

    } catch (err) {
      console.log(err);
      alert("Delete failed ❌");
    }
  };

  return (
    <InstitutionLayout title="Announcements">

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        <div className="max-w-5xl mx-auto">

          {/* HEADER */}
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-[#1fa2a6]">
              📢 Announcements
            </h1>

            <button
              onClick={() => navigate("/institution/announcement/create")}
              className="bg-[#1fa2a6] text-white px-4 py-2 rounded-lg"
            >
              + Create
            </button>
          </div>

          {/* EMPTY */}
          {data.length === 0 ? (
            <div className="text-center bg-white p-10 rounded shadow text-gray-500">
              No announcements yet
            </div>
          ) : (

            <div className="space-y-4">

              {data.map((ann) => {

                const isOwn =
                  ann.createdBy?.toString() === userId;

                return (
                  <div
                    key={ann._id}
                    className="bg-white p-5 rounded-2xl shadow border"
                  >

                    {/* TOP */}
                    <div className="flex justify-between">
                      <h2 className="font-bold text-lg">
                        {ann.title}
                      </h2>

                      <span className="text-xs text-gray-400">
                        {new Date(ann.createdAt).toLocaleDateString()}
                      </span>
                    </div>

                    {/* MESSAGE */}
                    <p className="text-sm mt-2 text-gray-600">
                      {ann.message}
                    </p>

                    {/* FOOTER */}
                    <div className="flex justify-between mt-3 items-center">

                      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                        {ann.targetType}
                      </span>

                      {/* 🔥 ACTION BUTTONS */}
                      {isOwn && (
                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              navigate(`/institution/announcement/edit/${ann._id}`)
                            }
                            className="bg-blue-500 text-white px-2 py-1 rounded"
                          >
                            Edit
                          </button>

                          <button
                            onClick={() => handleDelete(ann._id)}
                            className="bg-red-500 text-white px-2 py-1 rounded"
                          >
                            Delete
                          </button>

                        </div>
                      )}

                    </div>

                  </div>
                );
              })}

            </div>

          )}

        </div>

      </div>

    </InstitutionLayout>
  );
}