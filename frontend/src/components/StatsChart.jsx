import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

function StatsChart({ data }) {

  const chartData = [
    { name: "Applied", value: data.filter(i => i.status === "Applied").length },
    { name: "Interview", value: data.filter(i => i.status === "Interview").length },
    { name: "Offer", value: data.filter(i => i.status === "Offer").length },
    { name: "Rejected", value: data.filter(i => i.status === "Rejected").length }
  ];

  const COLORS = ["#3b82f6", "#f59e0b", "#22c55e", "#ef4444"];

  return (
    <div className="charts-container">

      {/* PIE CHART */}
      <div className="chart-item">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie data={chartData} dataKey="value" outerRadius={100} label>
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* BAR CHART */}
      <div className="chart-item">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value">
              {chartData.map((entry, index) => (
                <Cell key={index} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

    </div>
  );
}

export default StatsChart;