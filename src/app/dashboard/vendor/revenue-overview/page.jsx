"use client";

import { useEffect, useState } from "react";

const RevenueOverview = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/revenue-overview");
      const result = await res.json();
      setData(result);
    };

    fetchData();
  }, []);

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
        <div className="p-4 border rounded">Revenue: ৳{data.totalRevenue}</div>
      </div>

      {/* Chart */}
      <pre>{JSON.stringify(chartData, null, 2)}</pre>
    </div>
  );
}
export default RevenueOverview