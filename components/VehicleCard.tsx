"use client";

import Link from "next/link";
import {
  ArrowUpRight,
  Camera,
  Fuel,
  Gauge,
  Settings2,
} from "lucide-react";

export interface Vehicle {
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

interface VehicleCardProps {
  car: Vehicle;
  priority?: boolean;
}

const numberFormat = new Intl.NumberFormat("en-GB");

function formatNumber(value: string) {
  const parsed = Number(value);
  return Number.isFinite(parsed) ? numberFormat.format(parsed) : value;
}

function statusClasses(status?: string, incoming?: boolean) {
  if (incoming) return "border-amber-300/30 bg-amber-300 text-black";
  if (status?.toLowerCase() === "sold") return "border-white/15 bg-white text-black";
  if (status?.toLowerCase() === "sale in progress") {
    return "border-amber-300/30 bg-amber-300/15 text-amber-200";
  }
  return "border-emerald-300/25 bg-emerald-300/12 text-emerald-200";
}

export default function VehicleCard({ car, priority = false }: VehicleCardProps) {
  const image = car.images?.[0] || car.image;
  const label = car.isIncoming ? "Incoming" : car.status || "Available";

  return (
    <Link
      href={`/newcars/${car.id}`}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-4 focus-visible:ring-offset-[#0b0d10]"
    >
      <article className="flex h-full min-h-[490px] flex-col overflow-hidden rounded-[28px] border border-black/10 bg-white transition duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_28px_70px_rgba(0,0,0,0.16)]">
        <div className="relative aspect-[4/3] overflow-hidden bg-[#e9e9e6]">
          {image ? (
            <img
              src={image}
              alt={car.title}
              loading={priority ? "eager" : "lazy"}
              className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.045]"
            />
          ) : (
            <div className="grid h-full place-items-center text-sm text-black/45">
              Image coming soon
            </div>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />

          <div className="absolute left-4 top-4 flex items-center gap-2">
            <span
              className={`rounded-full border px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.16em] backdrop-blur-md ${statusClasses(
                car.status,
                car.isIncoming,
              )}`}
            >
              {label}
            </span>
          </div>

          <div className="absolute bottom-4 left-4 text-white">
            <p className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/60">
              Price
            </p>
            <p className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
              £{formatNumber(car.price)}
            </p>
          </div>

          {car.images?.length > 1 && (
            <span className="absolute bottom-4 right-4 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-black/45 px-3 py-1.5 text-xs text-white backdrop-blur-md">
              <Camera size={13} />
              {car.images.length}
            </span>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="line-clamp-2 text-xl font-semibold leading-tight tracking-[-0.035em] text-[#101114] sm:text-[1.35rem]">
            {car.title}
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-black/8 py-4 text-sm text-black/62">
            <span className="flex items-center gap-2">
              <Gauge size={15} strokeWidth={1.7} className="text-black/42" />
              {formatNumber(car.mileage)} mi
            </span>
            <span className="flex items-center gap-2 capitalize">
              <Settings2 size={15} strokeWidth={1.7} className="text-black/42" />
              {car.transmission || "—"}
            </span>
            <span className="flex items-center gap-2">
              <Fuel size={15} strokeWidth={1.7} className="text-black/42" />
              <span className="capitalize">{car.fuelType || "—"}</span>
            </span>
            <span className="text-right font-medium text-black/70">
              {car.engineSize ? `${car.engineSize}L` : "Engine —"}
            </span>
          </div>

          <div className="mt-4 min-h-7">
            {car.features?.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {car.features.slice(0, 2).map((feature) => (
                  <span
                    key={feature}
                    className="rounded-full bg-black/[0.045] px-3 py-1.5 text-[11px] font-medium text-black/58"
                  >
                    {feature}
                  </span>
                ))}
                {car.features.length > 2 && (
                  <span className="rounded-full bg-black/[0.045] px-3 py-1.5 text-[11px] font-medium text-black/58">
                    +{car.features.length - 2}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="mt-auto flex items-center justify-between pt-5 text-sm font-semibold text-black">
            View vehicle
            <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-white transition-transform duration-300 group-hover:rotate-45">
              <ArrowUpRight size={16} />
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}