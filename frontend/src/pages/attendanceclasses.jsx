import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AttendanceClasses() {

  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();
  const institutionCode = localStorage.getItem("institutionCode");

  useEffect(() => {
    if (!institutionCode) return;
    const fetchClasses = async () => {
      const res = await axios.get(
        `http://localhost:5000/api/classes/institution-classes?institutionCode=${institutionCode}`
      );
      setClasses(res.data?.data || []);
    };

    fetchClasses();
  }, [institutionCode]);

  const handleClick = (cls) => {
    navigate("/institution/attendance/students", { state: cls });
  };

  return (
    <InstitutionLayout>
      <div className="p-4">

        <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
          Attendance
        </h1>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">

          {classes.map((cls) => (
            <div key={cls._id} className="bg-white p-5 rounded shadow border">

              <h2 className="text-center font-bold">
                Class {cls.className}
              </h2>

              <p className="text-center mb-3">
                Section {cls.section}
              </p>

              <button
                onClick={() => handleClick(cls)}
                className="w-full bg-[#1fa2a6] text-white py-2 rounded"
              >
                View Attendance
              </button>

            </div>
          ))}

        </div>

      </div>
    </InstitutionLayout>
  );
}