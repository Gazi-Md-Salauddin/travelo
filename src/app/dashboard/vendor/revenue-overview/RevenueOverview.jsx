"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";

import {
  CircleDollar
} from "@gravity-ui/icons";

const RevenueOverview = ({ data }) => {

  console.log("chartData", data)
  if (!data) return <p>Loading...</p>;

  const chartData = [
    { metric: "Tickets Added", value: data.ticketsAdded },
    { metric: "Tickets Sold", value: data.ticketsSold },
    { metric: "Total Revenue", value: data.totalRevenue },
  ];

  return (
    <div className="w-full">
      <h2 className="text-3xl font-semibold my-6 text-center">Revenue Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 px-6">
        <div className="p-4 border rounded-xl text-center">
          <h2 className="text-3xl font-bold">{data.ticketsAdded}</h2>
          <p className="text-xl font-medium">Tickets Added</p>
        </div>
        <div className="p-4 border rounded-xl text-center">
          <h2 className="text-3xl font-bold">{data.ticketsSold}</h2>
          <p className="text-xl font-medium">Tickets Sold</p>
        </div>
        <div className="p-4 border text-center rounded-xl">
          <h2 className="text-3xl font-bold flex items-center justify-center"><CircleDollar />{data.totalRevenue}</h2>
          <p className="text-xl font-medium">Revenue</p>
        </div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">

        <BarChart
          style={{
            width: "100%",
            maxWidth: "700px",
            aspectRatio: 1.618,
          }}
          responsive
          data={chartData}
          margin={{
            top: 20,
            right: 20,
            left: 0,
            bottom: 10,
          }}
        >
          <CartesianGrid
            strokeDasharray="3 3"
            vertical={false}
            stroke="#E5E7EB"
          />

          <XAxis
            dataKey="metric"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 13 }}
          />

          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#6B7280", fontSize: 13 }}
          />

          <Tooltip
            cursor={{ fill: "#F3F4F6" }}
            contentStyle={{
              backgroundColor: "#FFFFFF",
              border: "1px solid #E5E7EB",
              borderRadius: "10px",
              boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
            }}
          />

          <Bar
            dataKey="value"
            fill="#2563EB"
            radius={[8, 8, 0, 0]}
            barSize={70}
          />
        </BarChart>

      </div>
    </div>
  );
}
export default RevenueOverview