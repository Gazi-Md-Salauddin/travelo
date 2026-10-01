import {
  getAdvertiseTickets,
} from "@/lib/actions/tickets";

import AdvertiseTicketRow
from "./AdvertiseTicketRow";

const AdvertiseTicketsPage =
  async () => {
    const tickets =
      await getAdvertiseTickets();

    return (
      <section className="px-8">
        <h1 className="text-3xl text-center font-bold my-6">
          Advertise Tickets
        </h1>

        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-default-100">
                <th className="p-4 text-left">
                  Ticket
                </th>

                <th className="p-4 text-left">
                  Route
                </th>

                <th className="p-4 text-left">
                  Price
                </th>

                <th className="p-4 text-left">
                  Advertised
                </th>

                <th className="p-4 text-left">
                  Action
                </th>
              </tr>
            </thead>

            <tbody>
              {tickets.map(
                (ticket) => (
                  <AdvertiseTicketRow
                    key={ticket._id}
                    ticket={ticket}
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

export default AdvertiseTicketsPage;