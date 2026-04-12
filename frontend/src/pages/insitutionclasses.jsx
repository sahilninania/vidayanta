import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function InstitutionClasses() {

  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  const institutionCode = localStorage.getItem("institutionCode");

  useEffect(() => {
    const fetchClasses = async () => {
      const res = await axios.get(
        `${API_URL}/api/classes/institution-classes?institutionCode=${institutionCode}`
      );

      setClasses(res.data.data);
    };

    fetchClasses();
  }, []);

  const handleViewStudents = (cls) => {
    navigate("/institution/students", {
      state: cls
    });
  };

  return (
    <InstitutionLayout>
      <div className="p-4">

        <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
          Classes
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {classes.map((cls, i) => (
            <div key={i} className="bg-white p-5 rounded shadow border">

              <h2 className="text-center font-bold">
                Class {cls.className}
              </h2>

              <p className="text-center mb-3">
                Section {cls.section}
              </p>

              <button
                onClick={() => handleViewStudents(cls)}
                className="w-full bg-[#1fa2a6] text-white py-2 rounded"
              >
                View Students
              </button>

            </div>
          ))}

        </div>

      </div>
    </InstitutionLayout>
  );
}