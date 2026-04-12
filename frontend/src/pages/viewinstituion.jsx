import { useEffect, useState, useCallback, useMemo } from "react";
import Sidebar from "../components/superadminsidebar";
import Header from "../components/superadminheader";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function ViewInstitutions() {
  const [institutions, setInstitutions] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  // 🔥 FETCH
  const fetchInstitutions = useCallback(async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/superadmin/institutions"
      );
      setInstitutions(res?.data?.data || []);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchInstitutions();
  }, [fetchInstitutions]);

  // 🔥 TOGGLE
  const handleToggle = async (id) => {
    setLoadingId(id);
    try {
      const token = localStorage.getItem("token");

      const res = await axios.put(
        `http://localhost:5000/api/superadmin/institution/${id}/toggle`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setInstitutions((prev) =>
        prev.map((inst) =>
          inst._id === id ? { ...inst, status: res.data.status } : inst
        )
      );
    } catch (err) {
      console.log(err);
    } finally {
      setLoadingId(null);
    }
  };

  // 🔥 DELETE
  const handleDelete = useCallback(async (id) => {
    if (!window.confirm("Are you sure?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/superadmin/institution/${id}`
      );

      setInstitutions((prev) =>
        prev.filter((inst) => inst._id !== id)
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  // 🔥 UI
  const renderedInstitutions = useMemo(() => {
    return institutions.map((inst) => (
      <div
        key={inst._id}
        className="bg-white rounded-2xl shadow-md p-4 sm:p-5 border hover:shadow-xl transition flex flex-col justify-between"
      >
        {/* HEADER */}
        <div>
          <h2 className="text-lg sm:text-xl font-bold text-blue-600 mb-2">
            {inst.institutionName}
          </h2>

          {/* STATUS BADGE */}
          <span
            className={`inline-block px-2 py-1 text-xs font-semibold rounded mb-3 ${
              inst.status === "active"
                ? "bg-green-100 text-green-600"
                : "bg-red-100 text-red-600"
            }`}
          >
            {inst.status}
          </span>

          {/* DETAILS */}
          <div className="text-sm space-y-1">
            <p><b>Code:</b> {inst.institutionCode}</p>
            <p><b>Branch:</b> {inst.branch}</p>
            <p className="break-all"><b>Email:</b> {inst.email}</p>
            <p><b>Mobile:</b> {inst.mobile}</p>
            <p className="break-words"><b>Address:</b> {inst.address}</p>
          </div>

          {/* DATE */}
          <p className="text-xs text-gray-500 mt-2">
            {new Date(inst.createdAt).toLocaleString()}
          </p>
        </div>

        {/* ACTIONS */}
        <div className="flex flex-wrap gap-2 mt-4">
          <button
            onClick={() => navigate(`/edit-institution/${inst._id}`)}
            className="flex-1 sm:flex-none bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
          >
            Edit
          </button>

          <button
            onClick={() => handleToggle(inst._id)}
            disabled={loadingId === inst._id}
            className={`flex-1 sm:flex-none px-3 py-1 rounded text-white text-sm ${
              inst.status === "active"
                ? "bg-yellow-500 hover:bg-yellow-600"
                : "bg-blue-500 hover:bg-blue-600"
            }`}
          >
            {loadingId === inst._id
              ? "Updating..."
              : inst.status === "active"
              ? "Disable"
              : "Enable"}
          </button>

          <button
            onClick={() => handleDelete(inst._id)}
            className="flex-1 sm:flex-none bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 text-sm"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [institutions, navigate, handleDelete, loadingId]);

  return (
    <div className="flex">
      {/* SIDEBAR */}
      <Sidebar open={open} setOpen={setOpen} />

      {/* MAIN */}
      <div className="flex-1 md:ml-64 min-h-screen bg-gray-100">
        <Header setOpen={setOpen} />

        <div className=" flex-1 overflow-y-auto bg-gray-100 p-4 sm:p-6 md:p-10">
          <h1 className="text-2xl sm:text-3xl md:text-5xl font-bold text-teal-600 mb-6">
            View Institutions
          </h1>
          

          {/* RESPONSIVE GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {renderedInstitutions}
          </div>
        </div>
      </div>
    </div>
  );
}