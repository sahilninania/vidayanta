import { useEffect, useState, useMemo } from "react";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";

// ✅ TABLE COMPONENT (NO "NO DATA" INSIDE)
const Table = ({ list, title }) => (
  <div className="mb-8">
    <h2 className="text-xl font-bold mb-3 text-[#1fa2a6]">{title}</h2>

    <div className="bg-white shadow rounded border overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-2 border">Subject</th>
            <th className="p-2 border">Marks</th>
            <th className="p-2 border">Position</th>
            <th className="p-2 border">Date</th>
          </tr>
        </thead>

        <tbody>
          {list.map((item, index) => (
            <tr key={index} className="text-center border-t">
              <td className="p-2">{item.subject}</td>

              <td className="p-2 font-semibold">
                {item.marks} / {item.maxMarks}
              </td>

              <td className="p-2 font-bold text-blue-600">
                {item.rank}
              </td>

              <td className="p-2">
                {new Date(item.date).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

// ✅ MAIN COMPONENT
export default function StudentResult() {
  const [data, setData] = useState([]);

  const studentId = useMemo(() => {
    return localStorage.getItem("studentId");
  }, []);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        if (!studentId) return;

        const res = await axios.get(
          `http://localhost:5000/api/result/student?studentId=${studentId}`
        );

        setData(res?.data?.data || []);
      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();
  }, [studentId]);

  // ✅ PROCESS DATA
  const processedData = useMemo(() => {
    return data.map(item => {
      const student = item.results?.find(
        r => String(r.studentId?._id) === String(studentId)
      );

      return {
        ...item,
        marks: student?.obtainedMarks ?? "-",
        rank: student?.rank ?? "-"
      };
    });
  }, [data, studentId]);

  // ✅ FILTERS
  const classTests = useMemo(
    () => processedData.filter(d => d.testType === "class test"),
    [processedData]
  );

  const unitTests = useMemo(
    () => processedData.filter(d => d.testType === "unit test"),
    [processedData]
  );

  const semesterTests = useMemo(
    () => processedData.filter(d => d.testType === "semester"),
    [processedData]
  );

  const finalTests = useMemo(
    () => processedData.filter(d => d.testType === "final"),
    [processedData]
  );

  return (
    <StudentLayout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-[#1fa2a6] mb-6">
          Results
        </h1>

        {/* ✅ SHOW ONLY IF DATA EXISTS */}
        {classTests.length > 0 && (
          <Table list={classTests} title="Class Tests" />
        )}

        {unitTests.length > 0 && (
          <Table list={unitTests} title="Unit Tests" />
        )}

        {semesterTests.length > 0 && (
          <Table list={semesterTests} title="Semester Exams" />
        )}

        {finalTests.length > 0 && (
          <Table list={finalTests} title="Final Exams" />
        )}

        {/* ✅ IF ALL EMPTY */}
        {!classTests.length &&
          !unitTests.length &&
          !semesterTests.length &&
          !finalTests.length && (
            <p className="text-center text-gray-500 mt-10">
              No Results Available
            </p>
          )}
      </div>
    </StudentLayout>
  );
}