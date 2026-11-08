
import React from "react";
import Link from "next/link";
import {
  Ticket,
  CalendarCheck,
  UserRound,
  CheckCircle,
  Clock,
  XCircle,
  ArrowRight,
} from "lucide-react";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { getUserBookings } from "@/lib/actions/booking";

const UserHomePage = async () => {

  const session = await auth.api.getSession({
    headers: await headers(),
  })

    const email = session?.user?.email;

    // Fetch user bookings
  let bookings = [];

  if (email) {
    try {
      const data = await getUserBookings(email);

      bookings = Array.isArray(data)
        ? data
        : data?.bookings || [];
    } catch (error) {
      console.error("Failed to fetch bookings:", error);
    }
  }


  const stats = [
    {
      title: "Total Bookings",
      value: bookings.length,
      description: "All your travel bookings",
      icon: Ticket,
      color: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      title: "Confirmed Bookings",
      value: bookings.filter((booking) => booking.status === "paid").length,
      description: "Successfully confirmed",
      icon: CheckCircle,
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      title: "Pending Bookings",
      value: bookings.filter((booking) => booking.status === "pending").length,
      description: "Waiting for confirmation",
      icon: Clock,
      color: "bg-amber-100 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400",
    },
    {
      title: "Cancelled Bookings",
      value: bookings.filter((booking) => booking.status === "Rejected").length,
      description: "Cancelled travel bookings",
      icon: XCircle,
      color: "bg-rose-100 text-rose-600 dark:bg-rose-500/10 dark:text-rose-400",
    },
  ];


  const quickActions = [
    {
      title: "Browse Tickets",
      description: "Explore available buses, trains, and flights.",
      icon: Ticket,
      href: "/all-tickets",
      color: "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
    },
    {
      title: "My Bookings",
      description: "View and manage your travel bookings.",
      icon: CalendarCheck,
      href: "/dashboard/user/booked-tickets",
      color: "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400",
    },
    {
      title: "My Profile",
      description: "Manage your personal information.",
      icon: UserRound,
      href: "/dashboard/user/profile",
      color: "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
    },
  ];

  return (
    <div className="min-h-[80vh] space-y-8 p-4 md:p-8">
      {/* Welcome Section */}
      <div className="relative overflow-hidden rounded-2xl border border-blue-100 bg-linear-to-r from-blue-50 to-indigo-50 p-6 dark:border-blue-900/40 dark:from-blue-950/40 dark:to-indigo-950/30 md:p-10">
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-700 dark:bg-blue-500/20 dark:text-blue-300">
            USER DASHBOARD
          </span>

          <h1 className="mt-4 text-3xl font-bold tracking-tight text-slate-900 dark:text-white md:text-4xl">
            Welcome Back!
          </h1>

          <p className="mt-3 max-w-lg text-sm leading-6 text-slate-600 dark:text-slate-400 md:text-base">
            Your next journey starts here. Explore available tickets,
            manage your bookings, and enjoy a smooth travel experience
            with Travelo.
          </p>

          <Link
            href="/all-tickets"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition-all hover:bg-blue-700"
          >
            Explore Tickets
            <ArrowRight size={17} />
          </Link>
        </div>

        <div className="pointer-events-none absolute -right-12 -top-16 h-64 w-64 rounded-full bg-blue-200/40 blur-3xl dark:bg-blue-500/10" />
      </div>

      {/* Travel Statistics */}
      <div>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Travel Overview
          </h2>
          <p className="mt-1 text-sm text-default-500">
            Track your booking activities at a glance.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.title}
                className="rounded-2xl border border-default-200 bg-white p-5 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-[#202020]"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${stat.color}`}>
                    <Icon size={23} />
                  </div>
                </div>

                <p className="mt-5 text-sm font-medium text-default-500">
                  {stat.title}
                </p>

                <h3 className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">
                  {stat.value}
                </h3>

                <p className="mt-2 text-xs text-default-400">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div>
        <div className="mb-5">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Quick Actions
          </h2>
          <p className="mt-1 text-sm text-default-500">
            Everything you need, just one click away.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
          {quickActions.map((action) => {
            const Icon = action.icon;

            return (
              <Link
                key={action.title}
                href={action.href}
                className="group rounded-2xl border border-default-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-300 hover:shadow-lg dark:bg-[#202020] dark:hover:border-blue-500/40"
              >
                <div className="flex items-center justify-between">
                  <div className={`rounded-xl p-3 ${action.color}`}>
                    <Icon size={24} />
                  </div>

                  <ArrowRight
                    size={19}
                    className="text-default-400 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-blue-600"
                  />
                </div>

                <h3 className="mt-5 text-lg font-bold text-slate-900 dark:text-white">
                  {action.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-default-500">
                  {action.description}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default UserHomePage;
