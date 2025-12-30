// src/components/PriceHistoryChart.js
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
    <div className="h-40 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <XAxis dataKey="date" hide />
          <YAxis hide />
          <Tooltip
            content={({ active, payload, label }) => {
              if (!active || !payload || !payload.length) return null;

              const point = payload[0];

              return (
                <div className="rounded-md bg-black/80 border border-white/10 px-3 py-2 text-xs text-white">
                  <p className="text-slate-400 mb-1">{label}</p>
                  <p className="font-semibold text-indigo-400">
                    ₹{point.value}
                  </p>
                </div>
              );
            }}
          />

          <Line
            type="monotone"
            dataKey="price"
            stroke="#6366f1"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

