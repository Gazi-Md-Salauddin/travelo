import { getTicketById } from "@/lib/actions/tickets";
import TicketDetails from "./TicketDetails";
import { getUserSession } from '@/lib/core/session';
import {redirect} from 'next/navigation'

const TicketDetailsPage = async ({ params }) => {

  const user = await getUserSession()

  if(!user){
    redirect("/auth/signin")
  }

  if(user?.role != "user"){
    redirect("/")
  }
  
  const data = await params
  const ticket = await getTicketById(data.id);
  
  
  return (
    <TicketDetails ticket={ticket} user={user} />
 ) 
};

export default TicketDetailsPage;