"use client";

import { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

import {
  CircleDollar
} from "@gravity-ui/icons";

const RevenueOverview = ({data}) => {
  
  console.log("chartData", data)
  if (!data) return <p>Loading...</p>;

  const chartData = [
    { metric: "Tickets Added", value: data.ticketsAdded },
    { metric: "Tickets Sold", value: data.ticketsSold },
    { metric: "Total Revenue", value: data.totalRevenue },
  ];

  return (
    <div className="w-full">
      <h2 className="text-xl font-semibold mb-4">Revenue Overview</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="p-4 border rounded">Tickets Added: {data.ticketsAdded}</div>
        <div className="p-4 border rounded">Tickets Sold: {data.ticketsSold}</div>
        <div className="p-4 border flex gap-1 items-center rounded">Revenue: <CircleDollar/>{data.totalRevenue}</div>
      </div>

      {/* Chart */}
      <div className="h-80 w-full">
  <ResponsiveContainer width="100%" height="100%">
    <BarChart data={chartData}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="metric" />
      <YAxis />
      <Tooltip />
      <Bar dataKey="value" />
    </BarChart>
  </ResponsiveContainer>
</div>
    </div>
  );
}
export default RevenueOverview