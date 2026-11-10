"use client"
import {
  Ticket,
  CalendarCheck,
  Wallet,
  Clock,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  Plus,
  Users,
} from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import Link from "next/link";
import React, { useMemo, useState } from "react";


const DashboardClient = ({ tickets = [], user, bookings = [], revenue = {} }) => {


  const pending = bookings.filter(
    (b) => b.status?.toLowerCase() === "pending"
  ).length;

  const [chartFilter, setChartFilter] = useState("12months");

  const chartData = useMemo(() => {
    const now = new Date();

    if (chartFilter === "30days") {
      return Array.from({ length: 30 }, (_, i) => {
        const date = new Date(now);
        date.setDate(now.getDate() - (29 - i));

        const revenue = bookings.reduce((total, booking) => {
          if (booking.status?.toLowerCase() !== "paid") return total;

          const bookingDate = new Date(booking.paidAt || booking.createdAt);

          if (bookingDate.toDateString() === date.toDateString()) {
            return total + (Number(booking.totalPrice) || 0);
          }

          return total;
        }, 0);

        return {
          month: date.toLocaleDateString("en-US", {
            day: "numeric",
            month: "short",
          }),
          revenue,
        };
      });
    }

    const count = chartFilter === "6months" ? 6 : 12;

    return Array.from({ length: count }, (_, i) => {
      const date = new Date(
        now.getFullYear(),
        now.getMonth() - (count - 1 - i),
        1
      );

      const revenue = bookings.reduce((total, booking) => {
        if (booking.status?.toLowerCase() !== "paid") return total;

        const bookingDate = new Date(booking.paidAt || booking.createdAt);

        if (
          bookingDate.getMonth() === date.getMonth() &&
          bookingDate.getFullYear() === date.getFullYear()
        ) {
          return total + (Number(booking.totalPrice) || 0);
        }

        return total;
      }, 0);

      return {
        month: date.toLocaleDateString("en-US", {
          month: "short",
          year: count === 12 ? "2-digit" : undefined,
        }),
        revenue,
      };
    });
  }, [bookings, chartFilter]);

  const stats = [
    {
      title: "Total Tickets",
      value: tickets.length || 0,
      positive: true,
      icon: Ticket,
      color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      title: "Total Bookings",
      value: bookings.length || 0,
      positive: true,
      icon: CalendarCheck,
      color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
    },
    {
      title: "Total Revenue",
      value: revenue.totalRevenue || 0,
      positive: true,
      icon: Wallet,
      color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      title: "Pending Requests",
      value: pending,
      positive: false,
      icon: Clock,
      color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
    },
  ];


  return (
    <div className="min-h-screen bg-[#f8fafc] px-4 text-slate-800 dark:bg-[#111827] dark:text-white lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Welcome back, {user?.name}
          </h1>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Here&apos;s what&apos;s happening with your business today.
          </p>
        </div>

        <Link
          href="/dashboard/vendor/tickets/new"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Add New Ticket
        </Link>
      </div>

      {/* Stats */}
      <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.title}
              className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-white/10 dark:bg-[#1c2535]"
            >
              <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${stat.color}`}>
                  <Icon size={22} />
                </div>
                <span className={`flex items-center gap-1 text-xs font-semibold ${stat.positive ? "text-emerald-600" : "text-red-500"
                  }`}>
                  {stat.positive ? <ArrowUpRight size={15} /> : <ArrowDownRight size={15} />}
                  {stat.change}
                </span>
              </div>

              <p className="mt-5 text-sm font-medium text-slate-500 dark:text-slate-400">
                {stat.title}
              </p>
              <h2 className="mt-1 text-2xl font-bold tracking-tight">
                {stat.value}
              </h2>
              <p className="mt-2 text-xs text-slate-400">
                Compared to last month
              </p>
            </div>
          );
        })}
      </div>

      {/* Analytics */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Revenue Chart */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2535] xl:col-span-2 sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">Revenue Overview</h2>
              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Track your business performance
              </p>
            </div>
            <select
              value={chartFilter}
              onChange={(e) => setChartFilter(e.target.value)}
              className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-white/10 dark:bg-[#263247]"
            >
              <option value="12months">Last 12 Months</option>
              <option value="6months">Last 6 Months</option>
              <option value="30days">Last 30 Days</option>
            </select>
          </div>

          <div className="mb-5">
            <h3 className="text-3xl font-bold">
              {chartData
                .reduce((total, item) => total + item.revenue, 0)
                .toLocaleString("en-BD")}
            </h3>
            <p className="mt-2 flex items-center gap-1 text-sm text-emerald-600">
              <TrendingUp size={16} />
              +12.8% <span className="text-slate-400">vs last year</span>
            </p>
          </div>

          <div className="h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#94a3b8" opacity={0.2} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: "#94a3b8", fontSize: 12 }} />
                <Tooltip
                  formatter={(value) => [
                    `${Number(value).toLocaleString("en-BD")}`,
                    "Revenue",
                  ]}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="revenue"
                  stroke="#2563eb"
                  strokeWidth={3}
                  fill="url(#revenueGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2535]">
          <h2 className="text-lg font-bold">Quick Actions</h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Manage your travel business
          </p>

          <div className="mt-6 space-y-3">
            <Link
              href="/dashboard/vendor/tickets/new"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50/50 dark:border-white/10 dark:hover:bg-blue-500/10"
            >
              <div className="rounded-lg bg-blue-100 p-3 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                <Plus size={21} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Add New Ticket</h3>
                <p className="mt-1 text-xs text-slate-500">Create a new listing</p>
              </div>
              <ArrowUpRight size={18} className="text-slate-400" />
            </Link>

            <Link
              href="/dashboard/vendor/tickets"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50/50 dark:border-white/10 dark:hover:bg-blue-500/10"
            >
              <div className="rounded-lg bg-violet-100 p-3 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400">
                <Ticket size={21} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">My Tickets</h3>
                <p className="mt-1 text-xs text-slate-500">Manage your listings</p>
              </div>
              <ArrowUpRight size={18} className="text-slate-400" />
            </Link>

            <Link
              href="/dashboard/vendor/requested-bookings"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50/50 dark:border-white/10 dark:hover:bg-blue-500/10"
            >
              <div className="rounded-lg bg-orange-100 p-3 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                <Users size={21} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Booking Requests</h3>
                <p className="mt-1 text-xs text-slate-500">Review customer requests</p>
              </div>
              <ArrowUpRight size={18} className="text-slate-400" />
            </Link>

            <Link
              href="/dashboard/vendor/revenue-overview"
              className="flex items-center gap-4 rounded-xl border border-slate-200 p-4 transition hover:border-blue-500 hover:bg-blue-50/50 dark:border-white/10 dark:hover:bg-blue-500/10"
            >
              <div className="rounded-lg bg-emerald-100 p-3 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400">
                <Wallet size={21} />
              </div>
              <div className="flex-1">
                <h3 className="text-sm font-semibold">Revenue Report</h3>
                <p className="mt-1 text-xs text-slate-500">Check your earnings</p>
              </div>
              <ArrowUpRight size={18} className="text-slate-400" />
            </Link>
          </div>
        </div>
      </div>

      {/* Bottom Note */}
      <div className="mt-6 flex items-center gap-3 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
        <div className="rounded-lg bg-blue-100 p-2 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
          <TrendingUp size={20} />
        </div>
        <p className="text-sm text-slate-600 dark:text-slate-300">
          <span className="font-semibold text-slate-800 dark:text-white">
            Pro Tip:
          </span>{" "}
          Keep your ticket information updated to provide a better booking experience.
        </p>
      </div>
    </div>
  );
};

export default DashboardClient;
