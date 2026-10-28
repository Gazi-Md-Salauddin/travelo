"use client"
import { Button, Chip } from "@heroui/react";
import React from 'react'
import {updateTicketStatus} from '@/lib/actions/tickets'
import { useRouter } from "next/navigation";

const AdminManageTicket = ({ticket, color}) => {

  const router = useRouter()
  
  const handleApprove = async (id) => {
  await updateTicketStatus(id, "approved");
  router.refresh();
};

const handleReject = async (id) => {
  await updateTicketStatus(id, "rejected");
  router.refresh();
};
  return (
    <tr className="border-t"
              >
    
                <td className="p-4">
                  <div className="flex items-center gap-3">                 

                    <span className="font-medium">
                      {ticket.title}
                    </span>
                  </div>
                </td>

                <td className="p-4 flex">
                  {ticket.from} → {ticket.to}
                </td>

                <td className="p-4">
                  {ticket.transportType}
                </td>

                <td className="p-4">
                  ৳{ticket.price}
                </td>

                <td className="p-4">
                  {ticket.vendorName}
                </td>

                <td className="p-4">
                  <Chip
                    color={color}
                    variant="soft"
                  >
                    {ticket.status}
                  </Chip>
                </td>

                <td className="p-4">
                  <div className="flex justify-center gap-2">
                    <Button
                      size="sm"
                      color="success"
                      variant="primary"
                      isDisabled={
                        ticket.status ===
                        "approved"
                      }
                      onPress={() => handleApprove(ticket._id)}
                    >
                      Approve
                    </Button>

                    <Button
                      size="sm"
                      color="danger"
                      isDisabled={
                        ticket.status ===
                        "rejected"
                      }
                      onPress={() => handleReject(ticket._id)}
                    >
                      Reject
                    </Button>
                  </div>
                </td>
              </tr>
  )
}

export default AdminManageTicket