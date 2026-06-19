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