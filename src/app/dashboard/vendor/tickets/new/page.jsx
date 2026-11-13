"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast"
import {
  Button,
  Checkbox,
  Label,
  TextField,
  InputGroup
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


import { createTicket } from "@/lib/actions/tickets";
import { useSession } from '@/lib/auth-client'
import { CheckCircle2, ImageIcon, Route, Sparkles } from "lucide-react";
import DateSelect from "@/components/dashboard/vendor/DateSelect";
import TimeSelect from "@/components/dashboard/vendor/TimeSelect";

export default function AddTicketPage() {
  const router = useRouter();

  const [errors, setErrors] = useState({});
  const [selectedPerks, setSelectedPerks] = useState([]);

  const { data: session, isPending } = useSession();
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

  const [departureTime, setDepartureTime] = useState("");

  // Auxiliary Upload States
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);

  const inputClass =
    "border border-gray-200 dark:border-[#374151] rounded-xl focus-within:border-blue-500 transition-colors";

  const sectionClass =
    "rounded-2xl border border-gray-200 dark:border-[#374151] p-5 sm:p-6 shadow-sm";

  const sectionTitle =
    "text-base font-semibold text-gray-900 dark:text-white";

  const sectionDescription =
    "text-sm text-gray-500 dark:text-gray-400 mt-1";

  const renderError = (field) =>
    errors[field] && (
      <p className="mt-1.5 text-xs text-danger">
        {errors[field]}
      </p>
    );

  const perks = [
    "Ac",
    "BreakFast",
    "WiFi",
    "Charging Port",
    "TV",
  ];


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
    <section className="w-full px-8 py-10">

      {/* Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

          <div className="flex items-center gap-4">
            <div className="flex size-14 shrink-0 items-center justify-center rounded-2xl bg-blue-600 text-white shadow-lg shadow-blue-600/20">
              <Ticket className="size-7" />
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                Add New Ticket
              </h1>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Create and manage your transportation listings.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-xl border border-amber-200 dark:border-amber-500/20 bg-amber-50 dark:bg-amber-500/10 px-4 py-2.5 w-fit">
            <Sparkles className="size-4 text-amber-500" />

            <span className="text-xs font-semibold text-amber-700 dark:text-amber-400">
              Pending Approval
            </span>
          </div>

        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">

        {/* Basic Information */}
        <div className={sectionClass}>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-blue-50  flex items-center justify-center">
              <Ticket className="size-5 text-blue-600 " />
            </div>

            <div>
              <h2 className={sectionTitle}>
                Basic Information
              </h2>

              <p className={sectionDescription}>
                Enter your ticket details and transport type.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <TextField>
              <Label className="text-sm font-medium mb-2 block">
                Ticket Title
              </Label>

              <InputGroup className={inputClass}>
                <InputGroup.Prefix>
                  <Ticket className="size-4 text-gray-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  name="title"
                  placeholder="Dhaka to Sylhet AC Bus"
                />
              </InputGroup>

              {renderError("title")}
            </TextField>

            <TextField>
              <Label className="text-sm font-medium mb-2 block">
                Transport Type
              </Label>

              <InputGroup className={inputClass}>
                <InputGroup.Input
                  name="transportType"
                  placeholder="Bus / Train / Flight / Launch"
                />
              </InputGroup>

              {renderError("transportType")}
            </TextField>

          </div>
        </div>

        {/* Route Information */}
        <div className={sectionClass}>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-indigo-50 dark:bg-indigo-500/10 flex items-center justify-center">
              <Route className="size-5 text-indigo-600 dark:text-indigo-400" />
            </div>

            <div>
              <h2 className={sectionTitle}>
                Route Information
              </h2>

              <p className={sectionDescription}>
                Define your departure and destination locations.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <TextField>
              <Label className="text-sm font-medium mb-2 block">
                Departure Location
              </Label>

              <InputGroup className={inputClass}>
                <InputGroup.Prefix>
                  <MapPin className="size-4 text-emerald-500" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  name="from"
                  placeholder="Dhaka"
                />
              </InputGroup>

              {renderError("from")}
            </TextField>

            <TextField>
              <Label className="text-sm font-medium mb-2 block">
                Destination Location
              </Label>

              <InputGroup className={inputClass}>
                <InputGroup.Prefix>
                  <MapPin className="size-4 text-rose-500" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  name="to"
                  placeholder="Sylhet"
                />
              </InputGroup>

              {renderError("to")}
            </TextField>

          </div>
        </div>

        {/* Pricing */}
        <div className={sectionClass}>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-emerald-50 dark:bg-emerald-500/10 flex items-center justify-center">
              <CircleDollar className="size-5 text-emerald-600 dark:text-emerald-400" />
            </div>

            <div>
              <h2 className={sectionTitle}>
                Pricing & Availability
              </h2>

              <p className={sectionDescription}>
                Set your ticket price and available quantity.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <TextField>
              <Label className="text-sm font-medium mb-2 block">
                Price Per Ticket
              </Label>

              <InputGroup className={inputClass}>
                <InputGroup.Prefix>
                  <CircleDollar className="size-4 text-gray-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  type="number"
                  name="price"
                  placeholder="1200"
                />
              </InputGroup>

              {renderError("price")}
            </TextField>

            <TextField>
              <Label className="text-sm font-medium mb-2 block">
                Available Quantity
              </Label>

              <InputGroup className={inputClass}>
                <InputGroup.Input
                  type="number"
                  name="quantity"
                  placeholder="50"
                />
              </InputGroup>

              {renderError("quantity")}
            </TextField>

          </div>
        </div>

        {/* Departure Schedule */}
        <div className={sectionClass}>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-violet-50 dark:bg-violet-500/10 flex items-center justify-center">
              <Calendar className="size-5 text-violet-600 dark:text-violet-400" />
            </div>

            <div>
              <h2 className={sectionTitle}>
                Departure Schedule
              </h2>

              <p className={sectionDescription}>
                Choose your departure date and time.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

            <TextField>

              <DateSelect />
            </TextField>

            <TextField>
              <Label className="text-sm font-medium block">
                Departure Time
              </Label>
              <TimeSelect name="departureTime"
                label="Departure Time"
                value={departureTime}
                onChange={setDepartureTime} />
              {/* 

              <InputGroup className={inputClass}>
                <InputGroup.Prefix>
                  <Clock className="size-4 text-gray-400" />
                </InputGroup.Prefix>

                <InputGroup.Input
                  type="time"
                  name="departureTime"
                />
              </InputGroup> */}
            </TextField>

          </div>
        </div>

        {/* Amenities */}
        <div className={sectionClass}>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-amber-50 dark:bg-amber-500/10 flex items-center justify-center">
              <Sparkles className="size-5 text-amber-600 dark:text-amber-400" />
            </div>

            <div>
              <h2 className={sectionTitle}>
                Travel Amenities
              </h2>

              <p className={sectionDescription}>
                Select the facilities available for passengers.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">

            {perks.map((perk) => {
              const isSelected = selectedPerks.includes(perk);

              return (
                <label
                  key={perk}
                  className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${isSelected
                    ? "border-blue-500 bg-blue-50 dark:bg-blue-500/10"
                    : "border-gray-200 dark:border-[#374151] hover:border-blue-300 dark:hover:border-blue-500/50"
                    }`}
                >
                  <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={(e) =>
                      handlePerkChange(perk, e.target.checked)
                    }
                    className="size-4 accent-blue-600"
                  />

                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    {perk}
                  </span>

                  {isSelected && (
                    <CheckCircle2 className="size-4 text-blue-600 ml-auto" />
                  )}
                </label>
              );
            })}

          </div>
        </div>

        {/* Image Upload */}
        <div className={sectionClass}>

          <div className="flex items-center gap-3 mb-6">
            <div className="size-10 rounded-xl bg-sky-50 dark:bg-sky-500/10 flex items-center justify-center">
              <ImageIcon className="size-5 text-sky-600 dark:text-sky-400" />
            </div>

            <div>
              <h2 className={sectionTitle}>
                Ticket Image
              </h2>

              <p className={sectionDescription}>
                Upload a clear image of your transportation service.
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-5">

            <Label className="w-full sm:w-48 h-36 border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 dark:bg-[#0B1220] transition-colors overflow-hidden">

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={handleImageUpload}
                className="hidden"
              />

              {imageUrl ? (
                <img
                  src={imageUrl}
                  alt="Image Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <>
                  <div className="size-11 rounded-full bg-blue-100 dark:bg-blue-500/10 flex items-center justify-center mb-2">
                    <ArrowUpToLine className="size-5 text-blue-600 dark:text-blue-400" />
                  </div>

                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Upload Image
                  </span>
                </>
              )}

            </Label>

            <div className="flex-1 text-center sm:text-left">

              <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                {isUploading
                  ? "Uploading your image..."
                  : "Choose a ticket cover image"}
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                Supported formats: PNG, JPG
              </p>

              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Maximum file size: 5MB
              </p>

              {imageUrl && (
                <p className="text-xs text-emerald-600 mt-2 flex items-center gap-1 justify-center sm:justify-start">
                  <CheckCircle2 className="size-3" />
                  Image uploaded successfully
                </p>
              )}

              {renderError("image")}

            </div>
          </div>
        </div>

        {/* Submit */}
        <div className={sectionClass}>

          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">

            <div>
              <p className="font-semibold text-gray-900 dark:text-white">
                Ready to publish your ticket?
              </p>

              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                Your ticket will be submitted for approval.
              </p>
            </div>

            <Button
              type="submit"
              color="primary"
              size="lg"
              className="w-full sm:w-auto min-w-52 h-12 rounded-xl bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-600/20 transition-all"
            >
              <Ticket className="size-4" />
              Add Ticket
            </Button>

          </div>
        </div>

      </form>
    </section>
  );
}