"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Button,
  Checkbox,
  Label,
  TextField,
  InputGroup,
  toast
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

//import { toast } from "sonner";
import {createTicket} from "@/lib/actions/tickets";

export default function AddTicketPage() {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [selectedPerks, setSelectedPerks] = useState([]);

  // Replace with your authenticated user data
  const vendor = {
    name: "John Doe",
    email: "john@example.com",
  };

  const handlePerkChange = (perk, checked) => {
    if (checked) {
      setSelectedPerks((prev) => [...prev, perk]);
    } else {
      setSelectedPerks((prev) =>
        prev.filter((item) => item !== perk)
      );
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    const newErrors = {};

    if (!data.title) newErrors.title = "Ticket title is required";
    if (!data.from) newErrors.from = "From location is required";
    if (!data.to) newErrors.to = "To location is required";
    if (!data.transportType)
      newErrors.transportType = "Transport type is required";
    if (!data.price) newErrors.price = "Price is required";
    if (!data.quantity) newErrors.quantity = "Quantity is required";
    if (!data.departureDate)
      newErrors.departureDate = "Departure date is required";
    if (!data.departureTime)
      newErrors.departureTime = "Departure time is required";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});

    const payload = {
      title: data.title,
      from: data.from,
      to: data.to,
      transportType: data.transportType,
      price: Number(data.price),
      quantity: Number(data.quantity),
      departureDate: data.departureDate,
      departureTime: data.departureTime,
      perks: selectedPerks,

      image: "",

      vendorName: vendor.name,
      vendorEmail: vendor.email,

      status: "pending",
      createdAt: new Date(),
    };

    try {
      const result = await createTicket(payload);

      if (result?.insertedId) {
        alert("Ticket added successfully");

        e.target.reset();
        setSelectedPerks([]);

        router.push("/dashboard/vendor/tickets");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to add ticket");
    }
  };

  return (
    <section className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Add Ticket
        </h1>

        <p className="mt-2 text-default-500">
          Create and publish transport tickets.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-5 md:grid-cols-2"
      >
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

          {errors.title && (
            <p className="mt-1 text-sm text-danger">
              {errors.title}
            </p>
          )}
        </TextField>

        {/* Transport Type */}
        <TextField>
          <Label>Transport Type</Label>

          <InputGroup>
            <InputGroup.Input
              name="transportType"
              placeholder="Bus / Train / Flight / Launch"
            />
          </InputGroup>

          {errors.transportType && (
            <p className="mt-1 text-sm text-danger">
              {errors.transportType}
            </p>
          )}
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

          {errors.from && (
            <p className="mt-1 text-sm text-danger">
              {errors.from}
            </p>
          )}
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

          {errors.to && (
            <p className="mt-1 text-sm text-danger">
              {errors.to}
            </p>
          )}
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

          {errors.price && (
            <p className="mt-1 text-sm text-danger">
              {errors.price}
            </p>
          )}
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

          {errors.quantity && (
            <p className="mt-1 text-sm text-danger">
              {errors.quantity}
            </p>
          )}
        </TextField>

        {/* Date */}
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

        {/* Time */}
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
              name="vendorName"
              value={vendor.name}
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
              name="vendorEmail"
              value={vendor.email}
              readOnly
            />
          </InputGroup>
        </TextField>

        {/* Perks */}
        <div className="md:col-span-2">
          <Label className="mb-3 block">
            Perks
          </Label>

          <div className="flex flex-wrap gap-4">
            <Checkbox name="basic-terms" onValueChange={(checked) =>
                handlePerkChange("Ac", checked)
              }>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Ac
      </Checkbox.Content>
    </Checkbox>
            

            <Checkbox name="basic-terms" onValueChange={(checked) =>
                handlePerkChange("Breakfast", checked)
              }>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Breakfast
      </Checkbox.Content>
    </Checkbox>

            <Checkbox name="basic-terms" onValueChange={(checked) =>
                handlePerkChange("WiFi", checked)
              }>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        WiFi
      </Checkbox.Content>
    </Checkbox>

            <Checkbox name="basic-terms" onValueChange={(checked) =>
                handlePerkChange("Charging Port", checked)
              }>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Charging Port
      </Checkbox.Content>
    </Checkbox>

            <Checkbox name="basic-terms" onValueChange={(checked) =>
                handlePerkChange("Tv", checked)
              }>
      <Checkbox.Content>
        <Checkbox.Control>
          <Checkbox.Indicator />
        </Checkbox.Control>
        Tv
      </Checkbox.Content>
    </Checkbox>
          </div>
        </div>

        {/* Image Upload */}
        <div className="md:col-span-2">
          <Label>Ticket Image</Label>

          <input
            type="file"
            name="image"
            accept="image/*"
            className="mt-2 block w-full rounded-xl border border-default-200 p-3"
          />
        </div>

        {/* Submit */}
        <div className="md:col-span-2">
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="w-full"
          >
            Add Ticket
          </Button>
        </div>
      </form>
    </section>
  );
}