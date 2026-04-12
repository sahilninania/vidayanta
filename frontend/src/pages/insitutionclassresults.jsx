import axios from "axios";
import { useEffect, useState } from "react";
// import API from "../config/api";
import { useParams } from "react-router-dom";


export default function ClassResults() {
  const { id } = useParams();
  const [students, setStudents] = useState([]);
  const [examType, setExamType] = useState("classTest");

  const fetchResults = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/students/results/${id}?examType=${examType}`
      );

      setStudents(res.data.data);
    } catch (err) {
      console.error("Fetch Error:", err);
    }
  };

  useEffect(() => {
    // ✅ FIX: async wrapper
    const loadData = async () => {
      await fetchResults();
    };

    loadData();
  }, [id, examType]);

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-4">Results</h2>

      {/* SELECT BOX */}
      <select
        value={examType}
        onChange={(e) => setExamType(e.target.value)}
        className="mb-4 border p-2"
      >
        <option value="classTest">Class Test</option>
        <option value="unitTest">Unit Test</option>
        <option value="semester">Semester</option>
      </select>

      {/* STUDENT CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {students.length === 0 ? (
          <p>No students found</p>
        ) : (
          students.map((stu) => (
            <div key={stu._id} className="bg-white p-5 rounded-xl shadow">

              <h3 className="font-semibold">
                {stu.userId?.name}
              </h3>

              <p>Roll: {stu.rollNumber}</p>

              {/* RESULTS */}
              <div className="mt-3">
                <strong>Subjects:</strong>

                {stu.results?.length > 0 ? (
                  stu.results.map((r, i) => (
                    <div key={i}>
                      {r.subject} → {r.marks}
                    </div>
                  ))
                ) : (
                  <p className="text-gray-400">No results</p>
                )}
              </div>

            </div>
          ))
        )}

      </div>
    </div>
  );
}