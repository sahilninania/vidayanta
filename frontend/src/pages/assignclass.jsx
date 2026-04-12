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
      setClasses(res.data.classes);
    } catch (error) {
      console.error("Error fetching classes:", error);
    } finally {
      setLoading(false);
    }
    };
    if (institutionCode){
    fetchClasses();
    }
  }, [institutionCode]);

  return (
    <InstitutionLayout>
      <h1 className="text-3xl font-bold m-6  text-[#1fa2a6]">Assign Teachers</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {classes.map((cls) => (
          <div key={cls._id} className="p-4 border rounded shadow">
            <h2 className="font-bold text-lg">
              Class {cls.className} - {cls.section}
            </h2>

            <button
              className="mt-3 bg-[#1fa2a6] text-white px-3 py-1 rounded"
              onClick={() =>
                navigate(`/institution/assign/${cls._id}`)
              }
            >
              Assign Teacher
            </button>
          </div>
        ))}
      </div>
    </InstitutionLayout>
  );
}