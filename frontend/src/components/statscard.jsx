import { useMemo } from "react";

export default function StatsCards({ data = {}, onSendClick }) {

  // ✅ memoized stats (performance)
  const stats = useMemo(() => ([
    {
      title: "Total Institutes",
      value: data?.totalInstitution || 0,
    },
    {
      title: "Total Teachers",
      value: data?.totalTeacher || 0,
    },
    {
      title: "Total Students",
      value: data?.totalStudent || 0,
    },
  ]), [data]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 mb-4">

      {/* Stats */}
      {stats.map((item) => (
        <div
          key={item.title}
          className="bg-white p-4 md:p-6 rounded-xl shadow"
        >
          <p className="text-gray-500 text-xs md:text-sm">
            {item.title}
          </p>

          <h2 className="text-xl md:text-3xl font-bold mt-1">
            {item.value}
          </h2>
        </div>
      ))}

      {/* CTA */}
      <div 
          onClick={onSendClick}
          className="bg-gradient-to-r from-[#1fa2a6] to-[#0f7b7f] text-white flex items-center justify-center rounded-xl py-6 cursor-pointer"
        >
          Send Email
        </div>

    </div>
  );
}