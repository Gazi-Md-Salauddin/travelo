import { serverMutation, authHeader } from "../core/server";


export const createTicket = async (newTicketData) => {
    return serverMutation('/api/tickets', newTicketData);
}

export async function getTickets() {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

// const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;

// export const createTicket = async (newTicketData) => {
//     const res = await fetch(`${baseUrl}/api/tickets`, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(newTicketData),
//     });

//     return res.json();
// }


export const getApprovedTickets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets?status=approved`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};


//Admin approve or reject tickets

export const getAdminTickets = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets`,
    {
      cache: "no-store",
    }
  );

  return res.json();
};

export const updateTicketStatus = async (
  id,
  status
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${id}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  return res.json();
};


export async function getTicketById(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();
}

//update and delete ticket

export const updateTicket = async (
  id,
  updatedData
) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      ...authHeader(),
      },
      body: JSON.stringify(updatedData),
    }
  );

  return res.json();
};

export const deleteTicket = async (id) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets/${id}`,
    {
      method: "DELETE",
      headers: authHeader()
    }
  );

  return res.json();
};