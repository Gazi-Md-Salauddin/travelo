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
              ? "danger"
              : user.role === "vendor"
              ? "success"
              : "primary"
          }
        >
          {user.role}
        </Chip>
      </td>

      <td className="p-4">
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            color="danger"
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
            size="sm"
            color="success"
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
              size="sm"
              color="warning"
              onPress={
                handleFraud
              }
              isDisabled={
                user.isFraud
              }
            >
              {user.isFraud
                ? "Fraud"
                : "Mark as Fraud"}
            </Button>
          )}
        </div>
      </td>
    </tr>
  );
};

export default UserRow;