import { getVendorBookings } from "@/lib/actions/booking";
import { getUserSession } from "@/lib/core/session";
import { ClockArrowRotateLeft } from '@gravity-ui/icons';
import { CreditCard } from '@gravity-ui/icons';
import { CircleLetterX } from '@gravity-ui/icons';
import { File } from '@gravity-ui/icons';
import BookingPagination from "@/components/dashboard/vendor/BookingPagination";

const RequestedBookingsPage = async () => {
  const user = await getUserSession();
  const bookings = await getVendorBookings(user.email);

  console.log("vendor booking:", bookings);
  const sortedBookings = [...bookings].sort(
    (a, b) =>
      new Date(b.createdAt).getTime() -
      new Date(a.createdAt).getTime()
  );

  const total = bookings.length;
  const paid = bookings.filter(
    (b) => b.status?.toLowerCase() === "paid"
  ).length;
  const pending = bookings.filter(
    (b) => b.status?.toLowerCase() === "pending"
  ).length;
  const rejected = bookings.filter(
    (b) => b.status?.toLowerCase() === "rejected"
  ).length;

  const stats = [
    {
      title: "Total Requests",
      value: total,
      icon: File,
      color: "bg-blue-50 text-blue-600",
    },
    {
      title: "Paid Bookings",
      value: paid,
      icon: CreditCard,
      color: "bg-green-50 text-green-600",
    },
    {
      title: "Pending Requests",
      value: pending,
      icon: ClockArrowRotateLeft,
      color: "bg-orange-50 text-orange-600",
    },
    {
      title: "Rejected",
      value: rejected,
      icon: CircleLetterX,
      color: "bg-red-50 text-red-600",
    },
  ];

  return (
    <section className="min-h-screen bg-gray-50/70 px-4 py-7 md:px-8">

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
          Requested Bookings
        </h1>
        <p className="mt-2 text-sm text-gray-500">
          Manage and track all your customers&apos; booking requests.
        </p>
      </div>

      {/* Statistics */}
      <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.title}
            className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">
                  {stat.title}
                </p>
                <h2 className="mt-2 text-3xl font-bold text-gray-900">
                  {stat.value}
                </h2>
              </div>

              <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${stat.color}`}>
                {typeof stat.icon === "string" ? (
                  stat.icon
                ) : (
                  <stat.icon width={24} height={24} />
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Table */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">

        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-gray-100 px-5 py-5">
          <div>
            <h2 className="text-lg font-bold text-gray-900">
              All Booking Requests
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              You have {total} booking requests.
            </p>
          </div>

          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-semibold text-blue-600">
            {total} Total
          </span>
        </div>

        <BookingPagination bookings={sortedBookings} />
      </div>

    </section>
  );
};

export default RequestedBookingsPage;
