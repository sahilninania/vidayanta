import { useEffect, useState, useCallback, useMemo } from "react";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";
export default function UploadResult() {
  const [data, setData] = useState([]);

  const [form, setForm] = useState({
    className: "",
    section: "",
    subject: "",
    testType: "",
    maxMarks: ""
  });

  const [students, setStudents] = useState([]);
  const [marks, setMarks] = useState({});
  const [loading, setLoading] = useState(false);

  // 🔥 FETCH CLASSES
  useEffect(() => {
    const fetchData = async () => {
      const teacherId = localStorage.getItem("teacherId");

      const res = await axios.post(
        `${API_URL}/api/classes/teacher-classes`,
        { teacherId }
      );

      setData(res.data.data);
    };

    fetchData();
  }, []);

  // 🔥 CLASS CHANGE
  const handleClassChange = (value) => {
    setForm((prev) => ({
      ...prev,
      className: value,
      section: "",
      subject: ""
    }));
  };

  // 🔥 FILTER DATA
  const filteredData = useMemo(() => {
    return data.filter(
      (d) =>
        d.className === form.className &&
        (!form.section || d.section === form.section)
    );
  }, [data, form.className, form.section]);

  // 🔥 SECTIONS
  const sections = useMemo(() => {
    return [...new Set(filteredData.map((d) => d.section))];
  }, [filteredData]);

  // 🔥 SUBJECTS
  const subjects = useMemo(() => {
    return filteredData.flatMap((d) => d.subjects || []);
  }, [filteredData]);

  // 🔥 FETCH STUDENTS
  const fetchStudents = useCallback(async (section) => {
    try {
      const res = await axios.post(
        `${API_URL}/api/student/by-class-section`,
        {
          teacherId: localStorage.getItem("teacherId"),
          institutionCode: localStorage.getItem("institutionCode"),
          className: form.className,
          section
        }
      );

      const sorted = res.data.students.sort(
        (a, b) => a.rollNumber - b.rollNumber
      );

      setStudents(sorted);

      const defaultMarks = {};
      sorted.forEach((stu) => {
        defaultMarks[stu._id] = {
          marks: "",
          status: "present"
        };
      });

      setMarks(defaultMarks);
    } catch (err) {
      console.log(err);
    }
  }, [form.className]);

  // 🔥 SECTION CHANGE
  const handleSectionChange = (value) => {
    setForm((prev) => ({
      ...prev,
      section: value,
      subject: ""
    }));

    fetchStudents(value);
  };

  // 🔥 MARK CHANGE
  const handleMarkChange = (id, value) => {
    setMarks((prev) => ({
      ...prev,
      [id]: { ...prev[id], marks: value }
    }));
  };

  // 🔥 STATUS CHANGE
  const handleStatus = (id, status) => {
    setMarks((prev) => ({
      ...prev,
      [id]: {
        status,
        marks: status === "absent" ? 0 : prev[id]?.marks || ""
      }
    }));
  };

  // 🔥 SUBMIT
  const handleSubmit = async () => {
    if (
      !form.className ||
      !form.section ||
      !form.subject ||
      !form.testType ||
      !form.maxMarks
    ) {
      alert("Please fill all fields");
      return;
    }

    const resultData = Object.keys(marks).map((id) => ({
      studentId: id,
      obtainedMarks:
        marks[id].status === "absent"
          ? 0
          : Number(marks[id].marks || 0),
      status: marks[id].status === "absent" ? "absent" : "present", 
      rank:null
    }));

    try {
      setLoading(true);

      await axios.post(`${API_URL}/api/result/create`, {
        teacherId: localStorage.getItem("teacherId"),
        institutionCode: localStorage.getItem("institutionCode"),
        ...form,
        maxMarks: Number(form.maxMarks),
        results: resultData
      });
      console.log("🔥 FINAL DATA:", {
          teacherId: localStorage.getItem("teacherId"),
          institutionCode: localStorage.getItem("institutionCode"),
          ...form,
          maxMarks: Number(form.maxMarks),
          results: resultData
        });

      alert("Result Uploaded 🚀");
    } catch (err) {
      console.log("🔥 FULL ERROR:", err);
      console.log("🔥 BACKEND DATA:", err.response?.data);
      console.log("🔥 MESSAGE:", err.response?.data?.message);
      alert(err.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <TeacherLayout title="Upload Result">
      <div className="min-h-screen bg-gray-100 p-6">

        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl p-6">

          <h1 className="text-2xl font-bold text-[#1fa2a6] mb-4">
            Upload Result
          </h1>

          {/* FORM */}
          <div className="grid grid-cols-2 gap-4 mb-6">

            <select
              className="border p-2 rounded"
              onChange={(e) => handleClassChange(e.target.value)}
            >
              <option>Select Class</option>
              {[...new Set(data.map((d) => d.className))].map((cls, i) => (
                <option key={i}>{cls}</option>
              ))}
            </select>

            {sections.length > 0 && (
              <select
                className="border p-2 rounded"
                onChange={(e) => handleSectionChange(e.target.value)}
              >
                <option>Select Section</option>
                {sections.map((sec, i) => (
                  <option key={i}>{sec}</option>
                ))}
              </select>
            )}

            {subjects.length > 0 && (
              <select
                className="border p-2 rounded"
                onChange={(e) =>
                  setForm((prev) => ({ ...prev, subject: e.target.value }))
                }
              >
                <option>Select Subject</option>
                {subjects.map((sub, i) => (
                  <option key={i}>{sub}</option>
                ))}
              </select>
            )}

            <select
              className="border p-2 rounded"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, testType: e.target.value }))
              }
            >
              <option>Select Test Type</option>
              <option value="class test">Class Test</option>
              <option value="unit test">Unit Test</option>
              <option value="semester">Semester</option>
              <option value="final">Final</option>
            </select>

            <input
              type="number"
              placeholder="Max Marks"
              className="border p-2 rounded col-span-2"
              onChange={(e) =>
                setForm((prev) => ({ ...prev, maxMarks: e.target.value }))
              }
            />

          </div>

          {/* STUDENTS */}
          <div className="max-h-[400px] overflow-y-auto space-y-2">

            {students.map((stu, i) => (
              <div
                key={stu._id}
                className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
              >
                <span className="font-medium">
                  {i + 1}. {stu.name}
                </span>

                <div className="flex items-center gap-2">

                  <input
                    type="number"
                    placeholder="Marks"
                    className="border px-2 py-1 w-20 rounded"
                    value={marks[stu._id]?.marks || ""}
                    disabled={marks[stu._id]?.status === "absent"}
                    onChange={(e) =>
                      handleMarkChange(stu._id, e.target.value)
                    }
                  />

                  <button
                    onClick={() => handleStatus(stu._id, "present")}
                    className={`px-2 py-1 rounded ${
                      marks[stu._id]?.status === "present"
                        ? "bg-green-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    P
                  </button>

                  <button
                    onClick={() => handleStatus(stu._id, "absent")}
                    className={`px-2 py-1 rounded ${
                      marks[stu._id]?.status === "absent"
                        ? "bg-red-500 text-white"
                        : "bg-gray-200"
                    }`}
                  >
                    A
                  </button>

                </div>
              </div>
            ))}

          </div>

          {/* SUBMIT */}
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="w-full mt-6 bg-[#1fa2a6] hover:bg-[#178b8f] text-white py-3 rounded-lg font-semibold"
          >
            {loading ? "Uploading..." : "Upload Result"}
          </button>

        </div>
      </div>
    </TeacherLayout>
  );
}