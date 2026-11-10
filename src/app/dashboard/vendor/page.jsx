import React from 'react';
import { getTickets } from "@/lib/actions/tickets";
import { getUserSession } from "@/lib/core/session";
import VendorDashboardClient from '@/components/dashboard/vendor/DashboardClient'
import { getRevenueOverview, getVendorBookings } from '@/lib/actions/booking';

const VendorHomePage = async () => {
  const ticketData = await getTickets();
  const tickets = ticketData.tickets || [];

  const user = await getUserSession();

  const bookings = await getVendorBookings(user.email);
  const revenue = await getRevenueOverview(user.email);

  return (
    <VendorDashboardClient
      tickets={JSON.parse(JSON.stringify(tickets))}
      user={user}
      bookings={JSON.parse(JSON.stringify(bookings))}
      revenue={JSON.parse(JSON.stringify(revenue))}
    />
  );
};

export default VendorHomePage;