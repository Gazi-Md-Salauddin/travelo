
import { getTickets } from "@/lib/actions/tickets";
import { Chip } from "@heroui/react";
import TicketsList from "@/components/dashboard/vendor/TicketsList";
import { Ticket } from "lucide-react";

const TicketsPage = async () => {
  const data = await getTickets();
  const tickets = data?.tickets || [];

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

  // Ticket Statistics
  const totalTickets = tickets.length;

  const approvedTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "approved"
  ).length;

  const pendingTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "pending"
  ).length;

  const rejectedTickets = tickets.filter(
    (ticket) => ticket.status?.toLowerCase() === "rejected"
  ).length;

  const stats = [
    {
      title: "Total Tickets",
      value: totalTickets,
      description: "All added tickets",
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-500/10",
      border: "border-blue-100 dark:border-blue-900/50",
    },
    {
      title: "Approved",
      value: approvedTickets,
      description: "Successfully approved",
      color: "text-green-600 dark:text-green-400",
      bg: "bg-green-50 dark:bg-green-500/10",
      border: "border-green-100 dark:border-green-900/50",
    },
    {
      title: "Pending",
      value: pendingTickets,
      description: "Waiting for approval",
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-500/10",
      border: "border-amber-100 dark:border-amber-900/50",
    },
    {
      title: "Rejected",
      value: rejectedTickets,
      description: "Need your attention",
      color: "text-red-600 dark:text-red-400",
      bg: "bg-red-50 dark:bg-red-500/10",
      border: "border-red-100 dark:border-red-900/50",
    },
  ];

  return (
    <section className="min-h-screen space-y-8 px-4 py-6 sm:px-6 lg:px-8">

      {/* Header */}
      <div className="flex flex-col justify-between gap-4 border-b border-gray-200 pb-6 dark:border-gray-700 sm:flex-row sm:items-center">

        <div>
          <div className="mb-2 flex items-center gap-2">
            <span className="h-6 w-1 rounded-full bg-blue-600" />
            <span className="text-sm font-semibold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Vendor Dashboard
            </span>
          </div>

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl">
            My Added Tickets
          </h1>

          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Manage, monitor and update all your listed tickets.
          </p>
        </div>

      </div>

      {/* Ticket Section */}
      <div className="space-y-2">

        {/* Empty State */}
        {tickets.length === 0 ? (

          <div className="flex min-h-87.5 flex-col items-center justify-center rounded-2xl border border-dashed border-gray-300 bg-gray-50/70 px-5 py-12 text-center dark:border-gray-700 dark:bg-[#1F2937]/50">

            <div className="mb-5 flex size-20 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-500/10">
              <span className="text-4xl"><Ticket /></span>
            </div>

            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
              No Tickets Found
            </h3>

            <p className="mt-2 max-w-sm text-sm leading-6 text-gray-500 dark:text-gray-400">
              You haven&apos;t added any tickets yet. Once you create a ticket,
              it will appear here.
            </p>

          </div>

        ) : (

          /* Filter + Pagination + Tickets */
         <TicketsList tickets={tickets} />


        )}

      </div>

    </section>
  );
};

export default TicketsPage;
