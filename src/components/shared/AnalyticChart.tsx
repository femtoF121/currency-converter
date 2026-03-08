"use client";

import { ChartDataPoint } from "@/types/analytics";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

export function AnalyticChart({ data }: { data: ChartDataPoint[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
      >
        <CartesianGrid vertical={false} opacity={0.4} />
        <XAxis
          dataKey="date"
          tick={{ fontSize: 12, fontWeight: 500 }}
          dy={4}
          minTickGap={50}
          tickFormatter={(value: Date) => new Date(value).toLocaleDateString()}
        />
        <YAxis
          domain={["auto", "auto"]}
          tick={{ fontSize: 12, fontWeight: 500 }}
          dx={-4}
        />
        <Tooltip
          content={({ payload, label }) => (
            <div className="bg-white px-3 py-1.5 rounded-md shadow-md border border-slate-100 flex items-center gap-3">
              <span className="text-sm font-bold text-slate-900">
                {payload[0]?.value.toFixed(2)}
              </span>
              <span className="text-sm text-slate-500 font-medium">
                {label && new Date(label).toDateString()}
              </span>
            </div>
          )}
        />
        <defs>
          <linearGradient id="colorRate" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#10b981" stopOpacity={0.5} />
            <stop offset="95%" stopColor="#10b981" stopOpacity={0.01} />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="rate"
          stroke="#10b981"
          strokeWidth={2.5}
          fill="url(#colorRate)"
          animationDuration={1200}
          activeDot={{ r: 6, strokeWidth: 0, fill: "#10b981" }}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
