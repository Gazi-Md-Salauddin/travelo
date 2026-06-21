"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import Image from "next/image";

const UserBookedTicketCard = ({ booking }) => {
  const [countdown, setCountdown] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      const departure = new Date(
        `${booking.departureDate} ${booking.departureTime}`
      );

      const now = new Date();
      const difference = departure - now;

      if (difference <= 0) {
        setCountdown("Departed");
        return;
      }

      const days = Math.floor(
        difference / (1000 * 60 * 60 * 24)
      );

      const hours = Math.floor(
        (difference / (1000 * 60 * 60)) % 24
      );

      const minutes = Math.floor(
        (difference / (1000 * 60)) % 60
      );

      setCountdown(`${days}d ${hours}h ${minutes}m`);
    }, 1000);

    return () => clearInterval(interval);
  }, [booking]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "danger";
      case "paid":
        return "primary";
      default:
        return "warning";
    }
  };

  const totalPrice =
    booking.pricePerTicket * booking.bookingQuantity;

  return (
    <Card className="p-4 space-y-4 h-full">
      

      <h2 className="text-xl font-semibold">
        {booking.ticketTitle}
      </h2>

      <p>
        <strong>Route:</strong> {booking.ticketFrom} → {booking.ticketTo}
      </p>

      <p>
        <strong>Quantity:</strong> {booking.bookingQuantity}
      </p>

      <p>
        <strong>Total Price:</strong> ৳{totalPrice}
      </p>

      <p>
        <strong>Departure:</strong>{" "}
        {booking.createdAt} | {booking.createdAt}
      </p>

      <div className="flex items-center justify-between">
        <Chip
          color={getStatusColor(booking.status)}
          variant="soft"
        >
          {booking.status}
        </Chip>

        <Chip color="secondary" variant="dot">
          {countdown}
        </Chip>
      </div>

      {booking.status?.toLowerCase() === "accepted" && (
        <Button
          color="success"
          className="w-full"
        >
          Pay Now
        </Button>
      )}
    </Card>
  );
};

export default UserBookedTicketCard;