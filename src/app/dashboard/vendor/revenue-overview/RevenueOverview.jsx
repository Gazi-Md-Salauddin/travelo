
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
  Ticket,
  ShoppingBag,
  Wallet,
  TrendingUp,
  ChartColumnIncreasing,
} from "lucide-react";

import TicketBookingLoader from "@/app/loading";

const RevenueOverview = ({ data }) => {
  if (!data) return <TicketBookingLoader />;

  const chartData = [
    {
      metric: "Tickets Added",
      value: Number(data.ticketsAdded) || 0,
    },
    {
      metric: "Tickets Sold",
      value: Number(data.ticketsSold) || 0,
    },
    {
      metric: "Total Revenue",
      value: Number(data.totalRevenue) || 0,
    },
  ];

  const stats = [
    {
      title: "Tickets Added",
      value: data.ticketsAdded || 0,
      icon: Ticket,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
      description: "Total listed tickets",
    },
    {
      title: "Tickets Sold",
      value: data.ticketsSold || 0,
      icon: ShoppingBag,
      color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
      description: "Successfully sold tickets",
    },
    {
      title: "Total Revenue",
      value: Number(data.totalRevenue || 0).toLocaleString("en-BD"),
      icon: Wallet,
      color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
      description: "Total earnings",
      currency: true,
    },
  ];

  return (
    <section className="min-h-screen bg-[#f8fafc] px-4 py-7 text-slate-800 dark:bg-[#111827] dark:text-white sm:px-6 lg:px-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Financial Analytics
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Revenue Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor your ticket sales and business earnings.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-blue-100 bg-blue-50 px-4 py-3 text-sm font-medium text-blue-700 dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-blue-400">
          <TrendingUp size={18} />
          Business Performance
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="group rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-white/10 dark:bg-[#1c2535]"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={24} />
                </div>

                <TrendingUp
                  size={20}
                  className="text-slate-300 transition group-hover:text-blue-500"
                />
              </div>

              <p className="mt-6 text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>

              <h2 className="mt-2 text-3xl font-bold tracking-tight">
                {stat.currency ? `${stat.value}` : stat.value}
              </h2>

              <p className="mt-2 text-xs text-slate-400">
                {stat.description}
              </p>
            </div>
          );
        })}
      </div>

      {/* Chart */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1c2535]">

        {/* Chart Header */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 px-6 py-5 dark:border-white/10">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <ChartColumnIncreasing size={22} />
            </div>

            <div>
              <h2 className="text-lg font-bold">
                Business Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Overview of your business performance
              </p>
            </div>
          </div>

          <span className="rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
            Live Statistics
          </span>
        </div>

        {/* Revenue Highlight */}
        <div className="px-6 pt-6">
          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Revenue
          </p>

          <h3 className="mt-2 text-3xl font-bold">
            {Number(data.totalRevenue || 0).toLocaleString("en-BD")}
          </h3>
        </div>

        {/* Chart Area */}
        <div className="h-95 w-full px-3 pb-6 pt-8 sm:px-6">
          {chartData.every((item) => item.value === 0) ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="rounded-2xl bg-slate-100 p-5 text-slate-400 dark:bg-white/5">
                <ChartColumnIncreasing size={36} />
              </div>

              <h3 className="mt-4 font-semibold">
                No analytics data available
              </h3>

              <p className="mt-2 text-sm text-slate-400">
                Your business statistics will appear here.
              </p>
            </div>
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={chartData}
                margin={{
                  top: 15,
                  right: 15,
                  left: 5,
                  bottom: 10,
                }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#94a3b8"
                  opacity={0.2}
                />

                <XAxis
                  dataKey="metric"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                  interval={0}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: "#64748b", opacity: 0.06 }}
                  formatter={(value, name, props) => [
                    props.payload.metric === "Total Revenue"
                      ? `${Number(value).toLocaleString("en-BD")}`
                      : Number(value).toLocaleString("en-BD"),
                    props.payload.metric === "Total Revenue"
                      ? "Revenue"
                      : "Tickets",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                    boxShadow: "0 8px 25px rgba(0,0,0,0.08)",
                    padding: "12px",
                  }}
                />

                <Bar
                  dataKey="value"
                  fill="#2563eb"
                  radius={[8, 8, 0, 0]}
                  barSize={65}
                />
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 flex items-start gap-3 rounded-2xl border border-blue-100 bg-blue-50 p-5 dark:border-blue-500/20 dark:bg-blue-500/5">
        <div className="rounded-xl bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <TrendingUp size={20} />
        </div>

        <div>
          <h3 className="font-semibold text-slate-800 dark:text-white">
            Business Insight
          </h3>

          <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
            Keep monitoring your ticket sales and revenue to understand your business performance and make better decisions.
          </p>
        </div>
      </div>

    </section>
  );
};

export default RevenueOverview;
