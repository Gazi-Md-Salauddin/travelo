
import { getUserBookings } from "@/lib/actions/booking";
import UserBookedTicketCard from "@/components/UserBookedTicketCard";
import { getUserSession } from '@/lib/core/session';

const MyBookingsPage = async () => {
  const user = await getUserSession()


  if (!user || !user.email) {
    return <div className="text-center py-12">Please log in to view bookings.</div>;
  }
  
  const bookings = await getUserBookings(
    user.email
  );
  

  return (
    <section className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">
        My Booked Tickets
      </h1>

      {bookings.length === 0 ? (
        <div className="text-center py-12 text-default-500">
          No bookings found.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking) => (
            <UserBookedTicketCard
              key={booking._id}
              booking={booking}
            />
          ))}
        </div>
      )}
    </section>
  );
};

export default MyBookingsPage;