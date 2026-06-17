"use client";

import Link from "next/link";

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="grid lg:grid-cols-2">
          
          {/* Left Side */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-700 p-10 lg:p-14">
            <div className="flex h-full flex-col justify-center">
              
              <div className="mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  🎫
                </div>
              </div>

              <h1 className="mb-4 text-4xl font-bold text-white leading-tight">
                Start Your
                <br />
                Journey Today
              </h1>

              <p className="max-w-md text-lg text-slate-300">
                Create your Travelo account and book bus, train,
                flight and launch tickets from one platform.
              </p>

              <div className="mt-10 space-y-4">
                <div className="flex items-center gap-3 text-white">
                  <span>✓</span>
                  <span>Fast & Secure Booking</span>
                </div>

                <div className="flex items-center gap-3 text-white">
                  <span>✓</span>
                  <span>Real-Time Ticket Availability</span>
                </div>

                <div className="flex items-center gap-3 text-white">
                  <span>✓</span>
                  <span>Easy Refund & Cancellation</span>
                </div>

                <div className="flex items-center gap-3 text-white">
                  <span>✓</span>
                  <span>24/7 Customer Support</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center p-8 lg:p-14">
            <div className="w-full max-w-md">

              <h2 className="text-4xl font-bold text-slate-900">
                Create Account
              </h2>

              <p className="mt-2 text-slate-500">
                Join Travelo and start booking your next trip.
              </p>

              <form className="mt-8 space-y-5">

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="travelo@gmail.com"
                    className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    placeholder="+8801XXXXXXXXX"
                    className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Your password"
                    className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-sky-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-medium text-slate-700">
                    Confirm Password
                  </label>

                  <input
                    type="password"
                    placeholder="Your password"
                    className="w-full rounded-xl border border-slate-200 px-4 py-4 outline-none transition focus:border-sky-500"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-1 h-4 w-4"
                  />

                  <p className="text-sm text-slate-600">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-sky-500 font-medium"
                    >
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/"
                      className="text-sky-500 font-medium"
                    >
                      Privacy Policy
                    </Link>
                  </p>
                </div>

                <button
                  type="submit"
                  className="w-full rounded-xl bg-sky-500 py-4 font-semibold text-white shadow-lg shadow-sky-500/30 transition hover:bg-sky-600"
                >
                  Create Account
                </button>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-slate-200" />
                  <span className="text-sm text-slate-400">or</span>
                  <div className="h-px flex-1 bg-slate-200" />
                </div>

                <button
                  type="button"
                  className="flex w-full items-center justify-center gap-3 rounded-xl border border-slate-200 py-4 font-medium hover:bg-slate-50"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="22"
                    height="22"
                    viewBox="0 0 48 48"
                  >
                    <path
                      fill="#FFC107"
                      d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.3 36 24 36c-6.6 0-12-5.4-12-12S17.4 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.3-.4-3.5z"
                    />
                    <path
                      fill="#FF3D00"
                      d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C34.1 6.1 29.3 4 24 4c-7.7 0-14.3 4.3-17.7 10.7z"
                    />
                    <path
                      fill="#4CAF50"
                      d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2.1 1.6-4.7 2.4-7.2 2.4-5.2 0-9.6-3.3-11.2-7.9l-6.5 5C9.7 39.6 16.3 44 24 44z"
                    />
                    <path
                      fill="#1976D2"
                      d="M43.6 20.5H42V20H24v8h11.3c-1.1 3.1-3.3 5.4-6.1 6.8l6.2 5.2C39.1 36.6 44 31 44 24c0-1.3-.1-2.3-.4-3.5z"
                    />
                  </svg>

                  Continue with Google
                </button>
              </form>

              <p className="mt-8 text-center text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-sky-500 hover:text-sky-600"
                >
                  Sign In
                </Link>
              </p>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}