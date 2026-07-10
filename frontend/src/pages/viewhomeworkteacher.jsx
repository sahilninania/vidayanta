// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom"; // ✅ correct import
// import API_URL from "../config/api.js";
// import TeacherLayout from "../layout/teacherdashboardlayout";
// import axios from "axios";

// export default function ViewHomeworkTeacher() {

//   const [homework, setHomework] = useState([]);
//   const navigate = useNavigate(); // ✅ yahan use karo

//   // ✅ FETCH
//   useEffect(() => {
//     const fetchHomework = async () => {
//       try {
//         const teacherId = localStorage.getItem("teacherId");

//         const res = await axios.get(
//           `${API_URL}/api/homework/my?teacherId=${teacherId}`
//         );

//         setHomework(res.data.data);

//       } catch (error) {
//         console.log(error);
//       }
//     };

//     fetchHomework();
//   }, []);

//   // ✅ DELETE
//   const handleDelete = async (id) => {
//     if (!confirm("Delete this homework?")) return;

//     try {
//       await axios.delete(
//         `${API_URL}/api/homework/delete/${id}`
//       );

//       setHomework(prev => prev.filter(hw => hw._id !== id));

//       alert("Deleted ✅");

//     } catch (error) {
//       console.log(error);
//       alert("Error deleting");
//     }
//   };

//   return (
//     <TeacherLayout title="My Homework">

//       <div className="p-4 md:p-6 bg-gray-100 min-h-screen">

//         <h1 className="text-2xl md:text-3xl font-bold text-[#1fa2a6] mb-6">
//           📚 My Homework
//         </h1>

//         {/* EMPTY STATE */}
//         {homework.length === 0 && (
//           <p className="text-center text-gray-500 mt-10">
//             No homework found 😕
//           </p>
//         )}

//         {/* CARDS */}
//         <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">

//           {homework.map((hw) => (
//             <div
//               key={hw._id}
//               className="bg-white p-5 rounded-2xl shadow-md border hover:shadow-xl transition"
//             >

//               <h2 className="font-bold text-lg text-[#1fa2a6] mb-2">
//                 Class {hw.className} - {hw.section}
//               </h2>

//               <p className="text-sm text-gray-500">Subject</p>
//               <p className="font-semibold mb-2">{hw.subject}</p>

//               <p className="text-sm text-gray-500 whitespace-pre-line">Homework</p>
//               <p className="mb-4 whitespace-pre-line">{hw.description}</p>

//               <div className="flex gap-2">

//                 <button
//                   onClick={() => navigate("/teacher/homework/edit", { state: hw })}
//                   className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg text-sm"
//                 >
//                    Edit
//                 </button>

//                 <button
//                   onClick={() => handleDelete(hw._id)}
//                   className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg text-sm"
//                 >
//                   Delete
//                 </button>

//               </div>

//             </div>
//           ))}

//         </div>

//       </div>

//     </TeacherLayout>
//   );
// }

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function ViewHomeworkTeacher() {
  const [homework, setHomework] = useState([]);
  const navigate = useNavigate();

  // ✅ Format Date
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // ✅ Fetch Homework
  useEffect(() => {
    const fetchHomework = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId");

        const res = await axios.get(
          `${API_URL}/api/homework/my?teacherId=${teacherId}`
        );

        setHomework(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchHomework();
  }, []);

  // ✅ Delete Homework
  const handleDelete = async (id) => {
    if (!window.confirm("Delete this homework?")) return;

    try {
      await axios.delete(`${API_URL}/api/homework/delete/${id}`);

      setHomework((prev) => prev.filter((hw) => hw._id !== id));

      alert("Homework deleted successfully ✅");
    } catch (error) {
      console.log(error);
      alert("Error deleting homework");
    }
  };

  return (
    <TeacherLayout title="My Homework">
      <div className="min-h-screen bg-gray-100 p-4 md:p-6">
        <h1 className="text-3xl font-bold text-[#1fa2a6] mb-6">
          📚 My Homework
        </h1>

        {/* Empty State */}
        {homework.length === 0 && (
          <div className="text-center mt-16">
            <p className="text-gray-500 text-lg">
              No homework found 😕
            </p>
          </div>
        )}

        {/* Homework Cards */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {homework.map((hw) => (
            <div
              key={hw._id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border overflow-hidden"
            >
              {/* Header */}
              <div className="bg-[#1fa2a6] text-white px-5 py-4">
                <h2 className="text-lg font-bold">
                  Class {hw.className} - {hw.section}
                </h2>

                <p className="text-sm opacity-90 mt-1">
                  📅 {formatDate(hw.createdAt)}
                </p>
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-gray-500 text-sm mb-1">Subject</p>
                <p className="font-semibold text-gray-800 mb-4">
                  {hw.subject}
                </p>

                <p className="text-gray-500 text-sm mb-1">Homework</p>

                <p className="text-gray-700 whitespace-pre-line mb-6">
                  {hw.description}
                </p>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() =>
                      navigate("/teacher/homework/edit", {
                        state: hw,
                      })
                    }
                    className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    ✏ Edit
                  </button>

                  <button
                    onClick={() => handleDelete(hw._id)}
                    className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition"
                  >
                    🗑 Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </TeacherLayout>
  );
}