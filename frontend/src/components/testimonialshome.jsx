import { useMemo } from "react";

export default function Testimonials() {

  // ✅ stable data (performance boost)
  const reviews = useMemo(() => [
    {
      name: "Prashant Yadav",
      role: "School Principal",
      review:
        "Vidayanta transformed the way we manage our institution. Everything from teachers to students is now organized.",
    },
    {
      name: "Kushum Yadav",
      role: "Teacher",
      review:
        "Managing attendance and students has become incredibly simple with Vidayanta.",
    },
    {
      name: "Amit Saini",
      role: "Parent",
      review:
        "A powerful and easy-to-use system that saves us hours of manual work.",
    },
  ], []);

  return (
    <section className="py-20 bg-gray-50">

      {/* TITLE */}
      <div className="text-center mb-14">
        <h2 className="text-3xl font-bold text-gray-800">
          What Our Users Say
        </h2>

        <div className="w-20 h-1 bg-teal-500 mx-auto mt-3 rounded"></div>
      </div>

      {/* CARDS */}
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">

        {reviews.map((review) => (
          <div
            key={review.name} // ✅ better key
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition duration-300"
          >

            <p className="text-gray-600 mb-4 italic">
              "{review.review}"
            </p>

            <h3 className="font-semibold text-gray-800">
              {review.name}
            </h3>

            <p className="text-gray-500 text-sm">
              {review.role}
            </p>

            {/* ⭐ Stars */}
            <div className="text-yellow-400 mt-2">
              ⭐⭐⭐⭐⭐
            </div>

          </div>
        ))}

      </div>

    </section>
  );
}