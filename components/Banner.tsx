import Image from "next/image";

export default function Banner() {
  return (
    <div className="w-full relative h-[200px] sm:h-[300px] lg:h-[400px] overflow-hidden shadow-md">
      <Image
        src="/m3.jpg"
        alt="Dealership Banner"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
        <h1 className="text-white text-xl sm:text-3xl font-bold">
          Welcome to Premium Auto Deals
        </h1>
      </div>
    </div>
  );
}
