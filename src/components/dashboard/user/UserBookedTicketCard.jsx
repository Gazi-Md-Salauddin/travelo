"use client";

import { useEffect, useState } from "react";
import { Card, Button, Chip, Calendar } from "@heroui/react";
import Image from "next/image";
import {
  Clock,
  MapPin
} from "@gravity-ui/icons";
import { ArrowRight, CalendarDays, CreditCard, DollarSignIcon, Ticket } from "lucide-react";

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
        setCountdown("Journey Started");
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
    <Card className="group relative overflow-hidden rounded-3xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-gray-700 dark:bg-[#1B2432] dark:hover:border-blue-900">

  {/* Top Accent */}
  <div className="h-1 w-full bg-blue-600" />

  {/* ================= HEADER ================= */}
  <div className="p-5 pb-4">

    <div className="flex items-start gap-4">

      {/* Image */}
      <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-gray-100 dark:bg-gray-800">
        <Image
          src={booking.ticketImage}
          alt={booking.ticketTitle}
          width={120}
          height={120}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
      </div>

      {/* Ticket Details */}
      <div className="min-w-0 flex-1">

        <div className="flex items-start justify-between gap-2">

          <h2 className="line-clamp-2 text-lg font-bold leading-snug text-gray-900 dark:text-white">
            {booking.ticketTitle}
          </h2>

          <Chip
            color={getStatusColor(booking.status)}
            variant="soft"
            size="sm"
            className="shrink-0 font-semibold capitalize"
          >
            {booking.status}
          </Chip>

        </div>

        {/* Route */}
        <div className="mt-2 flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
          <MapPin className="size-4 shrink-0 text-blue-600" />
          <span className="truncate">{booking.ticketFrom}</span>
          <ArrowRight className="size-3.5 shrink-0 text-gray-400" />
          <span className="truncate">{booking.ticketTo}</span>
        </div>

        {/* Price */}
        <div className="mt-3 flex items-baseline gap-1">
          
          <span className="flex items-center text-2xl font-extrabold tracking-tight text-gray-950 dark:text-white">
            <DollarSignIcon /> {totalPrice}
          </span>
        </div>

      </div>
    </div>

  </div>

  {/* ================= DIVIDER ================= */}
  <div className="relative flex items-center px-5">
    <div className="h-px flex-1 border-t border-dashed border-gray-300 dark:border-gray-600" />
    
  </div>

  {/* ================= CONTENT ================= */}
  <div className="p-5 pt-4">

    {/* Journey Information */}
    <div className="grid grid-cols-2 gap-3">

      {/* Date */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-3.5 dark:border-gray-600 dark:bg-[#111827]/70">

        <div className="flex items-center gap-2 text-gray-400">
          <CalendarDays className="size-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-medium">Journey Date</span>
        </div>

        <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
          {booking.departureDate || "N/A"}
        </p>

      </div>

      {/* Time */}
      <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-3.5 dark:border-gray-600 dark:bg-[#111827]/70">

        <div className="flex items-center gap-2 text-gray-400">
          <Clock className="size-4 text-blue-600 dark:text-blue-400" />
          <span className="text-xs font-medium">Departure Time</span>
        </div>

        <p className="mt-2 text-sm font-bold text-gray-900 dark:text-white">
          {departureField
            ? formatDepartureDate(departureField).split(", ").pop()
            : "N/A"}
        </p>

      </div>

    </div>

    {/* ================= TICKET SUMMARY ================= */}
    <div className="mt-4 flex items-center justify-between rounded-2xl border border-gray-200 px-4 py-3 dark:border-gray-600">

      <div className="flex items-center gap-3">

        <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
          <Ticket className="size-5 text-blue-600 dark:text-blue-400" />
        </div>

        <div>
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Booking Quantity
          </p>
          <p className="mt-1 text-sm font-bold text-gray-900 dark:text-white">
            {booking.bookingQuantity}{" "}
            {booking.bookingQuantity > 1 ? "Tickets" : "Ticket"}
          </p>
        </div>

      </div>

      <span className="text-xs font-medium text-gray-400">
        Travelo Booking
      </span>

    </div>

    {/* ================= COUNTDOWN ================= */}
    <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4 dark:border-blue-900/50 dark:bg-blue-500/[0.07]">

      <div className="flex items-center justify-between gap-3">

        <div className="flex min-w-0 items-start gap-3">

          <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm dark:bg-[#263449]">
            <Clock className="size-5 text-blue-600 dark:text-blue-400" />
          </div>

          <div className="min-w-0">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
              Journey Starts In
            </p>

            <p className="mt-1 text-xs text-blue-600/70 dark:text-blue-300/70">
              Time remaining before departure
            </p>
          </div>

        </div>

        <div className="shrink-0 rounded-xl border border-blue-100 bg-white px-3 py-2 text-sm font-bold text-blue-700 shadow-sm dark:border-blue-900 dark:bg-[#263449] dark:text-blue-400">
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
          size="lg"
          className="mt-4 w-full rounded-xl font-bold shadow-sm transition-all hover:shadow-md"
        >
          <CreditCard className="size-4" />
          Pay Now
        </Button>
      )}

  </div>
</Card>
  );
};

export default UserBookedTicketCard;