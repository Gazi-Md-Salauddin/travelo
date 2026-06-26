import Link from "next/link";
import Image from "next/image";


const AdvertisementSection = ({ tickets }) => {
  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">

        <h2 className="text-3xl font-bold mb-8">
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
                className="h-52 w-full object-cover"
              />

              <div className="p-5">

                <h3 className="text-xl font-bold">
                  {ticket.title}
                </h3>

                <p className="mt-2">
                  <strong>Price:</strong> ৳{ticket.price}
                </p>

                <p>
                  <strong>Available:</strong> {ticket.quantity}
                </p>

                <p>
                  <strong>Transport:</strong>{" "}
                  {ticket.transportType}
                </p>

                <div className="flex flex-wrap gap-2 mt-3">
                  {ticket?.perks?.map((perk) => (
                    <span
                      key={perk}
                      className="px-2 py-1 text-xs rounded-full bg-gray-100"
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