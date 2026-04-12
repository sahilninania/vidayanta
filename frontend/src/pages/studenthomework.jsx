import { useEffect, useState, useMemo } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";
export default function StudentHomework() {

  // ✅ STATE (object because backend grouped data bhej raha hai)
  const [data, setData] = useState({});

  const studentId = useMemo(() => {
    return localStorage.getItem("studentId");
  }, []);

  useEffect(() => {
    const fetchHomework = async () => {
      try {
        if (!studentId) return;

        const res = await axios.get(
          `${API_URL}/api/homework/student?studentId=${studentId}`
        );

        // ✅ direct set (no array check)
        setData(res?.data?.data || {});

      } catch (error) {
        console.log("Homework Error:", error);
      }
    };

    fetchHomework();
  }, [studentId]);

  return (
    <StudentLayout>
      <div className="p-4">

        {/* 🔥 TITLE */}
        <h1 className="text-2xl font-bold text-[#1fa2a6] mb-6">
          Homework
        </h1>

        {/* ❌ NO DATA */}
        {Object.keys(data).length === 0 ? (
          <p className="text-gray-500">No Homework</p>
        ) : (

          // ✅ DIRECT OBJECT RENDER (NO GROUPING AGAIN)
          Object.entries(data).map(([date, items]) => (

            <div key={date} className="mb-6">

              {/* 📅 DATE */}
              <h2 className="text-lg font-semibold mb-2 text-gray-700">
                {date}
              </h2>

              {/* 📦 TABLE */}
              <div className="bg-white shadow-2 rounded border overflow-x-auto">

                <table className="w-full text-m text-start table-fixed">
                  <thead className="bg-gray-200 ">
                    <tr>
                      <th className="p-2  text-start border w-2/6">Subject</th>
                      <th className="p-2  text-start border w-4/6">Homework</th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((hw, i) => (
                      <tr key={i} className="border-t">
                        <td className="p-2 border">{hw.subject}</td>
                        <td className="p-2 border">{hw.description}</td>
                      </tr>
                    ))}
                  </tbody>

                </table>

              </div>

            </div>
          ))
        )}

      </div>
    </StudentLayout>
  );
}