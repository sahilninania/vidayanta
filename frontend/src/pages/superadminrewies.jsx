import { useEffect, useState, useCallback, useMemo } from "react";
import API_URL from "../config/api.js";
import SuperAdminLayout from "../layout/superadmindashboardlayout";
import axios from "axios";

export default function ViewReviews() {

  const [data, setData] = useState([]);

  // 🔥 optimized API call
  const fetchReviews = useCallback(async () => {
    try {
      const res = await axios.get(`${API_URL}/api/review/reviews`);
      setData(res?.data?.data || []);
    } catch (err) {
      console.log(err);
    }
  }, []);
  const handleDelete = async (id) => {
        try {
          await axios.delete(`${API_URL}/api/review/${id}`);
          setData((prev) => prev.filter((item) => item._id !== id));
        } catch (err) {
          console.log(err);
        }
      };
  

  useEffect(() => {
    const loadData = async () => {
      await fetchReviews();
    };
  
    loadData();
  }, [fetchReviews]);

  // 🔥 memoized rendering (important if data large)
  const renderedReviews = useMemo(() => {
    return data.map((r) => (
      <div
        key={r._id}
        className="bg-white p-4 rounded shadow mb-3"
      >
        <p><b>Name:</b> {r.name}</p>
        <p><b>Message:</b> {r.message}</p>
        <p>⭐ {r.rating}/5</p>
        <div className="flex justify-end mt-3">
          <button
            onClick={() => handleDelete(r._id)}
            className="bg-red-500 text-white px-3 py-1 rounded"
            >Delete
          </button>
        </div>
      </div>
    ));
  }, [data]);

  return (
    <SuperAdminLayout>

      <h1 className="text-2xl font-bold mb-4 text-purple-600">
        Reviews
      </h1>

      {data.length === 0 ? (
        <p>No reviews</p>
      ) : (
        renderedReviews
      )}

    </SuperAdminLayout>
  );
}