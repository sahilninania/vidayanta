export default function TeacherTable({ teachers }) {

  return (

    <div className="bg-white rounded-xl p-4 md:p-5 shadow h-full">

      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
        Recently Added Teachers
      </h2>

      <div className="w-full overflow-hidden">

        <table className="w-full text-xs md:text-sm table-fixed">

          {/* 👇 FIX column width */}
          <colgroup>
            <col className="w-1/3" />
            <col className="w-2/3" />
          </colgroup>

          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
            </tr>
          </thead>

          <tbody>

            {teachers?.slice(0, 8).map((t) => (
              <tr key={t._id || t.email} className="border-b hover:bg-gray-50 transition">

                <td className="py-2 font-medium break-words">
                  {t?.name || t?.teacherName || "No Name"}
                </td>

                {/* 🔥 MAIN FIX */}
                <td className="py-2 text-gray-600 truncate">
                  {t.email || "No Email"}
                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}