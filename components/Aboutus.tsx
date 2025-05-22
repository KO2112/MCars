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
      title: "Award-Winning Service",
      description: "Recognized for excellence in customer satisfaction.",
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
      value: "15+",
      label: "Years Experience",
      color: "#2563EB", // Blue
      gradientFrom: "#1E40AF",
      gradientTo: "#3B82F6",
    },
    {
      icon: CheckCircle,
      value: "2,500+",
      label: "Cars Sold",
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
    <section className="py-24 px-4 bg-gradient-to-b from-gray-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-40 right-20 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob"></div>
        <div className="absolute bottom-40 left-20 w-80 h-80 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-4000"></div>
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
            Our Story, Our Passion
          </motion.p>
          <motion.h2
            className="text-5xl font-extrabold text-gray-900 leading-tight mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
          >
            Driving Excellence Since <span className="text-blue-700">2010</span>
          </motion.h2>
          <motion.p
            className="text-xl text-gray-700 max-w-3xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
          >
            At IRONSAUTO, we do not just sell cars; we build relationships. Learn about our journey and what makes us
            unique.
          </motion.p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left Column - Company Story */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <motion.h3
              className="text-3xl font-bold text-gray-900 mb-6 relative inline-block"
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
              className="text-gray-700 mb-6 leading-relaxed text-lg"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              At IronsAuto, we believe that buying a car should be one of lifes great experiences. Since our foundation
              in 2010, we have helped thousands of customers find their perfect vehicle, combining exceptional customer
              service with an outstanding selection of quality cars.
            </motion.p>

            <motion.p
              className="text-gray-700 mb-8 leading-relaxed text-lg"
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
              className="text-2xl font-bold text-gray-900 mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.1 }}
            >
              Our Core Values
            </motion.h4>

            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                  className="relative bg-white rounded-xl p-5 shadow-md border border-gray-100 flex items-start"
                  style={{
                    transform: hoveredValue === index ? "translateY(-5px)" : "translateY(0)",
                    boxShadow:
                      hoveredValue === index
                        ? "0 15px 30px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
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
                    className="relative z-10 p-3 rounded-full mr-4 shrink-0"
                    style={{
                      backgroundColor: hoveredValue === index ? value.color : value.lightColor,
                      color: hoveredValue === index ? "white" : value.color,
                      transform: hoveredValue === index ? "scale(1.1) rotate(5deg)" : "scale(1) rotate(0)",
                      transition: "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
                    }}
                  >
                    <value.icon size={24} />
                  </div>
                  <div className="relative z-10">
                    <h4 className="font-bold text-gray-900 mb-1 text-lg">{value.title}</h4>
                    <p className="text-gray-700 text-sm">{value.description}</p>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column - Image & Key Stats */}
          <motion.div
            className="flex flex-col gap-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Image with overlay */}
            <motion.div
              className="relative w-full h-96 rounded-2xl overflow-hidden shadow-2xl group"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src="/m3.jpg"
                alt="IronsAuto Showroom"
                className="w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/40 to-transparent flex items-end p-8">
                <motion.div
                  className="text-white"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  <h3 className="text-3xl font-bold mb-2">Our Modern Showroom</h3>
                  <p className="text-gray-200">Experience our vehicles in a comfortable and welcoming environment.</p>
                </motion.div>
              </div>
            </motion.div>

            {/* Key Stats */}
            <motion.div
              className="grid grid-cols-2 gap-4"
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
                  className="relative rounded-xl shadow-lg p-6 text-center overflow-hidden"
                  style={{
                    background:
                      hoveredStat === index
                        ? `linear-gradient(135deg, ${stat.gradientFrom} 0%, ${stat.gradientTo} 100%)`
                        : `linear-gradient(135deg, ${stat.gradientFrom}CC 0%, ${stat.gradientTo}CC 100%)`,
                    transform: hoveredStat === index ? "translateY(-5px) scale(1.03)" : "translateY(0) scale(1)",
                    transition: "transform 0.3s ease, background 0.3s ease",
                  }}
                >
                  {/* Animated background circles */}
                  <div
                    className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-20"
                    style={{
                      background: `radial-gradient(circle, white 0%, transparent 70%)`,
                      transform: hoveredStat === index ? "translate(-10%, -30%) scale(1.2)" : "translate(10%, -50%)",
                      transition: "transform 0.5s ease",
                    }}
                  ></div>

                  <div
                    className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
                    style={{
                      background: `radial-gradient(circle, white 0%, transparent 70%)`,
                      transform: hoveredStat === index ? "translate(-20%, 20%) scale(1.2)" : "translate(-40%, 40%)",
                      transition: "transform 0.5s ease",
                    }}
                  ></div>

                  <motion.div
                    initial={{ scale: 1 }}
                    animate={{ scale: hoveredStat === index ? 1.1 : 1 }}
                    transition={{ type: "spring", stiffness: 300, damping: 10 }}
                    className="relative z-10 text-white"
                  >
                    <stat.icon className="mx-auto mb-4" size={36} />
                    <div className="text-4xl font-extrabold mb-2">{stat.value}</div>
                    <div className="text-lg opacity-90">{stat.label}</div>
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
