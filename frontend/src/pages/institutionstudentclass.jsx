import axios from "axios";
import { useEffect, useState } from "react";
//import API from "../config/api";
import { useNavigate } from "react-router-dom";

export default function ClassPage() {
  const [classes, setClasses] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchClasses = async () => {
      try {
        const res = await axios.get("/api/classes");
        setClasses(res.data.data || []);
      } catch (err) {
        console.error("Fetch classes error 👉", err);
      }
    };

    fetchClasses();
  }, []);

  return (
    <div className="p-6">

      <h2 className="text-xl font-bold mb-6">
        Select Class
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {classes.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">
            No classes available
          </p>
        ) : (
          classes.map((cls) => (
            <div
              key={cls._id}
              onClick={() => navigate(`/class/${cls._id}`)}
              className="bg-white p-5 rounded-xl shadow cursor-pointer hover:scale-105 transition"
            >
              <h3>
                {cls.className} - {cls.section}
              </h3>

              <p>
                Incharge:{" "}
                {cls.classIncharge?.userId?.name || "Not Assigned"}
              </p>
            </div>
          ))
        )}

      </div>
    </div>
  );
}