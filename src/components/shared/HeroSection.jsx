"use client";

import { Button, Card, Input } from "@heroui/react";
import {
  ArrowRight,
  Magnifier,
  Calendar,
  Route,
  Person,
  //Bus,
  //Plane,
  //Train,
} from "@gravity-ui/icons";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-blue-700 to-cyan-600" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.2),transparent_30%)]" />

      <div className="relative mx-auto flex min-h-[90vh] max-w-7xl flex-col items-center gap-16 px-4 py-20 lg:flex-row lg:px-8">
        {/* Left Content */}
        <div className="flex-1 text-center lg:text-left">
          <span className="inline-flex rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm text-white backdrop-blur-md">
            🎫 Fast & Secure Ticket Booking
          </span>

          <h1 className="mt-6 text-5xl font-bold leading-tight text-white md:text-6xl lg:text-7xl">
            Book Your Next
            <span className="block text-cyan-200">Journey Online</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg text-white/80">
            Compare prices, choose your preferred seat, and get instant
            confirmation for bus, train, flight, and launch tickets.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4 lg:justify-start">
            <Button
              color="primary"
              size="lg"
              endContent={<ArrowRight />}
            >
              Search Tickets
            </Button>

            <Button
              variant="bordered"
              size="lg"
              className="border-white text-white"
            >
              Explore Routes
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-6 text-white">
            <div>
              <h3 className="text-2xl font-bold">50K+</h3>
              <p className="text-sm text-white/70">Users</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">10K+</h3>
              <p className="text-sm text-white/70">Routes</p>
            </div>

            <div>
              <h3 className="text-2xl font-bold">99.9%</h3>
              <p className="text-sm text-white/70">Success</p>
            </div>
          </div>
        </div>

        {/* Right Search Card */}
        <div className="relative w-full max-w-lg flex-1">
          <Card
            variant="tertiary"
            className="border border-white/10 backdrop-blur-xl"
          >
            <Card.Header>
              <Card.Title>Find Your Ticket</Card.Title>
              <Card.Description>
                Search and book tickets in seconds.
              </Card.Description>
            </Card.Header>

            <Card.Content className="space-y-4">
              <Route />
              <Input
                label="From"
                placeholder="Dhaka"
                
              />

              <Route />
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

                <Person />
                <Input
                  label="Passengers"
                  placeholder="1"
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