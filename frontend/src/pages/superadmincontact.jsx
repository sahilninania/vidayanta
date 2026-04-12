import { useEffect, useState, useCallback, useMemo } from "react";
import SuperAdminLayout from "../layout/superadmindashboardlayout";
import axios from "axios";

export default function ViewContacts() {

  const [data, setData] = useState([]);

  // 🔥 fetch contacts
  const fetchContacts = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/contact/contacts");
      setData(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const loadData = async () => {
      await fetchContacts();
    };
    loadData();
  },[fetchContacts]);
  

  // 🔥 delete contact
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/contact/${id}`);
      setData((prev) => prev.filter((item) => item._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  // 🔥 render contacts
  const renderedContacts = useMemo(() => {
    return data.map((c) => (
      <div
        key={c._id}
        className="bg-white p-4 rounded-xl shadow mb-4"
      >
        <p><b>Name:</b> {c.name}</p>
        <p><b>School:</b> {c.schoolName}</p>
        <p><b>Email:</b> {c.email}</p>
        <p><b>Mobile:</b> {c.mobile}</p>
        <p><b>Message:</b> {c.message}</p>

        {/* 🔥 DELETE BUTTON FIX */}
        <div className="flex justify-end mt-3">
          <button
            onClick={() => handleDelete(c._id)}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Delete
          </button>
        </div>
      </div>
    ));
  }, [data]);

  return (
    <SuperAdminLayout>

      <h1 className="text-2xl font-bold mb-4 text-[#1fa26f]">
        Contact Requests
      </h1>

      {data.length === 0 ? (
        <p className="text-gray-400">No contact requests</p>
      ) : (
        <div>{renderedContacts}</div>
      )}

    </SuperAdminLayout>
  );
}