import { useEffect, useState } from "react";
import API_URL from "../config/api.js";
import StudentLayout from "../layout/studentdashboardlayout";
import axios from "axios";

export default function StudentAnnouncement() {
  const [data, setData] = useState([]);

  useEffect(() => {
    let isMounted = true; // prevent memory leak

    const fetch = async () => {
      try {
        const institutionCode = localStorage.getItem("institutionCode");
        const className = localStorage.getItem("className");
        const section = localStorage.getItem("section");
         console.log(
              localStorage.getItem("className"),
              localStorage.getItem("section")
            );
        const res = await axios.get(
          `${API_URL}/api/announcement/get?role=student&institutionCode=${institutionCode}&className=${className}&section=${section}`
        );
        console.log("ANNOUNCEMENTS 👉", data);
        if (isMounted) {
          setData(res.data.data);
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetch();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <StudentLayout title="Announcements">
      <div className="p-6 bg-gray-100 min-h-screen">

        <h1 className="text-2xl font-bold mb-6 text-[#1fa2a6]">
          Announcements
        </h1>

        {data.length > 0 ? (
          <div className="space-y-4">
            {data.map((item, i) => {
              const formattedDate = new Date(
                item.createdAt
              ).toLocaleString();

              return (
                <div
                  key={i}
                  className="bg-white border rounded-xl shadow p-4"
                >
                  <h2 className="font-bold text-lg text-[#1fa2a6]">
                    {item.title}
                  </h2>

                  <p className="text-gray-700 mt-2  whitespace-pre-line">
                    {item.message || "No description"}
                  </p>

                  <p className="text-sm text-gray-500 mt-2">
                    {formattedDate}
                  </p>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-gray-500 text-center mt-10">
            No announcements available
          </p>
        )}

      </div>
    </StudentLayout>
  );
}