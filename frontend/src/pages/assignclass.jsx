import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignClass() {
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]); // 🔥 NEW
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ Fetch Classes
  const fetchClasses = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/classes/by-institution`,
        { institutionCode }
      );
      setClasses(res.data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // ✅ Fetch Assignments
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/assignments?institutionCode=${institutionCode}`
      );
      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  // ✅ Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (institutionCode) {
          await Promise.all([fetchClasses(), fetchAssignments()]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [institutionCode]);

  // ✅ Check Assignment
  const isClassAssigned = (classId) => {
    return assignments.some(
      (a) => a.classId?._id === classId
    );
  };

  // ✅ Button Click
  const handleAssignClick = (cls) => {
    if (isClassAssigned(cls._id)) {
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
            const assigned = isClassAssigned(cls._id);

            return (
              <div key={cls._id} className="p-4 border rounded shadow">
                <h2 className="font-bold text-lg">
                  Class {cls.className} - {cls.section}
                </h2>

                {/* ✅ Show status */}
                {assigned && (
                  <p className="text-sm text-green-600 mt-1">
                    Teacher Assigned
                  </p>
                )}

                <button
                  className={`mt-3 px-3 py-1 rounded ${
                    assigned
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1fa2a6] text-white"
                  }`}
                  disabled={assigned}
                  onClick={() => handleAssignClick(cls)}
                >
                  {assigned ? "Teacher Assigned" : "Assign Teacher"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </InstitutionLayout>
  );
}