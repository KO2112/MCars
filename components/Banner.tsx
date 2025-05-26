"use client"

import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { ArrowRight, Star, Phone } from "lucide-react"

export default function Banner() {
  return (
    <div className="relative h-[400px] sm:h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Background Image */}
      <Image src="/m3.jpg" alt="Dealership Banner" fill priority className="object-cover object-center" />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/70 to-blue-900/40 sm:from-blue-900/80 sm:via-blue-800/60 sm:to-transparent"></div>

      {/* Animated Background Elements - Hidden on mobile for better performance */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="absolute top-20 right-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-20 w-80 h-80 bg-blue-300/10 rounded-full blur-3xl animate-pulse animation-delay-2000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            {/* Main Heading */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-4 sm:mb-6"
            >
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="text-blue-200 text-sm sm:text-lg font-medium mb-2 sm:mb-4 flex items-center"
              >
                <Star className="mr-2" size={16} />
                Leicesters Premier Auto Dealership
              </motion.p>

              <motion.h1
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              >
                Welcome to{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-100">
                  IRON AUTO
                </span>
              </motion.h1>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
              className="text-base sm:text-xl md:text-2xl text-blue-100 mb-6 sm:mb-8 leading-relaxed"
            >
              Discover your perfect vehicle from our premium collection. Quality cars, exceptional service, and
              unbeatable value.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-8 sm:mb-12"
            >
              <Link
                href="/cars"
                className="group bg-white text-blue-800 px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
              >
                Browse Our Cars
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={18} />
              </Link>

              <Link
                href="/contact"
                className="group bg-blue-600/20 backdrop-blur-sm border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-lg font-bold text-base sm:text-lg hover:bg-white/10 transition-all duration-300 flex items-center justify-center hover:scale-105 active:scale-95"
              >
                Contact Us
                <Phone className="ml-2 group-hover:rotate-12 transition-transform" size={18} />
              </Link>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1, duration: 0.6 }}
              className="grid grid-cols-3 gap-3 sm:gap-6"
            >
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 text-center">
                <div className="text-lg sm:text-2xl font-bold text-white mb-1">Trusted Local Dealership</div>
                <div className="text-blue-200 text-xs sm:text-sm">We promise %100 honesty throughout your purchace</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 text-center">
                <div className="text-lg sm:text-2xl font-bold text-white mb-1">Exceptional Value & Service</div>
                <div className="text-blue-200 text-xs sm:text-sm">We provide quality vehicles and maintenance service</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3 sm:p-4 border border-white/20 text-center">
                <div className="text-lg sm:text-2xl font-bold text-white mb-1">Part Exchance Accepted</div>
                <div className="text-blue-200 text-xs sm:text-sm">We offer part exchange to your any vehicle</div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator - Hidden on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-bounce"></div>
        </div>
      </motion.div>

      <style jsx>{`
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  )
}
