"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Check,
  ChevronDown,
  Filter,
  Fuel,
  Gauge,
  MapPin,
  Search,
  SlidersHorizontal,
  X,
} from "lucide-react";
import { db } from "../firebase/firebase";

interface Car {
  id: string;
  title: string;
  price: string;
  mileage: string;
  transmission: string;
  color: string;
  engineSize: string;
  fuelType: string;
  doors: string;
  images: string[];
  image?: string;
  features: string[];
  createdAt?: unknown;
  make?: string;
  isIncoming?: boolean;
  status?: string;
}

type Filters = {
  transmission: string;
  fuelType: string;
  make: string;
};

const EMPTY_FILTERS: Filters = {
  transmission: "",
  fuelType: "",
  make: "",
};

const formatNumber = (value: string) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString("en-GB") : value;
};

const normalise = (value?: string) => value?.trim().toLowerCase() ?? "";

const Cars = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState<Filters>(EMPTY_FILTERS);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const carsQuery = query(
          collection(db, "cars"),
          orderBy("createdAt", "desc")
        );
        const querySnapshot = await getDocs(carsQuery);
        const carList: Car[] = [];

        querySnapshot.forEach((snapshot) => {
          const data = snapshot.data();

          const car: Car = {
            id: snapshot.id,
            title: data.title || "",
            price: data.price || "",
            mileage: data.mileage || "",
            transmission: data.transmission || "",
            color: data.color || "",
            engineSize: data.engineSize || "",
            fuelType: data.fuelType || "",
            doors: data.doors || "",
            images: data.images || (data.image ? [data.image] : []),
            image: data.image || "",
            features: data.features || [],
            createdAt: data.createdAt,
            make: data.make || "",
            isIncoming: data.isIncoming || false,
            status: data.status || "Available",
          };

          if (!car.isIncoming) carList.push(car);
        });

        setCars(carList);
      } catch (error) {
        console.error("Error fetching cars:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

  const filteredAndSortedCars = useMemo(() => {
    const term = normalise(searchTerm);

    const result = cars.filter((car) => {
      const matchesSearch =
        !term ||
        normalise(car.title).includes(term) ||
        normalise(car.make).includes(term) ||
        normalise(car.fuelType).includes(term) ||
        normalise(car.transmission).includes(term) ||
        car.features.some((feature) => normalise(feature).includes(term));

      const matchesTransmission =
        !filters.transmission || car.transmission === filters.transmission;
      const matchesFuel = !filters.fuelType || car.fuelType === filters.fuelType;
      const matchesMake = !filters.make || car.make === filters.make;

      return matchesSearch && matchesTransmission && matchesFuel && matchesMake;
    });

    return [...result].sort((a, b) => {
      switch (sortOption) {
        case "price-low":
          return Number(a.price) - Number(b.price);
        case "price-high":
          return Number(b.price) - Number(a.price);
        case "mileage-low":
          return Number(a.mileage) - Number(b.mileage);
        default:
          return 0;
      }
    });
  }, [cars, filters, searchTerm, sortOption]);

  const transmissionOptions = useMemo(
    () =>
      Array.from(
        new Set(cars.map((car) => car.transmission).filter(Boolean))
      ).sort(),
    [cars]
  );

  const fuelTypeOptions = useMemo(
    () =>
      Array.from(new Set(cars.map((car) => car.fuelType).filter(Boolean))).sort(),
    [cars]
  );

  const makeOptions = useMemo(
    () =>
      Array.from(
        new Set(
          cars
            .map((car) => car.make)
            .filter((make): make is string => Boolean(make))
        )
      ).sort(),
    [cars]
  );

  const hasActiveFilters =
    Boolean(searchTerm) ||
    Boolean(filters.make) ||
    Boolean(filters.fuelType) ||
    Boolean(filters.transmission);

  const clearFilters = () => {
    setSearchTerm("");
    setFilters(EMPTY_FILTERS);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F4EE] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-full border-2 border-stone-200 border-t-[#C52228] animate-spin" />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500">
            Loading forecourt
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#F7F4EE] text-stone-900">
      <section className="border-b border-stone-200 bg-[linear-gradient(135deg,#0D1B2A_0%,#12254A_100%)] text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-300 mb-4">
              Iron Auto · Leicester
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.98]">
              Cars selected with care,
              <span className="block text-[#D8353B]">prepared to be driven.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-300">
              Browse our current forecourt. Every vehicle is inspected,
              prepared and available to view at our Leicester showroom.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-stone-200">
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[#D8353B]" />
                Inspected stock
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#D8353B]" />
                Leicester showroom
              </span>
              <span className="inline-flex items-center gap-2">
                <Gauge className="h-4 w-4 text-[#D8353B]" />
                Test drives available
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative -mt-7 rounded-xl border border-stone-200 bg-white shadow-[0_12px_40px_rgba(13,27,42,0.10)]">
          <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_210px_180px_auto] gap-3 p-4">
            <label className="relative block">
              <span className="sr-only">Search vehicles</span>
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
              <input
                type="search"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search make, model or feature"
                className="h-12 w-full rounded-md border border-stone-200 bg-[#F7F4EE] pl-11 pr-4 text-sm outline-none transition focus:border-[#0D1B2A] focus:ring-1 focus:ring-[#0D1B2A]"
              />
            </label>

            <SelectField
              value={filters.make}
              onChange={(value) => setFilters((current) => ({ ...current, make: value }))}
              label="Make"
              emptyLabel="All makes"
              options={makeOptions as string[]}
            />

            <SelectField
              value={sortOption}
              onChange={setSortOption}
              label="Sort vehicles"
              emptyLabel="Newest first"
              options={[
                { value: "newest", label: "Newest first" },
                { value: "price-low", label: "Price: low to high" },
                { value: "price-high", label: "Price: high to low" },
                { value: "mileage-low", label: "Lowest mileage" },
              ]}
            />

            <button
              type="button"
              onClick={() => setShowFilters((visible) => !visible)}
              className={`h-12 inline-flex items-center justify-center gap-2 rounded-md px-5 text-sm font-semibold transition-colors ${
                showFilters
                  ? "bg-[#C52228] text-white"
                  : "bg-[#0D1B2A] text-white hover:bg-[#12254A]"
              }`}
              aria-expanded={showFilters}
            >
              <Filter className="h-4 w-4" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-[1fr_1fr_auto] gap-3 border-t border-stone-100 p-4">
              <SelectField
                value={filters.transmission}
                onChange={(value) =>
                  setFilters((current) => ({ ...current, transmission: value }))
                }
                label="Transmission"
                emptyLabel="All transmissions"
                options={transmissionOptions}
              />
              <SelectField
                value={filters.fuelType}
                onChange={(value) =>
                  setFilters((current) => ({ ...current, fuelType: value }))
                }
                label="Fuel type"
                emptyLabel="All fuel types"
                options={fuelTypeOptions}
              />
              <button
                type="button"
                onClick={clearFilters}
                disabled={!hasActiveFilters}
                className="h-12 inline-flex items-center justify-center gap-2 rounded-md border border-stone-200 px-5 text-sm font-semibold text-stone-600 transition-colors hover:bg-stone-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <X className="h-4 w-4" />
                Clear
              </button>
            </div>
          )}
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-7 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-2">
              Current stock
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0D1B2A]">
              {filteredAndSortedCars.length} {filteredAndSortedCars.length === 1 ? "vehicle" : "vehicles"}
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 text-sm text-stone-500">
            <SlidersHorizontal className="h-4 w-4" />
            {sortOption === "price-low"
              ? "Price: low to high"
              : sortOption === "price-high"
                ? "Price: high to low"
                : sortOption === "mileage-low"
                  ? "Lowest mileage"
                  : "Newest first"}
          </div>
        </div>

        {filteredAndSortedCars.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
              No matching stock
            </p>
            <h3 className="mt-3 text-2xl font-bold text-[#0D1B2A]">
              Try a broader search
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-500">
              We could not find a vehicle matching those filters. Clear the
              selection to return to the full forecourt.
            </p>
            <button
              type="button"
              onClick={clearFilters}
              className="mt-7 rounded-md bg-[#0D1B2A] px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-[#12254A]"
            >
              Show all vehicles
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredAndSortedCars.map((car, index) => (
              <VehicleCard key={car.id} car={car} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3">
              Looking for something specific?
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0D1B2A] tracking-tight">
              Tell us what is on your shortlist.
            </h2>
            <p className="mt-3 max-w-2xl text-sm sm:text-base leading-relaxed text-stone-600">
              Our team can help with availability, part exchange, finance and
              arranging a viewing at the Leicester forecourt.
            </p>
          </div>
          <a
            href="tel:07407403676"
            className="inline-flex h-12 items-center justify-center gap-2 rounded-md bg-[#C52228] px-6 text-sm font-bold text-white shadow-[0_6px_18px_rgba(197,34,40,0.30)] transition-transform hover:-translate-y-0.5 hover:bg-[#A81C22]"
          >
            Call the showroom
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </section>
    </main>
  );
};

