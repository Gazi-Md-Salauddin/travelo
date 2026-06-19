import React from 'react'
import {getApprovedTickets} from '@/lib/actions/tickets'
import AllTicketCard from '@/components/AllTicketCard'

const AllTicketsPage = async() => {
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
          {tickets.map((ticket) => (
          <AllTicketCard key={ticket._id} ticket={ticket}/>
          ))}
        </div>
      )}
    </section>
  )
}

export default AllTicketsPage