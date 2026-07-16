import { useEffect, useState, useMemo } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

export default function StudentHomework() {
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);

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

        setData(res?.data?.data || {});
      } catch (error) {
        console.log("Homework Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHomework();
  }, [studentId]);

  return (
    <StudentLayout title="Homework">
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">

        {/* Header */}
        <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-3xl p-6 text-white shadow-lg mb-8">
          <div className="flex justify-between items-center flex-wrap gap-4">

            <div>
              <h1 className="text-3xl font-bold">📚 Homework</h1>
              <p className="mt-2 text-cyan-100">
                View all homework assigned by your teachers.
              </p>
            </div>

            <div className="bg-white/20 rounded-2xl px-6 py-4 text-center">
              <p className="text-sm">Homework Days</p>
              <h2 className="text-3xl font-bold">
                {Object.keys(data).length}
              </h2>
            </div>

          </div>
        </div>

        {/* Loading */}
        {loading && (
          <div className="flex justify-center py-20">
            <div className="h-14 w-14 rounded-full border-4 border-cyan-500 border-t-transparent animate-spin"></div>
          </div>
        )}

        {/* Empty */}
        {!loading && Object.keys(data).length === 0 && (
          <div className="bg-white rounded-3xl shadow-lg p-12 text-center">
            <div className="text-6xl">📭</div>

            <h2 className="text-2xl font-bold text-gray-700 mt-4">
              No Homework Found
            </h2>

            <p className="text-gray-500 mt-2">
              Your teachers haven't assigned any homework yet.
            </p>
          </div>
        )}

        {/* Homework by Date */}
        {!loading &&
          Object.entries(data).map(([date, items]) => (
            <div
              key={date}
              className="bg-white rounded-3xl shadow-lg overflow-hidden mb-8 border border-gray-200"
            >
              {/* Date Header */}
              <div className="bg-gradient-to-r from-cyan-500 to-teal-500 px-6 py-5 text-white">

                <div className="flex justify-between items-center flex-wrap gap-4">

                  <div>
                    <h2 className="text-2xl font-bold">
                      {new Date(date).toLocaleDateString("en-IN", {
                        weekday: "long",
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                      })}
                    </h2>

                    <p className="text-cyan-100 mt-1">
                      {items.length} Homework
                      {items.length > 1 ? "s" : ""}
                    </p>
                  </div>

                  <div className="text-5xl">
                    📅
                  </div>

                </div>

              </div>

              {/* Desktop Table */}
              <div className="hidden md:block overflow-x-auto">
                <table className="w-full">

                  <thead className="bg-gray-100">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold text-gray-700 w-1/4">
                        Subject
                      </th>

                      <th className="px-6 py-4 text-left font-semibold text-gray-700">
                        Homework
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {items.map((hw, index) => (
                      <tr
                        key={hw._id || index}
                        className="border-t hover:bg-cyan-50 transition"
                      >
                        <td className="px-6 py-5">
                          <span className="inline-block bg-cyan-100 text-cyan-700 font-semibold px-4 py-2 rounded-full">
                            {hw.subject}
                          </span>
                        </td>

                        <td className="px-6 py-5 text-gray-700 whitespace-pre-line leading-7">
                          {hw.description}
                        </td>
                      </tr>
                    ))}
                  </tbody>

                </table>
              </div>

              {/* Mobile Cards */}
              <div className="md:hidden p-4 space-y-4">

                {items.map((hw, index) => (
                  <div
                    key={hw._id || index}
                    className="border rounded-2xl p-4 bg-gray-50"
                  >
                    <div className="inline-block bg-cyan-100 text-cyan-700 px-3 py-1 rounded-full font-semibold text-sm">
                      {hw.subject}
                    </div>

                    <p className="mt-3 text-gray-700 whitespace-pre-line leading-7">
                      {hw.description}
                    </p>
                  </div>
                ))}

              </div>

            </div>
          ))}

      </div>
    </StudentLayout>
  );
}