"use client";

import { Button } from "@heroui/react";
import { Plane } from "@gravity-ui/icons";
import Link from "next/link";
import Image from "next/image";

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

            <Link href="/all-tickets"
              className="text-blue-500 bg-transparent border border-blue-500 rounded-full font-bold py-2 px-4"
            >
              Explore Routes
            </Link>
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
          <div className="relative overflow-hidden rounded-2xl border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur-xl">

            {/* Travel Image */}
            <div className="relative h-70 overflow-hidden rounded-xl">
              <Image
                src="/image/hero-right.jpg"
                alt="Beautiful travel destination"
                fill
                className="h-full w-full object-cover"
              />

              {/* Image Overlay */}
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />

              {/* Top Badge */}
              <div className="absolute left-4 top-4">
                <span className="rounded-full border border-white/30 bg-white/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                  ✨ Explore the World
                </span>
              </div>

              {/* Image Content */}
              <div className="absolute bottom-5 left-5 right-5">
                <p className="mb-2 text-sm font-medium text-white/80">
                  YOUR NEXT ADVENTURE STARTS HERE
                </p>

                <h2 className="text-3xl font-bold leading-tight text-white">
                  Discover Beautiful
                  <br />
                  Destinations
                </h2>

                <p className="mt-2 text-sm text-white/80">
                  Every journey brings a new story.
                </p>
              </div>
            </div>

            {/* Bottom Content */}
            <div className="mt-5 flex items-center justify-between gap-3">
              <div>
                <p className="text-sm font-semibold text-white">
                  Make Every Journey Special
                </p>
                <p className="mt-1 text-xs text-white/60">
                  Travel more, explore more.
                </p>
              </div>

              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-white/20 bg-white/10">
                <Plane className="text-2xl text-white" />
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}