
"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageCircle,
  Headphones,
  Plane,
  ChevronDown,
} from "lucide-react";

const contactDetails = [
  {
    icon: Mail,
    title: "Email Us",
    description: "Our team is ready to help.",
    value: "support@travelo.com",
    href: "mailto:support@travelo.com",
  },
  {
    icon: Phone,
    title: "Call Us",
    description: "Mon - Sat, 9 AM - 8 PM",
    value: "+880 1234-567890",
    href: "tel:+8801234567890",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come and say hello.",
    value: "Dhaka, Bangladesh",
    href: "https://maps.google.com/?q=Dhaka+Bangladesh",
  },
  {
    icon: Clock,
    title: "Working Hours",
    description: "We're available for you.",
    value: "9:00 AM - 8:00 PM",
    href: null,
  },
];

const faqs = [
  {
    question: "How can I book a ticket on Travelo?",
    answer:
      "Choose your destination, select your departure date, browse available tickets, and complete your booking through our secure booking process.",
  },
  {
    question: "How can I cancel my booking?",
    answer:
      "Visit your dashboard, open My Bookings, select the ticket, and check the available cancellation options.",
  },
  {
    question: "How can I get a refund?",
    answer:
      "Refund eligibility depends on the transport provider's cancellation policy. Contact our support team with your booking details.",
  },
  {
    question: "Can I modify my booking?",
    answer:
      "Booking modifications depend on the provider's policies. Please contact our support team for assistance.",
  },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [openFAQ, setOpenFAQ] = useState(0);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      // Connect your contact API endpoint here.
      // Example: await axios.post("/api/contact", formData);

      console.log("Contact form:", formData);
      alert("Your message has been submitted successfully!");

      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      alert("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#F7F9FC] text-gray-900 dark:bg-[#111827] dark:text-white">

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-[#071F3D] px-4 py-20 text-white sm:py-24">
        <div className="absolute -right-20 -top-32 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl" />
        <div className="absolute -bottom-40 -left-20 h-96 w-96 rounded-full bg-sky-400/10 blur-3xl" />

        <div className="relative mx-auto max-w-7xl">
          <div className="mb-6 flex items-center gap-2 text-sm text-blue-200">
            <Link href="/" className="transition hover:text-white">
              Home
            </Link>
            <span>/</span>
            <span className="text-white">Contact Us</span>
          </div>

          <div className="max-w-2xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-blue-100">
              <MessageCircle size={16} />
              We&apos;re here to help
            </div>

            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Let&apos;s Start a
              <span className="block text-blue-400">
                Conversation.
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-base leading-8 text-blue-100/80 sm:text-lg">
              Have a question about your journey? Need help with a booking?
              Our friendly support team is always ready to assist you.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-4 py-16 sm:py-20">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.85fr_1.15fr] lg:gap-14">

          {/* Contact Information */}
          <div>
            <div className="mb-8">
              <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
                Get in touch
              </p>

              <h2 className="text-3xl font-bold sm:text-4xl">
                We&apos;d Love to Hear From You
              </h2>

              <p className="mt-4 leading-7 text-gray-600 dark:text-gray-400">
                Whether you have a question, feedback, or need assistance,
                feel free to reach out to us.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              {contactDetails.map((item) => {
                const Icon = item.icon;

                const content = (
                  <div className="flex h-full items-start gap-4 rounded-2xl border border-gray-200 bg-white p-5 transition hover:-translate-y-1 hover:border-blue-200 hover:shadow-lg dark:border-gray-700 dark:bg-[#1F2937]">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                      <Icon size={22} />
                    </div>

                    <div className="min-w-0">
                      <h3 className="font-semibold">{item.title}</h3>
                      <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                        {item.description}
                      </p>
                      <p className="mt-2 wrap-break-word text-sm font-semibold text-blue-600 dark:text-blue-400">
                        {item.value}
                      </p>
                    </div>
                  </div>
                );

                return item.href ? (
                  <a
                    key={item.title}
                    href={item.href}
                    target={item.href.startsWith("http") ? "_blank" : undefined}
                    rel={item.href.startsWith("http") ? "noreferrer" : undefined}
                  >
                    {content}
                  </a>
                ) : (
                  <div key={item.title}>{content}</div>
                );
              })}
            </div>

            <div className="mt-6 flex items-center gap-4 rounded-2xl bg-[#071F3D] p-6 text-white">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white/10">
                <Headphones size={25} />
              </div>
              <div>
                <h3 className="font-semibold">Need immediate assistance?</h3>
                <p className="mt-1 text-sm text-blue-100">
                  Our support team is ready to help you.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-3xl border border-gray-200 bg-white p-6 shadow-sm sm:p-9 dark:border-gray-700 dark:bg-[#1F2937]">
            <div className="mb-8">
              <h2 className="text-2xl font-bold sm:text-3xl">
                Send Us a Message
              </h2>
              <p className="mt-2 text-sm leading-6 text-gray-500 dark:text-gray-400">
                Fill out the form below and we&apos;ll get back to you as soon as possible.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">

              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="mb-2 block text-sm font-semibold">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="mb-2 block text-sm font-semibold">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="subject" className="mb-2 block text-sm font-semibold">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  id="subject"
                  name="subject"
                  type="text"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  className="w-full rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="mb-2 block text-sm font-semibold">
                  Your Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Write your message here..."
                  className="w-full resize-none rounded-xl border border-gray-200 px-4 py-3.5 text-sm outline-none transition placeholder:text-gray-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 dark:border-gray-600 dark:text-white"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-blue-600 px-6 py-4 text-sm font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? "Sending..." : "Send Message"}
                <Send size={18} />
              </button>

              <p className="text-center text-xs text-gray-500 dark:text-gray-400">
                We respect your privacy. Your information will only be used
                to respond to your inquiry.
              </p>
            </form>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="border-t border-gray-200 bg-white px-4 py-16 sm:py-20 dark:border-gray-700 dark:bg-[#1F2937]">
        <div className="mx-auto max-w-3xl">
          <div className="mb-10 text-center">
            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
              <Plane size={24} />
            </div>

            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600 dark:text-blue-400">
              Quick answers
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Frequently Asked Questions
            </h2>

            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Find answers to some of the most common questions.
            </p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="overflow-hidden rounded-2xl border border-gray-200 dark:border-gray-600"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenFAQ(openFAQ === index ? -1 : index)
                  }
                  aria-expanded={openFAQ === index}
                  className="flex w-full items-center justify-between gap-4 p-5 text-left"
                >
                  <span className="font-semibold">{faq.question}</span>
                  <ChevronDown
                    size={20}
                    className={`shrink-0 text-blue-600 transition-transform dark:text-blue-400 ${
                      openFAQ === index ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {openFAQ === index && (
                  <div className="border-t border-gray-100 px-5 py-4 text-sm leading-7 text-gray-600 dark:border-gray-600 dark:text-gray-400">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="px-4 py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 rounded-3xl bg-[#071F3D] px-6 py-12 text-center text-white sm:px-12 lg:flex-row lg:text-left">
          <div>
            <h2 className="text-2xl font-bold sm:text-3xl">
              Ready for Your Next Journey?
            </h2>
            <p className="mt-3 text-sm leading-6 text-blue-100">
              Explore destinations and find your next ticket with Travelo.
            </p>
          </div>

          <Link
            href="/all-tickets"
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-blue-700"
          >
            Explore Tickets
            <ArrowRight size={18} />
          </Link>
        </div>
      </section>
    </main>
  );
}
