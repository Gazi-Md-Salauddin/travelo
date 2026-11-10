"use client";

import { Minus, Plus, Rocket } from "@gravity-ui/icons";
import { Button, Modal } from "@heroui/react";

const BookingModal = ({ ticket, handleBooking, increase, decrease, quantity }) => {

  const totalPrice = quantity * ticket.price

  return (
    <Modal>
      <Button variant="primary" className="w-full">Book Now</Button>
      <Modal.Backdrop>
        <Modal.Container>
          <Modal.Dialog className="sm:max-w-90">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-default text-foreground">
                <Rocket className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Ticket Booking Information</Modal.Heading>
            </Modal.Header>
            <Modal.Body>
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-lg">
                    Quantity:
                  </span>

                  <div className="flex justify-center items-center gap-4">
                    <Button
                      isIconOnly
                      onPress={decrease}
                      className="bg-blue-600 text-xl text-white hover:bg-blue-700"
                    >
                      <Minus />
                    </Button>

                    <div className="w-20 h-12 border rounded-lg flex items-center justify-center text-xl font-bold">
                      {quantity}
                    </div>

                    <Button
                      isIconOnly
                      onPress={increase}
                      className="bg-blue-600 text-2xl text-white hover:bg-blue-700"
                    >
                      <Plus />
                    </Button>
                  </div>
                </div>

                {/* Price */}
                <div>
                  <h3 className="text-2xl font-bold text-black">
                    Total Price:{totalPrice}
                  </h3>

                  <p className="text-gray-500">
                    Available: {ticket.quantity} tickets
                  </p>
                </div>

              </div>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="outline" className="w-full" slot="close">
                Cancel
              </Button>
              <Button onPress={handleBooking} className="w-full" slot="close">
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