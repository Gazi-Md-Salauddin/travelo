
import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Zap,
  Headphones,
  CreditCard,
  Bus,
  Train,
  Plane,
  Target,
  Eye,
  ArrowRight,
  Ticket,
  MapPin,
  Clock,
  Users,
} from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Secure Booking",
    description:
      "Book your tickets confidently with secure authentication and protected transactions.",
  },
  {
    icon: Zap,
    title: "Instant Confirmation",
    description:
      "Enjoy a smooth booking experience with quick reservation confirmation.",
  },
  {
    icon: CreditCard,
    title: "Easy Payments",
    description:
      "Experience convenient and secure online payment options.",
  },
  {
    icon: Headphones,
    title: "Reliable Support",
    description:
      "Get assistance whenever you need help with your travel bookings.",
  },
];

const steps = [
  {
    number: "01",
    icon: MapPin,
    title: "Explore Tickets",
    description:
      "Browse available bus, train, and flight tickets for your destination.",
  },
  {
    number: "02",
    icon: Ticket,
    title: "Book Your Ticket",
    description:
      "Choose your preferred journey and complete your booking easily.",
  },
  {
    number: "03",
    icon: CreditCard,
    title: "Make Payment",
    description:
      "Complete your payment through our available payment methods.",
  },
  {
    number: "04",
    icon: Plane,
    title: "Enjoy Your Journey",
    description:
      "Get ready for your trip and enjoy a comfortable travel experience.",
  },
];

const transportTypes = [
  {
    icon: Bus,
    title: "Bus",
    description: "Discover convenient bus journeys.",
  },
  {
    icon: Train,
    title: "Train",
    description: "Explore comfortable train travel.",
  },
  {
    icon: Plane,
    title: "Flight",
    description: "Find flights for your next adventure.",
  },
];

