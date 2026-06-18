"use client";

import {
  Button,
  Checkbox,
  Label,
  TextField,
  InputGroup,
} from "@heroui/react";

import {
  Ticket,
  MapPin,
  CircleDollar,
  Calendar,
  Clock,
  Person,
  Envelope,
} from "@gravity-ui/icons";

export default function AddTicketPage() {
  return (
    <form className="grid grid-cols-1 gap-5 md:grid-cols-2">
      {/* Ticket Title */}
      <TextField>
        <Label>Ticket Title</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <Ticket className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            name="title"
            placeholder="Dhaka to Sylhet AC Bus"
          />
        </InputGroup>
      </TextField>

      {/* From */}
      <TextField>
        <Label>From Location</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <MapPin className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            name="from"
            placeholder="Dhaka"
          />
        </InputGroup>
      </TextField>

      {/* To */}
      <TextField>
        <Label>To Location</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <MapPin className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            name="to"
            placeholder="Sylhet"
          />
        </InputGroup>
      </TextField>

      {/* Price */}
      <TextField>
        <Label>Price Per Unit</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <CircleDollar className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            type="number"
            name="price"
            placeholder="1200"
          />
        </InputGroup>
      </TextField>

      {/* Quantity */}
      <TextField>
        <Label>Ticket Quantity</Label>

        <InputGroup>
          <InputGroup.Input
            type="number"
            name="quantity"
            placeholder="50"
          />
        </InputGroup>
      </TextField>

      {/* Departure Date */}
      <TextField>
        <Label>Departure Date</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <Calendar className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            type="date"
            name="departureDate"
          />
        </InputGroup>
      </TextField>

      {/* Departure Time */}
      <TextField>
        <Label>Departure Time</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <Clock className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            type="time"
            name="departureTime"
          />
        </InputGroup>
      </TextField>

      {/* Vendor Name */}
      <TextField>
        <Label>Vendor Name</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <Person className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            value="John Doe"
            readOnly
          />
        </InputGroup>
      </TextField>

      {/* Vendor Email */}
      <TextField>
        <Label>Vendor Email</Label>

        <InputGroup>
          <InputGroup.Prefix>
            <Envelope className="size-4" />
          </InputGroup.Prefix>

          <InputGroup.Input
            value="john@example.com"
            readOnly
          />
        </InputGroup>
      </TextField>

      {/* Perks */}
      <div className="md:col-span-2">
        <Label className="mb-3 block">Perks</Label>

        <div className="flex flex-wrap gap-4">
          <Checkbox value="AC">AC</Checkbox>
          <Checkbox value="Breakfast">Breakfast</Checkbox>
          <Checkbox value="WiFi">WiFi</Checkbox>
          <Checkbox value="Charging">Charging Port</Checkbox>
          <Checkbox value="Entertainment">
            Entertainment
          </Checkbox>
        </div>
      </div>

      {/* Image Upload */}
      <div className="md:col-span-2">
        <Label>Ticket Image</Label>

        <input
          type="file"
          accept="image/*"
          className="mt-2 block w-full rounded-xl border border-default-200 p-3"
        />
      </div>

      {/* Submit */}
      <div className="md:col-span-2">
        <Button
          color="primary"
          size="lg"
          className="w-full"
        >
          Add Ticket
        </Button>
      </div>
    </form>
  );
}