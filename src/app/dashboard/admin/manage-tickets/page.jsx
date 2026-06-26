
import {getAdminTickets} from '@/lib/actions/tickets'
import AdminManageTicket from '@/components/AdminManageTicket'

const ManageTicketsPage = async () => {
  const data = await getAdminTickets();

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
            {data?.tickets?.map((ticket) => {
  const color = getStatusColor(ticket.status)
  return (
              <AdminManageTicket key={ticket._id} ticket={ticket} color={color}/>
   ) 
})}
            
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default ManageTicketsPage;