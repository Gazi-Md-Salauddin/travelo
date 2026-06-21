import { getTickets } from "@/lib/actions/tickets";
import VendorAddedTicketCard from '@/components/VendorAddedTicketCard'

const TicketsPage = async () => {
  const tickets = await getTickets();

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
          My Added Tickets
        </h1>

        <p className="text-default-500">
          Manage all tickets you have added.
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold">
            No Tickets Found
          </h3>

          <p className="mt-2 text-default-500">
            You haven't added any tickets yet.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tickets.map((ticket) => {
          const color = getStatusColor(ticket.status)

            const isRejected =
              ticket.status === "rejected";

            return (
              
                
    <VendorAddedTicketCard key={ticket._id} ticket={ticket} color={color}/>
              
            );
          })}
        </div>
      )}
    </section>
  );
};

export default TicketsPage;