// Diagonal rubber-stamp "SOLD" — sits over the car photo, mockup style
function SoldStamp() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 grid place-items-center overflow-hidden">
      <span
        className="-rotate-[14deg] select-none rounded-lg border-[5px] border-[#C52228] px-7 py-1 font-mono text-4xl font-black uppercase tracking-[0.32em] text-[#C52228] sm:text-5xl"
        style={{
          opacity: 0.88,
          maskImage:
            "radial-gradient(circle at 30% 40%, black 60%, rgba(0,0,0,0.72) 100%)",
          WebkitMaskImage:
            "radial-gradient(circle at 30% 40%, black 60%, rgba(0,0,0,0.72) 100%)",
          textShadow: "0 0 1px rgba(197,34,40,0.5)",
        }}
      >
        Sold
      </span>
    </div>
  );
}

function VehicleCard({ car, index }: { car: Car; index: number }) {
  const image = car.images?.[0] || car.image || "/placeholder-car.jpg";
  const status = car.status || "Available";
  const isSold = normalise(status) === "sold";
  const isInProgress = normalise(status) === "sale in progress";

  return (
    <article className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_45px_rgba(13,27,42,0.12)]">
      <Link href={`/newcars/${car.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <img
            src={image}
            alt={car.title}
            loading={index < 3 ? "eager" : "lazy"}
            className={`h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035] ${
              isSold ? "grayscale-[0.55] brightness-[0.92]" : ""
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent" />

          {/* Diagonal SOLD stamp across the photo */}
          {isSold && <SoldStamp />}

          <div
            className={`absolute left-4 top-4 rounded-md px-3.5 py-2 font-mono text-[11px] font-bold uppercase tracking-[0.16em] shadow-[0_4px_14px_rgba(0,0,0,0.35)] ${
              isSold
                ? "bg-[#C52228] text-white"
                : isInProgress
                  ? "bg-amber-500 text-stone-950"
                  : "bg-emerald-600 text-white ring-1 ring-white/40"
            }`}
          >
            {status}
          </div>

          {car.images.length > 1 && (
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-md bg-stone-950/75 px-2.5 py-1.5 font-mono text-[10px] text-white backdrop-blur-sm">
              <Camera className="h-3.5 w-3.5" />
              {String(car.images.length).padStart(2, "0")}
            </div>
          )}
        </div>

        <div className="p-5 sm:p-6">
          <p className="font-mono text-[9px] font-bold uppercase tracking-[0.22em] text-[#C52228]/80">
            Iron Auto · Leicester
          </p>
          <h3 className="mt-2 min-h-[3.5rem] text-xl font-bold leading-snug text-[#0D1B2A] transition-colors group-hover:text-[#12254A] line-clamp-2">
            {car.title}
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-stone-100 py-4">
            <Spec icon={<Gauge className="h-4 w-4" />} label="Mileage" value={`${formatNumber(car.mileage)} mi`} />
            <Spec icon={<Fuel className="h-4 w-4" />} label="Fuel" value={car.fuelType} />
            <Spec icon={<GearboxIcon />} label="Gearbox" value={car.transmission} />
            <Spec icon={<EngineIcon />} label="Engine" value={car.engineSize ? `${car.engineSize}L` : "—"} />
          </div>

          {car.features.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {car.features.slice(0, 2).map((feature) => (
                <span
                  key={feature}
                  className="rounded-md bg-stone-100 px-2.5 py-1 text-[11px] font-medium text-stone-600"
                >
                  {feature}
                </span>
              ))}
              {car.features.length > 2 && (
                <span className="rounded-md border border-stone-200 px-2.5 py-1 text-[11px] font-medium text-stone-500">
                  +{car.features.length - 2} more
                </span>
              )}
            </div>
          )}

          {/* Footer: price (or DELIVERED for sold cars) + arrow, mockup layout */}
          <div className="mt-5 flex items-center justify-between">
            {isSold ? (
              <span className="inline-flex items-center gap-2 font-mono text-sm font-bold uppercase tracking-[0.22em] text-[#C52228]">
                <Check className="h-4 w-4" strokeWidth={3} />
                Delivered
              </span>
            ) : (
              <span className="text-2xl font-extrabold tracking-tight text-[#0D1B2A]">
                £{formatNumber(car.price)}
              </span>
            )}
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0D1B2A] text-white transition-all group-hover:translate-x-1 group-hover:bg-[#C52228]">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
}

