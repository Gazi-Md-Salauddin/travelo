"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Input,
  Label,
  InputGroup,
  TextField,
  Button
} from "@heroui/react";

import {
  Eye,
  EyeSlash,
  Envelope,
  Lock,
  Airplane,
} from "@gravity-ui/icons";
import { authClient } from "@/lib/auth-client";
import { toast } from 'react-hot-toast'

export default function SignInPage() {
  

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const router = useRouter();

  const toggleVisibility = () => setShowPassword(!showPassword);

  const handleSignIn = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    const form = e.target;

    const email = form.email.value;
    const password = form.password.value;

    try {
      const result = await authClient.signIn.email({
        email,
        password,
      });
      console.log(result)
      if (result?.error) {
        toast.error(result.error.message || "Login failed");
      } else {
        toast.success("SignIn Successful")
        router.push("/");
        router.refresh();
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };
  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center px-2 py-6 sm:py-10">
      <div className="w-full max-w-8xl overflow-hidden rounded-2xl lg:rounded-3xl border border-slate-200 bg-white shadow-lg">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Side */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-indigo-700 px-6 py-10 md:px-10 py-14 lg:p-14">
            <div className="flex h-full flex-col justify-center">
              
              <div className="mb-8">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white/10 backdrop-blur text-2xl">
                  🚌
                </div>
              </div>

              <h1 className="mb-4 text-3xl md:4xl lg:5xl font-bold text-white leading-tight">
                Welcome back
                <br />
                to Travelo
              </h1>

              <p className="max-w-md sm:text-lg text-slate-300">
                Your journey continues here. Book tickets for bus,
                train, flight and launch all in one place.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-xl border border-white/20 bg-white/10 px-4 py-2 text-white backdrop-blur">
                  🚌 Bus
                </span>

                <span className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur">
                  🚆 Train
                </span>

                <span className="rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-white backdrop-blur">
                  ✈️ Flight
                </span>
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div className="flex items-center justify-center px-6 py-10 lg:p-14">
            <div className="w-full max-w-md mx-auto">
              
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                Sign In
              </h2>

              <p className="mt-2 text-slate-500">
                Welcome back! Please enter your details.
              </p>

              <form
          onSubmit={handleSignIn}
          className="mt-8 flex flex-col gap-5"
        >
          {/* Email */}
          <TextField className="w-full">
            <Label>Email</Label>

            <InputGroup>
              <InputGroup.Suffix>
                <Envelope className="text-default-400 text-lg" />
              </InputGroup.Suffix>

              <Input
                type="email"
                name="email"
                placeholder="Enter your email"
                required
              />
            </InputGroup>
          </TextField>

          {/* Password */}
          <TextField className="w-full">
            <Label>Password</Label>

            <InputGroup>
              <InputGroup.Suffix>
                <Lock className="text-default-400 text-lg" />
              </InputGroup.Suffix>

              <Input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Enter your password"
                required
              />

              <InputGroup.Suffix>
                <button
                  type="button"
                  onClick={toggleVisibility}
                  className="focus:outline-none flex items-center justify-center text-default-400 hover:text-default-600 transition"
                >
                  {showPassword ? (
                    <EyeSlash className="text-lg" />
                  ) : (
                    <Eye className="text-lg" />
                  )}
                </button>
              </InputGroup.Suffix>
            </InputGroup>
          </TextField>

          {/* Forgot Password */}
          <div className="flex justify-end">
            <Link
              href="/forgot-password"
              className="text-sm text-primary hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          {/* Submit */}
          <Button
            type="submit"
            color="primary"
            className="w-full h-12 font-semibold"
            radius="lg"
            isLoading={loading}
          >
            {loading ? "Signing In..." : "Sign In"}
          </Button>
        </form>
              <p className="mt-8 text-centertext-center text-sm text-slate-600">
                No account?{" "}
                <Link
                  href="/auth/signup"
                  className="font-semibold text-sky-500 hover:text-sky-600"
                >
                  Register free
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}