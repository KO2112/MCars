"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  BadgeCheck,
  ChevronDown,
  Phone,
  ShieldCheck,
} from "lucide-react";

const trustItems = [
  {
    icon: BadgeCheck,
    title: "Hand-picked stock",
    copy: "Quality vehicles selected with care",
  },
  {
    icon: ShieldCheck,
    title: "Up to 12 months warranty",
    copy: "Drive away with added confidence",
  },
  {
    icon: ArrowUpRight,
    title: "Part exchange welcome",
    copy: "A simple route into your next car",
  },
];

export default function Banner() {
  const reduceMotion = useReducedMotion();

  const reveal = {
    initial: { opacity: 0, y: reduceMotion ? 0 : 24 },
    animate: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative isolate min-h-[640px] overflow-hidden bg-[#080a0d] text-white sm:min-h-[720px] lg:min-h-[820px]">
      {/* Background */}
      <Image
        src="/BMWM8.jpg"
        alt="BMW M8 available from Iron Auto"
        fill
        priority
        sizes="100vw"
        className="object-cover object-[68%_center] sm:object-center"
      />

      {/* Cinematic overlays */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(5,7,10,0.98)_0%,rgba(5,7,10,0.9)_34%,rgba(5,7,10,0.42)_65%,rgba(5,7,10,0.12)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(5,7,10,0.12)_0%,rgba(5,7,10,0.02)_55%,rgba(5,7,10,0.94)_100%)]" />

      {/* Subtle texture */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.035]"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.7'/%3E%3C/svg%3E\")",
        }}
      />

      <div className="relative z-10 mx-auto flex min-h-[640px] max-w-[1440px] flex-col px-5 sm:min-h-[720px] sm:px-8 lg:min-h-[820px] lg:px-12 xl:px-16">
        <div className="flex flex-1 items-center pb-40 pt-20 sm:pb-44 lg:pb-48 lg:pt-28">
          <div className="max-w-3xl">
            <motion.div
              {...reveal}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="mb-7 flex items-center gap-3"
            >
              <span className="h-px w-9 bg-white/55" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-white/70 sm:text-xs">
                Independent car dealership · Leicester
              </p>
            </motion.div>

            <motion.h1
              {...reveal}
              transition={{
                delay: 0.08,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="max-w-[900px] text-[clamp(3.35rem,8vw,7.8rem)] font-semibold leading-[0.86] tracking-[-0.065em]"
            >
              Your next car,
              <span className="block font-light italic text-white/72">
                chosen properly.
              </span>
            </motion.h1>

            <motion.p
              {...reveal}
              transition={{
                delay: 0.18,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-7 max-w-xl text-base leading-7 text-white/68 sm:mt-9 sm:text-lg sm:leading-8"
            >
              Quality used cars, honest advice, and a straightforward buying
              experience from a trusted local team.
            </motion.p>

            <motion.div
              {...reveal}
              transition={{
                delay: 0.28,
                duration: 0.65,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-9 flex flex-col gap-3 sm:mt-11 sm:flex-row"
            >
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
                className="group inline-flex min-h-14 items-center justify-center gap-3 rounded-full border border-white/25 bg-white/[0.06] px-6 text-sm font-semibold text-white backdrop-blur-md transition duration-300 hover:border-white/50 hover:bg-white/12"
              >
                <Phone size={16} />
                Speak to our team
              </Link>
            </motion.div>
          </div>
        </div>

        {/* Bottom trust strip */}
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.42,
            duration: 0.7,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="absolute inset-x-5 bottom-5 rounded-[28px] border border-white/12 bg-black/35 p-3 backdrop-blur-xl sm:inset-x-8 sm:bottom-8 lg:inset-x-12 xl:inset-x-16"
        >
          <div className="grid gap-1 sm:grid-cols-3">
            {trustItems.map(({ icon: Icon, title, copy }, index) => (
              <div
                key={title}
                className={`flex items-center gap-4 rounded-[20px] px-4 py-3.5 sm:px-5 sm:py-4 ${
                  index !== trustItems.length - 1
                    ? "sm:border-r sm:border-white/10"
                    : ""
                }`}
              >
                <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/14 bg-white/[0.07]">
                  <Icon size={17} strokeWidth={1.7} />
                </div>
                <div>
                  <p className="text-sm font-semibold tracking-[-0.01em]">
                    {title}
                  </p>
                  <p className="mt-0.5 hidden text-xs text-white/52 lg:block">
                    {copy}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 right-8 z-20 hidden items-center gap-3 text-[10px] font-medium uppercase tracking-[0.24em] text-white/45 xl:flex">
        Explore
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  );
}