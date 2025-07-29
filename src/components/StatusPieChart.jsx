import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from 'recharts';

const STATUS_COLORS = {
  Working: '#22c55e',   // green-500
  Break: '#eab308',     // yellow-500
  Meeting: '#3b82f6',   // blue-500
  Offline: '#6b7280',   // gray-500
};

export default function StatusPieChart({ data }) {
  // data: [{ name: 'Working', value: 2 }, ...]
  return (
    <div className="bg-[#181c23] border border-[#232936] rounded-xl shadow p-5">
      <h3 className="text-lg font-semibold text-blue-300 mb-4">Status Distribution</h3>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={70}
            label
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={STATUS_COLORS[entry.name] || '#8884d8'} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ background: "#232936", border: "none", color: "#fff" }}
            itemStyle={{ color: "#fff" }}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}