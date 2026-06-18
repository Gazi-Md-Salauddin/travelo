"use client";

import { Button, Card, Chip } from "@heroui/react";
import {
  MapPin,
  Pencil,
  TrashBin,
  Calendar,
} from "@gravity-ui/icons";

export default function TicketCard({ ticket }) {
  const isRejected = ticket.status === "rejected";

  const statusColor = {
    pending: "warning",
    approved: "success",
    rejected: "danger",
  };

  return (
    <Card className="overflow-hidden">
      <img
        src={ticket.image}
        alt={ticket.title}
        className="h-52 w-full object-cover"
      />

      <div className="space-y-4 p-5">
        <div>
          <h3 className="text-lg font-semibold">
            {ticket.title}
          </h3>

          <div className="mt-2 flex items-center gap-2 text-default-500">
            <MapPin className="size-4" />
            <span>
              {ticket.from} → {ticket.to}
            </span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span>{ticket.transportType}</span>

          <Chip color={statusColor[ticket.status]}>
            {ticket.status}
          </Chip>
        </div>

        <div className="space-y-1">
          <p>
            <strong>Price:</strong> ৳{ticket.price}
          </p>

          <p>
            <strong>Quantity:</strong>{" "}
            {ticket.quantity}
          </p>
        </div>

        <div className="flex items-center gap-2 text-sm text-default-500">
          <Calendar className="size-4" />

          <span>
            {ticket.departureDate} •{" "}
            {ticket.departureTime}
          </span>
        </div>

        <div className="flex gap-3">
          <Button
            color="primary"
            variant="flat"
            startContent={<Pencil />}
            isDisabled={isRejected}
            className="flex-1"
          >
            Update
          </Button>

          <Button
            color="danger"
            variant="flat"
            startContent={<TrashBin />}
            isDisabled={isRejected}
            className="flex-1"
          >
            Delete
          </Button>
        </div>
      </div>
    </Card>
  );
}