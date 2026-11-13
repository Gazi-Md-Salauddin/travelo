"use client";

import { Pencil, Person } from "@gravity-ui/icons";
import {
  Button,
  Input,
  Label,
  Modal,
  Surface,
  TextField,
} from "@heroui/react";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { updateUser } from "@/lib/actions/users";
import { toast } from "react-hot-toast";
import { ArrowUpToLine, Loader2, X } from "lucide-react";

const UpdateProfileModal = ({ user }) => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setImageUrl(user.image || "");
    }
  }, [user]);

  // Image Upload
  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];

    if (!file) return;

    // Image validation
    if (!["image/jpeg", "image/png"].includes(file.type)) {
      toast.error("Only JPG and PNG images are allowed");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Image size must be less than 5MB");
      e.target.value = "";
      return;
    }

    setIsUploading(true);

    const formData = new FormData();
    formData.append("image", file);

    try {
      const API_KEY = process.env.NEXT_PUBLIC_IMAGE_UPLOAD_API;

      if (!API_KEY) {
        throw new Error("Image upload API key is missing");
      }

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${API_KEY}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error?.message || "Image upload failed");
      }

      setImageUrl(data.data.url);
      setErrors((prev) => ({ ...prev, image: "" }));

      toast.success("Image uploaded successfully");
    } catch (error) {
      console.error("Image upload error:", error);
      toast.error(error.message || "Failed to upload image");
    } finally {
      setIsUploading(false);
      e.target.value = "";
    }
  };

  // Remove Image
  const handleRemoveImage = () => {
    setImageUrl("");
  };

  // Update Profile
  const handleUpdate = async () => {
    if (!name.trim()) {
      toast.error("Name is required");
      return;
    }

    if (isUploading) {
      toast.error("Please wait until image upload finishes");
      return;
    }

    setIsSaving(true);

    try {
      const updatedData = {
        name: name.trim(),
        image: imageUrl,
      };

      const result = await updateUser(
        user?._id || user?.id,
        updatedData
      );

      if (result?.modifiedCount > 0 || result?.matchedCount > 0) {
        toast.success("Profile updated successfully");
        router.refresh();
        window.location.reload()
      } else if (result?.acknowledged) {
        toast.success("Profile is already up to date");
        router.refresh();
      } else {
        toast.error(result?.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Profile update error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Modal>
      <Button variant="primary">
        <Pencil />
        Edit
      </Button>

      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />

            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Person className="size-5" />
              </Modal.Icon>

              <Modal.Heading>Edit Profile</Modal.Heading>
            </Modal.Header>

            <Modal.Body className="p-6">
              <Surface variant="default">
                <form
                  className="flex flex-col gap-5"
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleUpdate();
                  }}
                >
                  {/* Name */}
                  <TextField className="w-full" variant="secondary">
                    <Label>Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your name"
                    />
                  </TextField>

                  {/* Profile Image */}
                  <div className="flex flex-col gap-2">
                    <Label>Profile Image</Label>

                    <div className="relative w-40 h-40">
                      <label className="w-full h-full border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-500 rounded-2xl flex flex-col items-center justify-center cursor-pointer bg-gray-50 dark:bg-[#0B1220] transition-colors overflow-hidden">

                        <input
                          type="file"
                          accept="image/png, image/jpeg"
                          onChange={handleImageUpload}
                          disabled={isUploading}
                          className="hidden"
                        />

                        {imageUrl ? (
                          <img
                            src={imageUrl}
                            alt="Profile Preview"
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

                        {isUploading && (
                          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 text-white">
                            <Loader2 className="size-7 animate-spin" />
                            <span className="mt-2 text-xs">
                              Uploading...
                            </span>
                          </div>
                        )}
                      </label>

                      {imageUrl && !isUploading && (
                        <button
                          type="button"
                          onClick={handleRemoveImage}
                          className="absolute -right-2 -top-2 flex size-7 items-center justify-center rounded-full bg-red-500 text-white shadow-md hover:bg-red-600"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    <p className="text-xs text-gray-500">
                      JPG or PNG. Maximum file size 5MB.
                    </p>
                  </div>
                </form>
              </Surface>
            </Modal.Body>

            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>

              <Button
                onPress={handleUpdate}
                isDisabled={isUploading || isSaving}
              >
                {isSaving ? "Saving..." : "Save Changes"}
              </Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};

export default UpdateProfileModal;
