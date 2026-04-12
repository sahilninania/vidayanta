import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function TeacherAnnouncement() {

  const [announcements, setAnnouncements] = useState([]);
  const navigate = useNavigate();

  // ✅ localStorage
  const teacherId = useMemo(() => localStorage.getItem("teacherId"), []);
  const institutionCode = useMemo(() => localStorage.getItem("institutionCode"), []);

  // ✅ FETCH DATA
  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/announcement/teacher",
        {
          params: {
            teacherId,
            institutionCode
          }
        }
      );

      if (res?.data?.data) {
        setAnnouncements(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  }, [teacherId, institutionCode]);

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5000/api/announcement/${id}`,
        {
          params: { userId: teacherId }
        }
      );

      fetchAnnouncements(); // refresh

    } catch (err) {
      console.log(err);
    }
  };
useEffect(() => {
  const loadData = async () => {
      await fetchAnnouncements();
    };

    loadData();
  }, [fetchAnnouncements]);
  

  // ✅ RENDER LIST
  const renderedAnnouncements = useMemo(() => {
    if (announcements.length === 0) {
      return <p>No announcements</p>;
    }

    return announcements.map((a, i) => {

      const isOwn = a.createdBy?.toString() === teacherId;

      return (
        <div
          key={i}
          className="border p-4 mb-3 rounded-lg shadow-sm"
        >

          {/* TOP */}
          <div className="flex justify-between items-center">
            <h2 className="font-bold text-[#14b8a6]">
              {a.title}
            </h2>

            <span className="text-xs bg-gray-200 px-2 py-1 rounded">
              {isOwn ? "You" : "Institute"}
            </span>
          </div>
        
          {/* MESSAGE */}
          <p className="text-sm mt-2 text-gray-600">
            {a.message}
          </p>
          <div className="flex justify-between items-center mt-3">
          {/* CLASS */}
          <p className="text-xs text-gray-400 mt-2">
            {a.className || ""} {a.section ? `- ${a.section}` : ""}
          </p>

          {/* ACTION BUTTONS */}
          {isOwn && (
            <div className="flex justify-end gap-2 ">

              <button
                onClick={() =>
                  navigate(`/teacher/announcement/edit/${a._id}`, {
                    state: a
                  })
                }
                className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
              >
                Edit
              </button>

              <button
                onClick={() => handleDelete(a._id)}
                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
              >
                Delete
              </button>

            </div>
          )}
         </div>
        </div>
      );
    });

  }, [announcements, teacherId, navigate]);

  return (
    <TeacherLayout>
      <div className="p-6">

        {/* HEADER */}
        <div className="flex justify-between mb-4">
          <h1 className="text-2xl font-bold">Announcements</h1>

          <button
            onClick={() => navigate("/teacher/announcement/create")}
            className="bg-[#14b8a6] text-white px-4 py-2 rounded"
          >
            + Create
          </button>
        </div>

        {/* LIST */}
        {renderedAnnouncements}

      </div>
    </TeacherLayout>
  );
}