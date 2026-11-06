import Link from "next/link";
import AllTicketCard from "@/components/AllTicketCard";
import { IconSearch } from "@heroui/react";

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

  {/* Header */}
  <div className="px-4 py-6 text-center">
    <h1 className="text-3xl font-bold sm:text-4xl">
      All <span className="text-blue-500">Tickets</span>
    </h1>

    <p className="mt-1 text-sm text-gray-400 sm:text-base">
      Browse all available tickets for your next journey.
    </p>
  </div>

  {/* Main Container */}
  <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-start gap-6 px-4 sm:px-6 lg:grid-cols-[240px_minmax(0,1fr)]">

    {/* Search Filter */}
    <form className="flex h-fit w-full min-w-0 flex-col gap-4 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm sm:p-5 dark:border-[#374151] dark:bg-[#1F2937]">

      {/* Header */}
      <div>
        <h3 className="text-lg font-bold text-[#071F3D] dark:text-white">
          Find Your Ticket
        </h3>
        <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
          Search and filter available journeys
        </p>
      </div>

      {/* From */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          From
        </label>
        <input
          name="from"
          defaultValue={from}
          placeholder="Departure city"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-[#374151] dark:bg-[#111827] dark:text-white dark:focus:border-blue-500 dark:focus:bg-[#111827]"
        />
      </div>

      {/* To */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          To
        </label>
        <input
          name="to"
          defaultValue={to}
          placeholder="Destination city"
          className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-900 outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-500/10 dark:border-[#374151] dark:bg-[#111827] dark:text-white dark:focus:border-blue-500 dark:focus:bg-[#111827]"
        />
      </div>

      {/* Transport Type */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Transport Type
        </label>
        <select
          name="transportType"
          defaultValue={transportType}
          className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-[#374151] dark:bg-[#111827] dark:text-gray-200"
        >
          <option value="">All Transport</option>
          <option value="Bus">Bus</option>
          <option value="Train">Train</option>
          <option value="Flight">Flight</option>
        </select>
      </div>

      {/* Sort Price */}
      <div className="space-y-1.5">
        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
          Sort By Price
        </label>
        <select
          name="sort"
          defaultValue={sort}
          className="w-full cursor-pointer appearance-none rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/10 dark:border-[#374151] dark:bg-[#111827] dark:text-gray-200"
        >
          <option value="">Default Price</option>
          <option value="low">Price: Low to High</option>
          <option value="high">Price: High to Low</option>
        </select>
      </div>

      {/* Search Button */}
      <button
        type="submit"
        className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 transition-all duration-300 hover:bg-blue-700 hover:shadow-lg hover:shadow-blue-600/25 active:scale-[0.98]"
      >
        <IconSearch className="size-4" />
        Search Tickets
      </button>

    </form>

    {/* Ticket List */}
    <div className="flex min-w-0 flex-col gap-4">

      {data?.tickets?.map((ticket) => (
        <AllTicketCard
          key={ticket._id}
          ticket={ticket}
        />
      ))}

      {data?.tickets?.length === 0 && (
        <div className="rounded-2xl border border-gray-200 bg-white p-8 text-center dark:border-[#374151] dark:bg-[#1F2937]">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            No Tickets Found
          </h3>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
            Try changing your search filters.
          </p>
        </div>
      )}

    </div>

  </div>

  {/* Pagination */}
  <div className="flex flex-wrap items-center justify-center gap-4 px-4 pb-8">

    {page > 1 && (
      <Link
        href={`?page=${page - 1}&from=${from}&to=${to}&transportType=${transportType}&sort=${sort}`}
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300"
      >
        Previous
      </Link>
    )}

    <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
      {page} / {data.totalPages}
    </span>

    {page < data.totalPages && (
      <Link
        href={`?page=${page + 1}&from=${from}&to=${to}&transportType=${transportType}&sort=${sort}`}
        className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-blue-500 hover:text-blue-600 dark:border-gray-700 dark:text-gray-300"
      >
        Next
      </Link>
    )}

  </div>

</section>
  );
};

export default AllTicketsPage;