"use client"
import { ArrowRight, CircleDollar, Clock, MapPin } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const AdvertisementSection = ({ tickets }) => {
  return (
    <section className="py-16">
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true, amount: 0.3 }}
    className="mx-auto max-w-7xl px-4 sm:px-6"
  >
    {/* Header */}
    <div className="mx-auto mb-10 max-w-2xl text-center">
      <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
        Featured Journeys
      </span>

      <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
        Advertised Tickets
      </h2>

      <p className="mt-4 text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-400">
        Explore handpicked travel deals and discover your next journey at the best value.
      </p>
    </div>

    {/* Ticket Cards */}
    <div className="flex flex-col gap-4">
      {tickets?.slice(0, 3).map((ticket) => (
        <div
          key={ticket._id}
          className="group grid min-w-0 grid-cols-1 gap-4 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg sm:p-4 lg:grid-cols-[130px_minmax(0,1.3fr)_minmax(160px,1fr)_minmax(170px,1fr)] lg:items-center lg:gap-4 dark:border-[#374151] dark:bg-[#1F2937]"
        >
          {/* Image */}
          <div className="relative h-48 w-full overflow-hidden rounded-xl lg:h-[110px]">
            <Image
              src={ticket.image || "https://placehold.co/600x400"}
              alt={ticket.title}
              fill
              sizes="(max-width: 1024px) 100vw, 130px"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />

            <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
              {ticket.transportType}
            </span>
          </div>

          {/* Operator & Route */}
          <div className="min-w-0 space-y-2">
            <h3 className="truncate text-lg font-bold text-gray-900 sm:text-xl dark:text-white">
              {ticket.title}
            </h3>

            <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
              <MapPin className="size-4 shrink-0 text-blue-500" />
              <span className="break-words">
                {ticket.from} → {ticket.to}
              </span>
            </div>

            <div className="flex flex-wrap gap-2 text-sm text-gray-500 dark:text-gray-400">
              <Clock className="size-4 shrink-0 text-blue-500" />
              <span>{ticket.departureTime}</span>
            </div>
          </div>

          {/* Departure & Perks */}
          <div className="space-y-3 border-t border-gray-100 pt-3 dark:border-gray-700 lg:border-l lg:border-t-0 lg:py-2 lg:pl-4">
            <div>
              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Available Seats
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {ticket.quantity}
              </p>

              <span className={`text-xs font-medium ${
                ticket.quantity > 0 ? "text-green-600" : "text-red-500"
              }`}>
                {ticket.quantity > 0 ? "Available" : "Sold Out"}
              </span>
            </div>

            <div className="flex flex-wrap gap-1.5">
              {ticket.perks?.slice(0, 3).map((perk) => (
                <Chip key={perk} size="sm" color="accent" variant="soft">
                  {perk}
                </Chip>
              ))}
            </div>
          </div>

          {/* Price & Details */}
          <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-gray-700 lg:border-l lg:border-t-0 lg:py-2 lg:pl-4">

            {/* Price */}
            <div className="flex flex-col items-center justify-center text-center">
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Price / Ticket
              </p>

              <p className="mt-1 flex items-center gap-1 text-xl font-bold text-blue-600 sm:text-2xl">
                <CircleDollar className="size-5 shrink-0" />
                {ticket.price}
              </p>
            </div>

            {/* Details Button */}
            <div className="flex items-center justify-center border-l border-gray-100 pl-3 dark:border-gray-700">
              {ticket.quantity > 0 ? (
                <Link
                  href={`/all-tickets/${ticket._id}`}
                  className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-3 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700"
                >
                  Details
                  <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              ) : (
                <button
                  disabled
                  className="w-full cursor-not-allowed rounded-xl bg-gray-400 px-3 py-3 text-sm font-semibold text-white"
                >
                  Sold Out
                </button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>

    {/* Explore All Tickets */}
    <div className="mt-8 flex justify-center">
      <Link
        href="/all-tickets"
        className="flex items-center gap-2 rounded-xl border border-blue-600 px-6 py-3 text-sm font-semibold text-blue-600 transition hover:bg-blue-600 hover:text-white"
      >
        Explore All Tickets
        <ArrowRight className="size-4" />
      </Link>
    </div>

  </motion.div>
</section>
  );
};

export default AdvertisementSection;