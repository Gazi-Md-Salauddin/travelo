"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

import {
  Person,
  Envelope,
  Lock,
  Eye,
  EyeSlash,
  ArrowLeft,
  CircleCheckFill,
  Rocket,
} from "@gravity-ui/icons";

import {
  Button,
  Card,
  Input,
  TextField,
  Label,
  Checkbox,
} from "@heroui/react";
import { FcGoogle } from "react-icons/fc";

import { authClient } from "@/lib/auth-client";

export default function SignupPage() {
  const router = useRouter();

  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("user");

  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const toggleVisibility = () => setIsVisible((prev) => !prev);

  const handleSignup = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");
    setSuccess("");

    const form = e.target;

    const name = form.name.value;
    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await authClient.signUp.email({
        name,
        email,
        password,
        role
      });

      if (result?.error) {
        setError(result.error.message || "Signup failed");
        return;
      }

      setSuccess("Account created successfully!");

      form.reset();

      setTimeout(() => {
        router.push("/auth/signin");
      }, 1000);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/",
    });
  };

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-2 sm:py-10 dark:bg-[#171717] border dark:border-[#374151]">
      <Card className="w-full max-w-7xl overflow-hidden rounded-2xl lg:rounded-3xl border border-default-200 shadow-xl">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden bg-linear-to-br from-slate-950 via-blue-950 to-sky-700 px-6 py-10 md:px-10 md:py-14 lg:p-14">
            <div className="bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

            <div className="flex h-full flex-col justify-center">
              <div className="mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur">
                  <Rocket className="h-8 w-8 text-white" />
                </div>
              </div>

              <h1 className="text-4xl font-bold leading-tight text-white lg:text-5xl">
                Start Your
                <br />
                Journey Today
              </h1>

              <p className="mt-5 max-w-md text-lg text-slate-300">
                Create your Travelo account and book bus, train,
                flight and launch tickets from a single platform.
              </p>

              <div className="mt-10 space-y-5">
                {[
                  "Fast & Secure Booking",
                  "Real-Time Ticket Availability",
                  "Easy Refund & Cancellation",
                  "24/7 Customer Support",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 text-white"
                  >
                    <CircleCheckFill className="h-5 w-5 text-sky-400" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="flex items-center justify-center p-5 sm:p-8 lg:p-12">
            <div className="mx-auto w-full max-w-lg">

              {/* Back Navigation */}
              <Link
                href="/"
                className="mb-7 inline-flex items-center gap-2 text-sm font-medium text-default-500 transition-colors hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              {/* Heading */}
              <div className="mb-7">

                <h2 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-4xl">
                  Create Account
                </h2>

                <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
                  Join Travelo and start booking your next trip.
                </p>
              </div>

              {/* Success Message */}
              {success && (
                <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {/* Error Message */}
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form onSubmit={handleSignup} className="flex flex-col gap-5">

                {/* Account Type */}
                <div>
                  <div className="mb-3 flex items-center justify-between">
                    <Label className="font-semibold  dark:text-slate-200">
                      Choose Account Type
                    </Label>
                    <span className="text-xs text-default-400">
                      Required
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">

                    {/* User Card */}
                    <button
                      type="button"
                      onClick={() => setRole("user")}
                      aria-pressed={role === "user"}
                      className={`relative flex flex-col items-center rounded-2xl border-2 p-3 text-center transition-all duration-200 ${role === "user"
                        ? "border-blue-500 bg-blue-50/80 shadow-md shadow-blue-500/10 dark:bg-blue-500/10"
                        : "border-default-200 bg-white hover:border-blue-300 dark:bg-[#202020]"
                        }`}
                    >
                      {role === "user" && (
                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                          <CircleCheckFill className="h-3 w-3" />
                        </span>
                      )}

                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Traveler
                      </h3>

                      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${role === "user"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "bg-default-100 text-default-500"
                        }`}>
                        User
                      </span>
                    </button>

                    {/* Vendor Card */}
                    <button
                      type="button"
                      onClick={() => setRole("vendor")}
                      aria-pressed={role === "vendor"}
                      className={`relative flex flex-col items-center rounded-2xl border-2 p-3 text-center transition-all duration-200 ${role === "vendor"
                        ? "border-blue-500 bg-blue-50/80 shadow-md shadow-blue-500/10 dark:bg-blue-500/10"
                        : "border-default-200 bg-white hover:border-blue-300 dark:bg-[#202020]"
                        }`}
                    >
                      {role === "vendor" && (
                        <span className="absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-white">
                          <CircleCheckFill className="h-3 w-3" />
                        </span>
                      )}


                      <h3 className="font-bold text-slate-900 dark:text-white">
                        Travel Partner
                      </h3>

                      <span className={`mt-2 rounded-full px-3 py-1 text-xs font-semibold ${role === "vendor"
                        ? "bg-blue-500/10 text-blue-600 dark:text-blue-400"
                        : "bg-default-100 text-default-500"
                        }`}>
                        Vendor
                      </span>
                    </button>

                  </div>
                </div>

                {/* Full Name */}
                <TextField>
                  <Label className="mb-2 font-semibold text-slate-700 dark:text-slate-300">
                    Full Name
                  </Label>

                  <Input
                    name="name"
                    type="text"
                    placeholder="Enter your full name"
                    className="h-12 w-full"
                    
                    required
                  />
                </TextField>

                {/* Email */}
                <TextField>
                  <Label className="mb-2 font-semibold text-slate-700 dark:text-slate-300">
                    Email Address
                  </Label>

                  <Input
                    name="email"
                    type="email"
                    placeholder="Enter your email address"
                    className="h-12 w-full"
                    
                    required
                  />
                </TextField>

                {/* Password */}
                <TextField>
                  <Label className="mb-2 font-semibold text-slate-700 dark:text-slate-300">
                    Password
                  </Label>

                  <div className="relative w-full">
                    <Input
                      name="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="Create a strong password"
                      required
                      className="h-12 w-full"
                    />

                    <button
                      type="button"
                      onClick={toggleVisibility}
                      className="absolute right-4 top-1/2 z-10 -translate-y-1/2 text-default-400 transition-colors hover:text-blue-500"
                      aria-label={isVisible ? "Hide password" : "Show password"}
                    >
                      {isVisible ? (
                        <EyeSlash className="h-5 w-5" />
                      ) : (
                        <Eye className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </TextField>

                {/* Terms */}
                <Checkbox
                  required
                  className="items-start"
                >
                  <span className="text-sm leading-relaxed text-default-500">
                    I agree to the{" "}
                    <Link href="/terms" className="font-semibold text-blue-600 hover:underline">
                      Terms & Conditions
                    </Link>{" "}
                    and{" "}
                    <Link href="/privacy" className="font-semibold text-blue-600 hover:underline">
                      Privacy Policy
                    </Link>
                  </span>
                </Checkbox>
                {/* Create Account */}
                <Button
                  type="submit"
                  color="primary"
                  radius="lg"
                  className="h-12 w-full bg-blue-600 font-semibold text-white shadow-lg shadow-blue-500/20 transition-all hover:bg-blue-700"
                  isLoading={loading}
                >
                  {loading ? "Creating Account..." : "Create Account"}
                </Button>

                {/* Divider */}
                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-default-200" />
                  <span className="text-xs font-medium text-default-400">
                    OR CONTINUE WITH
                  </span>
                  <div className="h-px flex-1 bg-default-200" />
                </div>

                {/* Google Signup */}
                <Button
                  type="button"
                  variant="outline"
                  radius="lg"
                  className="h-12 w-full border border-default-300 font-semibold hover:bg-default-100 dark:hover:bg-[#252525]"
                  onPress={handleGoogleSignup}
                > <FcGoogle/>
                  Continue with Google
                </Button>

              </form>

              {/* Sign In */}
              <p className="mt-6 text-center text-sm text-default-500">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-bold text-blue-600 transition-colors hover:text-blue-700"
                >
                  Sign In
                </Link>
              </p>

            </div>
          </div>

        </div>
      </Card>
    </main>
  );
}