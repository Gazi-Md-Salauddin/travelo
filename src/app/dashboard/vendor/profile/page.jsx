"use client"
import React from 'react'
import { useSession } from '@/lib/auth-client'
import { Avatar, Card, Button } from "@heroui/react";
import UpdateProfileModal from '@/components/UpdateProfileModal'

const VendorProfilePage = () => {

  const { data: session, isPending, error } = useSession();
   console.log("isPending:", isPending);
   console.log("session:", session);
   console.log("error:", error);

  if (isPending) {
    return <div className="p-10">Loading profile...</div>;
  }

  if (!session?.user) {
    return (
      <div className="p-10">
        <h2 className="text-xl font-semibold">Session not found</h2>
        <p className="text-gray-500">
          Please sign in again.
        </p>
      </div>
    );
  }
  const user = session?.user
  console.log("User:", session?.user)

  return (
    <div className="min-h-[calc(100vh-80px)] bg-gray-50 px-4 py-10 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">

        {/* Page Header */}
        <div className="mb-8">

          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            My Profile
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Manage your personal information and account details.
          </p>
        </div>

        {/* Profile Card */}
        <Card className="overflow-hidden border border-gray-200 bg-white shadow-sm">

          {/* Top Banner */}
          <div className="h-32 bg-linear-to-r from-blue-600 via-blue-500 to-indigo-600" />

          {/* Profile Content */}
          <div className="px-5 pb-7 sm:px-8">

            {/* Avatar */}
            <div className="-mt-14 mb-5 flex justify-center sm:justify-start">
              <div className="rounded-full bg-white p-1.5 shadow-md">
                <Avatar
                  aria-label="User profile picture"
                  className="size-24 rounded-full sm:size-28"
                >
                  <Avatar.Image
                    alt={user.name || "User"}
                    src={user.image || undefined}
                  />

                  <Avatar.Fallback className="bg-gray-900 text-2xl font-semibold text-white">
                    {user.name?.charAt(0)?.toUpperCase()}
                  </Avatar.Fallback>
                </Avatar>
              </div>
            </div>

            {/* User Information */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div>
                {/* Role */}
                <span className="inline-flex items-center rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blue-700">
                  {user.role || "Vendor"}
                </span>

                {/* Name */}
                <h2 className="mt-3 text-2xl font-bold tracking-tight text-gray-900">
                  {user.name}
                </h2>

                {/* Email */}
                <p className="mt-1 text-sm text-gray-500">
                  {user.email}
                </p>
              </div>

              {/* Update Button */}
              <div className="sm:pt-1">
                <UpdateProfileModal user={user} />
              </div>
            </div>

            {/* Divider */}
            <div className="my-7 h-px bg-gray-100" />

            {/* Account Information */}
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Account Information
              </h3>

              <div className="mt-4 grid gap-4 sm:grid-cols-2">

                {/* Name */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Full Name
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-gray-900">
                    {user.name}
                  </p>
                </div>

                {/* Email */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Email Address
                  </p>

                  <p className="mt-1 truncate text-sm font-medium text-gray-900">
                    {user.email}
                  </p>
                </div>

                {/* Role */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Account Role
                  </p>

                  <p className="mt-1 text-sm font-medium capitalize text-gray-900">
                    {user.role || "Vendor"}
                  </p>
                </div>

                {/* Account Status */}
                <div className="rounded-xl border border-gray-200 bg-gray-50 p-4">
                  <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                    Account Status
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-green-500" />
                    <p className="text-sm font-medium text-gray-900">
                      Active
                    </p>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

export default VendorProfilePage