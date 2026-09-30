"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@heroui/react";
import { Bars, Xmark } from "@gravity-ui/icons";
import { useSession, signOut } from '@/lib/auth-client'
import { usePathname, useRouter } from "next/navigation";
import ThemeToggle from "@/components/shared/ThemeToggle";

export default function Navbar() {

  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false);

  const { data: session, isPending } = useSession();

  const user = session?.user

  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.refresh()
  }

  const navItems = [
    { label: "Home", href: "/" },
    { label: "All Tickets", href: "/all-tickets" },

  ];


  const dashboardLinks = {
    user: '/dashboard/user',
    vendor: '/dashboard/vendor',
    admin: '/dashboard/admin'
  }

  if (user?.email) {
    navItems.push(
      {
        label: 'Dashboard',
        href: dashboardLinks[user?.role || 'user']
      }
    )
  }

  return (
    <nav className="w-full border-b border-default-200 bg-background/80 backdrop-blur-lg">
      <header className="max-w-7xl mx-auto h-20 flex items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl text-white font-bold border border-gray-400">
            <span className="h-16 w-16 flex items-center justify-center">🚍</span>
          </div>

          <h1 className="text-2xl font-bold">Travelo</h1>
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${
                  pathName === item.href ?
                  "text-blue-600 border-b-2 border-blue-600" :
                  "text-black"
                }`}
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Desktop Buttons */}
        <div className="hidden md:flex items-center">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-2">
              <span>Hi, {user?.name}!</span>
              <Button color="danger" variant="danger" onClick={handleSignOut}>
                Sign Out
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <Link

                href="/auth/signin"

                className="px-4 py-2 text-sm font-bold text-blue-800 border border-blue-800 rounded-xl hover:bg-blue-50 transition-colors"
              >
                Sign In
              </Link>

              <Link

                href="/auth/signup"
                variant="primary"
                className="px-4 py-2 text-sm font-bold text-white bg-blue-800 rounded-xl hover:bg-blue-900 transition-colors"
              >
                Sign Up
              </Link>
            </div>
          )}

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
        className={`md:hidden overflow-hidden transition-all duration-300 ${isOpen
            ? "max-h-125 border-t border-default-200"
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

          {/* Mobile Theme */}
          <div className="mt-5 flex justify-start">
            <ThemeToggle />
          </div>

          {user ? (
            <>
              Hi, {user?.name}!
              <Button color="danger" variant="danger" onClick={handleSignOut}>
                Sign Out
              </Button>
            </>
          ) : (
            <div className="mt-6 flex gap-3">
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
          )}

        </div>
        
      </div>
    </nav>
  );
}