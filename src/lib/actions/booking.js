const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

export const createBooking = async (
  bookingData
) => {
  const res = await fetch(
    `${baseUrl}/api/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(bookingData),
    }
  );

  return res.json();
};




export const getVendorBookings = async (
  email
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/vendor/${email}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};


export const updateBookingStatus = async (
  id,
  status
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  return res.json();
};