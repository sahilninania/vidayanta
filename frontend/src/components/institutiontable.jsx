import { useMemo } from "react";

export default function InstitutionTable({ institutes }) {

  // ✅ safe + memoized data
  const safeInstitutes = useMemo(() => {
    return Array.isArray(institutes) ? institutes.slice(0, 6) : [];
  }, [institutes]);

  return (
    <div className="bg-white rounded-xl p-4 shadow-sm">

      <h2 className="text-sm font-semibold mb-3">
        Recently Added Institutes
      </h2>

      <div className="text-xs">

        {/* HEADER */}
        <div className="flex justify-between border-b pb-2 text-gray-500 font-medium">
          <span>Name</span>
          <span>Date</span>
        </div>

        {/* LIST */}
        <div className="divide-y">

          {safeInstitutes.length === 0 ? (
            <div className="py-4 text-center text-gray-400">
              No Institutes Found
            </div>
          ) : (
            safeInstitutes.map((inst) => (
              <div
                key={inst._id || inst.createdAt}
                className="flex justify-between py-2"
              >

                <div className="flex flex-col">

                  <span className="font-medium">
                    {inst?.institutionName || "No Name"}
                  </span>

                  <span className="text-gray-400 text-[11px]">
                    {inst?.address || "No Address"}
                  </span>

                </div>

                <span className="text-gray-500 text-[11px]">
                  {inst?.createdAt
                    ? new Date(inst.createdAt).toLocaleDateString()
                    : "U/N"}
                </span>

              </div>
            ))
          )}

        </div>

      </div>

    </div>
  );
}