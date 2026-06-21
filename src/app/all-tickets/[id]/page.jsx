import { getTicketById } from "@/lib/actions/tickets";
import TicketDetails from "./TicketDetails";
import { getUserSession } from '@/lib/core/session';

const TicketDetailsPage = async ({ params }) => {
  const data = await params
  const ticket = await getTicketById(data.id);

  const user = await getUserSession()
  
  return (
    <TicketDetails ticket={ticket} user={user} />
 ) 
};

export default TicketDetailsPage;