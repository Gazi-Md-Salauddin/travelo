"use client";

import {
  Button,
  Chip,
} from "@heroui/react";

import {
  updateUserRole,
  markVendorAsFraud,
} from "@/lib/actions/users";

import { useRouter } from "next/navigation";

const UserRow = ({ user }) => {
  const router = useRouter();

  const handleAdmin = async () => {
    await updateUserRole(
      user._id,
      "admin"
    );

    router.refresh();
  };

  const handleVendor = async () => {
    await updateUserRole(
      user._id,
      "vendor"
    );

    router.refresh();
  };

  const handleFraud = async () => {
    await markVendorAsFraud(
      user._id
    );

    router.refresh();
  };

  return (
    <tr className="border-t">
      <td className="p-4">
        {user.name}
      </td>

      <td className="p-4">
        {user.email}
      </td>

      <td className="p-4">
        <Chip
          color={
            user.role === "admin"
              ? "accent"
              : user.role === "vendor"
              ? "success"
              : "default"
          }
        >
          {user.role}
        </Chip>
      </td>

      <td className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button
          className="rounded-lg"
            size="sm"
            color="primary"
            onPress={
              handleAdmin
            }
            isDisabled={
              user.role === "admin"
            }
          >
            Make Admin
          </Button>

          <Button
          className="rounded-lg"
            size="sm"
            color="outline"
            variant="outline"
            onPress={
              handleVendor
            }
            isDisabled={
              user.role === "vendor"
            }
          >
            Make Vendor
          </Button>

          {user.role ===
            "vendor" && (
            <Button
            className="rounded-lg"
              size="sm"
              color="danger"
              variant="danger"
              onPress={
                handleFraud
              }
              isDisabled={
                user.isFraud
              }
            >
              {user.isFraud
               ?  "Fraud"
                : "Mark as Fraud"}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;