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
    <section className="space-y-8">

      <div className="px-4">
        <h1 className="text-3xl font-bold">
          All Tickets
        </h1>

        <p className="text-default-500">
          Browse all approved tickets.
        </p>
      </div>

      {/* Search */}

      <form className="grid md:grid-cols-5 gap-4">

        <input
          name="from"
          defaultValue={from}
          placeholder="From"
          className="border p-2 rounded"
        />

        <input
          name="to"
          defaultValue={to}
          placeholder="To"
          className="border p-2 rounded"
        />

        <select
          name="transportType"
          defaultValue={transportType}
          className="border p-2 rounded"
        >
          <option value="">
            All Transport
          </option>

          <option value="Bus">
            Bus
          </option>

          <option value="Train">
            Train
          </option>

          <option value="Flight">
            Flight
          </option>

          <option value="Launch">
            Launch
          </option>
        </select>

        <select
          name="sort"
          defaultValue={sort}
          className="border p-2 rounded"
        >
          <option value="">
            Sort Price
          </option>

          <option value="low">
            Low → High
          </option>

          <option value="high">
            High → Low
          </option>
        </select>

        <button
          className="bg-blue-600 text-white rounded"
        >
          Search
        </button>

      </form>

      {/* Tickets */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">

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