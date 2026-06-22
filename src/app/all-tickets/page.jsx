import React from 'react'
import {getApprovedTickets} from '@/lib/actions/tickets'
import AllTicketCard from '@/components/AllTicketCard'
import Link from 'next/link'

const AllTicketsPage = async({searchParams}) => {
  const page = Number(searchParams.page) || 1;

  const res = await fetch(
    `http://localhost:5000/api/tickets?page=${page}&limit=6`,
    { cache: "no-store" }
  );

  const data = await res.json();
  
  const tickets = await getApprovedTickets();


  
  return (
        <section className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold">
          All Tickets
        </h1>

        <p className="text-default-500">
          Browse all available approved tickets.
        </p>
      </div>

      {tickets.length === 0 ? (
        <div className="rounded-xl border border-dashed p-10 text-center">
          <h3 className="text-xl font-semibold">
            No Tickets Available
          </h3>

          <p className="mt-2 text-default-500">
            No approved tickets found.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {tickets?.map((ticket) => (
            
          <AllTicketCard key={ticket._id} ticket={ticket}/>
           
             ))}
        </div>
          
      )}
          <div className="flex justify-center text-center gap-3 mt-5">
  <Link href={`?page=${page - 1}`}>
  Previous
</Link>

<Link href={`?page=${page + 1}`}>
  Next
</Link>
</div>
    </section>
  )
}

export default AllTicketsPage