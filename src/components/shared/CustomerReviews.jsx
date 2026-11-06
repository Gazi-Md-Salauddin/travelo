"use client"
import { motion } from "framer-motion";
import { StarFill, ShieldCheck, QuoteOpen } from "@gravity-ui/icons";

const reviews = [
  {
    id: 1,
    name: "Rahim Ahmed",
    role: "Frequent Traveler",
    initial: "R",
    rating: 5,
    date: "Recent traveler",
    review:
      "The booking process was simple and smooth. I could easily compare travel options and find a suitable ticket.",
    color: "bg-blue-100 text-blue-700",
  },
  {
    id: 2,
    name: "Nusrat Jahan",
    role: "Family Traveler",
    initial: "N",
    rating: 5,
    date: "Recent traveler",
    review:
      "I love how clean and easy the website is to use. Finding tickets for a trip feels much more convenient.",
    color: "bg-pink-100 text-pink-700",
  },
  {
    id: 3,
    name: "Tanvir Hasan",
    role: "Business Traveler",
    initial: "T",
    rating: 5,
    date: "Recent traveler",
    review:
      "The ticket details are easy to understand, and the overall experience makes planning a journey simpler.",
    color: "bg-amber-100 text-amber-700",
  },
];

export default function CustomerReviews() {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8">
      <motion.div initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }} className="mx-auto max-w-7xl">

        {/* Heading */}
        <div className="mx-auto mb-10 max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-blue-500">
            Customer Stories
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
            What Our Customer Says
          </h2>

          <p className="mt-4 text-sm leading-6 text-slate-700 sm:text-base dark:text-slate-400">
            Discover why travelers choose Travelo for a simpler
            and more convenient booking experience.
          </p>

          {/* Rating summary */}
          <div className="mt-6 inline-flex items-center gap-3 rounded-2xl border border-slate-200 px-5 py-3">
            <div className="text-3xl font-bold text-slate-900 dark:text-white">
              4.9
            </div>

            <div className="text-left">
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <StarFill
                    key={star}
                    size={16}
                    className="fill-amber-400 text-amber-400"
                  />
                ))}
              </div>

              <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                Customer satisfaction
              </p>
            </div>
          </div>
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.id}
              className="group rounded-2xl border border-slate-200 p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
            >
              <div className="flex items-center justify-between">
                <div className="flex gap-1">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <StarFill
                      key={i}
                      size={16}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>

                <QuoteOpen
                  size={28}
                  className="text-blue-200 transition-colors group-hover:text-blue-300"
                />
              </div>

              <p className="mt-5 min-h-24 text-sm leading-7 text-slate-500 dark:text-slate-400">
                {review.review}
              </p>

              <div className="mt-5 border-t border-slate-100 pt-5">
                <div className="flex items-center gap-3">
                  <div
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full text-lg font-bold ${review.color}`}
                  >
                    {review.initial}
                  </div>

                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-slate-900 dark:text-white">
                      {review.name}
                    </h3>
                    <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                      {review.role}
                    </p>
                  </div>

                  <div className="flex items-center gap-1 text-blue-600">
                    <ShieldCheck size={17} />
                    <span className="text-xs font-medium">
                      Review
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
