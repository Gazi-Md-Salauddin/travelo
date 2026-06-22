
import { redirect } from 'next/navigation'
//import { useRouter } from "next/navigation";
import { stripe } from '../../lib/stripe'
import { CircleCheckFill } from "@gravity-ui/icons";
import Link from 'next/link'

export default async function Success({ searchParams }) {
 const { session_id, booking_id } = await searchParams;

  let isUpdated = false;
  let errorMessage = "";

  if (booking_id && session_id) {
    try {
    
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/bookings/${booking_id}/pay`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        
        body: JSON.stringify({ transactionId: session_id }),
        cache: "no-store"
      });
      const data = await res.json();
      
      if (data.success) {
        isUpdated = true;
      } else {
        errorMessage = data.message;
      }
    } catch (error) {
      errorMessage = "এক্সপ্রেস ব্যাকএন্ড সার্ভারের সাথে কানেক্ট করা যায়নি।";
    }
  }
  if (isUpdated) {
    return (
       <div className="min-h-screen flex items-center justify-center bg-default-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-content1 shadow-lg p-8 text-center">
        <div className="flex justify-center mb-4">
          <CircleCheckFill
            className="text-success"
            width={80}
            height={80}
          />
        </div>

        <h1 className="text-3xl font-bold text-success mb-2">
          Payment Successful
        </h1>

        <p className="text-default-500">
          Your payment has been completed successfully and your booking is now confirmed.
        </p>

        <div className="mt-6 rounded-xl bg-success/10 p-4 text-left">
          <p>
            <span className="font-semibold">Status:</span> Paid
          </p>
          <p>
            <span className="font-semibold">Booking:</span> Confirmed
          </p>
        </div>

        <div className="mt-6 flex gap-3">
          <Link
            href="/dashboard/my-bookings"
            className="flex-1 rounded-lg bg-primary px-4 py-3 text-center text-white font-medium"
          >
            My Bookings
          </Link>

          <Link
            href="/dashboard/user/transaction-history"
            className="flex-1 rounded-lg border px-4 py-3 text-center font-medium"
          >
            Go To Transaction History
          </Link>
        </div>
      </div>
    </div>
    )
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-default-50 px-4">
      <div className="w-full max-w-md rounded-2xl bg-content1 shadow-lg p-8 text-center border border-danger/20">
        <div className="text-danger text-5xl mb-4">✕</div>
        <h1 className="text-2xl font-bold text-danger mb-2">
          Payment Verification Failed
        </h1>
        <p className="text-default-500 mb-6">
          {errorMessage}
        </p>
        <Link
          href="/dashboard/my-bookings"
          className="block w-full rounded-lg bg-primary px-4 py-3 text-center text-white font-medium"
        >
          Back To My Bookings
        </Link>
      </div>
    </div>
  );
}
