import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignClass() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const institutionCode = localStorage.getItem("institutionCode");

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        setLoading(true);
        const res = await axios.post(
          `${API_URL}/api/classes/by-institution`,
          { institutionCode }
        );
        setClasses(res.data.classes || []);
      } catch (error) {
        console.error("Error fetching classes:", error);
      } finally {
        setLoading(false);
      }
    };

    if (institutionCode) {
      fetchClasses();
    }
  }, [institutionCode]);

  const handleAssignClick = (cls) => {
    // 🔍 Check if teacher already assigned
    if (cls.teacherId || cls.assignedTeacher) {
      alert("Teacher is already assigned to this class!");
      return;
    }

    navigate(`/institution/assign/${cls._id}`);
  };

  return (
    <InstitutionLayout>
      <h1 className="text-3xl font-bold m-6 text-[#1fa2a6]">
        Assign Teachers
      </h1>

      {loading ? (
        <p className="m-6">Loading classes...</p>
      ) : classes.length === 0 ? (
        <p className="m-6 text-gray-500">No classes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
          {classes.map((cls) => {
            const isAssigned = cls.teacherId || cls.assignedTeacher;

            return (
              <div key={cls._id} className="p-4 border rounded shadow">
                <h2 className="font-bold text-lg">
                  Class {cls.className} - {cls.section}
                </h2>

                {/* Optional: Show assigned teacher name */}
                {isAssigned && (
                  <p className="text-sm text-gray-600 mt-1">
                    Teacher Assigned
                  </p>
                )}

                <button
                  className={`mt-3 px-3 py-1 rounded ${
                    isAssigned
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1fa2a6] text-white"
                  }`}
                  disabled={!!isAssigned}
                  onClick={() => handleAssignClick(cls)}
                >
                  {isAssigned ? "Teacher Assigned" : "Assign Teacher"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </InstitutionLayout>
  );
}