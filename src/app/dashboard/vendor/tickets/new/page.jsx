"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"
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
  ArrowUpToLine
} from "@gravity-ui/icons";


import {createTicket} from "@/lib/actions/tickets";
import {useSession} from '@/lib/auth-client'

export default function AddTicketPage() {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [selectedPerks, setSelectedPerks] = useState([]);

  const {data: session, isPending } = useSession();
  const user = session?.user
  
  // Replace with your authenticated user data
  // const vendor = {
  //   name: {user?.name},
  //   email: {user?.email},
  // };

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
      perks: [...selectedPerks],

      image: imageUrl,

      vendorName: user?.name,
      vendorEmail: user?.email,

      status: "Pending",
      createdAt: new Date(),
    };
    console.log(payload)

    try {
      const result = await createTicket(payload);

      if (result?.insertedId) {
        toast.success("Ticket added successfully");

        e.target.reset();
        setSelectedPerks([]);

        router.push("/dashboard/vendor/tickets");
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to add ticket");
    }
  };

  // Auxiliary Upload States
    const [imageUrl, setImageUrl] = useState('');
    const [isUploading, setIsUploading] = useState(false);


  // Client side Imgbb Upload Handler
    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Simple Validation
        if (file.size > 5 * 1024 * 1024) {
            setErrors(prev => ({ ...prev, image: "File size exceeds 5MB limit" }));
            return;
        }

        setIsUploading(true);
        const formData = new FormData();
        formData.append('image', file);

        try {
            // Replace with your real IMGBB API key environmental variable injection
            const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API; 
            const response = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
                method: 'POST',
                body: formData
            });
            const data = await response.json();
            
            if (data.success) {
                setImageUrl(data.data.url);
                setErrors(prev => ({ ...prev, image: null }));
            } else {
                setErrors(prev => ({ ...prev, image: "Upload failed. Try again." }));
            }
        } catch (err) {
            setErrors(prev => ({ ...prev, image: "Network error during logo upload" }));
        } finally {
            setIsUploading(false);
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
              value={user?.name}
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
              value={user?.email}
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
        <div className="flex flex-col gap-1 w-full">
          <span className="text-zinc-600 font-medium text-sm">Ticket Image</span>
          <div className="flex items-center gap-4 mt-1">
          
          <Label className="w-14 h-14 border border-dashed border-zinc-500 hover:border-zinc-500 bg-zinc-900/40 rounded-xl flex flex-col items-center justify-center cursor-pointer transition-colors group relative overflow-hidden">

          <input 
                  type="file" 
                  accept="image/png, image/jpeg" 
                  onChange={handleImageUpload} 
                   className="hidden" 
                  />
                                    {imageUrl ? (
                                        <img src={imageUrl} alt="Image Preview" className="w-full h-full object-cover" />
                                    ) : (
                                        <ArrowUpToLine size={18} className="text-zinc-400 group-hover:text-zinc-200 transition-colors" />
                                    )}
                    </Label>
            <div className="flex flex-col">
                                    <span className="text-sm font-medium text-zinc-500">
                                        {isUploading ? 'Uploading file...' : 'Upload image'}
                                    </span>
                                    <span className="text-xs text-zinc-600 mt-0.5">PNG, JPG up to 5MB</span>
                                    {errors.image && <span className="text-xs text-danger mt-1">{errors.image}</span>}
                                </div>
            </div>
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