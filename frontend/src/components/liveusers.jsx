export default function LiveUsers({ data }) {

  const totalUsers =
    Number(data?.totalInstitution || 0) +
    Number(data?.totalTeacher || 0) +
    Number(data?.totalStudent || 0);

  return (

    <div className="bg-white rounded-xl p-4 md:p-5 shadow text-center">

      <h2 className="text-base md:text-lg font-semibold mb-3 mt-3">
        Live Users
      </h2>

      <h1 className="text-3xl md:text-5xl font-bold text-[#1fa2a6] mt-2">
        {totalUsers}
      </h1>

    </div>

  );
}