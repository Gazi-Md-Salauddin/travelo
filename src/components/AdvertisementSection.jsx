import { MapPin } from "@gravity-ui/icons";
import Image from "next/image";
import Link from "next/link";


const AdvertisementSection = ({ tickets }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-4xl font-bold mb-8 text-center">
          Advertised Tickets
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          {tickets?.map((ticket) => (
            <div
              key={ticket._id}
              className="border rounded-xl overflow-hidden shadow-sm"
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

                <div className="bg-gray-200 dark:bg-black/10 dark:text-white">
                  <p className="text-md font-medium">Leaves</p>
                  <h2 className="text-xl font-bold">{ticket.departureTime}</h2>
                  <p>From {ticket.from}</p>
                </div>

                <p className="mt-2">
                  <strong>Price:</strong> {ticket.price}
                </p>

                <p>
                  <strong>Available:</strong> {ticket.quantity}
                </p>

                <p>
                  <strong>Transport:</strong>{" "}
                  {ticket.transportType}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {ticket.perks?.map((perk) => (
                    <span
                      key={perk}
                      className="px-2 py-1 text-xs rounded-full bg-green-300/20 text-green-500"
                    >
                      {perk}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/all-tickets/${ticket._id}`}
                  className="mt-5 inline-block bg-blue-600 text-white px-4 py-2 rounded-lg"
                >
                  See Details
                </Link>

              </div>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
};

export default AdvertisementSection;