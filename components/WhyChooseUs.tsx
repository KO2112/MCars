"use client"

import { useState } from "react"
import { Star, MapPin, Truck, Wallet, ShieldCheck, Handshake } from "lucide-react"
import { motion } from "framer-motion"

export default function WhyChooseUs() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  const features = [
    {
      icon: Star,
      title: "Trusted by Reviews",
      description:
        "Our commitment to excellence shines through in our customer feedback. See why buyers consistently rate us 5-stars.",
      color: "#FFC107", // Amber
      lightColor: "#FFF8E1",
    },
    {
      icon: MapPin,
      title: "Prime Leicester Location",
      description:
        "Easily access our modern showroom in Leicester, with convenient parking and public transport links.",
      color: "#2563EB", // Blue
      lightColor: "#EFF6FF",
    },
    {
      icon: Truck,
      title: "Instant Drive-Away",
      description:
        "Found your perfect car? Drive it home today! Our efficient process ensures quick and easy collection.",
      color: "#10B981", // Green
      lightColor: "#ECFDF5",
    },
    {
      icon: Wallet,
      title: "Transparent Pricing",
      description: "No hidden fees, no haggling. Just straightforward, competitive pricing from the start.",
      color: "#8B5CF6", // Purple
      lightColor: "#F5F3FF",
    },
    {
      icon: ShieldCheck,
      title: "Quality Assured Vehicles",
      description: "Every car undergoes rigorous multi-point inspections for peace of mind and long-term reliability.",
      color: "#EF4444", // Red
      lightColor: "#FEF2F2",
    },
    {
      icon: Handshake,
      title: "Dedicated Customer Support",
      description: "Our friendly experts are here to guide you, offering personalized advice and seamless service.",
      color: "#06B6D4", // Cyan
      lightColor: "#ECFEFF",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
  }

  return (
    <section className="py-24 px-4 bg-gradient-to-b from-white to-gray-50 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute top-40 right-10 w-72 h-72 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-sm font-semibold text-blue-600 uppercase tracking-wider mb-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Your Journey, Our Commitment
          </motion.p>
          <motion.h2
            className="text-5xl font-extrabold mb-6 text-gray-900 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Why Choose <span className="text-blue-700">IRON AUTO?</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            Experience the IRON AUTO difference. We are dedicated to delivering not just cars, but complete
            satisfaction.
          </motion.p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate="show"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={item}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              className="relative bg-white rounded-2xl p-8 shadow-lg border border-gray-100 flex flex-col items-start h-full transition-all duration-300"
              style={{
                transform: hoveredIndex === index ? "translateY(-10px)" : "translateY(0)",
                boxShadow:
                  hoveredIndex === index
                    ? "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
                    : "",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Background gradient that appears on hover */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 z-0"
                style={{
                  background: `linear-gradient(135deg, ${feature.lightColor} 0%, white 100%)`,
                  opacity: hoveredIndex === index ? 1 : 0,
                  transition: "opacity 0.5s ease",
                }}
              ></div>

              {/* Icon container with animation */}
              <div
                className="relative z-10 flex items-center justify-center p-4 rounded-full mb-6"
                style={{
                  backgroundColor: hoveredIndex === index ? feature.color : feature.lightColor,
                  color: hoveredIndex === index ? "white" : feature.color,
                  transform: hoveredIndex === index ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0)",
                  transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                }}
              >
                <feature.icon size={32} strokeWidth={2} />
              </div>

              {/* Content */}
              <h3 className="relative z-10 text-2xl font-bold text-gray-900 mb-3 leading-tight">{feature.title}</h3>
              <p className="relative z-10 text-gray-700 flex-grow">{feature.description}</p>

              {/* Animated arrow that appears on hover */}
              
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Add CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </section>
  )
}
