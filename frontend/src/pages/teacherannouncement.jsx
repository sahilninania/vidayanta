import { useEffect, useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import TeacherLayout from "../layout/teacherdashboardlayout";
import axios from "axios";
import API_URL from "../config/api.js";

export default function TeacherAnnouncement() {

  const [announcements, setAnnouncements] = useState([]);
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  // ✅ localStorage
  const teacherId = useMemo(() => localStorage.getItem("teacherId"), []);
  const institutionCode = useMemo(() => localStorage.getItem("institutionCode"), []);

  // ✅ FETCH DATA
  const fetchAnnouncements = useCallback(async () => {
    try {
      const res = await axios.get(
        `${API_URL}/api/announcement/teacher`,
        {
          params: {
            teacherId,
            institutionCode
          }
        }
      );

      if (res?.data?.data) {
        setAnnouncements(res.data.data);
      }

    } catch (error) {
      console.log(error);
    }
  }, [teacherId, institutionCode]);

  // ✅ DELETE
  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `${API_URL}/api/announcement/${id}`,
        {
          params: { userId: teacherId }
        }
      );

      fetchAnnouncements(); // refresh

    } catch (err) {
      console.log(err);
    }
  };
useEffect(() => {
  const loadData = async () => {
      await fetchAnnouncements();
    };

    loadData();
  }, [fetchAnnouncements]);
  

  // ✅ RENDER LIST
  const renderedAnnouncements = useMemo(() => {
    if (announcements.length === 0) {
  return (
    <div className="bg-white rounded-3xl shadow-lg p-16 text-center">

      <div className="text-7xl">
        📭
      </div>

      <h2 className="text-3xl font-bold mt-6">
        No Announcements
      </h2>

      <p className="text-gray-500 mt-3">
        Create your first announcement.
      </p>

    </div>
  );
}

    return announcements
  .filter((a) => {
    const keyword = search.toLowerCase();

    return (
      a.title?.toLowerCase().includes(keyword) ||
      a.message?.toLowerCase().includes(keyword)
    );
  })
  .map((a, i) => {

      const isOwn = a.createdBy?.toString() === teacherId;

      return (
       <div
  key={i}
  className="bg-white rounded-3xl shadow-lg border border-gray-100 p-6 hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
>

          {/* TOP */}
          <div className="flex justify-between items-start">

  <div className="flex items-center gap-4">

    <div className="w-14 h-14 rounded-2xl bg-teal-100 flex items-center justify-center text-2xl">
      📢
    </div>

    <div>

      <h2 className="text-xl font-bold text-gray-800">
        {a.title}
      </h2>

      <p className="text-sm text-gray-400">
        {new Date(a.createdAt).toLocaleDateString()}
      </p>

    </div>

  </div>

  <span
    className={`px-4 py-2 rounded-full text-sm font-semibold ${
      isOwn
        ? "bg-green-100 text-green-700"
        : "bg-blue-100 text-blue-700"
    }`}
  >
    {isOwn ? "👤 You" : "🏫 Institute"}
  </span>

</div>
        
          {/* MESSAGE */}
          <p className="text-sm mt-2 text-gray-600  whitespace-pre-line">
            {a.message}
          </p>
          <div className="flex justify-between items-center mt-6 flex-wrap gap-4">

  <div className="inline-flex items-center bg-cyan-100 text-cyan-700 px-4 py-2 rounded-full text-sm font-semibold">

    🎓 {a.className || "All Classes"}

    {a.section && ` - ${a.section}`}

  </div>

  {isOwn && (

    <div className="flex gap-3">

      <button
        onClick={() =>
          navigate(`/teacher/announcement/edit/${a._id}`, {
            state: a,
          })
        }
        className="px-5 py-2 rounded-xl bg-blue-500 text-white hover:bg-blue-600 transition shadow"
      >
        ✏ Edit
      </button>

      <button
        onClick={() => handleDelete(a._id)}
        className="px-5 py-2 rounded-xl bg-red-500 text-white hover:bg-red-600 transition shadow"
      >
        🗑 Delete
      </button>

    </div>

  )}

</div>
        </div>
      );
    });

  }, [announcements, teacherId, navigate, search]);

    return (
  <TeacherLayout>
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-cyan-50 to-white p-6">

      {/* Header */}
      <div className="rounded-3xl bg-gradient-to-r from-teal-500 via-cyan-500 to-blue-600 text-white p-8 shadow-xl">

        <div className="flex flex-col lg:flex-row justify-between items-center">

          <div>

            <h1 className="text-4xl font-bold">
              📢 Announcements
            </h1>

            <p className="mt-3 text-cyan-100">
              Manage announcements for your students.
            </p>

          </div>

          <button
            onClick={() => navigate("/teacher/announcement/create")}
            className="mt-5 lg:mt-0 bg-white text-teal-600 px-6 py-3 rounded-2xl font-semibold shadow hover:scale-105 transition"
          >
            + Create Announcement
          </button>

        </div>

      </div>

      {/* ================= Statistics ================= */}

<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">

  {/* Total */}
  <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-gray-500 uppercase text-xs tracking-widest">
          Total
        </p>

        <h2 className="text-4xl font-bold text-blue-600 mt-2">
          {announcements.length}
        </h2>

      </div>

      <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
        📢
      </div>

    </div>

  </div>

  {/* Your Posts */}

  <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-gray-500 uppercase text-xs tracking-widest">
          Your Posts
        </p>

        <h2 className="text-4xl font-bold text-green-600 mt-2">

          {
            announcements.filter(
              (a) => a.createdBy?.toString() === teacherId
            ).length
          }

        </h2>

      </div>

      <div className="w-16 h-16 rounded-2xl bg-green-100 flex items-center justify-center text-3xl">
        👨‍🏫
      </div>

    </div>

  </div>

  {/* Institute */}

  <div className="bg-white rounded-3xl shadow-lg p-6 hover:shadow-xl hover:-translate-y-1 transition-all">

    <div className="flex justify-between items-center">

      <div>

        <p className="text-gray-500 uppercase text-xs tracking-widest">
          Institute
        </p>

        <h2 className="text-4xl font-bold text-purple-600 mt-2">

          {
            announcements.filter(
              (a) => a.createdBy?.toString() !== teacherId
            ).length
          }

        </h2>

      </div>

      <div className="w-16 h-16 rounded-2xl bg-purple-100 flex items-center justify-center text-3xl">
        🏫
      </div>

    </div>

  </div>

</div>
{/* ================= Search ================= */}

<div className="bg-white rounded-3xl shadow-lg p-5 mt-8">

  <div className="flex items-center gap-3">

    <div className="text-2xl">
      🔍
    </div>

    <input
      type="text"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      placeholder="Search announcements..."
      className="w-full outline-none text-lg"
    />

  </div>

</div>
{/* ================= Announcement List ================= */}

<div className="mt-8 space-y-6">

  {renderedAnnouncements}

</div>
    </div>
  </TeacherLayout>
  );
}