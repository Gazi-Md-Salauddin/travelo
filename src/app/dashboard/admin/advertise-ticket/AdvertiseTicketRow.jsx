"use client";

import {
  Button,
  Chip,
} from "@heroui/react";

import {
  toggleAdvertise,
} from "@/lib/actions/tickets";
import {
  CircleDollar
} from "@gravity-ui/icons";

import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

const AdvertiseTicketRow = ({
  ticket,
}) => {
  const router = useRouter();

  const handleToggle =
    async () => {
      const result =
        await toggleAdvertise(
          ticket._id,
          !ticket.isAdvertised
        );

      if (result.modifiedCount) {
        toast.success(
          ticket.isAdvertised
            ? "Advertisement Removed"
            : "Ticket Advertised"
        );

        router.refresh();
      } else {
        toast.error(
          result.message
        );
      }
    };

  return (
    <tr className="border-b">
      <td className="p-4">
        {ticket.title}
      </td>

      <td className="p-4">
        {ticket.from} → {ticket.to}
      </td>

      <td className="p-4">
      <CircleDollar/>{ticket.price}
      </td>

      <td className="p-4">
        <Chip
          color={
            ticket.isAdvertised
              ? "success"
              : "default"
          }
        >
          {ticket.isAdvertised
            ? "Advertised"
            : "Not Advertised"}
        </Chip>
      </td>

      <td className="p-4">
        <Button
          color={
            ticket.isAdvertised
              ? "danger"
              : "primary"
          }
          onPress={
            handleToggle
          }
        >
          {ticket.isAdvertised
            ? "Unadvertise"
            : "Advertise"}
        </Button>
      </td>
    </tr>
  );
};

export default AdvertiseTicketRow;