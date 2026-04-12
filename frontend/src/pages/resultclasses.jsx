import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function ResultClasses() {
  const [classes, setClasses] = useState([]);

  const navigate = useNavigate();
  const institutionCode = localStorage.getItem("institutionCode");

  useEffect(() => {
    if (!institutionCode) return;

    const fetchClasses = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/api/classes/institution-classes?institutionCode=${institutionCode}`
        );

        setClasses(res.data.data || []);
      } catch (err) {
        console.error(err);
      }
    };

    fetchClasses();
  }, [institutionCode]);

  return (
    <InstitutionLayout title="Results">
      <div className="p-4">

        <h1 className="text-2xl font-bold text-[#1fa2a6] mb-6">
          Results
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {classes.length === 0 ? (
            <p className="col-span-full text-center text-gray-500">
              No classes found
            </p>
          ) : (
            classes.map((cls, i) => (
              <div
                key={cls._id || i}
                className="bg-white p-5 rounded shadow border hover:shadow-lg transition"
              >

                <h2 className="text-center font-bold">
                  Class {cls.className}
                </h2>

                <p className="text-center mb-3">
                  Section {cls.section}
                </p>

                <button
                  onClick={() =>
                    navigate("/institution/results/students", { state: cls })
                  }
                  className="w-full bg-[#1fa2a6] text-white py-2 rounded hover:bg-[#178b8e] transition"
                >
                  View Results
                </button>

              </div>
            ))
          )}

        </div>

      </div>
    </InstitutionLayout>
  );
}