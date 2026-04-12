import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import { useParams, useNavigate } from "react-router-dom";
import InstitutionLayout from "../layout/institutitondashboardlayout";
import axios from "axios";

export default function EditAnnouncement() {

  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    title: "",
    message: ""
  });

  const userId = localStorage.getItem("userId");

  // 🔥 LOAD DATA
  useEffect(() => {
    if (!id) return;
    const fetch = async () => {
      const res = await axios.get(
        `${API_URL}/api/announcement/${id}`
      );

      setForm({
        title: res.data?.title || "",
        message: res.data?.message || ""
      });
    };

    fetch();
  }, [id]);

  // 🔥 UPDATE
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `${API_URL}/api/announcement/${id}`,
        {
          ...form,
          userId
        }
      );

      alert("Updated ✅");
      navigate("/institution/announcement");

    } catch (err) {
      console.log(err);
      alert("Update failed ❌");
    }
  };

  return (
    <InstitutionLayout>
  
      <form onSubmit={handleUpdate} className="p-6 max-w-xl mx-auto bg-white rounded shadow m-6">
        <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">Vidayanta</h1>
        <h1 className="text-xl font-bold mb-4">Edit Announcement</h1>
        <label htmlFor="form.title"className='block font-normal mb-1'>Title</label>
        <input
          value={form.title}
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, title: e.target.value }))
          }
        />
        <label htmlFor="form.message"className='block font-normal mb-1'>Message</label>
        <textarea
          value={form.message}
          className="border p-2 w-full mb-3"
          onChange={(e) =>
            setForm((prev) => ({ ...prev, message: e.target.value }))
          }
        />

        <button
          type="submit"
          className="bg-[#1fa2a6] text-white w-full p-2 rounded"
        >
          Update
        </button>

      </form>

    </InstitutionLayout>
  );
}