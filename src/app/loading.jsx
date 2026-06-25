export default function TicketBookingLoader() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white dark:bg-zinc-950">
      <div className="flex flex-col items-center gap-4">
        {/* Spinner */}
        <div className="h-14 w-14 animate-spin rounded-full border-4 border-zinc-300 dark:border-zinc-700 border-t-blue-600"></div>

        {/* Text */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-zinc-900 dark:text-white">
            Finding Available Tickets
          </h2>

          <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
            Please wait while we fetch the best routes for you...
          </p>
        </div>
      </div>
    </div>
  );
}