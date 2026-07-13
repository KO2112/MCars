"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Handshake,
  MapPin,
  ShieldCheck,
  Star,
  Truck,
  Wallet,
} from "lucide-react";

const features = [
  {
    icon: Star,
    title: "Trusted by Reviews",
    description:
      "Our commitment to excellence shines through in our customer feedback. See why buyers consistently rate us 5-stars.",
  },
  {
    icon: MapPin,
    title: "Prime Leicester Location",
    description:
      "Easily access our modern showroom in Leicester, with convenient parking and public transport links.",
  },
  {
    icon: Truck,
    title: "Instant Drive-Away",
    description:
      "Found your perfect car? Drive it home today! Our efficient process ensures quick and easy collection.",
  },
  {
    icon: Wallet,
    title: "Transparent Pricing",
    description:
      "No hidden fees, no haggling. Just straightforward, competitive pricing from the start.",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured Vehicles",
    description:
      "Every car undergoes rigorous multi-point inspections for peace of mind and long-term reliability.",
  },
  {
    icon: Handshake,
    title: "Dedicated Customer Support",
    description:
      "Our friendly experts are here to guide you, offering personalized advice and seamless service.",
  },
];

export default function WhyChooseUs() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="why-choose-us-heading"
      className="relative isolate overflow-hidden bg-[#0b0d10] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(255,255,255,0.07),transparent_28%)]" />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16 lg:pb-16"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-white/55" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:text-xs">
                Your Journey, Our Commitment
              </p>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/52 sm:text-base sm:leading-7">
              Independent car dealership · Leicester
            </p>
          </div>

          <div>
            <h2
              id="why-choose-us-heading"
              className="max-w-5xl text-[clamp(2.9rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
            >
              Why Choose
              <span className="block font-light italic text-white/62">
                IRON AUTO?
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Experience the IRON AUTO difference. We are dedicated to
              delivering not just cars, but complete satisfaction.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 mt-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
          {features.map(({ icon: Icon, title, description }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{
                delay: reduceMotion ? 0 : index * 0.055,
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="group min-h-[320px] bg-[#0e1115] p-7 transition duration-300 hover:bg-[#13171c] sm:p-8"
            >
              <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-white transition duration-300 group-hover:bg-white group-hover:text-black">
                  <Icon size={19} strokeWidth={1.7} />
                </div>

                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/28">
                  0{index + 1}
                </p>
              </div>

              <div className="mt-20">
                <h3 className="text-2xl font-semibold tracking-[-0.03em]">
                  {title}
                </h3>

                <p className="mt-4 max-w-md text-sm leading-6 text-white/52 sm:text-[15px]">
                  {description}
                </p>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex flex-col gap-5 rounded-[26px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-7"
        >
          <div>
            <p className="text-sm font-semibold text-white">
              Ready to find your next car?
            </p>
            <p className="mt-1 text-sm text-white/48">
              Browse our available stock or speak directly with the Iron Auto
              team.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href="/cars"
              className="group inline-flex min-h-12 items-center justify-between gap-6 rounded-full bg-white px-5 text-sm font-semibold text-black transition hover:bg-white/88"
            >
              View available cars
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>

            <Link
              href="/contact"
              className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/16 px-5 text-sm font-semibold text-white transition hover:border-white/35 hover:bg-white/[0.05]"
            >
              Contact us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}