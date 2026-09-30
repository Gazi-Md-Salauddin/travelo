"use client";

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