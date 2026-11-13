
"use client";

import React from "react";
import Image from "next/image";

import UpdateTicketModal from "@/components/dashboard/vendor/UpdateTicketModal";
import DeleteAlert from "@/components/dashboard/vendor/DeleteAlert";

import { Card, Chip } from "@heroui/react";

import {
  MapPin,
  CircleDollar,
  Calendar,
  Clock,
  Plane,
  Bus,
  Train,
  ArrowRight,
} from "@gravity-ui/icons";

const VendorAddedTicketCard = ({ ticket, color }) => {
  const transportIcons = {
    Flight: Plane,
    
  };

  const TransportIcon =
    transportIcons[ticket.transportType] || Plane;

  const quantity = Number(ticket.quantity) || 0;
  const isAvailable = quantity > 0;

  return (
    <Card className="group w-full overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:border-blue-300 hover:shadow-lg dark:border-gray-700 dark:bg-[#1F2937]">

      <div className="grid grid-cols-1 gap-4 p-3 sm:p-4 xl:grid-cols-[130px_minmax(0,1fr)_200px_230px] xl:items-center xl:gap-4">

        {/* ================================= */}
        {/* 1. Ticket Image */}
        {/* ================================= */}

        <div className="relative h-48 overflow-hidden rounded-xl bg-gray-100 sm:h-52 xl:h-31.25 dark:bg-gray-800">

          <Image
            src={ticket.image || "https://placehold.co/600x400"}
            alt={ticket.title}
            width={300}
            height={300}
            loading="eager"
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black/30 to-transparent" />

          {/* Transport Badge */}
          <div className="absolute left-2 top-2">
            <Chip
              size="sm"
              color="primary"
              variant="solid"
              className="font-semibold shadow-md"
            >
              {ticket.transportType}
            </Chip>
          </div>

        </div>

        {/* ================================= */}
        {/* 2. Main Ticket Information */}
        {/* ================================= */}

        <div className="min-w-0 space-y-3">

          {/* Title + Status */}
          <div className="flex flex-wrap items-center gap-2">

            <h2 className="text-lg font-bold text-gray-900 dark:text-white sm:text-xl">
              {ticket.title}
            </h2>

            <Chip
              size="sm"
              color={color}
              variant="soft"
              className="font-semibold"
            >
              {ticket.status}
            </Chip>

          </div>

          {/* Route Information */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">

            {/* From */}
            <div className="min-w-0">

              <p className="mb-1 text-xs font-medium text-gray-400">
                FROM
              </p>

              <div className="flex items-center gap-1.5">

                <MapPin className="size-4 shrink-0 text-blue-600" />

                <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {ticket.from}
                </p>

              </div>

            </div>

            {/* Arrow */}
            <ArrowRight className="size-5 text-blue-500" />

            {/* To */}
            <div className="min-w-0">

              <p className="mb-1 text-xs font-medium text-gray-400">
                TO
              </p>

              <div className="flex items-center gap-1.5">

                <MapPin className="size-4 shrink-0 text-blue-600" />

                <p className="truncate text-sm font-semibold text-gray-800 dark:text-gray-200">
                  {ticket.to}
                </p>

              </div>

            </div>

          </div>

          {/* Departure Date */}
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">

            <Calendar className="size-4 shrink-0 text-blue-500" />

            <span className="truncate">
              {ticket.departureDate}
            </span>

          </div>

        </div>

        {/* ================================= */}
        {/* 3. Departure & Amenities */}
        {/* ================================= */}

        <div className="flex flex-col justify-center gap-4 border-t border-gray-100 pt-4 dark:border-gray-700 xl:min-h-25 xl:border-l xl:border-t-0 xl:pl-5 xl:pt-0">

          {/* Departure Time */}
          <div>

            <p className="mb-2 text-xs font-medium text-gray-500 dark:text-gray-400">
              DEPARTURE TIME
            </p>

            <div className="flex items-center gap-2">

              <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-blue-50 dark:bg-blue-500/10">

                <Clock className="size-4 text-blue-600 dark:text-blue-400" />

              </div>

              <span className="text-sm font-bold text-gray-900 dark:text-white">
                {ticket.departureTime || "Not specified"}
              </span>

            </div>

          </div>

          {/* Amenities */}
          {Array.isArray(ticket.amenities) &&
            ticket.amenities.length > 0 && (

              <div className="flex flex-wrap gap-1.5">

                {ticket.amenities.slice(0, 4).map((amenity, index) => (

                  <span
                    key={`${amenity}-${index}`}
                    className="rounded-md border border-blue-100 bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700 dark:border-blue-900/50 dark:bg-blue-500/10 dark:text-blue-300"
                  >
                    {amenity}
                  </span>

                ))}

              </div>

            )}

        </div>

        {/* ================================= */}
        {/* 4. Price, Seats & Actions */}
        {/* ================================= */}

        <div className="flex flex-col justify-center gap-3 border-t border-gray-200 pt-4 dark:border-gray-700 xl:min-h-31.25 xl:border-l xl:border-t-0 xl:pl-4 xl:pt-0">

          {/* Price + Seats */}
          <div className="grid grid-cols-2 gap-2">

            {/* Available Seats */}
            <div className="text-center">

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Available Seats
              </p>

              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                {quantity}
              </p>

              <p
                className={`text-xs font-semibold ${
                  isAvailable
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-500"
                }`}
              >
                {isAvailable ? "Available" : "Sold Out"}
              </p>

            </div>

            {/* Price */}
            <div className="border-l border-gray-200 text-center dark:border-gray-700">

              <p className="text-xs font-medium text-gray-500 dark:text-gray-400">
                Price / Ticket
              </p>

              <p className="mt-2 flex items-center justify-center gap-1 text-xl font-bold text-blue-600 dark:text-blue-400">

                <CircleDollar className="size-4 shrink-0" />

                {ticket.price}

              </p>

            </div>

          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 border-t border-gray-100 pt-3 dark:border-gray-700">

            <div className="min-w-0 flex-1">
              <UpdateTicketModal ticket={ticket} />
            </div>

            <div className="min-w-0 flex-1">
              <DeleteAlert ticket={ticket} />
            </div>

          </div>

        </div>

      </div>

    </Card>
  );
};

export default VendorAddedTicketCard;
