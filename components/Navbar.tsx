"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { signOut } from "firebase/auth";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  ArrowUpRight,
  LogOut,
  Mail,
  MapPin,
  Menu,
  Phone,
  X,
} from "lucide-react";

import { auth } from "../firebase/firebase";
import useAuth from "../hooks/useAuth";

const navigation = [
  { label: "Cars", href: "/cars" },
  { label: "Incoming", href: "/incoming-vehicles" },
  { label: "About", href: "/About" },
  { label: "Contact", href: "/contact" },
];

const contactDetails = {
  phoneLabel: "07407 403676",
  phoneHref: "tel:+447407403676",
  email: "info@ironsauto.co.uk",
  postcode: "LE5 5FW",
  mapHref: "https://maps.app.goo.gl/TgJQRCYr8btpkBWH9",
};

export default function Navbar() {
  const { user } = useAuth();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const menuRef = useRef<HTMLDivElement>(null);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileMenuOpen(false);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setMobileMenuOpen(false);
      }
    };

    if (mobileMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const handleSignOut = async () => {
    await signOut(auth);
    setMobileMenuOpen(false);
  };

  const isActive = (href: string) =>
    href === "/" ? pathname === href : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-50">
      <div
        className={`border-b transition-all duration-300 ${
          scrolled
            ? "border-white/10 bg-[#0D1B2A]/92 shadow-[0_18px_50px_rgba(4,10,26,0.45)] backdrop-blur-xl"
            : "border-white/10 bg-[#0D1B2A]"
        }`}
      >
        <div className="mx-auto flex h-[80px] max-w-[1440px] items-center px-5 sm:px-8 lg:h-[88px] lg:px-12 xl:px-16">
          {/* Brand: badge logo + stacked wordmark, mockup style */}
          <Link
            href="/"
            aria-label="Iron Auto home"
            className="relative z-10 flex shrink-0 items-center gap-3"
          >
            <span className="grid h-[58px] w-[58px] shrink-0 place-items-center overflow-hidden rounded-full bg-[#F7F4EE] shadow-[0_2px_12px_rgba(0,0,0,0.40)] ring-2 ring-white/20 transition-transform duration-300 hover:scale-105 lg:h-[64px] lg:w-[64px]">
              <Image
                src="/IronAutoLogo.jpeg"
                alt="Iron Auto logo"
                width={64}
                height={64}
                priority
                className="h-full w-full object-cover"
              />
            </span>
            <span className="hidden flex-col leading-none sm:flex">
              <span className="text-[1.45rem] font-black uppercase tracking-tight text-white">
                Iron <span className="text-[#E4383F]">Auto</span>
              </span>
              <span className="mt-1 text-[9px] font-bold uppercase tracking-[0.34em] text-white/55">
                Driven by trust
              </span>
              <span className="mt-1 flex items-center gap-1.5 text-[8px] font-bold uppercase tracking-[0.22em] text-white/85">
                {/* Japan flag */}
                <span className="grid h-[11px] w-[16px] place-items-center rounded-[2px] bg-white">
                  <span className="h-[6px] w-[6px] rounded-full bg-[#C52228]" />
                </span>
                Japanese Imports Specialist
              </span>
            </span>
          </Link>

          <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-1 lg:flex">
            {navigation.map((item) => {
              const active = isActive(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`relative rounded-full px-4 py-2.5 text-sm font-semibold transition-colors ${
                    active ? "text-white" : "text-white/55 hover:text-white"
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="active-nav"
                      className="absolute inset-x-4 -bottom-[21px] h-[2px] bg-[#E4383F]"
                      transition={{ duration: reduceMotion ? 0 : 0.25 }}
                    />
                  )}
                </Link>
              );
            })}

            {user && (
              <Link
                href="/add-car"
                className="rounded-full px-4 py-2.5 text-sm font-semibold text-white/55 transition-colors hover:text-white"
              >
                Add car
              </Link>
            )}
          </nav>

          <div className="ml-auto hidden items-center gap-2.5 lg:flex">
            {/* Location pill — postcode opens the map in a new tab */}
            <a
              href={contactDetails.mapHref}
              target="_blank"
              rel="noopener noreferrer"
              title="Open our location in Google Maps"
              className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/[0.05] px-4 py-2.5 text-xs font-semibold tracking-wide text-white/75 transition hover:border-white/35 hover:text-white"
            >
              <MapPin size={14} strokeWidth={1.9} className="text-[#E4555A]" />
              {contactDetails.postcode}
            </a>

            <a
              href={contactDetails.phoneHref}
              className="inline-flex items-center gap-2.5 rounded-full border border-white/18 bg-white/[0.05] px-4 py-2.5 text-sm font-semibold text-white/80 transition hover:border-white/35 hover:text-white"
            >
              <Phone size={15} strokeWidth={1.9} className="text-[#E4555A]" />
              {contactDetails.phoneLabel}
            </a>

            <Link
              href="/cars"
              className="group inline-flex items-center gap-2 rounded-full bg-[#C52228] px-5 py-2.5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(197,34,40,0.45)] transition hover:bg-[#A81C22]"
            >
              View stock
              <ArrowUpRight
                size={15}
                className="transition-transform duration-300 group-hover:rotate-45"
              />
            </Link>

            {user && (
              <button
                type="button"
                onClick={handleSignOut}
                className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white/65 transition hover:border-white/35 hover:text-white"
                aria-label="Sign out"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>

          <div className="ml-auto flex items-center gap-1.5 lg:hidden">
            <a
              href={contactDetails.mapHref}
              target="_blank"
              rel="noopener noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white"
              aria-label={`Open map — ${contactDetails.postcode}`}
            >
              <MapPin size={17} className="text-[#E4555A]" />
            </a>

            <a
              href={contactDetails.phoneHref}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white"
              aria-label="Call Iron Auto"
            >
              <Phone size={17} />
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="grid h-10 w-10 place-items-center rounded-full border border-white/18 text-white"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {mobileMenuOpen ? <X size={19} /> : <Menu size={19} />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduceMotion ? 0 : 0.2 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 top-[80px] z-40 bg-black/55 backdrop-blur-sm lg:hidden"
            />

            <motion.div
              ref={menuRef}
              initial={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduceMotion ? 0 : -12 }}
              transition={{ duration: reduceMotion ? 0 : 0.25 }}
              className="absolute inset-x-0 top-[80px] z-50 border-b border-white/10 bg-[#12254A] px-5 pb-6 pt-3 shadow-2xl lg:hidden"
            >
              <nav className="mx-auto max-w-[1440px]">
                <div className="divide-y divide-white/8">
                  {[...navigation, ...(user ? [{ label: "Add car", href: "/add-car" }] : [])].map(
                    (item, index) => (
                      <motion.div
                        key={item.href}
                        initial={{ opacity: 0, y: reduceMotion ? 0 : 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: reduceMotion ? 0 : index * 0.035,
                          duration: 0.22,
                        }}
                      >
                        <Link
                          href={item.href}
                          className="group flex items-center justify-between py-4 text-[1.35rem] font-bold tracking-[-0.03em] text-white"
                        >
                          <span>{item.label}</span>
                          <ArrowUpRight
                            size={18}
                            className="text-[#E4555A] transition-transform group-hover:rotate-45"
                          />
                        </Link>
                      </motion.div>
                    ),
                  )}
                </div>

                <div className="mt-5 grid gap-2 rounded-[24px] border border-white/10 bg-white/[0.04] p-3">
                  <a
                    href={contactDetails.mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <MapPin size={16} className="text-[#E4555A]" />
                    Leicester · {contactDetails.postcode}
                  </a>

                  <a
                    href={contactDetails.phoneHref}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Phone size={16} className="text-[#E4555A]" />
                    {contactDetails.phoneLabel}
                  </a>

                  <a
                    href={`mailto:${contactDetails.email}`}
                    className="flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium text-white/70 transition hover:bg-white/[0.06] hover:text-white"
                  >
                    <Mail size={16} className="text-[#E4555A]" />
                    {contactDetails.email}
                  </a>
                </div>

                <div className="mt-3 flex gap-2">
                  <Link
                    href="/cars"
                    className="flex min-h-12 flex-1 items-center justify-center rounded-full bg-[#C52228] px-5 text-sm font-bold text-white shadow-[0_6px_20px_rgba(197,34,40,0.45)]"
                  >
                    Browse cars
                  </Link>

                  {user && (
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="grid h-12 w-12 place-items-center rounded-full border border-white/18 text-white"
                      aria-label="Sign out"
                    >
                      <LogOut size={17} />
                    </button>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  );
}