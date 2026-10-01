"use client"
import {
  ShieldCheck,
  Clock,
  Ticket,
  CreditCard,
  Headphones,
  Plane,
} from "@gravity-ui/icons";
import { motion } from "framer-motion";

const features = [
  {
    title: "Secure Booking",
    description:
      "Book your tickets safely with secure authentication and protected transactions.",
    icon: <ShieldCheck className="w-8 h-8" />,
  },
  {
    title: "Instant Confirmation",
    description:
      "Receive booking confirmation instantly after completing your reservation.",
    icon: <Ticket className="w-8 h-8" />,
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is available anytime to assist you.",
    icon: <Headphones className="w-8 h-8" />,
  },
  {
    title: "Easy Payments",
    description:
      "Pay securely using multiple payment methods with a smooth checkout experience.",
    icon: <CreditCard className="w-8 h-8" />,
  },
  {
    title: "Fast Search",
    description:
      "Find buses, trains, flights, and other transport options within seconds.",
    icon: <Clock className="w-8 h-8" />,
  },
  {
    title: "Wide Transport Network",
    description:
      "Choose from various trusted transport providers across multiple destinations.",
    icon: <Plane className="w-8 h-8" />,
  },
];

// scroll animation
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    x: -80,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: "easeOut",
    },
  },
};

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-default-50">
      <motion.div initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, amount: 0.3 }} className="max-w-7xl mx-auto px-4">

        <div className="text-center mb-14">
          <h2 className="text-4xl font-bold">
            Why Choose Us?
          </h2>

          <p className="mt-4 max-w-2xl mx-auto text-default-500">
            Travelo makes ticket booking simple, secure, and hassle-free.
            Enjoy a seamless travel experience with trusted services and
            reliable support.
          </p>
        </div>

        <motion.div variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }} className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              className="rounded-2xl border bg-background p-8 shadow-sm hover:shadow-lg transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center text-primary mb-5">
                {feature.icon}
              </div>

              <h3 className="text-xl font-semibold mb-3">
                {feature.title}
              </h3>

              <p className="text-default-500">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
};

export default WhyChooseUs;