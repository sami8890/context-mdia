"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight, CheckCircle } from "lucide-react"
import { motion } from "framer-motion"

export default function Hero() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <section
      id="home"
      className="relative w-full pt-32 pb-20 md:pt-40 md:pb-28 lg:pt-48 lg:pb-36 px-4 md:px-8 lg:px-16 overflow-hidden"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[#0c0c0c] z-0">
        <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-br from-[#0c0c0c] via-[#1a1a1a] to-[#0c0c0c]"></div>
        <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[#ff6b3d]/5 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#ff4d00]/5 blur-[100px] rounded-full"></div>
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('/placeholder.svg?height=20&width=20')] bg-[length:40px_40px] bg-repeat opacity-[0.03] z-0"></div>

      <div className="container relative z-10 mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center text-center mb-4"
        >
          <div className="inline-block px-4 py-1.5 mb-2 bg-gradient-to-r from-[#ff6b3d]/10 to-[#ff4d00]/10 rounded-full backdrop-blur-sm border border-[#ff6b3d]/20">
            <span className="text-sm font-medium bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
              Content Creation Made Simple
            </span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight text-center">
            <span className="bg-gradient-to-r from-white to-gray-300 text-transparent bg-clip-text">
              You Record the Content,
            </span>
            <br />
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
                We Handle the Rest
              </span>
              <svg
                className="absolute -bottom-4 left-0 right-0 mx-auto w-48 md:w-64 h-3 text-[#ff6b3d]/30"
                viewBox="0 0 200 8"
                preserveAspectRatio="none"
              >
                <path d="M0,5 C50,0 150,0 200,5" stroke="currentColor" strokeWidth="3" fill="none" />
              </svg>
            </span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h2 className="text-xl md:text-2xl lg:text-3xl text-gray-300 font-light mb-8 max-w-3xl mx-auto text-center leading-relaxed">
            Turning Your Views into <span className="font-medium text-white">Paying Customers</span> on Autopilot
          </h2>

          <div className="flex flex-wrap justify-center gap-x-8 gap-y-3 mb-12 text-sm text-gray-400">
           
           
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row gap-5 justify-center"
        >
          <Button
            className="group bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:opacity-90 text-white rounded-full px-10 py-7 text-lg shadow-lg shadow-[#ff6b3d]/10 font-medium relative overflow-hidden w-full lg:w-1/3"
            asChild
          >
            <Link href="#contact" className="flex items-center justify-center">
              <span className="relative z-10">Book Call</span>
              <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
              <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
            </Link>
          </Button>

          <Button
            variant="outline"
            className="group text-white hover:text-[#ff6b3d] border border-gray-700 hover:border-[#ff6b3d] rounded-full px-8 py-7 text-lg bg-[#ffffff0a] backdrop-blur-sm hover:bg-[#ffffff0f] w-full lg:w-1/3"
            asChild
          >
            <Link href="#services" className="flex items-center justify-center">
              <span>Learn More</span>
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
