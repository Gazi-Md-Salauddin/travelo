"use client";

import { useEffect, useState } from "react";
import { createBooking } from "@/lib/actions/booking";
import BookingModal from '@/components/BookingModal'


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
} from "@gravity-ui/icons";

import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import Link from "next/link";
import Image from "next/image";

const TicketDetails = ({ ticket, user }) => {

  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] = useState("");

  if (user.role !== 'user') {
    return (
      <div className="w-full min-h-[80vh] flex flex-col justify-center items-center text-white p-6">
        <div className="max-w-md w-full text-center p-8 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-xl">
          <div className="w-12 h-12 bg-amber-500/10 text-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <ShieldExclamation className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-zinc-100 mb-2">Access Restricted</h3>
          <p className="text-zinc-400 text-sm leading-relaxed mb-6">
            Only users can booking for tickets. Please sign in with a user account to proceed.
          </p>
          <Link
            href="/auth/signin"
            className="inline-block w-full px-4 py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 rounded-lg text-sm font-medium transition"
          >
            Switch Account
          </Link>
        </div>
      </div>
    );
  }

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

  const departureDateTime = new Date(
    `${ticket.departureDate}T${ticket.departureTime}`
  );

  const isExpired =
    departureDateTime.getTime() <
    Date.now();

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();

      const distance =
        departureDateTime.getTime() - now;

      if (distance <= 0) {
        setCountdown("Departed");
        return;
      }

      // const days = Math.floor(
      //   distance / (1000 * 60 * 60 * 24)
      // );

      const hours = Math.floor(
        (distance %
          (1000 * 60 * 60 * 24)) /
        (1000 * 60 * 60)
      );

      const minutes = Math.floor(
        (distance %
          (1000 * 60 * 60)) /
        (1000 * 60)
      );

      const seconds = Math.floor(
        (distance % (1000 * 60)) / 1000
      );

      setCountdown(
        `${hours}h ${minutes}m ${seconds}s`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, []);

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

      totalPrice:
        quantity * ticket.price,

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

  //const handleBtn = handleBooking()

  return (
    <section className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">

        {/* Breadcrumb */}
        <div className="mb-6">
          <p className="text-sm text-gray-500">
            Tickets
            <span className="mx-2">/</span>
            <span className="font-medium text-gray-900">
              {ticket.title}
            </span>
          </p>
        </div>

        {/* Main Card */}
        <div className="overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-sm">

          <div className="grid lg:grid-cols-2">

            {/* ================= IMAGE ================= */}
            <div className="relative min-h-80 lg:min-h-155">
              <Image
                src={ticket.image}
                alt={ticket.title}
                
                className="object-cover"
                priority
              />

              {/* Image Overlay */}
              <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/70 via-black/20 to-transparent p-6 lg:p-8">
                <Chip
                  color="primary"
                  variant="solid"
                  className="mb-3"
                >
                  {ticket.transportType}
                </Chip>

                <h2 className="text-2xl font-bold text-white sm:text-3xl">
                  {ticket.from} → {ticket.to}
                </h2>
              </div>
            </div>

            {/* ================= DETAILS ================= */}
            <div className="flex flex-col p-6 sm:p-8 lg:p-10">

              {/* Title */}
              <div>
                <div className="mb-3 flex items-center justify-between gap-4">
                  <span className="text-sm font-medium text-blue-600">
                    Travel Ticket
                  </span>

                  <span className="flex items-center gap-1 rounded-full bg-green-50 px-3 py-1 text-xs font-semibold text-green-700">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    Available
                  </span>
                </div>

                <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                  {ticket.title}
                </h1>

                <div className="mt-3 flex items-center gap-2 text-gray-500">
                  <MapPin className="size-4 text-blue-600" />
                  <span className="text-sm font-medium">
                    {ticket.from} → {ticket.to}
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-7 rounded-2xl border border-blue-100 bg-blue-50 p-5">
                <p className="text-xs font-medium uppercase tracking-wider text-blue-600">
                  Price per ticket
                </p>

                <div className="mt-1 flex items-baseline gap-2">
                  <CircleDollar className="size-5 text-blue-600" />

                  <span className="text-3xl font-bold text-gray-900">
                    {ticket.price}
                  </span>
                </div>
              </div>

              {/* Journey Information */}
              <div className="mt-7">
                <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                  Journey Information
                </h3>

                <div className="mt-4 grid grid-cols-2 gap-3">

                  {/* Date */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Calendar className="size-4" />

                      <span className="text-xs font-medium">
                        Departure Date
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      {ticket.departureDate}
                    </p>
                  </div>

                  {/* Time */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="size-4" />

                      <span className="text-xs font-medium">
                        Departure Time
                      </span>
                    </div>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      {ticket.departureTime}
                    </p>
                  </div>

                  {/* Available */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400">
                      Available Tickets
                    </p>

                    <p className="mt-2 text-sm font-semibold text-gray-900">
                      {ticket.quantity} tickets
                    </p>
                  </div>

                  {/* Transport */}
                  <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                    <p className="text-xs font-medium text-gray-400">
                      Transport
                    </p>

                    <p className="mt-2 text-sm font-semibold capitalize text-gray-900">
                      {ticket.transportType}
                    </p>
                  </div>
                </div>
              </div>

              {/* Countdown */}
              <div className="mt-7 rounded-2xl border border-amber-200 bg-amber-50 p-5">
                <div className="flex items-center justify-between gap-4">

                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-amber-700">
                      Departure Countdown
                    </p>

                    <p className="mt-1 text-sm text-amber-600">
                      Time remaining before departure
                    </p>
                  </div>

                  <Chip
                    color="warning"
                    variant="solid"
                    className="font-bold"
                  >
                    {countdown}
                  </Chip>

                </div>
              </div>

              {/* Perks */}
              {ticket.perks?.length > 0 && (
                <div className="mt-7">
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-400">
                    Included Perks
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-2">
                    {ticket.perks.map((perk, index) => (
                      <Chip
                        key={index}
                        color="success"
                        variant="soft"
                        className="font-medium"
                      >
                        ✓ {perk}
                      </Chip>
                    ))}
                  </div>
                </div>
              )}

              {/* Booking */}
              <div className="mt-8 border-t border-gray-100 pt-6">
                <BookingModal
                  ticket={ticket}
                  handleBooking={handleBooking}
                  increase={increase}
                  decrease={decrease}
                  quantity={quantity}
                />
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Note */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs text-gray-400">
          <span>🔒</span>
          <span>Secure booking • Instant confirmation</span>
        </div>

      </div>
    </section>
  );
};

export default TicketDetails;