import { useEffect, useState, useCallback } from "react";
import EmailModal from "../components/emailmodal";
import StatsCards from "../components/statscard";
import GrowthChart from "../components/monthlygrowth"; // ✅ correct
import InstitutionTable from "../components/institutiontable";
import TeacherTable from "../components/teachertable";
import StudentTable from "../components/studenttable";
import LiveUsers from "../components/liveusers";
import Notifications from "../components/notification";
import RecentActivity from "../components/recentactivity";
import Superadminlayout from "../layout/superadmindashboardlayout"; // ✅ FIXED
import axios from "axios";

export default function Dashboard() {

  const [data, setData] = useState({});
  const [showEmailModal, setShowEmailModal] = useState(false);
  
  const fetchStats = useCallback(async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/superadmin/dashboard");
     setData(res?.data?.data || {});
     console.log("FULL DATA 👉", res.data);
console.log("ACTUAL DATA 👉", res.data.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
  const loadData = async () => {
    await fetchStats();
  };

  loadData();
}, [fetchStats]);

  return (
    <>
    <Superadminlayout>

      {/* 🔥 Stats */}
      <StatsCards data={data} onSendClick={() => setShowEmailModal(true)} />

      {/* 🔥 Graphs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">

        <GrowthChart 
          title="Institutes Growth" 
          data={data?.graphData?.institutions || []}
          index={0}
        />
        <GrowthChart 
          title="Teachers Growth" 
          data={data?.graphData?.teachers || []} 
          index={2}
        />
        <GrowthChart 
          title="Students Growth" 
           data={data?.graphData?.students || []} 
          index={1}
        />

      </div>

      {/* 🔥 Top Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
        <div className="md:col-span-2">
          <InstitutionTable institutes={data?.recentInstitution} />
        </div>

        <div className="space-y-4 md:space-y-6">
          <LiveUsers data={data} />
          <RecentActivity />
        </div>
      </div>

      {/* 🔥 Bottom Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mt-6">
        <TeacherTable teachers={data?.recentTeacher} />
        <StudentTable students={data?.recentStudent} />
        <Notifications />
      </div>

    </Superadminlayout>
     {showEmailModal && (
      <EmailModal
        onClose={() => setShowEmailModal(false)}
        institutions={data?.recentInstitution || []}
      />
    )}
    </>
  );
  
}