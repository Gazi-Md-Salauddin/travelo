"use client";

import {Envelope, Pencil} from "@gravity-ui/icons";
import {Button, Input, Label, Modal, Surface, TextField} from "@heroui/react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {updateUser} from '@/lib/actions/users'

const UpdateProfileModal = ({user}) => {
  const router = useRouter()

  const [name, setName] = useState("");
const [image, setImage] = useState("");

useEffect(() => {
  if (user) {
    setName(user.name || "");
    setImage(user.image || "");
  }
}, [user]);
  
  console.log("User:", user);
  const handleUpdate = async () => {
    const updatedData = {
      name,
      image,
      
    };
    

    const result = await updateUser(
      user?._id || user?.id,
      updatedData
    );
    

    if (result.modifiedCount > 0) {
      router.refresh();
      alert("Profile Updated Successfully");
    }
  };
  
  return (
    <Modal>
      <Button variant="primary"><Pencil/>Edit</Button>
      <Modal.Backdrop>
        <Modal.Container placement="auto">
          <Modal.Dialog className="sm:max-w-md">
            <Modal.CloseTrigger />
            <Modal.Header>
              <Modal.Icon className="bg-accent-soft text-accent-soft-foreground">
                <Envelope className="size-5" />
              </Modal.Icon>
              <Modal.Heading>Edit Profile</Modal.Heading>
              
            </Modal.Header>
            <Modal.Body className="p-6">
              <Surface variant="default">
                <form className="flex flex-col gap-4">
                  <TextField className="w-full" variant="secondary">
                    <Label>Name</Label>
                    <Input value={name}
                      onChange={(e) =>
                    setName(e.target.value)
                  }/>
                  </TextField>
                  <TextField className="w-full" variant="secondary">
                    <Label>Image</Label>
                    <Input value={image}
                      onChange={(e) => setImage(e.target.value)}/>
                  </TextField>
                  
                </form>
              </Surface>
            </Modal.Body>
            <Modal.Footer>
              <Button slot="close" variant="secondary">
                Cancel
              </Button>
              <Button slot="close" onPress={() => {
    console.log("Clicked");
    handleUpdate();
  }}>Save</Button>
            </Modal.Footer>
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
}
export default UpdateProfileModal 