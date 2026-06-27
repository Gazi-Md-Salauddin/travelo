import {
  ShieldCheck,
  Clock,
  Ticket,
  CreditCard,
  Headphones,
  Plane,
} from "@gravity-ui/icons";

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

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-default-50">
      <div className="max-w-7xl mx-auto px-4">

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

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;