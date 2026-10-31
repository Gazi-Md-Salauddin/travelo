"use client"
import { MapPin } from "@gravity-ui/icons";
import { Chip } from "@heroui/react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";


const AdvertisementSection = ({ tickets }) => {
  return (
    <section className="py-16">
      <motion.div initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }} className="max-w-7xl mx-auto px-4">

        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
            Featured Journeys
          </span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            Advertised Tickets
          </h2>
          <p className="mt-4 text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-400">
            Explore handpicked travel deals and discover your next journey at the best value
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tickets?.map((ticket) => (
            <div
              key={ticket._id}
              className="border rounded-xl overflow-hidden shadow-sm dark:bg-[#1F2937] dark:border-[#374151]"
            >
              <Image
                src={ticket.image}
                alt={ticket.title}
                width={600}
                height={400}
                className="h-64 object-cover"
              />

              <div className="p-5">

                <h3 className="text-2xl font-bold">
                  {ticket.title}
                </h3>
                <div className="mt-4 flex items-center gap-2 text-gray-500">
                  <MapPin className="size-4 text-blue-600" />

                  <span className="text-sm font-medium">
                    {ticket.from}
                    <span className="mx-2 text-gray-300">→</span>
                    {ticket.to}
                  </span>
                </div>

                <div className="flex justify-between px-2 my-2 bg-blue-100/40 rounded-md dark:bg-gray-100/10 dark:text-white">
                  <div >
                    <p className="text-md font-medium">Leaves</p>
                    <h2 className="text-xl font-bold">{ticket.departureTime}</h2>
                    <p>From {ticket.from}</p>
                  </div>

                  <div className="text-center">
                    <p className="font-medium">Available</p>
                    <p className="text-2xl font-bold">{ticket.quantity}</p>
                    <p className="font-medium">Tickets</p>
                  </div>

                </div>

                <p>
                  <strong>Transport:</strong>{" "}
                  {ticket.transportType}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {ticket.perks?.map((perk) => (
                    <Chip
                      key={perk}
                      size="sm"
                      color="accent"
                      variant="soft"

                    >
                      {perk}
                    </Chip>
                  ))}
                </div>

                <div className="flex justify-between">
                  <div className="mt-2 text-center">
                    <p className="text-md">Price (Per Ticket)</p>
                    <p className="font-bold text-2xl">{ticket.price}</p>
                  </div>

                  <Link
                    href={`/all-tickets/${ticket._id}`}
                    className="mt-5 inline-block bg-blue-600 text-white font-medium px-4 py-2 rounded-lg hover:bg-blue-500"
                  >
                    See Details
                  </Link>

                </div>


              </div>
            </div>
          ))}

        </div>

      </motion.div>
    </section>
  );
};

export default AdvertisementSection;