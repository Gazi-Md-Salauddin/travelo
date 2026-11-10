"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Chip,
} from "@heroui/react";

import {
  updateBookingStatus
} from "@/lib/actions/booking";
import { useSession } from '@/lib/auth-client'

const RequestedBookingRow = ({
  booking
}) => {
  const { data: session, isPending } = useSession();

  const user = session?.user
  const router = useRouter();

  const handleAccept = async () => {
    await updateBookingStatus(
      booking._id,
      "Accepted"
    );

    router.refresh();
  };

  const handleReject = async () => {
    await updateBookingStatus(
      booking._id,
      "Rejected"
    );

    router.refresh();
  };

  const getStatusColor = (status) => {
    switch (
    status?.toLowerCase()
    ) {
      case "accepted":
        return "success";

      case "rejected":
        return "danger";
      case "paid":
        return "accent";

      default:
        return "warning";
    }
  };

  return (
    <tr className="border-b">
      <td className="flex gap-2 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-100 font-bold text-blue-600">
          {booking.userName?.charAt(0)?.toUpperCase() || "U"}
        </div>
        <div>
          <p className="font-medium">
            {booking.userName}
          </p>

          <p className="text-sm text-default-500">
            {booking.userEmail}
          </p>
        </div>
      </td>

      <td className="p-4 text-center">
        {booking.ticketTitle}
      </td>

      <td className="p-4 text-center">
        <span className="rounded-lg bg-gray-100 px-3 py-1.5 font-semibold text-gray-700">
          {booking.bookingQuantity}
        </span>
      </td>

      <td className="p-4 text-center">
        {booking.totalPrice}
      </td>

      <td className="p-4 text-center">
        <Chip
          color={getStatusColor(
            booking.status
          )}
          variant="soft"
        >
          {booking.status}
        </Chip>
      </td>

      <td className="p-4 text-center">
        <div className="flex gap-2 justify-center">
          <Button
            size="sm"
            color="success"
            variant="success"
            onPress={
              handleAccept
            }
            isDisabled={
              booking.status ===
              "Accepted" || booking.status === "paid"

            }
          >
            Accept
          </Button>

          <Button
            size="sm"
            color="danger"
            variant="danger"
            onPress={
              handleReject
            }
            isDisabled={
              booking.status ===
              "Rejected" || booking.status === "paid"

            }
          >
            Reject
          </Button>
        </div>
      </td>
    </tr>
  );
};

export default RequestedBookingRow;