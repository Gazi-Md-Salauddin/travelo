
import Link from "next/link";
import AllTicketCard from "@/components/AllTicketCard";
import { IconSearch, Input } from "@heroui/react";
import TransportSelect from "@/components/TransportSelect";
import TransportSort from "@/components/TransportSort";

const AllTicketsPage = async ({ searchParams }) => {

  const params = await searchParams;

  const page = Number(params.page) || 1;

  const from = params.from || "";
  const to = params.to || "";
  const transportType = params.transportType || "";
  const sort = params.sort || "";


  // Pagination URL
  const createPageUrl = (pageNumber) => {
    const query = new URLSearchParams();

    query.set("page", String(pageNumber));

    if (from) query.set("from", from);
    if (to) query.set("to", to);
    if (transportType) query.set("transportType", transportType);
    if (sort) query.set("sort", sort);

    return `?${query.toString()}`;
  };


  // Fetch Tickets
  const query = new URLSearchParams({
    status: "approved",
    page: String(page),
    limit: "6",
    from,
    to,
    transportType,
    sort,
  });

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/tickets?${query.toString()}`,
    {
      cache: "no-store",
    }
  );

  const data = await res.json();

  const tickets = data?.tickets || [];
  const totalPages = Number(data?.totalPages) || 0;

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

            <Input aria-label="Name" className="w-full" name="from"
              defaultValue={from}
              placeholder="Departure city" />
          </div>

          {/* To */}
          <div className="space-y-1.5">
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">
              To
            </label>

            <Input aria-label="Name" className="w-full" name="to"
              defaultValue={to}
              placeholder="Destination city" />
          </div>

          {/* Transport Type */}
          <div className="space-y-1.5">
            <TransportSelect transportType={transportType} />
          </div>

          {/* Sort Price */}
          <div className="space-y-1.5">
            <TransportSort sort={sort} />
          </div>

          {/* Search Button */}
          <button
            type="submit"
            className="mt-1 flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3.5 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:bg-blue-700 active:scale-[0.98]"
          >
            <IconSearch className="size-4" />
            Search Tickets
          </button>

        </form>

        {/* Ticket List */}
        <div className="flex min-w-0 flex-col gap-4">

          {tickets.length > 0 ? (
            tickets.map((ticket) => (
              <AllTicketCard
                key={ticket._id}
                ticket={ticket}
              />
            ))
          ) : (
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
      {tickets.length > 0 && totalPages > 1 && (
        <div className="flex flex-wrap items-center justify-center gap-2 px-4 pb-10">

          {/* Previous */}
          <Link
            href={createPageUrl(Math.max(1, page - 1))}
            aria-disabled={page <= 1}
            className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${page <= 1
                ? "pointer-events-none opacity-40"
                : "border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              }`}
          >
            Previous
          </Link>

          {/* Page Numbers */}
          {Array.from(
            { length: totalPages },
            (_, i) => i + 1
          ).map((pageNumber) => (
            <Link
              key={pageNumber}
              href={createPageUrl(pageNumber)}
              aria-current={page === pageNumber ? "page" : undefined}
              className={`flex h-10 min-w-10 items-center justify-center rounded-xl border px-3 text-sm font-semibold transition ${page === pageNumber
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-200 bg-white text-gray-600 hover:border-blue-500 hover:text-blue-600"
                }`}
            >
              {pageNumber}
            </Link>
          ))}

          {/* Next */}
          <Link
            href={createPageUrl(
              page < totalPages ? page + 1 : page
            )}
            aria-disabled={page >= totalPages}
            className={`rounded-xl border px-4 py-2.5 text-sm font-semibold transition ${page >= totalPages
                ? "pointer-events-none opacity-40"
                : "border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600"
              }`}
          >
            Next
          </Link>

        </div>
      )}


    </section>
  );
};

export default AllTicketsPage;
