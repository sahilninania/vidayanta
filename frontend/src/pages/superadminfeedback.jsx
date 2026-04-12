import { useEffect, useState, useCallback, useMemo } from "react";
import API_URL from "../config/api.js";
import SuperAdminLayout from "../layout/superadmindashboardlayout";
import axios from "axios";

export default function ViewFeedback() {

  const [data, setData] = useState([]);

  // 🔥 optimized API call
  const fetchFeedback = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/feedback/feedback`);
      setData(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleDelete = async (id) => {
      try {
        await axios.delete(`${API_URL}/api/feedback/${id}`);
        setData((prev) => prev.filter((item) => item._id !== id));
      } catch (err) {
        console.log(err);
      }
    };

  useEffect(() => {
  const loadData = async () => {
    await fetchFeedback();
  };

  loadData();
}, [fetchFeedback]);

  // 🔥 memoized rendering
  const renderedFeedback = useMemo(() => {
    return data.map((f) => (
      <div
        key={f._id}
        className="bg-white p-4 rounded shadow mb-3"
      >
        <p><b>Name:</b> {f.name}</p>
        <p><b>Message:</b> {f.message}</p>
        <div className="flex justify-end mt-3">
          <button
            onClick={() => handleDelete(f._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
            >Delete
          </button>
        </div>
      </div>
    ));
  }, [data]);

  return (
    <SuperAdminLayout>

      <h1 className="text-2xl font-bold mb-4 text-green-600">
        Feedback
      </h1>

      {data.length === 0 ? (
        <p>No feedback</p>
      ) : (
        renderedFeedback
      )}

    </SuperAdminLayout>
  );
}