function Spec({
  icon,
  label,
  value,
}: {
  icon: ReactNode;
  label: string;
  value: string;
}) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-2 text-stone-400">
        {icon}
        <span className="font-mono text-[9px] uppercase tracking-[0.18em]">
          {label}
        </span>
      </div>
      <p className="mt-1 truncate text-sm font-semibold capitalize text-stone-700">
        {value || "—"}
      </p>
    </div>
  );
}

type SelectOption = string | { value: string; label: string };

function SelectField({
  value,
  onChange,
  label,
  emptyLabel,
  options,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  emptyLabel: string;
  options: SelectOption[];
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-12 w-full appearance-none rounded-md border border-stone-200 bg-[#F7F4EE] px-4 pr-10 text-sm capitalize outline-none transition focus:border-[#0D1B2A] focus:ring-1 focus:ring-[#0D1B2A]"
      >
        <option value="">{emptyLabel}</option>
        {options.map((option) => {
          const item =
            typeof option === "string"
              ? { value: option, label: option }
              : option;
          return (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          );
        })}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
    </label>
  );
}

function GearboxIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4v16M18 4v16M6 8h12M6 16h12M12 8v8" />
      <circle cx="6" cy="4" r="1.5" />
      <circle cx="18" cy="4" r="1.5" />
      <circle cx="6" cy="20" r="1.5" />
      <circle cx="18" cy="20" r="1.5" />
    </svg>
  );
}

function EngineIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M7 8h9l2 2v7H7l-2-2v-5l2-2Z" />
      <path d="M10 8V5h4v3M18 12h2v3h-2M5 11H3v5h2" />
    </svg>
  );
}

export default Cars;