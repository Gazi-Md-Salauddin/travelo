import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white px-6 dark:bg-zinc-950">
      <div className="text-center">
        <h1 className="text-8xl font-bold text-blue-600">404</h1>

        <h2 className="mt-4 text-2xl font-semibold text-zinc-900 dark:text-white">
          Page Not Found
        </h2>

        <p className="mt-2 max-w-md text-zinc-600 dark:text-zinc-400">
          Sorry, the page you're looking for doesn't exist or has been moved.
        </p>

        <div className="mt-8">
          <Link
            href="/"
            className="rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}