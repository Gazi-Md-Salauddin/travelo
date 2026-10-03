"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip, Calendar } from "@heroui/react";
import Image from "next/image";
import {
  CircleDollar,
  Clock,
  MapPin
} from "@gravity-ui/icons";

const UserBookedTicketCard = ({ booking }) => {
  const [countdown, setCountdown] = useState("");

  const departureField =
    booking.departureDate && booking.departureTime
      ? `${booking.departureDate}T${booking.departureTime}`
      : null;

  useEffect(() => {
    if (!departureField) return;

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
    <Card className="group overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">

      <div className="relative overflow-hidden">
        <Image
          src={booking.ticketImage}
          alt={booking.ticketTitle}
          width={600}
          height={400}
          className="h-75 w-full rounded-2xl object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>



      {/* ================= CONTENT ================= */}
      <div className="p-5 sm:p-6">

        {/* Title */}
        <div className="mb-5">
          <h2 className="line-clamp-1 text-xl font-bold text-gray-950">
            {booking.ticketTitle}
          </h2>

          {/* Route */}
          <div className="mt-2 flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center gap-1.5">
              <MapPin className="size-4 shrink-0 text-blue-600" />

              <span className="font-medium">
                {booking.ticketFrom}
              </span>

              <span className="text-gray-300">→</span>

              <span className="font-medium">
                {booking.ticketTo}
              </span>

            </div>

            {/* Status */}
            <div>
              <Chip
                color={getStatusColor(booking.status)}
                variant="soft"
                colors="warning"
                size="sm"
                className="font-semibold capitalize"
              >
                {booking.status}
              </Chip>

            </div>

          </div>

        </div>

        {/* ================= JOURNEY INFO ================= */}
        <div className="grid grid-cols-2 gap-3">

          {/* Date */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
            <div className="flex items-center gap-2 text-gray-400">
              <Calendar className="size-4 text-blue-500" />

              <span className="text-xs font-medium">
                Journey Date
              </span>
            </div>

            <p className="mt-1.5 text-sm font-semibold text-gray-900">
              {booking.departureDate || "N/A"}
            </p>
          </div>

          {/* Time */}
          <div className="rounded-2xl border border-gray-100 bg-gray-50 p-3.5">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="size-4 text-blue-500" />

              <span className="text-xs font-medium">
                Starting Time
              </span>
            </div>

            <p className="mt-1.5 text-sm font-semibold text-gray-900">
              {departureField
                ? formatDepartureDate(departureField)
                  .split(", ")
                  .pop()
                : "N/A"}
            </p>
          </div>

        </div>

        {/* ================= PRICE / QUANTITY ================= */}
        <div className="my-5 flex items-center justify-between border-y border-gray-100 py-4">

          <div>
            <p className="text-xs text-gray-400">
              Quantity
            </p>

            <p className="mt-1 text-sm font-semibold text-gray-900">
              {booking.bookingQuantity}{" "}
              {booking.bookingQuantity > 1 ? "Tickets" : "Ticket"}
            </p>
          </div>

          <div className="text-right">
            <p className="text-xs text-gray-400">
              Total Amount
            </p>

            <div className="mt-1 flex items-center justify-end gap-1">
              <CircleDollar className="size-4 text-green-600" />

              <span className="text-lg font-bold text-gray-950">
                {totalPrice}
              </span>
            </div>
          </div>

        </div>

        {/* ================= COUNTDOWN ================= */}
        <div className="rounded-2xl border border-blue-100 bg-blue-50 p-4">

          <div className="flex items-center justify-between gap-3">

            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-blue-700">
                Journey Starts In
              </p>

              <p className="mt-1 text-xs text-blue-500">
                Time remaining before your journey
              </p>
            </div>

            <div className="shrink-0 rounded-xl bg-white px-3 py-2 text-sm font-bold text-blue-700 shadow-sm">
              {countdown || "Calculating..."}
            </div>

          </div>

        </div>

        {/* ================= PAYMENT ================= */}
        {booking.status?.toLowerCase() === "accepted" &&
          countdown !== "Departed" && (
            <Button
              onPress={handlePayment}
              color="success"
              className="mt-5 w-full rounded-xl font-semibold"
              size="lg"
            >
              Pay Now
            </Button>
          )}

      </div>
    </Card>
  );
};

export default UserBookedTicketCard;