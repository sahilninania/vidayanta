import { Line } from "react-chartjs-2";
import { useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

// 🎨 multiple fixed colors
const COLORS = [
  "#f97316", // orange
  "#3b82f6", // blue
  "#10b981", // green
  "#ef4444", // red
  "#8b5cf6", // purple
];

export default function GrowthChart({ title, data = [], index = 0 }) {

  // ✅ stable color based on index
  const color = COLORS[index % COLORS.length];

  const chartData = useMemo(() => {

    const safeData = Array.isArray(data) ? data : [];

    const labels = safeData.map(item => `M${item.month}`);
    const values = safeData.map(item => item.count);

    return {
      labels: labels.length ? labels : ["M1"],
      datasets: [
        {
          label: title || "Growth",
          data: values.length ? values : [0],
          borderColor: color,
          backgroundColor: color + "33", // light fill
          tension: 0.4,
          pointRadius: 4,
          pointBackgroundColor: color,
          fill: true
        }
      ]
    };

  }, [title, data, color]);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "top",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="border rounded-xl p-5 bg-white shadow-sm">
      <h3 className="font-semibold mb-3">{title}</h3>
      <Line data={chartData} options={options} />
    </div>
  );
}