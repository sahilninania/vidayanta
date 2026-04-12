export default function StudentTable({ students }) {

  return (

    <div className="bg-white rounded-xl p-4 md:p-5 shadow">

      <h2 className="text-base md:text-lg font-semibold mb-3 md:mb-4">
        Recently Added Students
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full text-xs md:text-sm">

          <thead>
            <tr className="border-b text-left text-gray-500">
              <th className="py-2">Name</th>
              <th className="py-2">Email</th>
            </tr>
          </thead>

          <tbody>

            {students?.map((s) => (
              <tr key={s._id || s.email} className="border-b hover:bg-gray-50 transition">

                <td className="py-2 font-medium">{s.name}</td>
                <td className="py-2 text-gray-600">{s.email}</td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>

  );
}