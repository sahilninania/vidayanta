import { useState } from "react";
import axios from "axios";
import API_URL from "../config/api.js";

export default function EmailModal({ onClose, institutions }) {

  const [type, setType] = useState("all");
  const [selected, setSelected] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const handleSend = async () => {
    try {
      const token = localStorage.getItem("token");
       if (loading) return;
      setLoading(true);
      await axios.post(
        `${API_URL}/api/superadmin/send-email`,
        {
          type,
          institutionId: selected,
          subject,
          message,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Email sent ✅");
      onClose();

    } catch (err) {
      console.log(err);
      alert("Error ❌");
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center">

      <div className="bg-white p-6 rounded-xl w-[90%] max-w-md">

        <h2 className="text-lg font-bold mb-4">Send Email</h2>

        {/* TYPE */}
        <select
          className="w-full mb-3 p-2 border"
          value={type}
          onChange={(e) => setType(e.target.value)}
        >
          <option value="all">All Institutions</option>
          <option value="single">Specific Institution</option>
        </select>

        {/* SELECT */}
        {type === "single" && (
          <select
            className="w-full mb-3 p-2 border"
            onChange={(e) => setSelected(e.target.value)}
          >
            <option value="">Select Institution</option>
            {institutions.map((i) => (
              <option key={i._id} value={i._id}>
                {i.institutionName}
              </option>
            ))}
          </select>
        )}

        {/* SUBJECT */}
        <input
          placeholder="Subject"
          className="w-full mb-3 p-2 border"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />

        {/* MESSAGE */}
        <textarea
          placeholder="Message"
          className="w-full mb-3 p-2 border"
          rows={4}
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        {/* BUTTON */}
        <div className="flex justify-end gap-2">
          <button onClick={onClose}>Cancel</button>
          <button
                onClick={handleSend}
                disabled={loading}
                className={`px-4 py-2 rounded text-white ${
                    loading ? "bg-gray-400" : "bg-teal-500"
                }`}
                >
                {loading ? "Sending..." : "Send"}
                </button>
        </div>

      </div>
    </div>
  );
}