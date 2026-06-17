"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { label: "Home", href: "/" },
    { label: "Bus", href: "/bus" },
    { label: "Train", href: "/train" },
    { label: "Launch", href: "/launch" },
    { label: "Flight", href: "/flight" },
    { label: "Offers", href: "/offers" },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-default-200 bg-background/80 backdrop-blur-lg">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-800 text-white font-bold">
            T
          </div>

          <h1 className="text-lg font-bold">Travelo</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className="text-sm font-medium transition-colors hover:text-primary"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center gap-3">
          <Button
            as={Link}
            href="/login"
            variant="light"
          >
            Login
          </Button>

          <Button
            as={Link}
            href="/signup"
            color="primary"
          >
            Sign Up
          </Button>
        </div>

        {/* Mobile Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden"
          aria-label="Toggle Menu"
        >
          {isOpen ? (
            <Xmark className="h-6 w-6" />
          ) : (
            <Bars className="h-6 w-6" />
          )}
        </button>
      </header>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          isOpen
            ? "max-h-[500px] border-t border-default-200"
            : "max-h-0"
        }`}
      >
        <div className="bg-background px-4 py-4">
          <ul className="flex flex-col gap-4">
            {navItems.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  onClick={() => setIsOpen(false)}
                  className="block text-sm font-medium hover:text-primary"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3">
            <Link
              
              href="/auth/signin"
              variant="flat"
              className="w-full text-blue-800 font-bold text-center p-2 border border-blue-800 rounded-full"
            >
              Sign In
            </Link>

            <Link
              
              href="/auth/signup"
              variant="primary"
              className="w-full bg-blue-800 text-white font-bold text-center p-2 rounded-full"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}