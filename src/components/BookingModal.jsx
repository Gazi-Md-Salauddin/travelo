"use client";
import { useState } from "react";

import {Rocket} from "@gravity-ui/icons";
import {Button, Modal} from "@heroui/react";

const BookingModal = ({ticket, handleBooking}) => {

  const [isOpen, setIsOpen] = useState(false);

const onOpen = () => setIsOpen(true);
const onClose = () => setIsOpen(false);
  
  return (
    <Modal>
      <Button variant="secondary" >Booking Now</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-[360px]">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Welcome to HeroUI</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <p>
                A beautiful, fast, and modern React UI library for building accessible and
                customizable web applications with ease.
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button
        variant="light"
        onPress={onClose}
      >
        Cancel
      </Button>
              <Button className="w-full" color="primary"
        onPress={handleBooking}>
                Confirm Booking
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}

export default BookingModal