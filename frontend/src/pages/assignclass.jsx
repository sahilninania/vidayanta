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

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.post(
          `${API_URL}/api/classes/by-institution`,
          { institutionCode }
        );

        setClasses(res.data.classes || []);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchClasses();
  }, []);

  return (
    <InstitutionLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-4 text-[#1fa2a6]">
          Assign Teachers to Classes
        </h1>

        {/* 🔥 Instead of Loading */}
        {loading ? (
          <div className="text-center text-gray-500 mt-10">
            <p className="text-lg">Please wait...</p>
          </div>
        ) : classes.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            <p>No classes available</p>
          </div>
        ) : (
          <>
            {/* 🔥 Selection Text */}
           
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">

              {classes.map((cls) => (
                <div
                  key={cls._id}
                  className="p-4 border rounded shadow hover:shadow-lg cursor-pointer transition"
                  onClick={() =>
                    navigate(`/institution/assign/${cls._id}`)
                  }
                >
                  <h2 className="font-bold text-lg">
                    Class {cls.className}
                  </h2>

                  <p className="text-gray-600">
                    Section: {cls.section}
                  </p>

                  <button className="mt-3 bg-[#1fa2a6] text-white px-3 py-1 rounded">
                    Select
                  </button>
                </div>
              ))}

            </div>
          </>
        )}

      </div>
    </InstitutionLayout>
  );
}