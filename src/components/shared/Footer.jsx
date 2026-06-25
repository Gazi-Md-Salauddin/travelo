"use client";

import Link from "next/link";
import {
  Envelope,
  Handset,
  LogoFacebook,
  CreditCard,
  Ticket,
} from "@gravity-ui/icons";

export default function Footer() {
  return (
    <footer className="border-t border-default-200 bg-[#0B1B3A] text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Column 1 */}
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-850 text-white">
                <Ticket className="h-5 w-5" />
              </div>
              <span className="text-xl font-bold">Travelo</span>
            </Link>

            <p className="text-sm text-default-600">
              Book bus, train, launch & flight tickets easily. Fast, secure,
              and hassle-free online ticket booking platform.
            </p>
          </div>

          {/* Column 2 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Quick Links</h3>

            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-default-600 transition hover:text-primary"
                >
                  Home
                </Link>
              </li>

              <li>
                <Link
                  href="/all-tickets"
                  className="text-default-600 transition hover:text-primary"
                >
                  All Tickets
                </Link>
              </li>

              <li>
                <Link
                  href="/about"
                  className="text-default-600 transition hover:text-primary"
                >
                  About
                </Link>
              </li>

              <li>
                <Link
                  href="/contact"
                  className="text-default-600 transition hover:text-primary"
                >
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Contact Info</h3>

            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-default-600">
                <Envelope className="h-4 w-4" />
                <a href="mailto:support@travelo.com">
                  support@travelo.com
                </a>
              </li>

              <li className="flex items-center gap-3 text-default-600">
                <Handset className="h-4 w-4" />
                <a href="tel:+8801700000000">+880 1700-000000</a>
              </li>

              <li className="flex items-center gap-3 text-default-600">
                <LogoFacebook className="h-4 w-4" />
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Facebook Page
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Payment Methods</h3>

            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 rounded-xl border border-default-200 px-4 py-3">
                <CreditCard className="h-5 w-5" />
                <span className="text-sm font-medium">Stripe</span>
              </div>

              
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-default-200">
        <div className="mx-auto max-w-7xl px-4 py-5 text-center text-sm text-default-500 lg:px-8">
          © 2026 Travelo. All rights reserved.
        </div>
      </div>
    </footer>
  );
}