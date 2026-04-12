import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function ViewTeacher() {
  const navigate = useNavigate();

  const [teachers, setTeachers] = useState([]);

  // ✅ fetch function optimized
  const fetchTeachers = useCallback(async () => {
    try {
      const institutionCode = localStorage.getItem("institutionCode");

      if (!institutionCode) {
        console.log("Institution code missing");
        return;
      }

      const res = await axios.get(
        `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
      );

      setTeachers(res.data.teachers);
    } catch (error) {
      console.log("Error fetching teachers:", error);
    }
  }, []);

 useEffect(() => {
  const loadData = async () => {
    await fetchTeachers();
  };

  loadData();
}, [fetchTeachers]);

  // ✅ delete optimized (no re-creation on every render)
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Delete this teacher?")) return;

    try {
      await axios.delete(`${API_URL}/api/teachers/${id}`);

      // instant UI update
      setTeachers((prev) => prev.filter((t) => t._id !== id));

      alert("Deleted successfully");
    } catch (error) {
      console.log(error);
      alert("Error deleting");
    }
  }, []);

  // ✅ edit optimized
  const handleEdit = useCallback((teacher) => {
  navigate(`/institution/edit-teacher/${teacher._id}`, {
    state: teacher
  });
}, [navigate]);

  // ✅ heavy render optimization
  const teacherList = useMemo(() => {
    return teachers.map((teacher) => (
      <div
        key={teacher._id}
        className="bg-white p-4 rounded-xl shadow border"
      >
        <h2 className="text-lg font-bold text-[#1fa2a6]">
          {teacher.teacherName}
        </h2>

        <p>
          <strong>Email:</strong> {teacher.email}
        </p>
        <p>
          <strong>Mobile:</strong> {teacher.mobile}
        </p>

        {/* <p>
          <strong>Subjects:</strong>{" "}
          {teacher.subjects?.join(", ")}
        </p> */}

        <p>
          <strong>Gender:</strong> {teacher.gender}
        </p>

        <div className="flex justify-between items-center mt-4 border-t pt-3">
          <button
            onClick={() => handleEdit(teacher)}   // ✅ pura object bhej
            className="bg-[#1fa2a6] text-white px-4 py-1.5 rounded-md text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => handleDelete(teacher._id)}   // ✅ delete fix
            className="bg-red-400 text-white px-4 py-1.5 rounded-md text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [teachers, handleDelete, handleEdit]);

  return (
    <InstitutionLayout title="View Teachers">
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4 text-[#1fa2a6]">
          Teachers List
        </h1>

        <div className="grid md:grid-cols-2 gap-4">
          {teacherList}
        </div>
      </div>
    </InstitutionLayout>
  );
}