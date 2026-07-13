"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useKeenSlider } from "keen-slider/react";
import { collection, getDocs, limit, orderBy, query } from "firebase/firestore";
import {
  ArrowUpRight,
  Camera,
  ChevronLeft,
  ChevronRight,
  Fuel,
  Gauge,
  Settings2,
  CarFront, // Added CarFront icon for engine size
} from "lucide-react";

import { db } from "../firebase/firebase";

interface Car {
  id: string;
  title: string;
  price: string;
  mileage: string;
  transmission: string;
  engineSize: string;
  fuelType: string;
  color: string;
  doors: string;
  images: string[];
  image?: string;
  features: string[];
  isIncoming?: boolean;
  status?: string;
}

const numberFormatter = new Intl.NumberFormat("en-GB");

function formatNumber(value?: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? numberFormatter.format(parsed) : value || "—";
}

function getStatus(car: Car) {
  if (car.isIncoming) {
    return { label: "Coming soon", className: "bg-[#f3d18d] text-[#3a2808]" };
  }

  const status = (car.status || "Available").toLowerCase();

  if (status === "sold") {
    return { label: "Sold", className: "bg-white text-[#16181b]" };
  }

  if (status === "sale in progress") {
    return { label: "Sale in progress", className: "bg-[#f3d18d] text-[#3a2808]" };
  }

  return { label: "Available", className: "bg-[#dcecdf] text-[#17351d]" };
}

