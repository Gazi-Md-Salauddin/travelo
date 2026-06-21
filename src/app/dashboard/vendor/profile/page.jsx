"use client"
import React from 'react'
import {useSession} from '@/lib/auth-client'
import {Avatar, Card, Button} from "@heroui/react";
import UpdateProfileModal from '@/components/UpdateProfileModal'

const VendorProfilePage = () => {

  const { data: session, isPending } = useSession();
  console.log("Session:", session);
  const user = session?.user
  console.log("User:", session?.user)
  return (
    <div className="flex justify-center gap-4 py-20">
      <Card className="w-[300px] text-center items-center">
        <Avatar aria-label="User profile picture" className="size-20 rounded-full">
            <Avatar.Image
              alt={user?.name}
              src={user?.image}
            />
            <Avatar.Fallback className="text-md">{user?.name.charAt(0)}</Avatar.Fallback>
          </Avatar>
        
        <Card.Header>
          <span className="bg-blue-600 text-white rounded-full w-20 mx-auto">{user?.role}</span>
          <Card.Title>{user?.name}</Card.Title>
          <Card.Description>{user?.email}</Card.Description>
        </Card.Header>
        <Card.Footer>
          
          {user && <UpdateProfileModal user={user}/>}
        </Card.Footer>
      </Card>
    </div>
  )
}

export default VendorProfilePage