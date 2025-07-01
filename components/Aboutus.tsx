"use client"

import { useState } from "react"
import { Shield, Award, Users, Clock, CheckCircle, MapPin, HeartHandshake } from "lucide-react"
import { motion } from "framer-motion"

export default function AboutUs() {
  const [hoveredStat, setHoveredStat] = useState<number | null>(null)
  const [hoveredValue, setHoveredValue] = useState<number | null>(null)

  const coreValues = [
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Every vehicle undergoes rigorous multi-point inspection.",
      color: "#2563EB", // Blue
      lightColor: "#EFF6FF",
    },
    {
      icon: Award,
      title: "Low Cost Service",
      description: "Lower maintenance fees for customer satisfaction.",
      color: "#F59E0B", // Amber
      lightColor: "#FFFBEB",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Passionate and knowledgeable specialists at your service.",
      color: "#10B981", // Green
      lightColor: "#ECFDF5",
    },
    {
      icon: HeartHandshake,
      title: "Community Focused",
      description: "Proudly supporting local initiatives and charities.",
      color: "#8B5CF6", // Purple
      lightColor: "#F5F3FF",
    },
  ]

  const stats = [
    {
      icon: Clock,
      value: "Satisfactory",
      label: "Tailored vehicles for each customer",
      color: "#2563EB", // Blue
      gradientFrom: "#1E40AF",
      gradientTo: "#3B82F6",
    },
    {
      icon: CheckCircle,
      value: "Part Exchange",
      label: "Taking any vehicle for your convenience", // Corrected typo
      color: "#10B981", // Green
      gradientFrom: "#047857",
      gradientTo: "#34D399",
    },
    {
      icon: Users,
      value: "98%",
      label: "Satisfied Customers",
      color: "#F59E0B", // Amber
      gradientFrom: "#B45309",
      gradientTo: "#FBBF24",
    },
    {
      icon: MapPin,
      value: "1",
      label: "Prime Location",
      color: "#8B5CF6", // Purple
      gradientFrom: "#6D28D9",
      gradientTo: "#A78BFA",
    },
  ]

  // Animation variants
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
    // Reduced vertical padding for mobile (py-16), and default px-4
    <section className="py-16 px-4 sm:py-24 sm:px-6 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements - Hidden on mobile for better performance */}
      <div className="absolute top-0 left-0 w-full h-full hidden sm:block">
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <motion.div
          className="text-center mb-10 sm:mb-16" // Reduced margin for mobile
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.p
            className="text-xs sm:text-sm font-semibold text-blue-600 uppercase tracking-wider mb-2 sm:mb-3" // Smaller text for mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            Our Story, Our Passion
          </motion.p>
          <motion.h2
            className="text-3xl sm:text-5xl font-extrabold text-gray-900 leading-tight mb-3 sm:mb-4" // Smaller text for mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Driving Excellence Since <span className="text-blue-700">2022</span>
          </motion.h2>
          <motion.p
            className="text-base sm:text-xl text-gray-700 max-w-3xl mx-auto" // Smaller text for mobile
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            At IRON AUTO, we do not just sell cars; we build relationships. Learn about our journey and what makes us
            unique.
          </motion.p>
        </motion.div>

        {/* Main Content Grid */}
        {/* Stacks vertically on mobile (grid-cols-1), then 2 columns on lg */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-start"> {/* Reduced gap for mobile */}
          {/* Left Column - Company Story & Core Values */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h3
              className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 relative inline-block" // Smaller text for mobile
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              Leicesters Premier Auto Dealership
              <motion.span
                className="absolute bottom-0 left-0 h-1 bg-blue-600 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 0.8, delay: 0.8 }}
              ></motion.span>
            </motion.h3>

            <motion.p
              className="text-sm sm:text-lg text-gray-700 mb-4 leading-relaxed" // Smaller text for mobile, reduced margin
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              At Iron Auto, we believe that buying a car should be one of lifes great experiences. Since our foundation
              in 2022, we have helped our customers find their perfect vehicle, combining exceptional customer
              service with an outstanding selection of quality cars.
            </motion.p>

            <motion.p
              className="text-sm sm:text-lg text-gray-700 mb-6 sm:mb-8 leading-relaxed" // Smaller text for mobile, reduced margin
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Based in Leicester, our state-of-the-art showroom features a handpicked selection of premium vehicles. Our
              expert team is passionate about cars and committed to providing honest, professional advice to help you
              make the right choice for your needs and budget.
            </motion.p>

            {/* Core Values Section */}
            <motion.h4
              className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6" // Smaller text for mobile
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Our Core Values
            </motion.h4>

            <motion.div
              // Stacks on mobile (grid-cols-1), then 2 columns on md
              className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6" // Reduced gap for mobile
              variants={container}
              initial="hidden"
              animate="show"
            >
              {coreValues.map((value, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  onMouseEnter={() => setHoveredValue(index)}
                  onMouseLeave={() => setHoveredValue(null)}
                  // Smaller padding for mobile, slightly less shadow
                  className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-100 flex items-start"
                  style={{
                    transform: hoveredValue === index ? "translateY(-5px)" : "translateY(0)",
                    boxShadow:
                      hoveredValue === index
                        ? "0 10px 20px -5px rgba(0, 0, 0, 0.08), 0 6px 6px -5px rgba(0, 0, 0, 0.03)"
                        : "",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  {/* Background gradient that appears on hover */}
                  <div
                    className="absolute inset-0 rounded-xl opacity-0 z-0"
                    style={{
                      background: `linear-gradient(135deg, ${value.lightColor} 0%, white 100%)`,
                      opacity: hoveredValue === index ? 1 : 0,
                      transition: "opacity 0.5s ease",
                    }}
                  ></div>

                  <div
                    className="relative z-10 p-2 sm:p-3 rounded-full mr-3 sm:mr-4 shrink-0" // Smaller padding and margin for icon
                    style={{
                      backgroundColor: hoveredValue === index ? value.color : value.lightColor,
                      color: hoveredValue === index ? "white" : value.color,
                      transform: hoveredValue === index ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0)",
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    <value.icon size={20} /> {/* Smaller icon size */}
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-0.5 text-base sm:text-lg">{value.title}</h4> {/* Smaller text */}
                    <p className="text-gray-700 text-xs sm:text-sm">{value.description}</p> {/* Smaller text */}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image & Key Stats */}
          <motion.div
            className="flex flex-col gap-8 sm:gap-6" // Reduced gap for mobile
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Image with overlay */}
            <motion.div
              className="relative w-full h-64 sm:h-96 rounded-2xl overflow-hidden shadow-xl group" // Reduced height for mobile, slightly less shadow
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/BMWM8.jpg"
                alt="IronsAuto Showroom"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex items-end p-6 sm:p-8"> {/* Reduced padding */}
                <motion.div
                  className="text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h3 className="text-xl sm:text-3xl font-bold mb-1 sm:mb-2">Our Modern Showroom</h3> {/* Smaller text */}
                  <p className="text-gray-200 text-sm sm:text-base">Experience our vehicles in a comfortable and welcoming environment</p> {/* Smaller text */}
                </motion.div>
              </div>
            </motion.div>

            {/* Key Stats - Now uses 2 columns on mobile too, but smaller text/icons */}
            <motion.div
              className="grid grid-cols-2 gap-4" // Maintained 2 columns but reduced gap
              variants={container}
              initial="hidden"
              animate="show"
              transition={{ delayChildren: 0.8, staggerChildren: 0.1 }}
            >
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  variants={item}
                  onMouseEnter={() => setHoveredStat(index)}
                  onMouseLeave={() => setHoveredStat(null)}
                  className="relative rounded-xl shadow-md p-4 text-center overflow-hidden" // Reduced padding and shadow
                  style={{
                    background:
                      hoveredStat === index
                        ? `linear-gradient(135deg, ${stat.gradientFrom} 0%, ${stat.gradientTo} 100%)`
                        : `linear-gradient(135deg, ${stat.gradientFrom}CC 0%, ${stat.gradientTo}CC 100%)`,
                    transform: hoveredStat === index ? "translateY(-3px) scale(1.02)" : "translateY(0) scale(1)", // Less aggressive hover
                    transition: "transform 0.3s ease, background 0.3s ease",
                  }}
                >
                  {/* Animated background circles */}
                  <div
                    className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-20" // Smaller circles
                    style={{
                      background: `radial-gradient(circle, white 0%, transparent 70%)`,
                      transform: hoveredStat === index ? "translate(-5%, -20%) scale(1.1)" : "translate(5%, -30%)", // Less aggressive hover
                      transition: "transform 0.5s ease",
                    }}
                  ></div>

                  <div
                    className="absolute bottom-0 left-0 w-16 h-16 rounded-full opacity-10" // Smaller circles
                    style={{
                      background: `radial-gradient(circle, white 0%, transparent 70%)`,
                      transform: hoveredStat === index ? "translate(-10%, 10%) scale(1.1)" : "translate(-20%, 20%)", // Less aggressive hover
                      transition: "transform 0.5s ease",
                    }}
                  ></div>

                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredStat === index ? 1.05 : 1 }} // Less aggressive icon scale
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="relative z-10 text-white"
                  >
                    <stat.icon className="mx-auto mb-2" size={28} /> {/* Smaller icon */}
                    <div className="text-2xl font-extrabold mb-1">{stat.value}</div> {/* Smaller text */}
                    <div className="text-sm opacity-90">{stat.label}</div> {/* Smaller text */}
                  </motion.div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Add CSS for blob animation */}
      <style jsx>{`
        @keyframes blob {
          0% {
            transform: translate(0px, 0px) scale(1);
          }
          33% {
            transform: translate(30px, -50px) scale(1.1);
          }
          66% {
            transform: translate(-20px, 20px) scale(0.9);
          }
          100% {
            transform: translate(0px, 0px) scale(1);
          }
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