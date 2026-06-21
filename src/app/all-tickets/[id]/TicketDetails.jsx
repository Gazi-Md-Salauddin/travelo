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
} from "@gravity-ui/icons";

import { useRouter } from "next/navigation";

const TicketDetails = ({ ticket, user }) => {

  
  const router = useRouter();

  const [isOpen, setIsOpen] = useState(false);

const onOpen = () => setIsOpen(true);
const onClose = () => setIsOpen(false);

  const [quantity, setQuantity] = useState(1);
  const [countdown, setCountdown] =
    useState("");


  const increase = () => {
    if(quantity < ticket.quantity){
      setQuantity(quantity + 1)
    }
  }
  const decrease = () => {
    if(quantity > 1){
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
      alert(
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
      alert("Booking Ticket Successful");

      onClose();

      router.push(
        "/dashboard/user/booked-tickets"
      );
    }
  };

  //const handleBtn = handleBooking()

  return (
    <section className="mx-auto max-w-6xl min-h-screen p-4">
      <div className="grid gap-8 md:grid-cols-2">
        {/* Image */}
        <div>
          <img
            src={ticket.image}
            alt={ticket.title}
            className="h-[400px] w-full rounded-2xl object-cover"
          />
        </div>

        {/* Details */}
        <div className="space-y-5">
          <h1 className="text-4xl font-bold">
            {ticket.title}
          </h1>

          <div className="flex items-center gap-2">
            <MapPin className="size-4" />

            <span>
              {ticket.from} → {ticket.to}
            </span>
          </div>

          <Chip color="primary" variant="primary">
            {ticket.transportType}
          </Chip>

          <div className="flex items-center gap-2">
            <CircleDollar className="size-4" />

            <span>
              {ticket.price}
            </span>
          </div>

          <div>
            <strong>
              Available Tickets:
            </strong>{" "}
            {ticket.quantity}
          </div>

          <div className="flex items-center gap-2">
            <Calendar className="size-4" />

            <span>
              {ticket.departureDate}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <Clock className="size-4" />

            <span>
              {ticket.departureTime}
            </span>
          </div>

          {/* Countdown */}
          <div>
            <h3 className="mb-2 font-semibold">
              Departure Countdown
            </h3>

            <Chip
              color="warning"
              variant="soft"
            >
              {countdown}
            </Chip>
          </div>

          {/* Perks */}
          <div>
            <h3 className="mb-2 font-semibold">
              Perks
            </h3>

            <div className="flex flex-wrap gap-2">
              {ticket.perks?.map(
                (perk, index) => (
                  <Chip
                    key={index}
                    color="success"
                    variant="soft"
                  >
                    {perk}
                  </Chip>
                )
              )}
            </div>
          </div>

          
      <BookingModal ticket={ticket} handleBooking={handleBooking} increase={increase} decrease={decrease} quantity={quantity}/>
          
        </div>
      </div>

    </section>
  );
};

export default TicketDetails;