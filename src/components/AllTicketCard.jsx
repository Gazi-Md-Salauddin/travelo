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
    <Card
      className=" relative overflow-hidden dark:bg-[#1F2937] border dark:border-[#374151]"
    >
      {/* Image */}
      <Image
        src={
          ticket.image ||
          "https://placehold.co/600x400"
        }
        alt={ticket.title}
        width={600}
        height={400}
        loading="eager"
        className=" h-76 w-full object-cover rounded-xl"
      />


      {/* Info */}
      <div className="space-y-4 p-5">
        {/* Title */}
        <div>
          <h2 className="text-3xl font-bold">
            {ticket.title}
          </h2>

          <div className="mt-2 flex items-center gap-2 text-md text-default-500">
            <MapPin className="size-4 text-blue-500" />

            <span>
              {ticket.from} → {ticket.to}
            </span>
          </div>
        </div>


        <div>

          <p className="absolute top-5.5 font-medium bg-blue-500 text-white px-4 rounded-full">
            {ticket.transportType}
          </p>
        </div>


        {/* Departure */}
        <div className="text-md">
          <p className="font-medium">Leaves</p>
          <p className="flex items-center gap-2">
            <Calendar className="size-4" />
            {formatDepartureDate(departureField)}
          </p>
          <p className="font-medium">From {ticket.from}</p>
        </div>


        {/* Perks */}
        <div className="flex flex-wrap gap-2">
          {ticket.perks?.map((perk) => (
            <Chip
              key={perk}
              size="sm"
              color="accent"
              variant="soft"
            >
              {perk}
            </Chip>
          ))}
        </div>



        <div className="flex justify-between border dark:border-[#164675] rounded-xl p-4">
          <div className="text-center">
            <p className="text-md text-default-500">
              Available Tickets
            </p>

            <p className="font-medium text-2xl">
              {ticket.quantity}
            </p>
          </div>

          <div className="text-center">
            <p className="text-md text-default-500">
              Price (Per Ticket)
            </p>

            <p className="text-2xl font-medium flex items-center gap-1">
              <CircleDollar />{ticket.price}
            </p>
          </div>

        </div>

        {/* Details Button */}
        <Link
          href={`/all-tickets/${ticket._id}`}

          className="w-full bg-blue-500 text-white p-2 flex items-center justify-center text-center gap-1 rounded-full"
        >
          See Details<ArrowRight />
        </Link>
      </div>
    </Card>
  )
}

export default AllTicketCard