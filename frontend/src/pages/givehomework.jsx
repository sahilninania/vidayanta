import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";

export default function GiveHomework() {

  const [data, setData] = useState([]);

  const [className, setClassName] = useState("");
  const [section, setSection] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  const [classes, setClasses] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const teacherId = localStorage.getItem("teacherId");

        const res = await axios.post(
          `${API_URL}/api/classes/teacher-classes`,
          { teacherId }
        );

        const apiData = res.data.data;
        setData(apiData);

        const uniqueClasses = [
          ...new Set(apiData.map(d => d.className))
        ];

        setClasses(uniqueClasses);

      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleClassChange = (value) => {
    setClassName(value);
    setSection("");
    setSubject("");
  };

  const handleSectionChange = (value) => {
    setSection(value);
    setSubject("");
  };

  const sections = data
    .filter(d => String(d.className) === String(className))
    .map(d => d.section)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  const subjects = data
    .filter(
      d =>
        String(d.className) === String(className) &&
        String(d.section) === String(section)
    )
    .flatMap(d => d.subjects)
    .filter((v, i, arr) => arr.indexOf(v) === i);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const teacherId = localStorage.getItem("teacherId");
    const institutionCode = localStorage.getItem("institutionCode");

    if (!className || !section || !subject || !description) {
      alert("All fields required");
      return;
    }

    try {
      await axios.post(`${API_URL}/api/homework/create`, {
        className,
        section,
        subject,
        description,
        teacherId,
        institutionCode
      });

      alert("Homework Assigned ✅");

      setDescription("");
      setSubject("");
      setSection("");

    } catch (error) {
      console.log(error);
      alert("Error assigning homework");
    }
  };

  return (
    <TeacherLayout title="Give Homework">
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto bg-white p-6 m-6 rounded shadow">

        <h2 className="text-xl font-bold mb-4 text-[#1fa2a6]">
          Assign Homework
        </h2>

        <label className='block mb-1'>Class</label>
        <select
          className="w-full border p-2 mb-3"
          value={className}
          onChange={(e) => handleClassChange(e.target.value)}
        >
          <option value="">Select Class</option>
          {classes.map((cls) => (
            <option key={cls} value={cls}>{cls}</option>
          ))}
        </select>

        {sections.length > 0 && (
          <>
            <label className='block mb-1'>Section</label>
            <select
              className="w-full border p-2 mb-3"
              value={section}
              onChange={(e) => handleSectionChange(e.target.value)}
            >
              <option value="">Select Section</option>
              {sections.map((sec) => (
                <option key={sec} value={sec}>{sec}</option>
              ))}
            </select>
          </>
        )}

        {subjects.length > 0 && (
          <>
            <label className='block mb-1'>Subject</label>
            <select
              className="w-full border p-2 mb-3"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            >
              <option value="">Select Subject</option>
              {subjects.map((sub) => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </>
        )}

        <label className='block mb-1'>Homework</label>
        <textarea
          className="w-full border p-3 mb-3"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <button
          type="submit"
          className="w-full bg-[#1fa2a6] text-white py-2 rounded"
        >
          Assign Homework
        </button>

      </form>
    </TeacherLayout>
  );
}