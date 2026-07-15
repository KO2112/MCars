"use client";

/**
 * Iron Auto — home page trust sections, built from the client mockup.
 *
 * Three sections in one file:
 *   1. <ValuesGrid />   — 01 Quality Assurance … 04 Community Focused
 *   2. <StatsBar />     — navy bar: Satisfaction · Part Exchange · 98% · 1 Prime Location
 *   3. <TrustStrip />   — dashed red border: Japanese Imports Specialist · Low Mileage
 *                         Guarantee · Warranty Included · Driven by Trust
 *
 * Usage in app/page.tsx:
 *   import TrustSections from "../components/TrustSections";
 *   ...
 *   <Banner />
 *   <TrustSections />        // or place <ValuesGrid />, <StatsBar />, <TrustStrip /> individually
 */

import { motion, useReducedMotion } from "framer-motion";
import {
  Gauge,
  HeartHandshake,
  Handshake,
  MapPin,
  Repeat,
  ShieldCheck,
  Smile,
  Users,
  Wrench,
} from "lucide-react";

const NAVY = "#0D1B2A";
const RED = "#C52228";

/* ============================================================
   1. VALUES GRID — "Kartlar daha ferah, ikonlar marka kırmızısı"
   ============================================================ */

const values = [
  {
    icon: ShieldCheck,
    title: "Quality Assurance",
    copy: "Every vehicle undergoes rigorous multi-point inspection.",
  },
  {
    icon: Wrench,
    title: "Low Cost Service",
    copy: "Lower maintenance fees for customer satisfaction.",
  },
  {
    icon: Users,
    title: "Expert Team",
    copy: "Passionate and knowledgeable specialists at your service.",
  },
  {
    icon: HeartHandshake,
    title: "Community Focused",
    copy: "Proudly supporting local initiatives and charities.",
  },
];

export function ValuesGrid() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F7F4EE]">
      <div className="mx-auto max-w-[1440px] px-5 py-14 sm:px-8 sm:py-16 lg:px-12 xl:px-16">
        <div className="grid grid-cols-1 divide-y divide-[#0D1B2A]/10 sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
          {values.map(({ icon: Icon, title, copy }, index) => (
            <motion.article
              key={title}
              initial={{ opacity: 0, y: reduceMotion ? 0 : 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ delay: reduceMotion ? 0 : index * 0.07, duration: 0.5 }}
              className="px-2 py-7 sm:px-7 lg:py-2"
            >
              <div className="flex items-center gap-3">
                <span className="grid h-11 w-11 place-items-center rounded-full bg-[#C52228]/10 text-[#C52228]">
                  <Icon size={20} strokeWidth={1.8} />
                </span>
                <span className="font-mono text-sm font-bold tracking-[0.2em] text-[#C52228]">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-4 text-lg font-bold tracking-tight text-[#0D1B2A]">
                {title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#0D1B2A]/60">
                {copy}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ============================================================
   2. STATS BAR — navy panel with red icons and big numbers
   ============================================================ */

const statCells = [
  {
    icon: Smile,
    stat: null,
    title: "Satisfaction",
    copy: "Tailored vehicles for each customer",
  },
  {
    icon: Repeat,
    stat: null,
    title: "Part Exchange",
    copy: "Taking any vehicle for your convenience",
  },
  {
    icon: Users,
    stat: "98%",
    title: null,
    copy: "Satisfied Customers",
  },
  {
    icon: MapPin,
    stat: "1",
    title: null,
    copy: "Prime Location",
  },
];

export function StatsBar() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F7F4EE] pb-14 sm:pb-16">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.6 }}
          className="rounded-[24px] bg-[linear-gradient(135deg,#0D1B2A_0%,#12254A_100%)] px-6 py-8 shadow-[0_20px_50px_rgba(13,27,42,0.25)] sm:px-10"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6 lg:divide-x lg:divide-white/10">
            {statCells.map(({ icon: Icon, stat, title, copy }) => (
              <div key={copy} className="lg:px-6 lg:first:pl-0 lg:last:pr-0">
                <Icon size={26} strokeWidth={1.7} className="text-[#E4555A]" />
                {stat ? (
                  <p className="mt-3 text-4xl font-extrabold tracking-tight text-white sm:text-5xl">
                    {stat}
                  </p>
                ) : (
                  <p className="mt-3 text-lg font-bold tracking-tight text-white">
                    {title}
                  </p>
                )}
                <p className="mt-1.5 text-sm leading-relaxed text-white/55">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   3. TRUST STRIP — dashed red border, four brand promises
   ============================================================ */

// Simple red Japan silhouette-style mark: flag disc — reads instantly as "Japan"
function JapanMark() {
  return (
    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#C52228]/10">
      <span className="grid h-6 w-8 place-items-center rounded-[3px] bg-white ring-1 ring-[#0D1B2A]/15">
        <span className="h-3 w-3 rounded-full bg-[#C52228]" />
      </span>
    </span>
  );
}

const promises = [
  {
    custom: <JapanMark />,
    icon: null,
    title: "Japanese Imports Specialist",
    copy: "All vehicles are professionally imported and converted for UK roads.",
  },
  {
    custom: null,
    icon: Gauge,
    title: "Low Mileage Guarantee",
    copy: "Genuine, verified mileage for your peace of mind.",
  },
  {
    custom: null,
    icon: ShieldCheck,
    title: "Warranty Included",
    copy: "All cars come with a warranty for added confidence and security.",
  },
  {
    custom: null,
    icon: Handshake,
    title: "Driven by Trust. Backed by Quality.",
    copy: "Honest service, fair prices and real support before and after you buy.",
  },
];

export function TrustStrip() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="bg-[#F7F4EE] pb-16 sm:pb-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
          initial={{ opacity: 0, y: reduceMotion ? 0 : 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.6 }}
          className="rounded-[20px] border-2 border-dashed border-[#C52228]/50 bg-white p-6 sm:p-8"
        >
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-0 lg:divide-x lg:divide-[#0D1B2A]/10">
            {promises.map(({ custom, icon: Icon, title, copy }) => (
              <div
                key={title}
                className="flex flex-col items-center px-2 text-center lg:px-7"
              >
                <h3 className="text-sm font-extrabold uppercase leading-snug tracking-wide text-[#0D1B2A]">
                  {title}
                </h3>
                <div className="mt-4">
                  {custom ?? (
                    <span className="grid h-10 w-10 place-items-center rounded-full bg-[#C52228]/10 text-[#C52228]">
                      {Icon && <Icon size={20} strokeWidth={1.8} />}
                    </span>
                  )}
                </div>
                <p className="mt-4 max-w-[220px] text-[13px] leading-relaxed text-[#0D1B2A]/60">
                  {copy}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ============================================================
   Default export — all three stacked in mockup order
   ============================================================ */

export default function TrustSections() {
  return (
    <>
      <ValuesGrid />
      <StatsBar />
      <TrustStrip />
    </>
  );
}