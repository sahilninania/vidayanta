import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function ViewClasses() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  // 🔥 FETCH (stable)
  const fetchClasses = useCallback(async () => {
    try {
      const institutionCode = localStorage.getItem("institutionCode");
      if (!institutionCode) return;

      const res = await axios.post(`${API_URL}/api/classes/by-institution`, {
        institutionCode,
      });

      setClasses(res?.data?.classes || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
  const loadData = async () => {
    await  fetchClasses();
  };

  loadData();
}, [ fetchClasses]);

  // 🔥 DELETE (instant UI)
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this class?")) return;

    try {
      await axios.delete(`${API_URL}/api/classes/${id}`);

      setClasses((prev) => prev.filter((c) => c._id !== id));
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 🔥 NAVIGATION
  const handleEdit = useCallback(
    (id) => navigate(`/institution/edit-class/${id}`),
    [navigate]
  );

  const handleView = useCallback(
    (id) => navigate(`/institution/class/${id}`),
    [navigate]
  );

  // 🔥 MEMOIZED UI
  const renderedClasses = useMemo(() => {
    return classes.map((cls) => (
      <div
        key={cls._id}
        className="bg-white rounded-2xl shadow border hover:shadow-xl transition duration-300 p-5"
      >
        {/* HEADER */}
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-lg font-bold text-[#1fa2a6]">
            {cls.className} - {cls.section}
          </h3>

          <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full">
            Class
          </span>
        </div>

        {/* INCHARGE */}
        <p className="text-sm text-gray-600 mb-3">
          <span className="font-medium">Incharge: </span>
          {cls.classIncharge?.teacherName || "Not Assigned"}
        </p>

        {/* SUBJECT TEACHERS */}
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">
            Subjects & Teachers
          </p>

          {cls.subjectTeachers?.length > 0 ? (
            <div className="space-y-1">
              {cls.subjectTeachers.slice(0, 3).map((sub, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm bg-gray-50 px-3 py-1 rounded-lg"
                >
                  <span>{sub.subject}</span>
                  <span>{sub.teacher?.teacherName || "N/A"}</span>
                </div>
              ))}

              {cls.subjectTeachers.length > 3 && (
                <p className="text-xs text-blue-500 text-right">
                  +{cls.subjectTeachers.length - 3} more
                </p>
              )}
            </div>
          ) : (
            <p className="text-xs text-gray-400">
              No subjects assigned
            </p>
          )}
        </div>

        {/* DATE */}
        <p className="text-xs text-gray-400 mb-4">
          Created:{" "}
          {cls.createdAt
            ? new Date(cls.createdAt).toLocaleDateString()
            : "N/A"}
        </p>

        {/* BUTTONS */}
        <div className="flex gap-2">
          <button
            onClick={() => handleView(cls._id)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm"
          >
            View
          </button>

          <button
            onClick={() => handleEdit(cls._id)}
            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(cls._id)}
            className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [classes, handleDelete, handleEdit, handleView]);

  return (
    <InstitutionLayout title="View Classes">
      <div className="p-6 bg-gray-100 min-h-screen">
        <h2 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
          All Classes
        </h2>

        {classes.length === 0 ? (
          <p className="text-gray-500 text-center">
            No classes found
          </p>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {renderedClasses}
          </div>
        )}
      </div>
    </InstitutionLayout>
  );
}