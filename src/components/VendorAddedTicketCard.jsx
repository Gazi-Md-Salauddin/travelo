"use client"
import React from 'react'
import Link from "next/link";
import { useRouter } from "next/navigation"
import UpdateTicketModal from '@/components/UpdateTicketModal'
import DeleteAlert from '@/components/DeleteAlert'

import {
  Button,
  Card,
  Chip,
} from "@heroui/react";

import {
  MapPin,
  Pencil,
  TrashBin,
  CircleDollar,
  Calendar
} from "@gravity-ui/icons";
import Image from 'next/image';

const VendorAddedTicketCard = ({ ticket, color }) => {

  const router = useRouter()

  return (
    <Card

      className="overflow-hidden"
    >
      <Image
        src={
          ticket.image ||
          "https://placehold.co/600x400"
        }
        alt={ticket.title}
        width={500}
        height={300}
        loading="eager"
        className="h-68 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        {/* Title + Status */}
        <div className="flex items-start justify-between gap-3">
          <h2 className="text-lg font-semibold">
            {ticket.title}
          </h2>

          <Chip
            color={color}
            variant="soft"
          >
            {ticket.status}
          </Chip>
        </div>

        {/* Route */}
        <div className="flex items-center gap-2 text-sm text-default-500">
          <MapPin className="size-4" />

          <span>
            {ticket.from} → {ticket.to}
          </span>
        </div>

        {/* Ticket Details */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-default-500">
              Transport
            </p>

            <p className="font-medium">
              {ticket.transportType}
            </p>
          </div>

          <div>
            <p className="text-xs text-default-500">
              Price
            </p>

            <p className="font-medium flex items-center gap-1">
              <CircleDollar />{ticket.price}
            </p>
          </div>

          <div>
            <p className="text-xs text-default-500">
              Quantity
            </p>

            <p className="font-medium">
              {ticket.quantity}
            </p>
          </div>
        </div>

        {/* Departure */}
        <div className="flex items-center gap-2 text-sm">
          <Calendar className="size-4" />

          <span>
            {ticket.departureDate} •{" "}
            {ticket.departureTime}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <UpdateTicketModal ticket={ticket} />

          <DeleteAlert ticket={ticket} />
        </div>
      </div>
    </Card>
  )
}

export default VendorAddedTicketCard