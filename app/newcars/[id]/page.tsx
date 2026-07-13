"use client";

import { useState, useEffect, type ChangeEvent, type FormEvent } from "react";
import { db, storage } from "../../../firebase/firebase";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
import { ref, deleteObject } from "firebase/storage";
import { sendContactEmail } from "../../../lib/resend";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import useAuth from "../../../hooks/useAuth";
import {
  ChevronLeft,
  ChevronRight,
  ArrowLeft,
  Edit,
  Trash2,
  Maximize2,
  Check,
  AlertCircle,
  Send,
  Phone,
  MapPin,
  MessageCircle,
  Share2,
  ShieldCheck,
  Repeat,
  Truck,
  BadgeCheck,
  X,
} from "lucide-react";

// Car interface matching our data structure
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
  description: string;
  features: string[];
  status?: string;
}

export default function CarDetails() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id as string;
  const { user } = useAuth();

  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [showFullGallery, setShowFullGallery] = useState(false);
  const [linkCopied, setLinkCopied] = useState(false);

  // Contact form states
  const [formStatus, setFormStatus] = useState({
    submitted: false,
    error: false,
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: `Inquiry about ${car?.title || "vehicle"}`,
    message: "",
  });

  useEffect(() => {
    if (!id) return;

    const fetchCarDetails = async () => {
      try {
        const docRef = doc(db, "cars", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          const carData = {
            id: docSnap.id,
            title: data.title || "",
            price: data.price || "",
            mileage: data.mileage || "",
            transmission: data.transmission || "",
            color: data.color || "",
            engineSize: data.engineSize || "",
            fuelType: data.fuelType || "",
            doors: data.doors || "",
            images: data.images || (data.image ? [data.image] : []),
            description: data.description || "",
            features: data.features || [],
            status: data.status || "Available Now",
          };

          setCar(carData);

          // Update the subject with the car title
          setFormData((prev) => ({
            ...prev,
            subject: `Inquiry about ${carData.title}`,
          }));
        } else {
          console.log("No such document!");
          router.push("/");
        }
      } catch (error) {
        console.error("Error fetching car details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCarDetails();
  }, [id, router]);

  // Contact form handlers
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Send email using Resend API
      const result = await sendContactEmail({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        subject: formData.subject,
        message: formData.message,
      });

      if (result.success) {
        setFormStatus({
          submitted: true,
          error: false,
          message: "Thank you! Your message has been sent successfully.",
        });

        // Reset form after successful submission
        setFormData((prev) => ({
          ...prev,
          name: "",
          email: "",
          phone: "",
          message: "",
        }));
      } else {
        setFormStatus({
          submitted: false,
          error: true,
          message:
            "There was an error sending your message. Please try again later.",
        });
      }
    } catch (error) {
      console.error("Form submission error:", error);
      setFormStatus({
        submitted: false,
        error: true,
        message:
          "There was an error sending your message. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Function to delete car and associated images
  const handleDeleteCar = async () => {
    if (
      !car ||
      !window.confirm(
        "Are you sure you want to delete this vehicle? This action cannot be undone."
      )
    ) {
      return;
    }

    setDeleting(true);

    try {
      // Delete all images from storage
      await Promise.all(
        car.images.map(async (imageUrl) => {
          try {
            // Extract the file path from the URL
            const filePathMatch = imageUrl.match(/\/o\/(.+)\?alt=/);
            if (filePathMatch && filePathMatch[1]) {
              const filePath = decodeURIComponent(filePathMatch[1]);
              const imageRef = ref(storage, filePath);
              await deleteObject(imageRef);
            }
          } catch (error) {
            console.error("Error deleting image:", error);
          }
        })
      );

      // Delete the car document from Firestore
      await deleteDoc(doc(db, "cars", car.id));

      // Redirect to home page
      router.push("/");
    } catch (error) {
      console.error("Error deleting car:", error);
      alert("Failed to delete vehicle. Please try again.");
      setDeleting(false);
    }
  };

  // Function to handle image navigation
  const changeImage = (index: number) => {
    setActiveImage(index);
  };

  // Function to navigate to next/prev image
  const navigateImage = (direction: "next" | "prev") => {
    if (!car?.images.length) return;

    if (direction === "next") {
      setActiveImage((prev) => (prev + 1) % car.images.length);
    } else {
      setActiveImage(
        (prev) => (prev - 1 + car.images.length) % car.images.length
      );
    }
  };

  // Share this listing — native share sheet on mobile, copy link on desktop
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({ title: car?.title, url });
      } catch {
        /* user dismissed the share sheet */
      }
    } else {
      try {
        await navigator.clipboard.writeText(url);
        setLinkCopied(true);
        setTimeout(() => setLinkCopied(false), 2000);
      } catch (error) {
        console.error("Could not copy link:", error);
      }
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#FAF9F6]">
        <div className="flex flex-col items-center">
          <div className="w-10 h-10 border-2 border-stone-200 border-t-blue-950 rounded-full animate-spin mb-5"></div>
          <div className="font-mono text-xs uppercase tracking-[0.25em] text-stone-500">
            Loading vehicle
          </div>
        </div>
      </div>
    );
  }

  if (!car) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-[#FAF9F6] px-4">
        <p className="font-mono text-xs uppercase tracking-[0.25em] text-stone-400 mb-3">
          Not in stock
        </p>
        <h1 className="text-2xl font-bold text-blue-950 mb-2">
          Vehicle not found
        </h1>
        <p className="text-sm text-stone-500 mb-8">
          This vehicle may have been sold or removed from our forecourt.
        </p>
        <Link
          href="/cars"
          className="inline-flex items-center bg-blue-950 hover:bg-blue-900 text-white px-6 py-3 rounded-md text-sm font-semibold transition-colors"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Browse our cars
        </Link>
      </div>
    );
  }

  // The "plate" — price styled as a UK number plate. The page's signature.
  const PricePlate = ({ size = "lg" }: { size?: "lg" | "sm" }) => (
    <div
      className={`inline-flex items-stretch overflow-hidden rounded-lg border border-stone-900/70 shadow-[0_1px_0_rgba(0,0,0,0.25)] ${
        car.status === "Sold" ? "opacity-60 saturate-0" : ""
      }`}
    >
      <div className="flex items-center justify-center bg-blue-800 px-1.5">
        <span className="font-mono text-[9px] font-bold leading-none tracking-wider text-white [writing-mode:vertical-rl] rotate-180">
          GB
        </span>
      </div>
      <div
        className={`flex items-center bg-[#FFD500] ${
          size === "lg" ? "px-5 py-2.5" : "px-4 py-2"
        }`}
      >
        <span
          className={`font-mono font-bold tracking-tight text-stone-950 ${
            size === "lg" ? "text-2xl sm:text-3xl" : "text-xl"
          }`}
        >
          £{Number(car.price).toLocaleString()}
        </span>
      </div>
    </div>
  );

  // WhatsApp deep link with the car pre-filled
  const whatsAppHref = `https://wa.me/447407403676?text=${encodeURIComponent(
    `Hi, I'm interested in the ${car.title} on your website.`
  )}`;

  // Full-screen gallery modal
  // Layout notes: min-h-0 on the image row is what stops a tall image from
  // pushing the header and thumbnails off screen; the img is absolutely
  // positioned inside it so it can never exceed the available space.
  const GalleryModal = () => (
    <div className="fixed inset-0 z-[9999] bg-stone-950 flex flex-col overflow-hidden">
      {/* Modal header — fixed height, never pushed away */}
      <div className="flex-shrink-0 flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-white/10">
        <div className="font-mono text-xs uppercase tracking-[0.2em] text-stone-400">
          <span className="text-white">
            {String(activeImage + 1).padStart(2, "0")}
          </span>
          {" / "}
          {String(car.images.length).padStart(2, "0")}
          <span className="hidden sm:inline text-stone-500 ml-4 normal-case tracking-normal">
            {car.title}
          </span>
        </div>
        <button
          onClick={() => setShowFullGallery(false)}
          className="inline-flex items-center gap-2 text-stone-200 hover:text-white bg-white/10 hover:bg-white/20 px-3 py-2 rounded-md transition-colors focus:outline-none text-sm font-medium"
          aria-label="Close gallery"
        >
          <X className="h-5 w-5" />
          <span className="hidden sm:inline">Close</span>
        </button>
      </div>

      {/* Main image area — flex-1 with min-h-0 so it can only use leftover space */}
      <div className="relative flex-1 min-h-0">
        <img
          src={car.images[activeImage] || "/placeholder-car.jpg"}
          alt={car.title}
          className="absolute inset-0 w-full h-full object-contain p-3 sm:p-6"
        />

        {car.images.length > 1 && (
          <>
            <button
              onClick={() => navigateImage("prev")}
              className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-2.5 sm:p-3 rounded-full transition-colors focus:outline-none"
              aria-label="Previous image"
            >
              <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
            <button
              onClick={() => navigateImage("next")}
              className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/25 text-white p-2.5 sm:p-3 rounded-full transition-colors focus:outline-none"
              aria-label="Next image"
            >
              <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
            </button>
          </>
        )}
      </div>

      {/* Modal thumbnails — fixed height strip, always visible */}
      {car.images.length > 1 && (
        <div className="flex-shrink-0 flex overflow-x-auto gap-2 px-4 sm:px-6 py-3 border-t border-white/10 hide-scrollbar">
          {car.images.map((img, index) => (
            <div
              key={index}
              onClick={() => changeImage(index)}
              className={`flex-shrink-0 w-20 h-14 sm:w-24 sm:h-16 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                activeImage === index
                  ? "ring-2 ring-[#FFD500] opacity-100"
                  : "opacity-50 hover:opacity-100"
              }`}
            >
              <img
                src={img || "/placeholder.svg"}
                alt={`${car.title} - image ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Spec sheet data
  const specs = [
    { label: "Mileage", value: Number(car.mileage).toLocaleString(), unit: "mi" },
    { label: "Engine", value: car.engineSize, unit: "L" },
    { label: "Fuel", value: car.fuelType, unit: "" },
    { label: "Gearbox", value: car.transmission, unit: "" },
    { label: "Colour", value: car.color, unit: "" },
    { label: "Doors", value: car.doors, unit: "" },
  ];

  return (
    <div className="bg-[#FAF9F6] min-h-screen">
      {/* Show gallery modal if enabled */}
      {showFullGallery && <GalleryModal />}

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Top bar: back link + admin actions */}
        <div className="flex justify-between items-center mb-6">
          <Link
            href="/cars"
            className="group inline-flex items-center font-mono text-xs uppercase tracking-[0.2em] text-stone-500 hover:text-blue-950 transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 mr-2 group-hover:-translate-x-0.5 transition-transform" />
            All vehicles
          </Link>

          {/* Edit / Delete — only visible for signed in users */}
          {user && (
            <div className="flex gap-2">
              <Link
                href={`/edit-car/${car.id}`}
                className="inline-flex items-center bg-blue-950 hover:bg-blue-900 text-white px-4 py-2 rounded-md text-sm font-semibold transition-colors"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Vehicle
              </Link>
              <button
                onClick={handleDeleteCar}
                disabled={deleting}
                className="inline-flex items-center bg-white border border-red-300 text-red-700 hover:bg-red-50 px-4 py-2 rounded-md text-sm font-semibold transition-colors disabled:opacity-60"
              >
                {deleting ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-red-700"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete Vehicle
                  </>
                )}
              </button>
            </div>
          )}
        </div>

        {/* Masthead: title + highlight badges on the left, plate-price on the right */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-5 mb-7 pb-7 border-b border-stone-200">
          <div className="min-w-0">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-2">
              Irons Auto &middot; Leicester forecourt
            </p>
            <h1 className="text-3xl md:text-[2.75rem] md:leading-[1.05] font-bold text-blue-950 tracking-tight">
              {car.title}
            </h1>
            {/* Highlight badges — dealer-style reassurance at a glance */}
            <div className="flex flex-wrap gap-2 mt-4">
              <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold text-stone-700">
                <BadgeCheck className="h-3.5 w-3.5 text-blue-800" />
                Inspected &amp; prepared
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold text-stone-700 capitalize">
                {car.fuelType}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold text-stone-700 capitalize">
                {car.transmission}
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold text-stone-700">
                {Number(car.mileage).toLocaleString()} miles
              </span>
              <span className="inline-flex items-center gap-1.5 bg-white border border-stone-200 rounded-md px-3 py-1.5 text-xs font-semibold text-stone-700">
                {car.doors}-door
              </span>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end gap-2 flex-shrink-0">
            <PricePlate />
            <span
              className={`font-mono text-[11px] uppercase tracking-[0.2em] ${
                car.status === "Sold" ? "text-red-700" : "text-emerald-700"
              }`}
            >
              &#9679; {car.status || "Available Now"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ============ LEFT: Gallery, spec sheet, description, features ============ */}
          <div className="lg:col-span-2">
            {/* Image gallery */}
            <div className="bg-white rounded-xl overflow-hidden border border-stone-200">
              {/* Main featured image — dimensions unchanged */}
              <div className="relative h-[300px] sm:h-[650px] bg-stone-100">
                <img
                  src={car.images[activeImage] || "/placeholder-car.jpg"}
                  alt={car.title}
                  className="w-full h-full object-contain sm:object-cover"
                />

                {/* Frame counter */}
                {car.images.length > 1 && (
                  <div className="absolute bottom-4 left-4 bg-stone-950/70 backdrop-blur-sm text-white px-3 py-1.5 rounded-md font-mono text-xs tracking-widest">
                    {String(activeImage + 1).padStart(2, "0")}
                    <span className="text-stone-400">
                      {" "}
                      / {String(car.images.length).padStart(2, "0")}
                    </span>
                  </div>
                )}

                {/* Expand button */}
                <button
                  onClick={() => setShowFullGallery(true)}
                  className="absolute top-4 right-4 bg-stone-950/70 backdrop-blur-sm hover:bg-stone-950/90 text-white p-2.5 rounded-md transition-colors focus:outline-none"
                  aria-label="View full-screen gallery"
                >
                  <Maximize2 className="h-4 w-4" />
                </button>

                {/* Navigation arrows — only if more than one image */}
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={() => navigateImage("prev")}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-stone-950/70 backdrop-blur-sm hover:bg-stone-950/90 text-white p-2.5 rounded-md transition-colors focus:outline-none"
                      aria-label="Previous image"
                    >
                      <ChevronLeft className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => navigateImage("next")}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-stone-950/70 backdrop-blur-sm hover:bg-stone-950/90 text-white p-2.5 rounded-md transition-colors focus:outline-none"
                      aria-label="Next image"
                    >
                      <ChevronRight className="h-5 w-5" />
                    </button>
                  </>
                )}
              </div>

              {/* Thumbnail strip — only if more than one image */}
              {car.images.length > 1 && (
                <div className="flex overflow-x-auto gap-2 p-3 border-t border-stone-100 hide-scrollbar">
                  {car.images.map((img, index) => (
                    <div
                      key={index}
                      onClick={() => changeImage(index)}
                      className={`flex-shrink-0 w-24 h-16 cursor-pointer rounded overflow-hidden transition-all duration-200 ${
                        activeImage === index
                          ? "ring-2 ring-blue-950 opacity-100"
                          : "opacity-55 hover:opacity-100"
                      }`}
                    >
                      <img
                        src={img || "/placeholder.svg"}
                        alt={`${car.title} - image ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Spec sheet — paper treatment: ink on white, mono figures, hairline grid */}
            <div className="bg-white rounded-xl border border-stone-200 mt-6 overflow-hidden">
              <div className="px-6 pt-5 pb-4 border-b border-stone-100 flex items-baseline justify-between">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500">
                  Vehicle at a glance
                </p>
                <p className="font-mono text-[11px] text-stone-400">
                  IA-{car.id.slice(0, 6).toUpperCase()}
                </p>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6">
                {specs.map((spec, i) => (
                  <div
                    key={spec.label}
                    className={`px-6 py-5 border-stone-100 ${
                      i % 2 === 1 ? "border-l" : ""
                    } sm:border-l sm:first:border-l-0 ${
                      i >= 2 ? "border-t sm:border-t" : ""
                    } sm:[&:nth-child(-n+3)]:border-t-0 lg:border-t-0`}
                  >
                    <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-stone-400 mb-1.5">
                      {spec.label}
                    </p>
                    <p className="font-mono text-lg lg:text-xl font-semibold text-blue-950 capitalize leading-none">
                      {spec.value}
                      {spec.unit && (
                        <span className="text-stone-400 text-sm ml-1 normal-case">
                          {spec.unit}
                        </span>
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Vehicle description */}
            <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-9 mt-6 order-3 lg:order-none">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">
                From the showroom
              </p>
              <div className="max-w-prose">
                {car.description ? (
                  <div className="text-stone-700 text-[15px] whitespace-pre-line leading-[1.75]">
                    {car.description}
                  </div>
                ) : (
                  <>
                    <p className="text-stone-700 text-[15px] leading-[1.75]">
                      This {car.title} is in excellent condition and ready for
                      its new owner.
                    </p>
                    <p className="mt-4 text-stone-700 text-[15px] leading-[1.75]">
                      It features a {car.engineSize}L {car.fuelType} engine
                      with {car.transmission} transmission. With only{" "}
                      {Number(car.mileage).toLocaleString()} miles on the
                      odometer, this {car.color} vehicle provides an excellent
                      driving experience.
                    </p>
                    <p className="mt-4 text-stone-700 text-[15px] leading-[1.75]">
                      Contact us today to arrange a viewing or test drive at
                      our Leicester showroom.
                    </p>
                  </>
                )}
              </div>
            </div>

            {/* Vehicle features — only if there are features */}
            {car.features && car.features.length > 0 && (
              <div className="bg-white rounded-xl border border-stone-200 p-7 sm:p-9 mt-6 order-4 lg:order-none">
                <div className="flex items-baseline justify-between mb-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500">
                    Specification
                  </p>
                  <p className="font-mono text-[11px] text-stone-400">
                    {String(car.features.length).padStart(2, "0")} items
                  </p>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-10">
                  {car.features.map((feature, index) => (
                    <li
                      key={index}
                      className="flex items-start py-2.5 border-b border-stone-100 text-[15px] text-stone-700"
                    >
                      <Check
                        className="h-4 w-4 mr-3 mt-0.5 text-blue-800 flex-shrink-0"
                        strokeWidth={2.5}
                      />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* ============ RIGHT: Enquiry, actions, reassurance, showroom ============ */}
          <div className="lg:col-span-1 order-2 lg:order-none">
            <div className="lg:sticky lg:top-24 space-y-6">
              {/* Enquiry card */}
              <div className="bg-white rounded-xl border border-stone-200 overflow-hidden">
                {/* Card header */}
                <div className="bg-blue-950 px-6 py-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <h2 className="text-white text-lg font-bold leading-tight">
                        Enquire about this car
                      </h2>
                      <p className="text-stone-300 text-sm mt-1">
                        Viewing, test drive or part exchange
                      </p>
                    </div>
                    <PricePlate size="sm" />
                  </div>
                </div>

                {/* Direct actions — call, WhatsApp, share */}
                <div className="grid grid-cols-3 divide-x divide-stone-100 border-b border-stone-100">
                  <a
                    href="tel:07407403676"
                    className="flex flex-col items-center gap-1.5 py-4 text-stone-600 hover:text-blue-950 hover:bg-stone-50 transition-colors"
                  >
                    <Phone className="h-5 w-5" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                      Call
                    </span>
                  </a>
                  <a
                    href={whatsAppHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex flex-col items-center gap-1.5 py-4 text-stone-600 hover:text-blue-950 hover:bg-stone-50 transition-colors"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                      WhatsApp
                    </span>
                  </a>
                  <button
                    onClick={handleShare}
                    className="flex flex-col items-center gap-1.5 py-4 text-stone-600 hover:text-blue-950 hover:bg-stone-50 transition-colors focus:outline-none"
                  >
                    <Share2 className="h-5 w-5" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.15em]">
                      {linkCopied ? "Copied!" : "Share"}
                    </span>
                  </button>
                </div>

                <div className="p-6">
                  {formStatus.submitted ? (
                    <div className="bg-emerald-50 border border-emerald-200 rounded-md p-4 flex items-start">
                      <Check className="h-5 w-5 text-emerald-600 mr-3 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="font-semibold text-emerald-800">
                          Thank you
                        </h3>
                        <p className="text-emerald-700 text-sm mt-0.5">
                          Your enquiry has been sent successfully. Our team
                          will contact you shortly.
                        </p>
                      </div>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {formStatus.error && (
                        <div className="bg-red-50 border border-red-200 rounded-md p-4 flex items-start">
                          <AlertCircle className="h-5 w-5 text-red-600 mr-3 flex-shrink-0 mt-0.5" />
                          <div>
                            <h3 className="font-semibold text-red-800">
                              Error
                            </h3>
                            <p className="text-red-700 text-sm mt-0.5">
                              {formStatus.message}
                            </p>
                          </div>
                        </div>
                      )}

                      {/* Name */}
                      <div>
                        <label
                          htmlFor="name"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-1.5"
                        >
                          Full Name*
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition-colors"
                          placeholder="John Smith"
                        />
                      </div>

                      {/* Email */}
                      <div>
                        <label
                          htmlFor="email"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-1.5"
                        >
                          Email Address*
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition-colors"
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div>
                        <label
                          htmlFor="phone"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-1.5"
                        >
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition-colors"
                          placeholder="+44 7123 456789"
                        />
                      </div>

                      {/* Subject — pre-filled, hidden */}
                      <input
                        type="hidden"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                      />

                      {/* Message */}
                      <div>
                        <label
                          htmlFor="message"
                          className="block font-mono text-[11px] uppercase tracking-[0.18em] text-stone-500 mb-1.5"
                        >
                          Message*
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={3}
                          className="w-full px-3.5 py-2.5 text-sm border border-stone-300 rounded-md bg-white placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-blue-950 focus:border-blue-950 transition-colors"
                          placeholder="I'd like to arrange a test drive for this vehicle..."
                        ></textarea>
                      </div>

                      {/* Submit */}
                      <div>
                        <button
                          type="submit"
                          disabled={isSubmitting}
                          className={`inline-flex items-center justify-center w-full px-4 py-3.5 rounded-md text-sm font-bold transition-colors ${
                            isSubmitting
                              ? "bg-stone-300 text-stone-500 cursor-not-allowed"
                              : "bg-[#FFD500] hover:bg-[#F5CC00] text-stone-950 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-950"
                          }`}
                        >
                          {isSubmitting ? "Sending..." : "Send Enquiry"}
                          {!isSubmitting && <Send className="h-4 w-4 ml-2" />}
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              </div>

              {/* Peace of mind — what comes with every Irons Auto car */}
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">
                  Included with this car
                </p>
                <ul className="space-y-3.5">
                  <li className="flex items-start">
                    <ShieldCheck className="h-5 w-5 mr-3 mt-0.5 text-blue-800 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Warranty up to 12 months
                      </p>
                      <p className="text-sm text-stone-500 mt-0.5">
                        Ask us for the cover details on this vehicle
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <BadgeCheck className="h-5 w-5 mr-3 mt-0.5 text-blue-800 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Inspected before sale
                      </p>
                      <p className="text-sm text-stone-500 mt-0.5">
                        Checked and prepared by our team
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Repeat className="h-5 w-5 mr-3 mt-0.5 text-blue-800 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        Part exchange welcome
                      </p>
                      <p className="text-sm text-stone-500 mt-0.5">
                        Fair valuation on your current car
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <Truck className="h-5 w-5 mr-3 mt-0.5 text-blue-800 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-semibold text-stone-900">
                        UK-wide delivery
                      </p>
                      <p className="text-sm text-stone-500 mt-0.5">
                        Buying from outside Leicester? We can deliver
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              {/* Showroom card */}
              <div className="bg-white rounded-xl border border-stone-200 p-6">
                <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-500 mb-4">
                  Visit the showroom
                </p>
                <div className="space-y-3">
                  <a
                    href="tel:07407403676"
                    className="flex items-center text-sm text-stone-700 hover:text-blue-950 transition-colors"
                  >
                    <Phone className="h-4 w-4 mr-3 text-stone-400 flex-shrink-0" />
                    <span className="font-mono font-semibold">
                      07407 403676
                    </span>
                  </a>
                  <div className="flex items-start text-sm text-stone-600">
                    <MapPin className="h-4 w-4 mr-3 mt-0.5 text-stone-400 flex-shrink-0" />
                    <span>101–103 Margaret Road, Leicester LE5 5FW</span>
                  </div>
                </div>
                <a
                  href="https://www.google.com/maps/search/?api=1&query=101-103+Margaret+Road+Leicester+LE5+5FW"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center justify-center w-full border border-stone-300 hover:border-blue-950 hover:text-blue-950 text-stone-700 px-4 py-2.5 rounded-md text-sm font-semibold transition-colors"
                >
                  Get directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Why buy from Irons Auto — full-width band */}
        <div className="mt-10 bg-blue-950 rounded-xl px-7 sm:px-10 py-8 sm:py-10">
          <div className="flex flex-col lg:flex-row lg:items-center gap-8">
            <div className="lg:w-1/3">
              <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-stone-400 mb-2">
                Why buy from us
              </p>
              <h2 className="text-white text-2xl font-bold tracking-tight leading-snug">
                A local dealer that stands behind every car.
              </h2>
            </div>
            <div className="lg:w-2/3 grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-4">
              {[
                "Every car inspected and prepared to a high standard",
                "Honest, no-pressure advice from a local team",
                "Competitive pricing across the forecourt",
                "Part exchange and UK-wide delivery available",
              ].map((point) => (
                <div key={point} className="flex items-start">
                  <Check
                    className="h-5 w-5 mr-3 mt-0.5 text-[#FFD500] flex-shrink-0"
                    strokeWidth={2.5}
                  />
                  <p className="text-stone-200 text-sm leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}