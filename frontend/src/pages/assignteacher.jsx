// import { useEffect, useState } from "react";
// import API_URL from "../config/api.js";
// import { useParams } from "react-router-dom";
// import InstitutionLayout from "../layout/institutitondashboardlayout";
// import axios from "axios";

// export default function AssignTeacher() {
//   const { id } = useParams();

//   const [teachers, setTeachers] = useState([]);
//   const [subjects, setSubjects] = useState([]);

//   const [form, setForm] = useState({
//     teacherId: "",
//     subject: ""
//   });

//   const institutionCode = localStorage.getItem("institutionCode");

//   // ✅ FETCH TEACHERS
//   useEffect(() => {
//     const fetchTeachers = async () => {
//       try {
//         const res = await axios.get(
//           `${API_URL}/api/teachers/by-institution?institutionCode=${institutionCode}`
//         );

//         setTeachers(res.data.teachers || []);
//       } catch (err) {
//         console.error("Error fetching teachers", err);
//       }
//     };

//     fetchTeachers();
//   }, []);

//   // ✅ TEACHER CHANGE
//   const handleTeacherChange = (e) => {
//     const teacherId = e.target.value;

//     const teacher = teachers.find((t) => t._id === teacherId);

//     setSubjects(teacher?.subjects || []);

//     setForm((prev) => ({
//       ...prev,
//       teacherId,
//       subject: ""
//     }));
//   };

//   // ✅ SUBJECT CHANGE
//   const handleSubjectChange = (e) => {
//     const subject = e.target.value;

//     setForm((prev) => ({
//       ...prev,
//       subject
//     }));
//   };

//   // ✅ SUBMIT
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (!form.teacherId || !form.subject) {
//       alert("Please select teacher and subject");
//       return;
//     }

//     try {
//       await axios.post(`${API_URL}/api/assign`, {
//         classId: id,
//         teacherId: form.teacherId,
//         subject: form.subject,
//         institutionCode
//       });

//       alert("Teacher Assigned ✅");

//       setForm({ teacherId: "", subject: "" });
//       setSubjects([]);

//     } catch (err) {
//       alert(err?.response?.data?.message || "Error assigning");
//     }
//   };

//   return (
//     <InstitutionLayout title="Assign Teacher">
//       <div className="max-w-md mx-auto bg-white shadow rounded p-6">

//         <h1 className="text-xl font-bold mb-4 text-[#1fa2a6]">
//           Assign Teacher
//         </h1>

//         <form onSubmit={handleSubmit} className="space-y-4">

//           {/* ✅ TEACHER */}
//           <label>Teacher</label>
//           <select
//             value={form.teacherId}
//             onChange={handleTeacherChange}
//             className="border p-2 w-full rounded"
//           >
//             <option value="">Select Teacher</option>

//             {teachers.map((t) => (
//               <option key={t._id} value={t._id}>
//                 {t.teacherName}
//               </option>
//             ))}
//           </select>

//           {/* ✅ SUBJECT */}
//           <label>Subject</label>
//           <select
//             value={form.subject}
//             onChange={handleSubjectChange}
//             className="border p-2 w-full rounded"
//             disabled={!subjects.length}
//           >
//             <option value="">Select Subject</option>

//             {subjects.map((sub) => (
//               <option key={sub} value={sub}>
//                 {sub}
//               </option>
//             ))}
//           </select>

//           <button className="bg-[#1fa2a6] text-white px-3 py-2 rounded w-full">
//             Assign Teacher
//           </button>

//         </form>
//       </div>
//     </InstitutionLayout>
//   );
// }
import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function AssignClass() {
  const [classes, setClasses] = useState([]);
  const [assignments, setAssignments] = useState([]); // 🔥 NEW
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const institutionCode = localStorage.getItem("institutionCode");

  // ✅ Fetch Classes
  const fetchClasses = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/api/classes/by-institution`,
        { institutionCode }
      );
      setClasses(res.data.classes || []);
    } catch (error) {
      console.error("Error fetching classes:", error);
    }
  };

  // ✅ Fetch Assignments
  const fetchAssignments = async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/assignments?institutionCode=${institutionCode}`
      );
      setAssignments(res.data.assignments || []);
    } catch (error) {
      console.error("Error fetching assignments:", error);
    }
  };

  // ✅ Load Data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        if (institutionCode) {
          await Promise.all([fetchClasses(), fetchAssignments()]);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [institutionCode]);

  // ✅ Check Assignment
  const isClassAssigned = (classId) => {
    return assignments.some(
      (a) => a.classId?._id === classId
    );
  };

  // ✅ Button Click
  const handleAssignClick = (cls) => {
    if (isClassAssigned(cls._id)) {
      alert("Teacher is already assigned to this class!");
      return;
    }

    navigate(`/institution/assign/${cls._id}`);
  };

  return (
    <InstitutionLayout>
      <h1 className="text-3xl font-bold m-6 text-[#1fa2a6]">
        Assign Teachers
      </h1>

      {loading ? (
        <p className="m-6">Loading classes...</p>
      ) : classes.length === 0 ? (
        <p className="m-6 text-gray-500">No classes found</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6">
          {classes.map((cls) => {
            const assigned = isClassAssigned(cls._id);

            return (
              <div key={cls._id} className="p-4 border rounded shadow">
                <h2 className="font-bold text-lg">
                  Class {cls.className} - {cls.section}
                </h2>

                {/* ✅ Show status */}
                {assigned && (
                  <p className="text-sm text-green-600 mt-1">
                    Teacher Assigned
                  </p>
                )}

                <button
                  className={`mt-3 px-3 py-1 rounded ${
                    assigned
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-[#1fa2a6] text-white"
                  }`}
                  disabled={assigned}
                  onClick={() => handleAssignClick(cls)}
                >
                  {assigned ? "Teacher Assigned" : "Assign Teacher"}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </InstitutionLayout>
  );
}