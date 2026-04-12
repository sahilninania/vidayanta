import { useEffect, useState } from "react";
//import API from "../config/api";
import TeacherLayout from "../layout/teacherdashboardlayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function MyClass() {
  const [students, setStudents] = useState([]);
  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const teacherId = localStorage.getItem("teacherId");
    const institutionCode = localStorage.getItem("institutionCode");

    if (!teacherId || !institutionCode) {
      console.log("❌ Missing teacherId or institutionCode");
      return;
    }

    const fetchData = async () => {
      try {
        // ✅ GET CLASS
        const classRes = await axios.post("http://localhost:5000/api/classes/get-my-class", {
          teacherId,
          institutionCode,
        });

        const cls = classRes.data.data || classRes.data;

        if (!cls?.className) {
          console.log("❌ No class found");
          return;
        }

        setClassName(cls.className);
        setSection(cls.section);

        // ✅ GET STUDENTS
        const res = await axios.get(
          `http://localhost:5000/api/student/class/${cls.className}/${cls.section}?institutionCode=${institutionCode}`
        );

        setStudents(res.data.data || []);
      } catch (error) {
        console.error("❌ Error 👉", error);
      }
    };

    fetchData();
  }, []);

  // 🔥 DELETE STUDENT
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this student?")) return;

    try {
      await axios.delete(`http://localhost:5000/api/student/${id}`);

      // remove instantly
      setStudents((prev) => prev.filter((stu) => stu._id !== id));
    } catch (error) {
      console.error("Delete error 👉", error);
    }
  };

  return (
    <TeacherLayout title="My Class">
      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        {/* HEADER */}
        <div className="bg-white p-5 rounded-2xl shadow mb-6">
          <h1 className="text-xl md:text-2xl font-bold text-[#1fa2a6]">
            Class {className || "--"} - {section || "--"}
          </h1>

          <p className="text-gray-500 text-sm mt-1">
            Total Students: {students.length}
          </p>
        </div>

        {/* EMPTY STATE */}
        {students.length === 0 ? (
          <div className="text-center text-gray-400 mt-10">
            🚫 No students found
          </div>
        ) : (

          /* CARDS */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">

            {students.map((stu) => (
              <div
                key={stu._id}
                className="bg-white p-5 rounded-xl shadow-md hover:shadow-xl transition border-[#1fa2a6] hover:-translate-y-1"
              >

                {/* NAME */}
                <h2 className="text-lg font-semibold text-[#1fa2a6]">
                  {stu.name}
                </h2>

                {/* DETAILS */}
                <div className="text-sm text-black mt-2 space-y-1">
                  <p><b>Roll:</b> {stu.rollNumber}</p>
                  <p><b>Email:</b> {stu.email}</p>
                  <p><b>Mobile:</b> {stu.mobile}</p>
                </div>

                {/* BUTTONS */}
                <div className="flex gap-2 mt-4">

                  {/* EDIT */}
                  <button
                    onClick={() =>
                      navigate(`/teacher/edit-student/${stu._id}`, {
                        state: stu,
                      })
                    }
                    className="flex-1 bg-blue-500 text-white py-1 rounded-lg text-sm hover:bg-blue-300"
                  >
                    Edit
                  </button>

                  {/* DELETE */}
                  <button
                    onClick={() => handleDelete(stu._id)}
                    className="flex-1 bg-red-500 text-white py-1 rounded-lg text-sm hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </TeacherLayout>
  );
}