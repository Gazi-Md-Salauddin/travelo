"use client";

import { deleteTicket } from "@/lib/actions/tickets";
import { TrashBin } from "@gravity-ui/icons";
import { AlertDialog, Button } from "@heroui/react";
import { useRouter } from "next/navigation";

export default function DeleteAlert({ ticket }) {

  const router = useRouter()

  const handleDelete = async () => {

    await deleteTicket(ticket._id)
    router.refresh()
  }
  const isRejected = ticket.status === "rejected";


  return (
    <AlertDialog>
      <Button variant="danger" className="w-full flex-1"><TrashBin />Delete</Button>
      <AlertDialog.Backdrop>
        <AlertDialog.Container>
          <AlertDialog.Dialog className="sm:max-w-100">
            <AlertDialog.CloseTrigger />
            <AlertDialog.Header>
              <AlertDialog.Icon status="danger" />
              <AlertDialog.Heading>Delete ticket permanently?</AlertDialog.Heading>
            </AlertDialog.Header>
            <AlertDialog.Body>
              <p>
                This will permanently delete <strong>My Ticket</strong> and all of its
                data. This action cannot be undone.
              </p>
            </AlertDialog.Body>
            <AlertDialog.Footer>
              <Button slot="close" variant="tertiary">
                Cancel
              </Button>
              <Button slot="close" color="danger"
                variant="danger"
                onPress={handleDelete}
                isDisabled={isRejected}
              >
                Delete
              </Button>
            </AlertDialog.Footer>
          </AlertDialog.Dialog>
        </AlertDialog.Container>
      </AlertDialog.Backdrop>
    </AlertDialog>
  );
}