"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  MapPin,
  Phone,
} from "lucide-react";

const contactItems = [
  {
    icon: Phone,
    eyebrow: "Call us directly",
    title: "07407 403676",
    copy: "Get instant support from the Iron Auto team.",
    href: "tel:+447407403676",
  },
  {
    icon: Mail,
    eyebrow: "Send us an email",
    title: "info@ironsauto.co.uk",
    copy: "We aim to reply promptly to every enquiry.",
    href: "mailto:info@ironsauto.co.uk",
  },
  {
    icon: MapPin,
    eyebrow: "Visit our showroom",
    title: "Leicester, UK",
    copy: "101-103 Margaret Road, LE5 5FW",
    href: "https://maps.app.goo.gl/TgJQRCYr8btpkBWH9",
    external: true,
  },
];

export default function ContactUsSection() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      aria-labelledby="contact-section-heading"
      className="relative isolate overflow-hidden bg-[#080a0d] text-white"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(255,255,255,0.07),transparent_26%)]" />
        <div
          className="absolute inset-0 opacity-[0.026]"
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
                Get in Touch
              </p>
            </div>

            <p className="max-w-md text-sm leading-6 text-white/52 sm:text-base sm:leading-7">
              Leicester showroom · Independent local team
            </p>
          </div>

          <div>
            <h2
              id="contact-section-heading"
              className="max-w-5xl text-[clamp(2.9rem,6vw,6.5rem)] font-semibold leading-[0.9] tracking-[-0.06em]"
            >
              Have Questions?
              <span className="block font-light italic text-white/62">
                We are Here to Help.
              </span>
            </h2>

            <p className="mt-7 max-w-3xl text-base leading-7 text-white/62 sm:text-lg sm:leading-8">
              Whether you are curious about a car, need assistance, or just
              want to chat, reaching us is easy.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-10 py-12 lg:grid-cols-[0.82fr_1.18fr] lg:gap-12 lg:py-16">
          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.18 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col"
          >
            <div className="grid gap-px overflow-hidden rounded-[28px] border border-white/10 bg-white/10">
              {contactItems.map(
                ({ icon: Icon, eyebrow, title, copy, href, external }, index) => (
                  <a
                    key={title}
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                    className="group flex min-h-44 items-start justify-between gap-6 bg-[#0d1014] p-6 transition duration-300 hover:bg-[#13171c] sm:p-7"
                  >
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                        {eyebrow}
                      </p>
                      <h3 className="mt-4 break-words text-xl font-semibold tracking-[-0.03em] sm:text-2xl">
                        {title}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-6 text-white/50">
                        {copy}
                      </p>
                    </div>

                    <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-white transition duration-300 group-hover:bg-white group-hover:text-black">
                      <Icon size={18} strokeWidth={1.7} />
                    </div>
                  </a>
                ),
              )}
            </div>

            <div className="mt-6 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 sm:p-7">
              <div className="flex items-start gap-4">
                <div className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-white/10 bg-white/[0.045] text-white">
                  <Clock3 size={18} strokeWidth={1.7} />
                </div>

                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                    Opening Hours
                  </p>
                  <div className="mt-4 space-y-2 text-sm leading-6 text-white/62">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 4:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                  <p className="mt-4 text-xs leading-5 text-white/35">
                    Appointments outside these hours may be available upon
                    request.
                  </p>
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="group mt-6 inline-flex min-h-14 items-center justify-between gap-8 rounded-full bg-white px-6 text-sm font-semibold text-black transition hover:bg-white/88"
            >
              Contact Iron Auto
              <span className="grid h-8 w-8 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
                <ArrowUpRight size={16} />
              </span>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: reduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
              delay: reduceMotion ? 0 : 0.08,
              duration: 0.7,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="overflow-hidden rounded-[30px] border border-white/10 bg-[#0d1014]"
          >
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4 sm:px-6">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-white/38">
                  Find us
                </p>
                <p className="mt-1 text-sm font-medium text-white/82">
                  101-103 Margaret Road, Leicester, LE5 5FW
                </p>
              </div>

              <a
                href="https://maps.app.goo.gl/TgJQRCYr8btpkBWH9"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden items-center gap-2 text-xs font-semibold text-white/52 transition hover:text-white sm:inline-flex"
              >
                Open map
                <ArrowUpRight size={14} />
              </a>
            </div>

            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2421.6139366513466!2d-1.1025617233121312!3d52.63082037209039!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48776120d9b22b9d%3A0xcc59254268cadb83!2sIron%20Auto%20Ltd!5e0!3m2!1sen!2suk!4v1779637666743!5m2!1sen!2suk"
              width="100%"
              height="100%"
              className="min-h-[520px] w-full grayscale-[0.15] contrast-[1.02]"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Iron Auto Ltd Location Map"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}