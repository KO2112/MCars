"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Award,
  BadgeCheck,
  CheckCircle,
  Clock,
  HeartHandshake,
  MapPin,
  Shield,
  Users,
} from "lucide-react";

const coreValues = [
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Every vehicle undergoes rigorous multi-point inspection.",
  },
  {
    icon: Award,
    title: "Low Cost Service",
    description: "Lower maintenance fees for customer satisfaction.",
  },
  {
    icon: Users,
    title: "Expert Team",
    description: "Passionate and knowledgeable specialists at your service.",
  },
  {
    icon: HeartHandshake,
    title: "Community Focused",
    description: "Proudly supporting local initiatives and charities.",
  },
];

const stats = [
  {
    icon: Clock,
    value: "Satisfactory",
    label: "Tailored vehicles for each customer",
  },
  {
    icon: CheckCircle,
    value: "Part Exchange",
    label: "Taking any vehicle for your convenience",
  },
  {
    icon: Users,
    value: "98%",
    label: "Satisfied Customers",
  },
  {
    icon: MapPin,
    value: "1",
    label: "Prime Location",
  },
];

export default function AboutUs() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.2 },
  };

  return (
    <section
      aria-labelledby="about-heading"
      className="relative isolate overflow-hidden bg-[#080a0d] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_16%,rgba(255,255,255,0.08),transparent_28%)]" />
        <div
          className="absolute inset-0 opacity-[0.028]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-[1440px] px-5 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-32 xl:px-16">
        <motion.div
          {...reveal}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="grid gap-8 border-b border-white/10 pb-12 lg:grid-cols-[0.8fr_1.2fr] lg:items-end lg:gap-16 lg:pb-16"
        >
          <div>
            <div className="mb-6 flex items-center gap-3">
              <span className="h-px w-9 bg-white/55" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/55 sm:text-xs">
                Our story, our passion
              </p>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/52 sm:text-base sm:leading-7">
              Independent car dealership · Leicester
            </p>
          </div>

          <div>
            <h2
              id="about-heading"
              className="max-w-5xl text-[clamp(2.9rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
            >
              Driving Excellence
              <span className="block font-light italic text-white/62">
                Since 2022.
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              At IRON AUTO, we do not just sell cars; we build relationships.
              Learn about our journey and what makes us unique.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16 lg:py-16">
          <motion.div
            {...reveal}
            transition={{
              delay: 0.05,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="flex flex-col justify-between"
          >
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/45">
                Leicester&apos;s premier auto dealership
              </p>

              <h3 className="mt-5 max-w-2xl text-3xl font-semibold tracking-[-0.035em] sm:text-4xl lg:text-5xl">
                Honest guidance. Quality cars. A local team that cares.
              </h3>

              <div className="mt-8 max-w-2xl space-y-5 text-[15px] leading-7 text-white/62 sm:text-base sm:leading-8">
                <p>
                  At Iron Auto, we believe that buying a car should be one of
                  life&apos;s great experiences. Since our foundation in 2022,
                  we have helped our customers find their perfect vehicle,
                  combining exceptional customer service with an outstanding
                  selection of quality cars.
                </p>

                <p>
                  Based in Leicester, our state-of-the-art showroom features a
                  handpicked selection of premium vehicles. Our expert team is
                  passionate about cars and committed to providing honest,
                  professional advice to help you make the right choice for your
                  needs and budget.
                </p>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/cars"
                className="group inline-flex min-h-14 items-center justify-between gap-8 rounded-full bg-white px-6 text-sm font-semibold text-black transition duration-300 hover:bg-white/88 sm:min-w-56"
              >
                View available cars
                <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                  <ArrowUpRight size={16} />
                </span>
              </Link>

              <Link
                href="/contact"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/18 bg-white/[0.045] px-6 text-sm font-semibold text-white backdrop-blur-md transition hover:border-white/35 hover:bg-white/[0.08]"
              >
                Speak to our team
              </Link>
            </div>
          </motion.div>

          <motion.div
            {...reveal}
            transition={{
              delay: 0.12,
              duration: 0.75,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="relative min-h-[420px] overflow-hidden rounded-[30px] border border-white/12 sm:min-h-[560px]"
          >
            <Image
              src="/jaguar.jpeg"
              alt="Iron Auto modern showroom in Leicester"
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
              className="object-cover"
            />

            <div className="absolute inset-0 bg-black/20" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(8,10,13,0.04)_20%,rgba(8,10,13,0.88)_100%)]" />

            <div className="absolute left-5 top-5 flex items-center gap-2 rounded-full border border-white/15 bg-black/28 px-4 py-2.5 backdrop-blur-xl sm:left-7 sm:top-7">
              <MapPin size={14} />
              <span className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/76">
                Leicester showroom
              </span>
            </div>

            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-white/48">
                Our modern showroom
              </p>
              <h3 className="mt-3 max-w-xl text-2xl font-semibold tracking-[-0.03em] sm:text-3xl">
                Experience our vehicles in a comfortable and welcoming
                environment.
              </h3>
            </div>
          </motion.div>
        </div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/10 py-12 lg:py-16"
        >
          <div className="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/45">
                What guides us
              </p>
              <h3 className="mt-3 text-3xl font-semibold tracking-[-0.035em] sm:text-4xl">
                Our Core Values
              </h3>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/48">
              The standards behind every vehicle, conversation, and customer
              experience.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {coreValues.map(({ icon: Icon, title, description }, index) => (
              <motion.article
                key={title}
                initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  delay: reduceMotion ? 0 : index * 0.06,
                  duration: 0.5,
                }}
                className="group min-h-64 rounded-[24px] border border-white/10 bg-white/[0.035] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06]"
              >
                <div className="grid h-11 w-11 place-items-center rounded-full border border-white/12 bg-white/[0.06] text-white transition group-hover:bg-white group-hover:text-black">
                  <Icon size={18} strokeWidth={1.7} />
                </div>

                <div className="mt-16">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/35">
                    0{index + 1}
                  </p>
                  <h4 className="mt-3 text-xl font-semibold tracking-[-0.025em]">
                    {title}
                  </h4>
                  <p className="mt-3 text-sm leading-6 text-white/52">
                    {description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </motion.div>

        <motion.div
          {...reveal}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="border-t border-white/10 pt-12 lg:pt-16"
        >
          <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {stats.map(({ icon: Icon, value, label }, index) => (
              <div
                key={value}
                className="group min-h-56 bg-[#0b0d10] p-6 transition duration-300 hover:bg-[#111419] sm:p-7"
              >
                <div className="flex items-start justify-between">
                  <div className="grid h-10 w-10 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-white/75">
                    <Icon size={17} strokeWidth={1.7} />
                  </div>

                  <BadgeCheck
                    size={16}
                    className="text-white/18 transition group-hover:text-white/45"
                  />
                </div>

                <div className="mt-14">
                  <p
                    className={`font-semibold tracking-[-0.04em] ${
                      value.length > 8
                        ? "text-2xl sm:text-[1.7rem]"
                        : "text-4xl sm:text-5xl"
                    }`}
                  >
                    {value}
                  </p>
                  <p className="mt-3 max-w-[18rem] text-sm leading-6 text-white/48">
                    {label}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}