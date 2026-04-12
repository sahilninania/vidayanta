import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // ✅ correct import
//import API from "../config/api";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function ViewHomeworkTeacher() {

  const [homework, setHomework] = useState([]);
  const navigate = useNavigate(); // ✅ yahan use karo

  // ✅ FETCH
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId");

        const res = await axios.get(
          `http://localhost:5000/api/homework/my?teacherId=${teacherId}`
        );

        setHomework(res.data.data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchHomework();
  }, []);

  // ✅ DELETE
  const handleDelete = async (id) => {
    if (!confirm("Delete this homework?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/homework/delete/${id}`
      );

      setHomework(prev => prev.filter(hw => hw._id !== id));

      alert("Deleted ✅");

    } catch (error) {
      console.log(error);
      alert("Error deleting");
    }
  };

  return (
    <TeacherLayout title="My Homework">

      <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

        <h1 className="text-2xl md:text-3xl font-bold text-[#1fa2a6] mb-6">
          📚 My Homework
        </h1>

        {/* EMPTY STATE */}
        {homework.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No homework found 😕
          </p>
        )}

        {/* CARDS */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

          {homework.map((hw) => (
            <div
              key={hw._id}
              className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition"
            >

              <h2 className="font-bold text-lg text-[#1fa2a6] mb-2">
                Class {hw.className} - {hw.section}
              </h2>

              <p className="text-sm text-gray-500">Subject</p>
              <p className="font-semibold mb-2">{hw.subject}</p>

              <p className="text-sm text-gray-500">Homework</p>
              <p className="mb-4">{hw.description}</p>

              <div className="flex gap-2">

                <button
                  onClick={() => navigate("/teacher/homework/edit", { state: hw })}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
                >
                   Edit
                </button>

                <button
                  onClick={() => handleDelete(hw._id)}
                  className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
                >
                  Delete
                </button>

              </div>

            </div>
          ))}

        </div>

      </div>

    </TeacherLayout>
  );
}

