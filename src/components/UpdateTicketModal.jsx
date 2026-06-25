"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"
import {
  Button,
  Input,
  Label,
  Modal,
  TextField,
} from "@heroui/react";

import {
  Ticket,
  MapPin,
  CircleDollar,
  Calendar,
  Pencil
} from "@gravity-ui/icons";

import { updateTicket } from "@/lib/actions/tickets";

const UpdateTicketModal = ({ ticket }) => {
  const router = useRouter();

  const [title, setTitle] = useState(ticket.title);
  const [from, setFrom] = useState(ticket.from);
  const [to, setTo] = useState(ticket.to);
  const [price, setPrice] = useState(ticket.price);
  const [quantity, setQuantity] = useState(ticket.quantity);


  const [isOpen, setIsOpen] = useState(false);
  
  const handleUpdate = async () => {
    const updatedData = {
      title,
      from,
      to,
      price: Number(price),
      quantity: Number(quantity),
    };

    try {
      const result = await updateTicket(ticket._id, updatedData);
      
      // ডাটাবেজে মডিফাই হলে বা রেসপন্স পজিটিভ আসলে
      if (result.modifiedCount > 0 || result.acknowledged) {
        toast.success("Ticket Updated Successfully");
        setIsOpen(false);
        router.refresh(); 
      }else if (result.matchedCount > 0) {
      // ডাটা খুঁজে পাওয়া গেছে কিন্তু ইউজার কোনো নতুন তথ্য পরিবর্তন করেনি
      toast.success("Ticket is up to date (No changes made)");
      setIsOpen(false);
    } else {
        toast.error("No changes made or failed to update");
      }
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <Modal>
      <Button
        variant="primary"
        className="w-full"
        isDisabled={ticket.status === "rejected"}
      >
      <Pencil/>Update
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Heading>
                Update Ticket
              </Modal.Heading>
            </Modal.Header>

            <Modal.Body className="space-y-4">
              <TextField>
                <Label>Ticket Title</Label>
                <Input
                  value={title}
                  onChange={(e) =>
                    setTitle(e.target.value)
                  }
                />
              </TextField>

              <TextField>
                <Label>From</Label>
                <Input
                  value={from}
                  onChange={(e) =>
                    setFrom(e.target.value)
                  }
                />
              </TextField>

              <TextField>
                <Label>To</Label>
                <Input
                  value={to}
                  onChange={(e) =>
                    setTo(e.target.value)
                  }
                />
              </TextField>

              <TextField>
                <Label>Price</Label>
                <Input
                  type="number"
                  value={price}
                  onChange={(e) =>
                    setPrice(e.target.value)
                  }
                />
              </TextField>

              <TextField>
                <Label>Quantity</Label>
                <Input
                  type="number"
                  value={quantity}
                  onChange={(e) =>
                    setQuantity(e.target.value)
                  }
                />
              </TextField>
            </Modal.Body>

            <Modal.Footer>
              <Button
                slot="close"
                variant="secondary"
              >
                Cancel
              </Button>

              <Button
                
                onPress={handleUpdate}
              >
                Save Update
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateTicketModal;