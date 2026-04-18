import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function AssignedTeachers() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ FETCH ASSIGNMENTS
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/assignments?institutionCode=${institutionCode}`
      );

      console.log("Assignments:", res.data);

      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      await fetchAssignments();
      setLoading(false);
    };

    load();
  }, []);

  // ✅ GROUP BY CLASS
  const grouped = assignments.reduce((acc, item) => {
    const classKey = item.classId?._id;

    if (!acc[classKey]) {
      acc[classKey] = {
        className: item.classId?.className,
        section: item.classId?.section,
        subjects: []
      };
    }

    acc[classKey].subjects.push({
      subject: item.subject,
      teacher: item.teacherId?.teacherName
    });

    return acc;
  }, {});

  return (
    <InstitutionLayout>
      <div className="p-6">

        <h1 className="text-3xl font-bold mb-6 text-[#1fa2a6]">
          Assigned Teachers
        </h1>

        {loading ? (
          <p>Loading...</p>
        ) : Object.keys(grouped).length === 0 ? (
          <p className="text-gray-500">No assignments found</p>
        ) : (
          <div className="grid md:grid-cols-2 gap-4">

            {Object.values(grouped).map((cls, index) => (
              <div key={index} className="p-4 border rounded shadow">

                <h2 className="text-lg font-bold mb-2">
                  Class {cls.className} - {cls.section}
                </h2>

                {cls.subjects.map((s, i) => (
                  <div key={i} className="flex justify-between py-1">
                    <span>{s.subject}</span>
                    <span className="font-medium text-gray-700">
                      {s.teacher}
                    </span>
                  </div>
                ))}

              </div>
            ))}

          </div>
        )}
      </div>
    </InstitutionLayout>
  );
}