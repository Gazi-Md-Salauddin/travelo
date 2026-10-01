"use client";

import { Button, Calendar, Card, Input } from "@heroui/react";
import {
  ArrowRight,
  Bus,
  Plane,
  Train,
  ShieldCheck,
  Ticket,
  Magnifier,
  Person,
  Route,
} from "@gravity-ui/icons";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/image/hero.jpg')",
        }} />
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative mx-auto flex min-h-[80vh] max-w-7xl flex-col items-center gap-16 px-4 py-20 lg:flex-row lg:px-8">

        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            🎫 Fast & Secure Ticket Booking
          </span>

          <h1 className="mt-6 text-5xl font-bold text-white md:text-6xl lg:text-7xl">
            Book Your Next
            <span className="block text-blue-400">
              Journey Online
            </span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            Compare prices, choose your preferred seat, and get instant
            confirmation for bus, train, flight, and launch tickets.
          </p>

          {/* CTA */}
          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Link href="/all-tickets"
              className="text-white bg-blue-500 rounded-full font-bold py-2 px-4 hover:bg-blue-600"
            >
              Explore Tickets
            </Link>

            <Button
              variant="bordered"
              size="lg"
              className="border border-white text-white"
            >
              Explore Routes
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4 text-white">
            <div className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/20 text-center py-2">
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-sm text-white/70">Users</p>
            </div>

            <div className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/20 text-center py-2">
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-sm text-white/70">Routes</p>
            </div>

            <div className="backdrop-blur-xl bg-white/20 rounded-xl border border-white/20 text-center py-2">
              <h3 className="text-2xl font-bold">99.9%</h3>
              <p className="text-sm text-white/70">Success</p>
            </div>
          </div>
        </div>

        {/* Right Search Card */}
        <div className="relative w-full max-w-lg flex-1">
          <Card className="border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-xl">

            {/* Header */}
            <Card.Header>
              <h2 className="text-3xl font-bold text-white">Find Your Ticket</h2>
              <p className="text-md text-white/70">
                Search and book tickets in seconds.
              </p>
            </Card.Header>

            <Card.Content className="space-y-4 flex">
              <Route className="text-white" />
              <Input
                label="From"
                placeholder="Dhaka"
              />

              <Route className="text-white" />
              <Input
                label="To"
                placeholder="Chattogram"
              />

              <div className="grid grid-cols-1 gap-3">
                <Calendar />
                <Input
                  label="Date"
                  type="date"
                />

                <Person className="text-white" />
                <Input
                  label="Passengers"
                  placeholder="1 Passenger"
                />
              </div>

              <Button
                color="primary"
                fullWidth
                size="lg"
              >
                <Magnifier />
                Search Tickets
              </Button>
            </Card.Content>
          </Card>
        </div>
      </div>
    </section>
  );
}