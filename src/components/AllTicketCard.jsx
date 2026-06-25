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
  CircleDollar
} from "@gravity-ui/icons";
import Link from 'next/link'

const AllTicketCard = ({ticket}) => {
  return (
    <Card      
              className="overflow-hidden"
            >
              {/* Image */}
              <img
                src={
                  ticket.image ||
                  "https://placehold.co/600x400"
                }
                alt={ticket.title}
                className="h-52 w-full object-cover"
              />

              <div className="space-y-4 p-5">
                {/* Title */}
                <div>
                  <h2 className="text-xl font-semibold">
                    {ticket.title}
                  </h2>

                  <div className="mt-2 flex items-center gap-2 text-sm text-default-500">
                    <MapPin className="size-4" />

                    <span>
                      {ticket.from} → {ticket.to}
                    </span>
                  </div>
                </div>


                {/* Info */}
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
                      <CircleDollar/>{ticket.price}
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

                {/* Perks */}
                <div>
                  <p className="mb-2 text-xs text-default-500">
                    Perks
                  </p>

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
                </div>

                {/* Departure */}
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="size-4" />

                  <span>
                    {ticket.departureDate} •{" "}
                    {ticket.departureTime}
                  </span>
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