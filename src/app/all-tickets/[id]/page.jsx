import { getTicketById } from "@/lib/actions/tickets";
import TicketDetails from "./TicketDetails";

const TicketDetailsPage = async ({ params }) => {
  const data = await params
  const ticket = await getTicketById(data.id);

  return (
    <TicketDetails ticket={ticket} />
 ) 
};

export default TicketDetailsPage;