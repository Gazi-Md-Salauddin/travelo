"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip } from "@heroui/react";
import Image from "next/image";
import {
  CircleDollar
} from "@gravity-ui/icons";

const UserBookedTicketCard = ({ booking }) => {
  const [countdown, setCountdown] = useState("");

  const departureField = booking.departureDate || booking.departureTime; 

  useEffect(() => {
    if (!departureField) {
      setCountdown("No Date");
      return;
    }

    const interval = setInterval(() => {
      const departure = new Date(departureField);
      const now = new Date();
      const difference = departure - now;

      
      if (isNaN(difference)) {
        setCountdown("Invalid Date");
        clearInterval(interval);
        return;
      }

      if (difference <= 0) {
        setCountdown("Departed");
        clearInterval(interval);
        return;
      }

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);
      
      setCountdown(`${days}d ${hours}h ${minutes}m ${seconds}s`);
    }, 1000);

    return () => clearInterval(interval);
  }, [departureField]);

  const formatDepartureDate = (dateString) => {
    if (!dateString) return "N/A";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid Date";
    
    return date.toLocaleString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  };

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "accepted":
        return "success";
      case "rejected":
        return "danger";
      case "paid":
        return "accent";
      default:
        return "warning";
    }
  };

  const totalPrice =
    booking.pricePerTicket * booking.bookingQuantity;


  const handlePayment = async () => {
    const res = await fetch("/api/checkout_sessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        bookingId: booking._id,
        ticketTitle: booking.ticketTitle,
      
        totalPrice: booking.pricePerTicket * booking.bookingQuantity
      }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };
  
  return (
    <Card className="p-4 space-y-4 h-full">

      <div>
          <img
            src={booking.ticketImage}
            alt={booking.ticketTitle}
            className="h-[300px] w-full rounded-2xl object-cover"
          />
        </div>

      <h2 className="text-xl font-semibold">
        {booking.ticketTitle}
      </h2>

      <p>
        <strong>Route:</strong> {booking.ticketFrom} → {booking.ticketTo}
      </p>

      <p>
        <strong>Quantity:</strong> {booking.bookingQuantity}
      </p>

      <p className="flex items-center gap-1">
        <strong>Total Price:</strong> <CircleDollar/>{totalPrice}
      </p>

      <p>
        <strong>Departure:</strong>{" "}
        {formatDepartureDate(departureField)}
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

      
        {booking.status?.toLowerCase() === "approved" && countdown !== "Departed" && (      
        <Button onPress={handlePayment} role="link" color="success" className="w-full">
          Pay Now
        </Button>
    )}
    </Card>
  );
};

export default UserBookedTicketCard;