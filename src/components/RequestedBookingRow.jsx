"use client";

import { useRouter } from "next/navigation";
import {
  Button,
  Chip,
} from "@heroui/react";

import {
  updateBookingStatus
} from "@/lib/actions/booking";
import {useSession} from '@/lib/auth-client'

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
      <td className="p-4">
        <div>
          <p className="font-medium">
            {booking.userName}
          </p>

          <p className="text-sm text-default-500">
            {user?.email}
          </p>
        </div>
      </td>

      <td className="p-4">
        {booking.ticketTitle}
      </td>

      <td className="p-4">
        {booking.bookingQuantity}
      </td>

      <td className="p-4">
        ৳{booking.totalPrice}
      </td>

      <td className="p-4">
        <Chip
          color={getStatusColor(
            booking.status
          )}
          variant="soft"
        >
          {booking.status}
        </Chip>
      </td>

      <td className="p-4">
        <div className="flex gap-2">
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