function CarCard({ car }: { car: Car }) {
  const image = car.images?.[0] || car.image;
  const status = getStatus(car);
  const visibleFeatures = car.features?.slice(0, 3) || [];
  const remainingFeatures = Math.max((car.features?.length || 0) - visibleFeatures.length, 0);

  return (
    <Link href={`/newcars/${car.id}`} className="group block h-full">
      <article className="flex h-full min-h-[510px] flex-col overflow-hidden rounded-[26px] border border-black/[0.09] bg-white shadow-[0_14px_38px_rgba(30,38,45,0.08)] transition duration-300 hover:-translate-y-1.5 hover:shadow-[0_24px_58px_rgba(30,38,45,0.14)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#dfe3e6]">
          {image ? (
            <img
              src={image}
              alt={car.title}
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-black/40">Image coming soon</div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/5 to-transparent" />

          {/* Status badge: Updated spacing and text size alignment */}
          <span className={`absolute left-4 top-4 rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] ${status.className}`}>
            {status.label}
          </span>

          {car.images?.length > 1 && (
            <span className="absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-black/55 px-3 py-1.5 text-xs text-white backdrop-blur-md">
              <Camera size={13} />
              {car.images.length}
            </span>
          )}

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-white/65">Price</p>
              <p className="mt-1 text-[1.7rem] font-semibold tracking-[-0.045em]">£{formatNumber(car.price)}</p>
            </div>

            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-black transition-transform group-hover:rotate-6 group-hover:scale-105">
              <ArrowUpRight size={18} />
            </span>
          </div>
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="line-clamp-2 min-h-[50px] text-lg font-semibold leading-[1.3] tracking-[-0.03em] text-[#17191c] sm:text-xl">
            {car.title}
          </h3>

          {/* Specs Layout Grid: Updated spacing, text sizing, and color weighting */}
          <div className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 border-t border-black/10 pt-5 text-sm font-medium text-black">
            <span className="flex items-center gap-2">
              <Gauge size={15} strokeWidth={1.7} />
              {formatNumber(car.mileage)} mi
            </span>
            <span className="flex items-center gap-2 capitalize">
              <Settings2 size={15} strokeWidth={1.7} />
              {car.transmission || "—"}
            </span>
            <span className="flex items-center gap-2 capitalize">
              <Fuel size={15} strokeWidth={1.7} />
              {car.fuelType || "—"}
            </span>
            {/* Engine size section matching the new UI grid items styling */}
            <span className="flex items-center gap-2">
              <CarFront size={15} strokeWidth={1.7} />
              {car.engineSize ? `${car.engineSize}L` : "—"}
            </span>
          </div>

          <div className="mt-5 flex min-h-[58px] flex-wrap content-start gap-2 border-t border-black/[0.07] pt-5">
            {visibleFeatures.length > 0 ? (
              <>
                {visibleFeatures.map((feature, index) => (
                  <span
                    key={`${car.id}-feature-${index}`}
                    className="rounded-full bg-black px-4 py-2 text-xs font-semibold text-white shadow-md"
                  >
                    {feature}
                  </span>
                ))}
                {remainingFeatures > 0 && (
                  <span className="rounded-full bg-neutral-800 px-4 py-2 text-xs font-semibold text-white shadow-md">
                    +{remainingFeatures} more
                  </span>
                )}
              </>
            ) : (
              <span className="text-xs text-black/38">Full specification available</span>
            )}
          </div>
        </div>
      </article>
    </Link>
  );
}

function CarouselSection({
  eyebrow,
  title,
  description,
  href,
  linkLabel,
  cars,
  alternate = false,
}: {
  eyebrow: string;
  title: string;
  description: string;
  href: string;
  linkLabel: string;
  cars: Car[];
  alternate?: boolean;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    mode: "snap",
    loop: cars.length > 1,
    slides: { perView: 1.08, spacing: 16 },
    breakpoints: {
      "(min-width: 640px)": { slides: { perView: 2.05, spacing: 20 } },
      "(min-width: 1024px)": { slides: { perView: 3.05, spacing: 24 } },
      "(min-width: 1536px)": { slides: { perView: 3.65, spacing: 26 } },
    },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  useEffect(() => {
    instanceRef.current?.update();
  }, [cars.length, instanceRef]);

  useEffect(() => {
    if (paused || cars.length < 2) return;

    const timer = window.setInterval(() => {
      instanceRef.current?.next();
    }, 5000);

    return () => window.clearInterval(timer);
  }, [cars.length, instanceRef, paused]);

  return (
    <section className={alternate ? "w-full bg-[#e7edf1] py-16 sm:py-20 lg:py-24" : "w-full bg-[#f3f5f6] py-16 sm:py-20 lg:py-24"}>
      <div className="mx-auto max-w-[1600px] px-5 sm:px-8 lg:px-12 xl:px-16">
        <div className="mb-9 flex flex-col gap-6 lg:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-black/42">{eyebrow}</p>
            <h2 className="mt-3 text-4xl font-semibold leading-none tracking-[-0.055em] text-[#15171a] sm:text-5xl lg:text-[3.75rem]">
              {title}
            </h2>
            <p className="mt-5 max-w-xl text-sm leading-6 text-black/55 sm:text-base">{description}</p>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => instanceRef.current?.prev()}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black hover:text-white"
              aria-label="Previous vehicle"
            >
              <ChevronLeft size={18} />
            </button>
            <button
              type="button"
              onClick={() => instanceRef.current?.next()}
              className="grid h-11 w-11 place-items-center rounded-full border border-black/10 bg-white text-black transition hover:bg-black hover:text-white"
              aria-label="Next vehicle"
            >
              <ChevronRight size={18} />
            </button>

            <Link href={href} className="ml-1 inline-flex h-11 items-center gap-2 rounded-full bg-[#17191c] px-5 text-sm font-semibold text-white transition hover:bg-black/75">
              {linkLabel}
              <ArrowUpRight size={15} />
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-[1760px] overflow-hidden px-5 sm:px-8 lg:px-12 xl:px-16">
        <div
          ref={sliderRef}
          className="keen-slider !overflow-visible pb-4"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={() => setPaused(false)}
        >
          {cars.map((car) => (
            <div key={car.id} className="keen-slider__slide h-auto py-1">
              <CarCard car={car} />
            </div>
          ))}
        </div>

        {cars.length > 1 && (
          <div className="mt-6 flex items-center gap-3 sm:hidden">
            <span className="text-xs tabular-nums text-black/45">
              {String(currentSlide + 1).padStart(2, "0")} / {String(cars.length).padStart(2, "0")}
            </span>
            <div className="h-px flex-1 bg-black/10">
              <div
                className="h-px bg-black transition-all duration-300"
                style={{ width: `${((currentSlide + 1) / cars.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default function CarCarousel() {
  const [regularCars, setRegularCars] = useState<Car[]>([]);
  const [incomingCars, setIncomingCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCars() {
      try {
        const snapshot = await getDocs(
          query(collection(db, "cars"), orderBy("createdAt", "desc"), limit(20)),
        );

        const cars: Car[] = snapshot.docs.map((document) => {
          const data = document.data();

          return {
            id: document.id,
            title: data.title || "Untitled vehicle",
            price: data.price || "0",
            mileage: data.mileage || "0",
            transmission: data.transmission || "",
            engineSize: data.engineSize || "",
            fuelType: data.fuelType || "",
            color: data.color || "",
            doors: data.doors || "",
            images: data.images || (data.image ? [data.image] : []),
            image: data.image || "",
            features: Array.isArray(data.features) ? data.features : [],
            isIncoming: Boolean(data.isIncoming),
            status: data.status || "Available",
          };
        });

        setRegularCars(cars.filter((car) => !car.isIncoming));
        setIncomingCars(cars.filter((car) => car.isIncoming));
      } catch (error) {
        console.error("Error fetching featured cars:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchCars();
  }, []);

  if (loading) {
    return (
      <section className="w-full bg-[#f3f5f6] px-5 py-20 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-[1600px]">
          <div className="h-3 w-28 animate-pulse rounded-full bg-black/10" />
          <div className="mt-5 h-12 max-w-sm animate-pulse rounded-xl bg-black/10" />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-[510px] animate-pulse rounded-[26px] bg-black/10" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!regularCars.length && !incomingCars.length) {
    return (
      <section className="w-full bg-[#f3f5f6] px-5 py-24 text-center text-[#17191c]">
        <p className="text-3xl font-semibold tracking-[-0.04em]">Fresh stock is on the way.</p>
        <p className="mx-auto mt-3 max-w-md text-black/50">Contact our team and tell us what you are looking for.</p>
        <Link href="/contact" className="mt-7 inline-flex rounded-full bg-[#17191c] px-6 py-3 text-sm font-semibold text-white">
          Speak to us
        </Link>
      </section>
    );
  }

  return (
    <div className="w-full overflow-hidden">
      {regularCars.length > 0 && (
        <CarouselSection
          eyebrow="Recently added"
          title="Latest arrivals"
          description="A considered selection of quality used vehicles, prepared and ready to view in Leicester."
          href="/cars"
          linkLabel="View all stock"
          cars={regularCars}
        />
      )}

      {incomingCars.length > 0 && (
        <CarouselSection
          eyebrow="Coming soon"
          title="Incoming vehicles"
          description="Preview vehicles before they reach the showroom and register your interest early."
          href="/incoming-vehicles"
          linkLabel="View incoming"
          cars={incomingCars}
          alternate
        />
      )}
    </div>
  );
}