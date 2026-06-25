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
      <section>
        <h1 className="text-3xl font-bold mb-6">
          Advertise Tickets
        </h1>

        <div className="overflow-x-auto border rounded-xl">
          <table className="w-full">
            <thead>
              <tr className="bg-default-100">
                <th className="p-4">
                  Ticket
                </th>

                <th className="p-4">
                  Route
                </th>

                <th className="p-4">
                  Price
                </th>

                <th className="p-4">
                  Advertised
                </th>

                <th className="p-4">
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