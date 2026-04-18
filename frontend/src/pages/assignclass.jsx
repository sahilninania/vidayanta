import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignClass() {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();
  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH CLASSES
  const fetchClasses = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/classes/by-institution`,
        { institutionCode }
      );

      console.log("Classes:", res.data); // debug

      setClasses(res.data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // ✅ LOAD DATA
  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchClasses();
      setLoading(false);
    };

    load();
  }, []);

  // ✅ CLICK HANDLER
  const handleClick = (cls) => {
    navigate(`/institution/assign/${cls._id}`);
  };

  return (
    <InstitutionLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6 text-[#1fa2a6]">
          Assign Teachers to Classes
        </h1>

        {loading ? (
          <p>Loading classes...</p>
        ) : classes.length === 0 ? (
          <p className="text-gray-500">No classes found</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {classes.map((cls) => (
              <div
                key={cls._id}
                className="p-4 border rounded shadow hover:shadow-lg transition cursor-pointer"
                onClick={() => handleClick(cls)}
              >
                <h2 className="text-lg font-bold">
                  Class {cls.className}
                </h2>

                <p className="text-gray-600">
                  Section: {cls.section}
                </p>

                <button
                  className="mt-3 px-3 py-1 bg-[#1fa2a6] text-white rounded"
                >
                  Assign Teacher
                </button>
              </div>
            ))}

          </div>
        )}
      </div>
    </InstitutionLayout>
  );
}