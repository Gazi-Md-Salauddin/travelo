
"use client";

import React from "react";
import Link from "next/link";
import {
  Users,
  UserCheck,
  Ticket,
  CalendarCheck,
  TrendingUp,
  ArrowUpRight,
  Clock,
  CheckCircle,
  XCircle,
  Plus,
  Eye,
  ShieldCheck,
  Megaphone,
  ArrowRight,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Demo booking analytics
const bookingData = [
  { month: "Jan", bookings: 120 },
  { month: "Feb", bookings: 180 },
  { month: "Mar", bookings: 150 },
  { month: "Apr", bookings: 250 },
  { month: "May", bookings: 210 },
  { month: "Jun", bookings: 320 },
  { month: "Jul", bookings: 280 },
  { month: "Aug", bookings: 380 },
  { month: "Sep", bookings: 340 },
  { month: "Oct", bookings: 450 },
  { month: "Nov", bookings: 420 },
  { month: "Dec", bookings: 520 },
];

// Demo statistics
const stats = [
  {
    title: "Total Users",
    value: "2,450",
    change: "+12.5%",
    icon: Users,
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    title: "Total Vendors",
    value: "186",
    change: "+8.2%",
    icon: UserCheck,
    color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  {
    title: "Total Tickets",
    value: "1,284",
    change: "+15.3%",
    icon: Ticket,
    color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
  {
    title: "Total Bookings",
    value: "8,642",
    change: "+18.6%",
    icon: CalendarCheck,
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

// Demo recent bookings
const recentBookings = [
  {
    id: "#TRV-1024",
    customer: "Rahim Ahmed",
    route: "Dhaka → Chattogram",
    date: "Nov 12, 2026",
    status: "Approved",
  },
  {
    id: "#TRV-1025",
    customer: "Sadia Islam",
    route: "Dhaka → Sylhet",
    date: "Nov 13, 2026",
    status: "Pending",
  },
  {
    id: "#TRV-1026",
    customer: "Hasan Mahmud",
    route: "Dhaka → Cox's Bazar",
    date: "Nov 14, 2026",
    status: "Approved",
  },
  {
    id: "#TRV-1027",
    customer: "Nusrat Jahan",
    route: "Dhaka → Rajshahi",
    date: "Nov 15, 2026",
    status: "Rejected",
  },
];

// Quick management actions
const quickActions = [
  {
    title: "Manage Users",
    description: "View and manage registered users",
    icon: Users,
    href: "/dashboard/admin/manage-users",
    color: "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
  },
  {
    title: "Manage Tickets",
    description: "Review and manage all tickets",
    icon: Ticket,
    href: "/dashboard/admin/manage-tickets",
    color: "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
  },
  {
    title: "Manage Vendors",
    description: "Monitor vendor accounts",
    icon: UserCheck,
    href: "/dashboard/admin/manage-vendors",
    color: "bg-violet-50 text-violet-600 dark:bg-violet-500/10 dark:text-violet-400",
  },
  {
    title: "Advertise Ticket",
    description: "Manage platform advertisements",
    icon: Megaphone,
    href: "/dashboard/admin/advertise-ticket",
    color: "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
  },
];

const AdminHomePage = () => {
  return (
    <div className="min-h-screen bg-[#f8fafc] p-4 text-slate-800 dark:bg-[#111827] dark:text-white sm:p-6 lg:p-8">

      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-center">
        <div>
          <p className="mb-2 text-sm font-semibold tracking-wider text-blue-600 dark:text-blue-400">
            ADMINISTRATION
          </p>

          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Admin Overview
          </h1>

          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Monitor your platform activities and manage Travelo.
          </p>
        </div>

        <Link
          href="/dashboard/admin/advertise-ticket"
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700"
        >
          <Plus size={18} />
          Create Advertisement
        </Link>
      </div>

      {/* Statistics Cards */}
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

                <span className="flex items-center gap-1 text-xs font-semibold text-emerald-600">
                  <ArrowUpRight size={15} />
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

      {/* Analytics Section */}
      <div className="mb-8 grid grid-cols-1 gap-6 xl:grid-cols-3">

        {/* Booking Analytics */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2535] xl:col-span-2 sm:p-6">

          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-bold">
                Booking Analytics
              </h2>

              <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                Monthly booking activities across the platform
              </p>
            </div>

            <select className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm outline-none dark:border-white/10 dark:bg-[#263247]">
              <option>2026</option>
              <option>2025</option>
              <option>2024</option>
            </select>
          </div>

          <div className="mb-6">
            <h3 className="text-3xl font-bold">8,642</h3>

            <p className="mt-2 flex items-center gap-1 text-sm font-medium text-emerald-600">
              <TrendingUp size={16} />
              +18.6%
              <span className="text-slate-400 font-normal">
                compared to last month
              </span>
            </p>
          </div>

          <div className="h-70 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={bookingData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#94a3b8"
                  opacity={0.2}
                />

                <XAxis
                  dataKey="month"
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <YAxis
                  axisLine={false}
                  tickLine={false}
                  tick={{ fill: "#94a3b8", fontSize: 12 }}
                />

                <Tooltip
                  cursor={{ fill: "#2563eb", opacity: 0.06 }}
                  contentStyle={{
                    borderRadius: "12px",
                    border: "1px solid #e2e8f0",
                  }}
                />

                <Bar
                  dataKey="bookings"
                  fill="#2563eb"
                  radius={[6, 6, 0, 0]}
                  maxBarSize={35}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Booking Status */}
        <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-[#1c2535]">

          <h2 className="text-lg font-bold">
            Booking Status
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Current booking summary
          </p>

          <div className="mt-7 space-y-6">

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <CheckCircle size={16} className="text-emerald-500" />
                  Approved
                </span>
                <span className="text-sm font-bold">72%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full w-[72%] rounded-full bg-emerald-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <Clock size={16} className="text-orange-500" />
                  Pending
                </span>
                <span className="text-sm font-bold">18%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full w-[18%] rounded-full bg-orange-500" />
              </div>
            </div>

            <div>
              <div className="mb-2 flex items-center justify-between">
                <span className="flex items-center gap-2 text-sm font-medium">
                  <XCircle size={16} className="text-red-500" />
                  Rejected
                </span>
                <span className="text-sm font-bold">10%</span>
              </div>

              <div className="h-2 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-700">
                <div className="h-full w-[10%] rounded-full bg-red-500" />
              </div>
            </div>

          </div>

          {/* Platform Status */}
          <div className="mt-9 rounded-xl border border-blue-100 bg-blue-50 p-4 dark:border-blue-500/20 dark:bg-blue-500/5">
            <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
              <ShieldCheck size={20} />
              <span className="text-sm font-bold">
                Platform Status
              </span>
            </div>

            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
              Monitor your platform and keep everything running smoothly.
            </p>

            <div className="mt-3 flex items-center gap-2 text-xs font-semibold text-emerald-600">
              <span className="h-2 w-2 rounded-full bg-emerald-500" />
              Operational
            </div>
          </div>
        </div>
      </div>

      {/* Quick Management */}
      <div className="mb-8">
        <div className="mb-5">
          <h2 className="text-lg font-bold">
            Quick Management
          </h2>

          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            Access your important management sections
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:border-blue-300 hover:shadow-md dark:border-white/10 dark:bg-[#1c2535] dark:hover:border-blue-500/50"
              >
                <div className={`rounded-xl p-3 ${action.color}`}>
                  <Icon size={22} />
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-sm font-bold">
                    {action.title}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                    {action.description}
                  </p>
                </div>

                <ArrowUpRight
                  size={18}
                  className="shrink-0 text-slate-400 transition group-hover:text-blue-600"
                />
              </Link>
            );
          })}
        </div>
      </div>

      {/* Recent Bookings */}
      <div className="mb-8 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-white/10 dark:bg-[#1c2535]">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5 dark:border-white/10 sm:p-6">
          <div>
            <h2 className="text-lg font-bold">
              Recent Bookings
            </h2>

            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Latest booking activities across Travelo
            </p>
          </div>

          <Link
            href="/dashboard/admin/manage-bookings"
            className="flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            View All <ArrowUpRight size={16} />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-175 text-left">

            <thead className="bg-slate-50 text-xs uppercase tracking-wider text-slate-500 dark:bg-[#263247]">
              <tr>
                <th className="px-6 py-4">Booking ID</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Route</th>
                <th className="px-6 py-4">Travel Date</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Action</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 dark:divide-white/10">
              {recentBookings.map((booking) => (
                <tr
                  key={booking.id}
                  className="transition hover:bg-slate-50 dark:hover:bg-white/5"
                >
                  <td className="px-6 py-4 text-sm font-semibold text-blue-600 dark:text-blue-400">
                    {booking.id}
                  </td>

                  <td className="px-6 py-4 text-sm font-medium">
                    {booking.customer}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {booking.route}
                  </td>

                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {booking.date}
                  </td>

                  <td className="px-6 py-4">
                    <span
                      className={`rounded-full px-3 py-1 text-xs font-semibold ${booking.status === "Approved"
                          ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400"
                          : booking.status === "Pending"
                            ? "bg-orange-100 text-orange-700 dark:bg-orange-500/10 dark:text-orange-400"
                            : "bg-red-100 text-red-700 dark:bg-red-500/10 dark:text-red-400"
                        }`}
                    >
                      {booking.status}
                    </span>
                  </td>

                  <td className="px-6 py-4">
                    <button
                      aria-label={`View ${booking.id}`}
                      className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-blue-600 dark:hover:bg-white/10"
                    >
                      <Eye size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default AdminHomePage;
