// components/PriceHistoryChart.js

"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function PriceHistoryChart({ data }) {
  return (
    <div className="w-full h-[280px] min-h-[280px]">
      <ResponsiveContainer width="100%" height="100%" aspect={undefined}>
        <LineChart data={data}>
          <XAxis dataKey="date" stroke="#94a3b8" />
          <YAxis stroke="#94a3b8" />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="price"
            stroke="#00C2A8"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
