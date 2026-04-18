import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";

export default function AssignTeacher() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [loading, setLoading] = useState(true);

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ Fetch Teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
      );
      setTeachers(res.data.teachers || []);
    } catch (err) {
      console.error("Error fetching teachers", err);
    }
  };

  // ✅ Load Teachers
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await fetchTeachers();
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ✅ HANDLE ASSIGN (FINAL FIX)
  const handleAssignTeacher = async () => {
    if (!selectedTeacher) {
      alert("Please select a teacher");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/assign`, {
        classId,
        teacherId: selectedTeacher,
        institutionCode
      });

      alert("✅ Teacher assigned successfully!");
      navigate("/institution/assign-class");

    } catch (error) {
      console.log("🔥 FULL ERROR:", error);

      const message =
        error?.response?.data?.message ||
        error?.message ||
        "Something went wrong";

      alert(message); // 🔥 THIS WILL SHOW YOUR BACKEND ERROR
    }
  };

  return (
    <InstitutionLayout>
      <div className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4 text-[#1fa2a6]">
          Assign Teacher
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            {/* ✅ Dropdown */}
            <select
              className="w-full p-2 border rounded mb-4"
              value={selectedTeacher}
              onChange={(e) => setSelectedTeacher(e.target.value)}
            >
              <option value="">Select Teacher</option>
              {teachers.map((teacher) => (
                <option key={teacher._id} value={teacher._id}>
                    {teacher.teacherName} ({teacher.subjects?.[0]})
                </option>
              ))}
            </select>

            {/* ✅ Button */}
            <button
              onClick={handleAssignTeacher}
              className="w-full bg-[#1fa2a6] text-white py-2 rounded"
            >
              Assign Teacher
            </button>
          </>
        )}
      </div>
    </InstitutionLayout>
  );
}