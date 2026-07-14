"use client";

import { useEffect, useState, type ReactNode } from "react";
import Link from "next/link";
import { collection, getDocs, query, where } from "firebase/firestore";
import {
  ArrowRight,
  BadgeCheck,
  Camera,
  Fuel,
  Gauge,
  MapPin,
  Truck,
} from "lucide-react";
import { db } from "../../firebase/firebase";

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
  createdAt?: string;
  make?: string;
}

const formatNumber = (value: string) => {
  const number = Number(value);
  return Number.isFinite(number) ? number.toLocaleString("en-GB") : value;
};

const IncomingVehicles = () => {
  const [cars, setCars] = useState<Car[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch incoming cars data from Firestore
  useEffect(() => {
    const fetchIncomingCars = async () => {
      try {
        const carsQuery = query(
          collection(db, "cars"),
          where("isIncoming", "==", true)
        );
        const querySnapshot = await getDocs(carsQuery);
        const carList: Car[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();

          if (data) {
            const car: Car = {
              id: doc.id,
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
            };
            carList.push(car);
          }
        });

        // Sort by createdAt in JavaScript since we can't use composite index
        carList.sort((a, b) => {
          if (a.createdAt && b.createdAt) {
            return (
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
          }
          return 0;
        });

        setCars(carList);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching incoming cars: ", error);
        setLoading(false);
      }
    };

    fetchIncomingCars();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center px-4">
        <div className="flex flex-col items-center text-center">
          <div className="h-10 w-10 rounded-full border-2 border-stone-200 border-t-blue-950 animate-spin" />
          <p className="mt-5 font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500">
            Loading incoming vehicles
          </p>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-[#FAF9F6] text-stone-900">
      <section className="border-b border-stone-200 bg-blue-950 text-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20">
          <div className="max-w-4xl">
            <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-stone-300 mb-4">
              Irons Auto · Arriving soon
            </p>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[0.98]">
              The next arrivals,
              <span className="block text-[#FFD500]">before they reach the forecourt.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-base sm:text-lg leading-relaxed text-stone-300">
              Explore vehicles currently in transit or being prepared for our
              Leicester showroom, and register your interest before arrival.
            </p>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-sm text-stone-200">
              <span className="inline-flex items-center gap-2">
                <Truck className="h-4 w-4 text-[#FFD500]" />
                Arriving soon
              </span>
              <span className="inline-flex items-center gap-2">
                <BadgeCheck className="h-4 w-4 text-[#FFD500]" />
                Priority interest
              </span>
              <span className="inline-flex items-center gap-2">
                <MapPin className="h-4 w-4 text-[#FFD500]" />
                Leicester showroom
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="mb-7">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-2">
            Incoming stock
          </p>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-blue-950">
            {cars.length} incoming {cars.length === 1 ? "vehicle" : "vehicles"}
          </h2>
          <p className="mt-2 text-sm text-stone-500">
            Vehicles currently making their way to our showroom.
          </p>
        </div>

        {cars.length === 0 ? (
          <div className="rounded-xl border border-stone-200 bg-white px-6 py-16 text-center">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-400">
              No incoming stock
            </p>
            <h3 className="mt-3 text-2xl font-bold text-blue-950">
              Nothing is on the way right now
            </h3>
            <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-stone-500">
              We do not have any vehicles marked as incoming at the moment.
              Check back soon for new arrivals.
            </p>
            <Link
              href="/cars"
              className="mt-7 inline-flex h-12 items-center justify-center gap-2 rounded-md bg-blue-950 px-6 text-sm font-semibold text-white transition-colors hover:bg-blue-900"
            >
              View available cars
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {cars.map((car, index) => (
              <IncomingVehicleCard key={car.id} car={car} index={index} />
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-stone-200 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-14">
          <div className="max-w-3xl">
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-stone-500 mb-3">
              Incoming vehicle questions
            </p>
            <h2 className="text-2xl sm:text-3xl font-bold text-blue-950 tracking-tight">
              What to know before a vehicle arrives
            </h2>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              {
                question: "How do I express interest in an incoming vehicle?",
                answer:
                  "Simply click on any incoming vehicle to view details and contact us to express your interest. We'll notify you as soon as it arrives.",
              },
              {
                question: "When will these vehicles be available?",
                answer:
                  "These vehicles are currently in transit or being prepared for arrival. Contact us for specific arrival dates and availability.",
              },
              {
                question: "Can I reserve an incoming vehicle?",
                answer:
                  "Yes, you can express interest and we'll give you priority access once the vehicle arrives at our showroom.",
              },
              {
                question: "Will the price change when the vehicle arrives?",
                answer:
                  "Prices are subject to market conditions, but we'll honor the displayed price for interested customers.",
              },
              {
                question: "What if the vehicle doesn't arrive as expected?",
                answer:
                  "While we do our best to ensure accurate information, delays can occur. We'll keep you updated on any changes.",
              },
            ].map((faq) => (
              <div
                key={faq.question}
                className="rounded-xl border border-stone-200 bg-[#FAF9F6] p-6"
              >
                <h3 className="font-semibold text-blue-950">{faq.question}</h3>
                <p className="mt-3 text-sm leading-relaxed text-stone-600">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
};

function IncomingVehicleCard({ car, index }: { car: Car; index: number }) {
  const image = car.images?.[0] || car.image || "/placeholder-car.jpg";

  return (
    <article className="group overflow-hidden rounded-xl border border-stone-200 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-stone-300 hover:shadow-[0_18px_45px_rgba(28,25,23,0.10)]">
      <Link href={`/newcars/${car.id}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden bg-stone-100">
          <img
            src={image}
            alt={car.title}
            loading={index < 3 ? "eager" : "lazy"}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.035]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/45 via-transparent to-transparent" />

          <div className="absolute left-4 top-4 rounded-md bg-[#FFD500] px-3 py-1.5 font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-stone-950">
            Incoming
          </div>

          {car.images.length > 1 && (
            <div className="absolute bottom-4 left-4 inline-flex items-center gap-1.5 rounded-md bg-stone-950/75 px-2.5 py-1.5 font-mono text-[10px] text-white backdrop-blur-sm">
              <Camera className="h-3.5 w-3.5" />
              {String(car.images.length).padStart(2, "0")}
            </div>
          )}

          <div className="absolute bottom-4 right-4 inline-flex overflow-hidden rounded-md border border-stone-900/70 shadow-sm">
            <div className="flex items-center bg-blue-800 px-1">
              <span className="font-mono text-[7px] font-bold text-white [writing-mode:vertical-rl] rotate-180">
                GB
              </span>
            </div>
            <div className="bg-[#FFD500] px-3.5 py-2">
  <span className="font-mono text-xl sm:text-2xl font-bold tracking-tight text-stone-950">
    £{formatNumber(car.price)}
  </span>
</div>
          </div>
        </div>

        <div className="p-5 sm:p-6">
          <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-stone-400">
            Irons Auto · Arriving soon
          </p>
          <h3 className="mt-2 min-h-[3.5rem] text-xl font-bold leading-snug text-blue-950 transition-colors group-hover:text-blue-800 line-clamp-2">
            {car.title}
          </h3>

          <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 border-y border-stone-100 py-4">
            <Spec
              icon={<Gauge className="h-4 w-4" />}
              label="Mileage"
              value={`${formatNumber(car.mileage)} mi`}
            />
            <Spec
              icon={<Fuel className="h-4 w-4" />}
              label="Fuel"
              value={car.fuelType}
            />
            <Spec
              icon={<GearboxIcon />}
              label="Gearbox"
              value={car.transmission}
            />
            <Spec
              icon={<EngineIcon />}
              label="Engine"
              value={car.engineSize ? `${car.engineSize}L` : "—"}
            />
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

          <div className="mt-5 flex items-center justify-between text-sm font-semibold text-blue-950">
            View incoming vehicle
            <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-blue-950 text-white transition-transform group-hover:translate-x-1">
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

function GearboxIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
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
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M7 8h9l2 2v7H7l-2-2v-5l2-2Z" />
      <path d="M10 8V5h4v3M18 12h2v3h-2M5 11H3v5h2" />
    </svg>
  );
}

export default IncomingVehicles;