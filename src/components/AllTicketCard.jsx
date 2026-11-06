"use client"
import React from 'react'
import {
  Card,
  Button,
  Chip,
} from "@heroui/react";

import {
  MapPin,
  Calendar,
  ArrowRight,
  CircleDollar,
  Clock
} from "@gravity-ui/icons";
import Link from 'next/link'
import Image from 'next/image';

const AllTicketCard = ({ ticket }) => {

  const departureField =
    ticket.departureDate && ticket.departureTime
      ? `${ticket.departureDate}T${ticket.departureTime}`
      : null;

  const formatDepartureDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return "Invalid Date";

    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };


  return (
    <Card className="group w-full min-w-0 overflow-hidden rounded-2xl border border-gray-200 bg-white p-3 shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg sm:p-4 dark:border-[#374151] dark:bg-[#1F2937]">

      <div className="grid w-full min-w-0 grid-cols-1 gap-4 lg:grid-cols-[110px_minmax(0,1.3fr)_minmax(150px,1fr)_minmax(180px,1fr)] lg:items-center lg:gap-4">

        {/* Image */}
        <div className="relative h-44 w-full overflow-hidden rounded-xl sm:h-52 lg:h-[110px]">
          <Image
            src={ticket.image || "https://placehold.co/600x400"}
            alt={ticket.title}
            fill
            loading="eager"
            sizes="(max-width: 1024px) 100vw, 110px"
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <span className="absolute left-3 top-3 rounded-full bg-blue-600 px-3 py-1 text-xs font-semibold text-white shadow">
            {ticket.transportType}
          </span>
        </div>

        {/* Operator & Route */}
        <div className="min-w-0 space-y-2">
          <h2 className="truncate text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
            {ticket.title}
          </h2>

          <div className="flex items-center gap-2 text-sm font-medium text-gray-700 dark:text-gray-300">
            <MapPin className="size-4 shrink-0 text-blue-500" />
            <span className="break-words">
              {ticket.from} → {ticket.to}
            </span>
          </div>

          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="size-4 shrink-0 text-blue-500" />
            <span>{formatDepartureDate(departureField)}</span>
          </div>
        </div>

        {/* Departure & Perks */}
        <div className="space-y-3 border-t border-gray-100 pt-3 dark:border-gray-700 lg:border-l lg:border-t-0 lg:py-2 lg:pl-4">

          <div>
            <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
              Departure
            </p>

            <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-800 dark:text-gray-200">
              <Clock className="size-4 shrink-0 text-blue-500" />
              {ticket.departureTime}
            </p>
          </div>

          <div className="flex flex-wrap gap-1.5">
            {ticket.perks?.slice(0, 3).map((perk) => (
              <Chip key={perk} size="sm" color="accent" variant="soft">
                {perk}
              </Chip>
            ))}
          </div>
        </div>

        {/* Seats, Price & Details */}
        <div className="grid grid-cols-2 gap-3 border-t border-gray-100 pt-3 dark:border-gray-700 lg:border-l lg:border-t-0 lg:py-2 lg:pl-4">

          {/* Available Seats */}
          <div className="min-w-0 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Available Seats
            </p>

            <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
              {ticket.quantity}
            </p>

            <span className={`text-xs font-medium ${ticket.quantity > 0 ? "text-green-600" : "text-red-500"
              }`}>
              {ticket.quantity > 0 ? "Available" : "Sold Out"}
            </span>
          </div>

          {/* Price */}
          <div className="min-w-0 border-l border-gray-100 text-center dark:border-gray-700">
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Price / Ticket
            </p>

            <p className="mt-1 flex items-center justify-center gap-1 text-xl font-bold text-blue-600 sm:text-2xl">
              <CircleDollar className="size-5 shrink-0" />
              {ticket.price}
            </p>
          </div>

          {/* Details Button */}
          <div className="col-span-2 border-t border-gray-100 pt-3 dark:border-gray-700">
            {ticket.quantity > 0 ? (
              <Link
                href={`/all-tickets/${ticket._id}`}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-4 py-2.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 hover:shadow-blue-500/25"
              >
                View Details
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
            ) : (
              <button
                type="button"
                disabled
                className="flex w-full cursor-not-allowed items-center justify-center gap-2 rounded-xl bg-gray-400 px-4 py-2.5 text-sm font-semibold text-white"
              >
                Sold Out
              </button>
            )}
          </div>

        </div>

      </div>
    </Card>
  )
}

export default AllTicketCard