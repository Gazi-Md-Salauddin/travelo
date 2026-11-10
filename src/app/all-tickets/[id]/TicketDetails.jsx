"use client";

import { useEffect, useMemo, useState } from "react";
import { createBooking } from "@/lib/actions/booking";
import BookingModal from '@/components/dashboard/user/BookingModal'

import {
  Button,
  Chip,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Input
} from "@heroui/react";

import {
  Calendar,
  Clock,
  MapPin,
  CircleDollar,
  ShieldExclamation,
  ShieldCheck,
  Ticket,
  CircleInfo,
  Check,
  Brush,
  CircleInfoFill,
  Car,
  Route,
} from "@gravity-ui/icons";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";
import { p } from "framer-motion/client";

const TicketDetails = ({ ticket, user }) => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [now, setNow] = useState(() => Date.now());

  const [quantity, setQuantity] = useState(1);

  const departureDateTime = useMemo(() => {
    if (!ticket.departureDate || !ticket.departureTime) {
      return null;
    }

    const [year, month, day] = ticket.departureDate
      .split("-")
      .map(Number);

    const [hours, minutes] = ticket.departureTime
      .split(":")
      .map(Number);

    return new Date(
      year,
      month - 1,
      day,
      hours,
      minutes,
      0
    );
  }, [ticket.departureDate, ticket.departureTime]);

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(Date.now());
    }, 1000);
    return () => clearInterval(interval);
  }, []);


  const countdown = useMemo(() => {
    if (!departureDateTime) return "No Date";

    const distance = departureDateTime.getTime() - now;
    if (distance <= 0) return "Journey Started";

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((distance / (1000 * 60)) % 60);
    const seconds = Math.floor((distance / 1000) % 60);

    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }, [departureDateTime, now]);



  const onOpen = () => setIsOpen(true);
  const onClose = () => setIsOpen(false);


  const increase = () => {
    if (quantity < ticket.quantity) {
      setQuantity(quantity + 1)
    }
  }
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }

  const isExpired = departureDateTime && departureDateTime.getTime() < now;

  // For Time Formatting
  const formatTime = (time) => {
    if (!time) return "N/A";

    const [hours, minutes] = time.split(":");

    const date = new Date();
    date.setHours(Number(hours), Number(minutes), 0, 0);

    return date.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // For Date Formatting
  const formatDate = (dateString) => {
    if (!dateString) return "N/A";

    const [year, month, day] = dateString.split("-").map(Number);

    const date = new Date(year, month - 1, day);

    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };


  const handleBooking = async () => {

    if (quantity > ticket.quantity) {
      toast.error(
        "Booking quantity can't be greater than available ticket quantity."
      );
      return;
    }

    const bookingData = {
      ticketId: ticket._id,
      ticketTitle: ticket.title,
      ticketImage: ticket.image,

      userName: user.name,
      userEmail: user.email,

      vendorName: ticket.vendorName,
      vendorEmail: ticket.vendorEmail,

      ticketFrom: ticket.from,
      ticketTo: ticket.to,
      bookingQuantity: quantity,

      pricePerTicket: ticket.price,

      totalPrice: quantity * ticket.price,

      status: "pending",

      departureDate: ticket.departureDate,
      departureTime: ticket.departureTime,

      createdAt: new Date(),
    };

    const result = await createBooking(
      bookingData
    );

    if (result.insertedId) {
      toast.success("Booking Ticket Successful");

      onClose();

      router.push(
        "/dashboard/user/booked-tickets"
      );
    }
  };

  return (
    <section className="min-h-screen bg-[#F3F6FB] px-4 py-8 sm:px-6 lg:px-8 dark:bg-[#111827]">
      <div className="mx-auto max-w-7xl">

        {/* Breadcrumb */}
        <div className="mb-6 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/all-tickets" className="hover:text-blue-600">
            All Tickets
          </Link>
          <span>/</span>
          <span className="font-medium text-[#071F3D] dark:text-white">
            {ticket.title}
          </span>
        </div>

        {/* PREMIUM HERO */}
        <div className="relative overflow-hidden rounded-[28px] bg-[#071F3D] text-white">

          <div className="absolute -right-20 -top-32 size-96 rounded-full bg-blue-500/20 blur-3xl" />

          <div className="relative grid items-center gap-8 p-6 sm:p-10 lg:grid-cols-[1fr_320px]">

            {/* Hero Content */}
            <div>

              <div className="mb-8 flex flex-wrap items-center gap-3">
                <span className="rounded-full border border-blue-300/30 bg-blue-500/20 px-4 py-1.5 text-xs font-semibold text-blue-200">
                  {ticket.transportType}
                </span>

                <span className={`flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-semibold ${ticket.quantity > 0
                    ? "bg-green-500/15 text-green-300"
                    : "bg-red-500/15 text-red-300"
                  }`}>
                  <span className={`size-2 rounded-full ${ticket.quantity > 0 ? "bg-green-400" : "bg-red-400"
                    }`} />
                  {ticket.quantity > 0 ? "Available for Booking" : "Sold Out"}
                </span>
              </div>

              <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-blue-300">
                Your Next Journey
              </p>

              <h1 className="max-w-2xl text-3xl font-bold leading-tight tracking-tight sm:text-5xl">
                {ticket.from}
                <span className="mx-3 font-light text-blue-400">→</span>
                {ticket.to}
              </h1>

              <p className="mt-5 text-base text-blue-100/70">
                Travel comfortably with {ticket.title}
              </p>

              {/* Journey Meta */}
              <div className="mt-9 flex flex-wrap gap-x-10 gap-y-5">

                <div>
                  <p className="text-xs text-blue-200/60">Departure Date</p>
                  <p className="mt-2 flex items-center gap-2 font-semibold">
                    <Calendar className="size-4 text-blue-400" />
                    {formatDate(ticket.departureDate)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-blue-200/60">Departure Time</p>
                  <p className="mt-2 flex items-center gap-2 font-semibold">
                    <Clock className="size-4 text-blue-400" />
                    {formatTime(ticket.departureTime)}
                  </p>
                </div>

                <div>
                  <p className="text-xs text-blue-200/60">Available Seats</p>
                  <p className="mt-2 flex items-center gap-2 font-semibold">
                    <Ticket className="size-4 text-blue-400" />
                    {ticket.quantity}
                  </p>
                </div>

              </div>
            </div>

            {/* Hero Image */}
            <div className="relative h-52 overflow-hidden rounded-2xl border border-white/10 lg:h-64">
              <Image
                src={ticket.image}
                alt={ticket.title}
                fill
                priority
                className="object-cover"
              />

              <div className="absolute inset-0 bg-linear-to-t from-[#071F3D]/70 to-transparent" />

              <div className="absolute bottom-4 left-4">
                <p className="text-xs text-blue-100/70">Travel Operator</p>
                <p className="mt-1 text-lg font-bold">{ticket.title}</p>
              </div>
            </div>

          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="mt-8 grid items-start gap-8 lg:grid-cols-[1fr_360px]">

          {/* LEFT CONTENT */}
          <div className="space-y-8">

            {/* Route Section */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-[#1F2937]">

              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
                    The Journey
                  </p>
                  <h2 className="mt-2 text-xl font-bold text-[#071F3D] dark:text-white">
                    Your Travel Route
                  </h2>
                </div>

                <div className="rounded-xl bg-blue-50 p-3 text-blue-600 dark:bg-blue-900/20">
                  <Route className="size-5" />
                </div>
              </div>

              {/* Timeline */}
              <div className="relative ml-2 space-y-10 border-l-2 border-dashed border-blue-200 pl-8 dark:border-gray-600">

                <div className="relative">
                  <span className="absolute -left-10.25 top-1 size-4 rounded-full border-4 border-blue-600 bg-white dark:bg-[#1F2937]" />

                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Departure Point
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-[#071F3D] dark:text-white">
                    {ticket.from}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-sm text-gray-500">
                    <Calendar className="size-4 text-blue-500" />
                    {formatDate(ticket.departureDate)}
                  </p>

                  <p className="mt-1 flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    <Clock className="size-4 text-blue-500" />
                    {formatTime(ticket.departureTime)}
                  </p>
                </div>

                <div className="relative">
                  <span className="absolute -left-10.25 top-1 size-4 rounded-full bg-blue-600 ring-4 ring-blue-100 dark:ring-blue-900/40" />

                  <p className="text-xs font-medium uppercase tracking-wider text-gray-400">
                    Destination
                  </p>

                  <h3 className="mt-2 text-2xl font-bold text-[#071F3D] dark:text-white">
                    {ticket.to}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Your destination
                  </p>
                </div>

              </div>
            </div>

            {/* Operator & Service */}
            <div className="rounded-2xl border border-gray-200 bg-white p-6 sm:p-8 dark:border-gray-700 dark:bg-[#1F2937]">

              <div className="flex items-center gap-4">
                <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-900/30">
                  <Car className="size-7" />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-wider text-gray-400">
                    Operated By
                  </p>
                  <h2 className="mt-1 text-xl font-bold text-[#071F3D] dark:text-white">
                    {ticket.title}
                  </h2>
                  <p className="mt-1 text-sm capitalize text-gray-500">
                    {ticket.transportType} Service
                  </p>
                </div>
              </div>

              <div className="my-7 border-t border-gray-100 dark:border-gray-700" />

              <h3 className="mb-5 font-bold text-[#071F3D] dark:text-white">
                What&apos;s Included
              </h3>

              {ticket.perks?.length > 0 ? (
                <div className="flex flex-wrap gap-3">
                  {ticket.perks.map((perk, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-3 text-sm font-medium text-gray-700 dark:border-gray-600 dark:text-gray-300"
                    >
                      <Check className="size-4 text-blue-600" />
                      {perk}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">
                  No amenities information available.
                </p>
              )}

            </div>

            {/* Important Notice */}
            <div className="flex gap-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-5 dark:border-blue-900/40 dark:bg-blue-900/10">
              <CircleInfoFill className="mt-0.5 size-5 shrink-0 text-blue-600" />

              <div>
                <h3 className="font-bold text-[#071F3D] dark:text-white">
                  Before You Travel
                </h3>

                <p className="mt-2 text-sm leading-6 text-gray-600 dark:text-gray-400">
                  Please arrive at your boarding point before departure.
                  Keep your booking confirmation and necessary travel
                  documents ready.
                </p>
              </div>
            </div>

          </div>

          {/* BOOKING SIDEBAR */}
          <aside className="lg:sticky lg:top-6">

            <div className="overflow-hidden rounded-[24px] border border-gray-200 bg-white shadow-[0_12px_40px_rgba(7,31,61,0.07)] dark:border-gray-700 dark:bg-[#1F2937]">

              {/* Price Header */}
              <div className="border-b border-gray-100 p-6 dark:border-gray-700">

                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-gray-400">
                  Ticket Price
                </p>

                <div className="mt-3 flex items-end gap-2">
                  <span className="text-4xl font-bold tracking-tight text-[#071F3D] dark:text-white">
                    {ticket.price}
                  </span>

                  <span className="mb-1 text-sm text-gray-400">
                    / person
                  </span>
                </div>

                <p className="mt-3 text-sm text-gray-500">
                  Final amount depends on the number of tickets.
                </p>
              </div>

              <div className="space-y-5 p-6">

                {/* Booking Details */}
                <div>
                  <p className="mb-4 text-sm font-bold text-[#071F3D] dark:text-white">
                    Booking Overview
                  </p>

                  <div className="space-y-4">

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-400">Operator</span>
                      <span className="max-w-42.5 truncate font-semibold text-[#071F3D] dark:text-white">
                        {ticket.title}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-400">Travel Date</span>
                      <span className="font-semibold text-[#071F3D] dark:text-white">
                        {formatDate(ticket.departureDate)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-400">Departure</span>
                      <span className="font-semibold text-[#071F3D] dark:text-white">
                        {formatTime(ticket.departureTime)}
                      </span>
                    </div>

                    <div className="flex items-center justify-between gap-3 text-sm">
                      <span className="text-gray-400">Seats Available</span>
                      <span className="font-bold text-green-600">
                        {ticket.quantity}
                      </span>
                    </div>

                  </div>
                </div>

                <div className="border-t border-dashed border-gray-200 dark:border-gray-600" />

                {/* Countdown */}
                <div className="rounded-xl border border-blue-100 p-4">

                  <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                    <Clock className="size-4" />

                    <span className="text-xs font-bold uppercase tracking-wider">
                      Departure Countdown
                    </span>
                  </div>

                  <p className="mt-3 text-xl font-bold text-[#071F3D] dark:text-white">
                    {countdown}
                  </p>

                </div>

                {/* Booking Action */}
                {/* {isExpired ? (
                  <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-center">
                    <p className="font-bold text-amber-700">
                      Journey Started
                    </p>
                    <p className="mt-1 text-xs text-amber-600">
                      Booking is no longer available.
                    </p>
                  </div> */}
                {/* ) : ticket.quantity <= 0 ? ( */}
                  {/* <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-center">
                    <p className="font-bold text-red-700">
                      Sold Out
                    </p>
                    <p className="mt-1 text-xs text-red-600">
                      All tickets have been booked.
                    </p>
                  </div> */}
                {/* ) : ( */}

                  <BookingModal
                    ticket={ticket}
                    handleBooking={handleBooking}
                    increase={increase}
                    decrease={decrease}
                    quantity={quantity}
                  />
                {/* )} */}

                <div className="flex items-center justify-center gap-2 pt-2 text-xs text-gray-400">
                  <ShieldCheck className="size-4 text-green-600" />
                  Secure & Reliable Booking
                </div>

              </div>
            </div>

          </aside>

        </div>
      </div>
    </section>
  );
};

export default TicketDetails;