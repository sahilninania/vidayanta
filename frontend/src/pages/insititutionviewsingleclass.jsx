import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useParams } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function ViewSingleClass() {

  const { id } = useParams();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchClass = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/classes/${id}`);
        setData(res.data.data || null);
      } catch (err) {
        console.error("Fetch class error 👉", err);
      }
    };

    fetchClass();
  }, [id]);

  return (
    <InstitutionLayout title="Class Details">

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-8">

          {/* HEADER */}
          <div className="border-b pb-4 mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-[#1fa2a6]">
              {data?.className || "Class"} - {data?.section || ""}
            </h1>
          </div>

          {/* EMPTY STATE */}
          {!data ? (
            <p className="text-center text-gray-500">
              No class data found
            </p>
          ) : (
            <>
              {/* INCHARGE */}
              <div className="mb-6">
                <h2 className="text-lg font-semibold text-gray-700 mb-2">
                  👨‍🏫 Class Incharge
                </h2>

                <div className="bg-gray-50 p-4 rounded-xl flex items-center gap-4">

                  <div className="w-12 h-12 rounded-full bg-[#1fa2a6] text-white flex items-center justify-center">
                    {data?.classIncharge?.teacherName?.charAt(0) || "N"}
                  </div>

                  <div>
                    <p className="font-medium text-gray-800">
                      {data?.classIncharge?.teacherName || "Not Assigned"}
                    </p>
                    <p className="text-sm text-gray-500">
                      Class Teacher
                    </p>
                  </div>

                </div>
              </div>

              {/* SUBJECTS */}
              <div>
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                  📚 Subjects
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">

                  {data?.subjectTeachers?.length === 0 ? (
                    <p className="text-gray-500">
                      No subjects assigned
                    </p>
                  ) : (
                    data?.subjectTeachers?.map((s, i) => (
                      <div
                        key={i}
                        className="bg-gray-50 p-4 rounded-xl shadow-sm"
                      >
                        <p className="text-gray-500 text-sm">
                          Subject
                        </p>
                        <h3 className="font-semibold text-gray-800">
                          {s.subject}
                        </h3>

                        <p className="text-gray-500 text-sm mt-2">
                          Teacher
                        </p>
                        <p className="text-[#1fa2a6] font-medium">
                          {s.teacher?.teacherName || "N/A"}
                        </p>
                      </div>
                    ))
                  )}

                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </InstitutionLayout>
  );
}