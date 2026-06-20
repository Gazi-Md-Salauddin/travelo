import {
  getVendorBookings,
} from "@/lib/actions/booking";

import RequestedBookingRow from "@/components/RequestedBookingRow";
import {useSession} from '@/lib/auth-client'


const RequestedBookingsPage =
  async () => {
    const { data: session, isPending } = useSession();

    const user = session?.user
    const vendorEmail =
    {user?.email};

    const bookings =
      await getVendorBookings(
        vendorEmail
      );

    return (
      <section>
        <h1 className="mb-6 text-3xl font-bold">
          Requested Bookings
        </h1>

        <div className="overflow-x-auto rounded-xl border">
          <table className="w-full">
            <thead>
              <tr className="bg-default-100">
                <th className="p-4 text-left">
                  User
                </th>

                <th className="p-4 text-left">
                  Ticket
                </th>

                <th className="p-4 text-left">
                  Quantity
                </th>

                <th className="p-4 text-left">
                  Total Price
                </th>

                <th className="p-4 text-left">
                  Status
                </th>

                <th className="p-4 text-left">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {bookings.map(
                (booking) => (
                  <RequestedBookingRow
                    key={
                      booking._id
                    }
                    booking={
                      booking
                    }
                  />
                )
              )}
            </tbody>
          </table>
        </div>
      </section>
    );
  };

export default RequestedBookingsPage;