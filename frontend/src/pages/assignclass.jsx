import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";

export default function AssignTeacher() {
  const { classId } = useParams();
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState("");
  const [loading, setLoading] = useState(true);

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ Fetch Teachers
  const fetchTeachers = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/teachers?institutionCode=${institutionCode}`
      );
      setTeachers(res.data.teachers || []);
    } catch (err) {
      console.error("Error fetching teachers", err);
    }
  };

  // ✅ Fetch Assignments (to check if teacher already used)
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/assignments?institutionCode=${institutionCode}`
      );
      setAssignments(res.data.assignments || []);
    } catch (err) {
      console.error("Error fetching assignments", err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        await Promise.all([fetchTeachers(), fetchAssignments()]);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // ✅ Handle Assign
  const handleAssignTeacher = async () => {
    if (!selectedTeacher) {
      alert("Please select a teacher");
      return;
    }

    // 🔥 FRONTEND CHECK (teacher already used)
    const isTeacherUsed = assignments.some(
      (a) => a.teacherId?._id === selectedTeacher
    );

    if (isTeacherUsed) {
      alert("❌ This teacher is already assigned to another class!");
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
      console.error("❌ ERROR 👉", error.response?.data);

      // 🔥 IMPORTANT FIX (your missing part)
      alert(
        error.response?.data?.message || "Something went wrong"
      );
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
                  {teacher.name} ({teacher.subject})
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