const AboutPage = () => {
  return (
    <main className="overflow-hidden bg-white text-gray-900 dark:bg-[#171717] dark:text-white">

      {/* ================= HERO ================= */}
      <section className="relative border-b border-gray-100 bg-gray-50 dark:border-gray-800 dark:bg-[#1F2937]">
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-28">

          <div className="mx-auto max-w-3xl text-center">

            <span className="inline-flex items-center gap-2 rounded-full border border-blue-100 bg-blue-50 px-4 py-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:border-blue-900 dark:bg-blue-500/10 dark:text-blue-400">
              <Ticket className="size-4" />
              About Travelo
            </span>

            <h1 className="mt-6 text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              Your Journey,
              <span className="block text-blue-600 dark:text-blue-400">
                Our Priority.
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-gray-600 dark:text-gray-300 sm:text-lg">
              Travelo makes online ticket booking simple, convenient, and
              accessible. Discover bus, train, and flight tickets and
              plan your next journey with confidence.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/all-tickets"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Explore Tickets
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/contact"
                className="rounded-xl border border-gray-300 px-6 py-3.5 text-sm font-semibold transition hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-800"
              >
                Contact Us
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHO WE ARE ================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">

          <div>
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Who We Are
            </span>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Making Every Journey
              <span className="text-blue-600 dark:text-blue-400">
                {" "}Easier.
              </span>
            </h2>

            <p className="mt-6 leading-8 text-gray-600 dark:text-gray-400">
              Travelo is an online ticket booking platform designed to
              simplify the way people plan and book their journeys.
              We bring different transportation options together in
              one convenient place.
            </p>

            <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
              Whether you are planning a short trip or a long-distance
              journey, Travelo helps you explore available tickets,
              compare options, and manage your bookings with ease.
            </p>

            <div className="mt-8 grid grid-cols-2 gap-4">

              <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                  <Users className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-3 font-bold">User Focused</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Designed around your convenience.
                </p>
              </div>

              <div className="rounded-2xl border border-gray-200 p-4 dark:border-gray-700">
                <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                  <Clock className="size-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="mt-3 font-bold">Time Saving</h3>
                <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                  Book your journey with ease.
                </p>
              </div>

            </div>
          </div>

          {/* Transport Cards */}
          <div className="grid grid-cols-2 gap-4">

            <div className="flex flex-col justify-center gap-4 rounded-3xl bg-blue-600 p-6 text-white sm:p-8">
              <Bus className="size-10" />
              <h3 className="text-2xl font-bold">Travel Your Way</h3>
              <p className="text-sm leading-6 text-blue-100">
                Explore different transportation options from one platform.
              </p>
            </div>

            <div className="space-y-4 pt-8">

              {transportTypes.map((transport) => {
                const Icon = transport.icon;

                return (
                  <div
                    key={transport.title}
                    className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-[#1F2937]"
                  >
                    <div className="flex size-10 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                      <Icon className="size-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <h3 className="mt-3 font-bold">{transport.title}</h3>
                    <p className="mt-1 text-xs leading-5 text-gray-500 dark:text-gray-400">
                      {transport.description}
                    </p>
                  </div>
                );
              })}

            </div>
          </div>

        </div>
      </section>

      {/* ================= MISSION & VISION ================= */}
      <section className="bg-gray-50 py-20 dark:bg-[#1F2937]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              What Drives Us
            </span>
            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Our Mission & Vision
            </h2>
            <p className="mt-4 text-gray-600 dark:text-gray-400">
              We believe planning a journey should be as enjoyable
              as the journey itself.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">

            <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10">
                <Target className="size-6 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Our Mission</h3>

              <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                Our mission is to make ticket booking easier and more
                accessible by providing a convenient platform where
                travelers can discover, compare, and book transportation
                services with confidence.
              </p>
            </div>

            <div className="rounded-3xl border border-gray-200 p-8 dark:border-gray-700">
              <div className="flex size-12 items-center justify-center rounded-2xl bg-blue-50 dark:bg-blue-500/10">
                <Eye className="size-6 text-blue-600 dark:text-blue-400" />
              </div>

              <h3 className="mt-6 text-2xl font-bold">Our Vision</h3>

              <p className="mt-4 leading-8 text-gray-600 dark:text-gray-400">
                Our vision is to create a trusted and user-friendly
                travel booking experience that connects people with
                convenient transportation options and makes every
                journey easier to plan.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ================= WHY CHOOSE US ================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">

        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
            Why Travelo
          </span>

          <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
            Why Choose Travelo?
          </h2>

          <p className="mt-4 text-gray-600 dark:text-gray-400">
            Everything you need for a smoother and more convenient
            ticket booking experience.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">

          {features.map((feature) => {
            const Icon = feature.icon;

            return (
              <div
                key={feature.title}
                className="group rounded-2xl border border-gray-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-[#1F2937] dark:hover:border-blue-900"
              >
                <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 transition-colors group-hover:bg-blue-600 dark:bg-blue-500/10">
                  <Icon className="size-6 text-blue-600 transition-colors group-hover:text-white dark:text-blue-400" />
                </div>

                <h3 className="mt-5 text-lg font-bold">
                  {feature.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                  {feature.description}
                </p>
              </div>
            );
          })}

        </div>
      </section>

      {/* ================= HOW IT WORKS ================= */}
      <section className="bg-gray-50 py-20 dark:bg-[#1F2937]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">

          <div className="mx-auto mb-14 max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-blue-600 dark:text-blue-400">
              Simple Process
            </span>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              How Travelo Works
            </h2>

            <p className="mt-4 text-gray-600 dark:text-gray-400">
              Your next adventure is just a few simple steps away.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

            {steps.map((step) => {
              const Icon = step.icon;

              return (
                <div key={step.number} className="relative">

                  <div className="rounded-2xl border border-gray-200 p-6 dark:border-gray-700">

                    <div className="flex items-center justify-between">
                      <div className="flex size-12 items-center justify-center rounded-xl bg-blue-50 dark:bg-blue-500/10">
                        <Icon className="size-6 text-blue-600 dark:text-blue-400" />
                      </div>

                      <span className="text-3xl font-extrabold text-gray-100 dark:text-gray-800">
                        {step.number}
                      </span>
                    </div>

                    <h3 className="mt-6 text-lg font-bold">
                      {step.title}
                    </h3>

                    <p className="mt-3 text-sm leading-7 text-gray-600 dark:text-gray-400">
                      {step.description}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>
        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 lg:py-24">
        <div className="relative overflow-hidden rounded-3xl bg-blue-600 px-6 py-16 text-center text-white sm:px-12">

          <div className="relative z-10 mx-auto max-w-2xl">

            <h2 className="text-3xl font-extrabold sm:text-4xl">
              Ready for Your Next Journey?
            </h2>

            <p className="mt-5 leading-7 text-blue-100">
              Discover your next destination, explore available
              tickets, and make your travel plans with Travelo.
            </p>

            <Link
              href="/tickets"
              className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-7 py-3.5 text-sm font-bold text-blue-600 shadow-sm transition hover:bg-blue-50"
            >
              Start Exploring
              <ArrowRight className="size-4" />
            </Link>

          </div>

        </div>
      </section>

    </main>
  );
};

export default AboutPage;
