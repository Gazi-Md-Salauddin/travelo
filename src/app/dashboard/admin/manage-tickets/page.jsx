import { Button, Chip } from "@heroui/react";
import { getAdminTickets } from "@/lib/actions/tickets";

const ManageTicketsPage = async () => {
  const tickets = await getAdminTickets();

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "approved":
        return "success";

      case "rejected":
        return "danger";

      default:
        return "warning";
    }
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">
          Manage Tickets
        </h1>

        <p className="text-default-500">
          Approve or reject vendor tickets.
        </p>
      </div>

      <div className="overflow-x-auto rounded-xl border">
        <table className="w-full">
          <thead className="bg-default-100">
            <tr>
              <th className="p-4 text-left">Ticket</th>
              <th className="p-4 text-left">Route</th>
              <th className="p-4 text-left">Transport</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Vendor</th>
              <th className="p-4 text-left">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => (
              <tr
                key={ticket._id}
                className="border-t"
              >
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={ticket.image}
                      alt={ticket.title}
                      className="h-12 w-12 rounded-lg object-cover"
                    />

                    <span className="font-medium">
                      {ticket.title}
                    </span>
                  </div>
                </td>

                <td className="p-4">
                  {ticket.from} → {ticket.to}
                </td>

                <td className="p-4">
                  {ticket.transportType}
                </td>

                <td className="p-4">
                  ৳{ticket.price}
                </td>

                <td className="p-4">
                  {ticket.vendorName}
                </td>

                <td className="p-4">
                  <Chip
                    color={getStatusColor(
                      ticket.status
                    )}
                    variant="flat"
                  >
                    {ticket.status}
                  </Chip>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      color="success"
                      isDisabled={
                        ticket.status ===
                        "approved"
                      }
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      color="danger"
                      isDisabled={
                        ticket.status ===
                        "rejected"
                      }
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageTicketsPage;