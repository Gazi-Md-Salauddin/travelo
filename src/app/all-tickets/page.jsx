import Link from "next/link";
import AllTicketCard from "@/components/AllTicketCard";

const AllTicketsPage = async ({ searchParams }) => {

  const params = await searchParams;
  
  const page = Number(params.page) || 1;

  const from = params.from || "";
  const to = params.to || "";
  const transportType =
    params.transportType || "";

  const sort = params.sort || "";

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets?status=approved&page=${page}&limit=6&from=${from}&to=${to}&transportType=${transportType}&sort=${sort}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  return (
    <section className="space-y-8 dark:bg-[#171717]">

      <div className="px-4 text-center py-6">
        <h1 className="text-4xl font-bold">
          All <span className="text-blue-500">Tickets</span>
        </h1>

        <p className="text-gray-400">
          Browse all available tickets for your next journey.
        </p>
      </div>

      {/* Search */}

      <form className="grid md:grid-cols-5 gap-4 border dark:border-[#374151] rounded-xl px-2 py-2 mx-4 shadow-md">

        <input
          name="from"
          defaultValue={from}
          placeholder="From"
          className="border dark:border-[#374151] p-2 rounded-xl"
        />

        <input
          name="to"
          defaultValue={to}
          placeholder="To"
          className="border dark:border-[#374151] p-2 rounded-xl"
        />

        <select
          name="transportType"
          defaultValue={transportType}
          className="border dark:border-[#374151] p-2 rounded-xl"
        >
          <option value="" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            All Transport
          </option>

          <option value="Bus" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            Bus
          </option>

          <option value="Train" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            Train
          </option>

          <option value="Flight" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            Flight
          </option>

          <option value="Launch" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            Launch
          </option>
        </select>

        <select
          name="sort"
          defaultValue={sort}
          className="border dark:border-[#374151] p-2 rounded-xl"
        >
          <option value="" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            Sort Price
          </option>

          <option value="low" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            Low → High
          </option>

          <option value="high" className="bg-white! dark:bg-[#171717]! dark:text-[#9CA3AF]! rounded-xl">
            High → Low
          </option>
        </select>

        <button
          className="bg-blue-600 text-white rounded-xl"
        >
          Search
        </button>

      </form>

      {/* Tickets */}

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 px-4">

        {data?.tickets?.map((ticket) => (
          <AllTicketCard
            key={ticket._id}
            ticket={ticket}
          />
        ))}

      </div>

      {/* Pagination */}

      <div className="flex justify-center gap-5">

        {page > 1 && (
          <Link
            href={`?page=${page - 1}&from=${from}&to=${to}&transportType=${transportType}&sort=${sort}`}
          >
            Previous
          </Link>
        )}

        <span>
          {page} / {data.totalPages}
        </span>

        {page < data.totalPages && (
          <Link
            href={`?page=${page + 1}&from=${from}&to=${to}&transportType=${transportType}&sort=${sort}`}
          >
            Next
          </Link>
        )}

      </div>

    </section>
  );
};

export default AllTicketsPage;