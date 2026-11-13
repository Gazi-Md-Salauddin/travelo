
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, MapPin } from "lucide-react";

const destinations = [
  
  {
    name: "Khulna",
    location: "Khulna",
    image: "/image/khulna.jpg",
    description: "Discover green landscapes, rivers and natural attractions.",
    search: "Khulna",
  },
  {
    name: "Chittagong",
    location: "Chattogram Division",
    image: "/image/Chittagong.jpg",
    description: "Explore scenic hills, waterfalls and beautiful landscapes.",
    search: "Chittagong",
  },
  {
    name: "Sylhet",
    location: "Sylhet Division",
    image: "/image/Sylhet.jpg",
    description: "Enjoy peaceful green tea gardens and natural beauty.",
    search: "Sylhet",
  }
];

const PopularDestinations = () => {
  return (
    <section className="py-16 sm:py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">

        {/* Section Heading */}
        <div className="mb-10 text-center gap-4">

          <div>
            <span className="text-sm font-bold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Explore Places
            </span>

            <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
              Popular Destinations
            </h2>

            <p className="mt-3 text-sm leading-7 text-gray-500 dark:text-gray-400 sm:text-base">
              Discover amazing destinations and find your next
              unforgettable journey with Travelo.
            </p>
          </div>

        </div>

        {/* Destination Grid */}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">

          {destinations.map((destination) => (
            <Link
              key={destination.name}
              href={`/all-tickets?to=${encodeURIComponent(destination.search)}`}
              className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl dark:border-gray-700 dark:bg-[#1F2937] dark:hover:border-blue-900"
            >

              {/* Destination Image */}
              <div className="relative h-56 overflow-hidden sm:h-64">

                <Image
                  src={destination.image}
                  alt={destination.name}
                  priority
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />

                {/* Image Overlay */}
                <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent" />


                {/* Destination Name */}
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-2xl font-bold text-white">
                    {destination.name}
                  </h3>

                  <div className="mt-1 flex items-center gap-1.5 text-sm text-white/90">
                    <MapPin className="size-4" />
                    {destination.location}
                  </div>
                </div>

                {/* Arrow */}
                <div className="absolute bottom-5 right-4 flex size-9 items-center justify-center rounded-full bg-white text-blue-600 opacity-0 shadow-lg transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100 translate-x-2">
                  <ArrowUpRight className="size-5" />
                </div>

              </div>

              {/* Card Description */}
              <div className="flex items-center justify-between gap-3 p-4">
                <p className="line-clamp-2 text-sm leading-6 text-gray-600 dark:text-gray-300">
                  {destination.description}
                </p>

                <ArrowUpRight className="size-5 shrink-0 text-gray-400 transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400" />
              </div>

            </Link>
          ))}

        </div>

      </div>
    </section>
  );
};

export default PopularDestinations;
