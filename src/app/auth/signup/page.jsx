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
  InputGroup,
  TextField,
  Label,
  Checkbox,
} from "@heroui/react";
import { Description, Radio, RadioGroup } from "@heroui/react";

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
    <main className="min-h-screen bg-slate-50 p-2 flex items-center justify-center">
      <Card className="w-full max-w-6xl mx-auto overflow-hidden rounded-3xl border border-default-200 shadow-xl">
        <div className="grid md:grid-cols-2">
          {/* LEFT SIDE */}
          <div className="relative overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-sky-700">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.15),transparent_35%)]" />

            <div className="relative flex h-full flex-col justify-center p-4 lg:p-14">
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
          <div className="flex items-center justify-center p-4 lg:p-14">
            <div className="w-full max-w-md">
              <Link
                href="/"
                className="mb-6 inline-flex items-center gap-2 text-sm text-default-500 hover:text-primary"
              >
                <ArrowLeft className="h-4 w-4" />
                Back to Home
              </Link>

              <h2 className="text-4xl font-bold text-slate-900">
                Create Account
              </h2>

              <p className="mt-2 text-slate-500">
                Join Travelo and start booking your next trip.
              </p>

              {success && (
                <div className="mt-5 rounded-xl bg-green-100 px-4 py-3 text-sm text-green-700">
                  {success}
                </div>
              )}

              {error && (
                <div className="mt-5 rounded-xl bg-red-100 px-4 py-3 text-sm text-red-700">
                  {error}
                </div>
              )}

              <form
                onSubmit={handleSignup}
                className="mt-8 space-y-5"
              >
                <TextField>
                  <Label>Full Name</Label>

                  <InputGroup>
                    <InputGroup.Suffix>
                      <Person className="text-default-400" />
                    </InputGroup.Suffix>

                    <Input
                      name="name"
                      placeholder="Enter your name"
                      required
                    />
                  </InputGroup>
                </TextField>

                <TextField>
                  <Label>Email Address</Label>

                  <InputGroup>
                    <InputGroup.Suffix>
                      <Envelope className="text-default-400" />
                    </InputGroup.Suffix>

                    <Input
                      type="email"
                      name="email"
                      placeholder="travelo@gmail.com"
                      required
                    />
                  </InputGroup>
                </TextField>

                <TextField>
                  <Label>Password</Label>

                  <InputGroup>
                    <InputGroup.Suffix>
                      <Lock className="text-default-400" />
                    </InputGroup.Suffix>

                    <Input
                      name="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="Create a password"
                      required
                    />

                    <InputGroup.Suffix>
                      <button
                        type="button"
                        onClick={toggleVisibility}
                        className="text-default-400 hover:text-default-700"
                      >
                        {isVisible ? (
                          <EyeSlash className="h-4 w-4" />
                        ) : (
                          <Eye className="h-4 w-4" />
                        )}
                      </button>
                    </InputGroup.Suffix>
                  </InputGroup>
                </TextField>
                
                {/* Role Selection */}
                    <div className="flex flex-col gap-4">
                        <Label>Role</Label>
                        <RadioGroup defaultValue="user" name="role" onChange ={setRole} orientation="horizontal">
                            <Radio value="user">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>User</Label>
                                </Radio.Content>
                            </Radio>
                            <Radio value="vendor">
                                <Radio.Control>
                                    <Radio.Indicator />
                                </Radio.Control>
                                <Radio.Content>
                                    <Label>Vendor</Label>
                                </Radio.Content>
                            </Radio>
                        </RadioGroup>
                    </div>

                <Checkbox required>
                  I agree to the{" "}
                  <Link
                    href="/terms"
                    className="font-medium text-sky-600"
                  >
                    Terms & Conditions
                  </Link>{" "}and{" "}
                  <Link
                    href="/privacy"
                    className="font-medium text-sky-600"
                  >
                    Privacy Policy
                  </Link>
                </Checkbox>

                <Button
                  type="submit"
                  color="primary"
                  radius="lg"
                  className="w-full"
                  isLoading={loading}
                >
                  {loading
                    ? "Creating Account..."
                    : "Create Account"}
                </Button>

                <div className="flex items-center gap-4">
                  <div className="h-px flex-1 bg-default-200" />
                  <span className="text-sm text-default-400">
                    OR
                  </span>
                  <div className="h-px flex-1 bg-default-200" />
                </div>

                <Button
                  type="button"
                  variant="bordered"
                  radius="lg"
                  className="w-full"
                  onPress={handleGoogleSignup}
                >
                  Continue with Google
                </Button>
              </form>

              <p className="mt-8 text-center text-sm text-slate-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="font-semibold text-sky-600 hover:text-sky-700"
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