
import { getUserBookings } from "@/lib/actions/booking";
import UserBookedTicketCard from "@/components/dashboard/user/UserBookedTicketCard";
import { getUserSession } from '@/lib/core/session';
import Link from "next/link";

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
      <h1 className="text-3xl text-center font-bold mb-6">
        My Booked Tickets
      </h1>
      <p className="my-3 text-center text-md sm:text-base text-default-500">
        Manage your bookings and get ready for your next adventure.
      </p>

      {bookings.length === 0 ? (
        <div className="relative overflow-hidden rounded-3xl border border-default-200 bg-content1 px-6 py-16 sm:py-20 text-center shadow-sm">
          {/* Decorative elements */}
          <div className="absolute -top-16 -right-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />
          <div className="absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-primary/5 blur-3xl" />

          <div className="relative mx-auto flex max-w-lg flex-col items-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/15 bg-primary/10 text-blue-500 shadow-sm">
              <svg
                className="h-10 w-10"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.6}
                  d="M4 7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5V9a2 2 0 0 0 0 4v3.5a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 4 16.5V13a2 2 0 0 0 0-4V7.5Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.6}
                  strokeDasharray="2 2"
                  d="M14 5v14"
                />
              </svg>
            </div>

            <span className="mt-6 text-xs font-semibold uppercase tracking-[0.2em] text-primary">
              Your next journey awaits
            </span>

            <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-blue-500">
              No bookings yet
            </h2>

            <p className="mt-3 max-w-md text-sm sm:text-base leading-7 text-default-500">
              Your travel story starts here. Explore available tickets,
              discover new destinations, and book your next journey with ease.
            </p>

            <Link href="/all-tickets">
            <button
              type="button"
              className="mt-8 inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-6 py-3 font-semibold text-white shadow-lg shadow-primary/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl active:translate-y-0"
            >
              Explore Tickets
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 12h14m-6-6 6 6-6 6"
                />
              </svg>
            </button>
            </Link>
            
            <div className="mt-8 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs text-default-400">
              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                </svg>
                Easy booking
              </span>

              <span className="flex items-center gap-1.5">
                <svg className="h-4 w-4 text-success" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m5 12 4 4L19 6" />
                </svg>
                Secure payments
              </span>
            </div>
          </div>
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