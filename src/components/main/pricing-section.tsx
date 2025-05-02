"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Check, Sparkles, Info, Star, Rocket, Crown, ArrowRight } from "lucide-react"

interface PricingTier {
  name: string
  icon: React.ReactNode
  emoji: string
  price: number
  description: string
  features: string[]
  highlighted?: boolean
  badge?: string
  ctaText: string
  note?: string
}

const pricingTiers: PricingTier[] = [
  {
    name: "Starter Plan",
    emoji: "🌱",
    icon: <Star className="h-6 w-6 text-[#4ade80]" />,
    price: 600,
    description: "Best for Beginners",
    features: [
      "15 Reels (short-form videos)",
      "Personalized Video Branding",
      "Engaging animations & motion graphics",
      "Subtitles/Captions",
      "Monthly Performance Overview",
    ],
    note: "No scripting or content ideation included.",
    ctaText: "Book a Call",
    badge: "Best for Beginners",
  },
  {
    name: "Growth Plan",
    emoji: "🚀",
    icon: <Rocket className="h-6 w-6 text-[#ff6b3d]" />,
    price: 1500,
    description: "Designed for creators ready to grow across platforms",
    features: [
      "30 Reels (short-form videos)",
      "Personalized Video Branding",
      "Custom Landing Page",
      "1 Video Sales Letter (VSL)",
      "4 Long-form videos (YouTube, Facebook, etc.)",
      "High-quality video editing with animations & motion graphics",
      "Subtitles/Captions",
      "Weekly Performance Report + Adjustments",
    ],
    highlighted: true,
    badge: "Most Popular",
    note: "No scripting or content ideation included.",
    ctaText: "Book a Call",
  },
  {
    name: "Elite Creator Plan",
    emoji: "👑",
    icon: <Crown className="h-6 w-6 text-[#fbbf24]" />,
    price: 3000,
    description: "High-End Package for Authority Building",
    features: [
      "Onboarding Call (1st Month)",
      "60 Reels (short-form videos)",
      "Personalized Video Branding",
      "4 VSL Creation (You provide the script idea)",
      "8 Long-form videos",
      "Clean, Professional Video Editing",
      "Engaging animations & motion graphics",
      "Subtitles/Captions",
      "Weekly Performance Reports + Strategic Adjustments",
    ],
    badge: "Authority Building",
    note: "No scripting or content ideation included.",
    ctaText: "Book a Call",
  },
]

export default function PricingSection() {
  const [, setIsMobile] = useState(false)
  const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.2 })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkMobile()
    window.addEventListener("resize", checkMobile)

    return () => {
      window.removeEventListener("resize", checkMobile)
    }
  }, [])

  const openCalendly = () => {
    setIsCalendlyOpen(true)
    // Load Calendly script dynamically
    const script = document.createElement("script")
    script.src = "https://assets.calendly.com/assets/external/widget.js"
    script.async = true
    document.body.appendChild(script)
  }

  const closeCalendly = () => {
    setIsCalendlyOpen(false)
  }

  return (
    <section
      id="pricing"
      className="relative w-full py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c] overflow-hidden"
      ref={ref}
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[150px] rounded-full"></div>
        <div className="absolute bottom-0 right-1/4 w-1/4 h-1/4 bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>
        <div className="absolute top-1/2 right-1/4 w-1/5 h-1/5 bg-[#ff6b3d]/3 blur-[180px] rounded-full"></div>
      </div>

      <div className="container relative z-10 mx-auto max-w-7xl">
        {/* Section header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={controls}
            variants={{
              visible: { opacity: 1, y: 0 },
              hidden: { opacity: 0, y: 20 },
            }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              <span className="text-white">Choose Your </span>
              <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text inline-block">
                Content Plan
              </span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">
              Professional video content creation services tailored to your growth stage
            </p>
          </motion.div>
        </div>

        {/* Pricing cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-12">
          {pricingTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: 0.1 * index }}
              className={`relative rounded-2xl overflow-hidden ${tier.highlighted ? "md:-mt-4 md:mb-4 md:pt-4 md:pb-4" : ""
                }`}
            >
              {/* Highlight border effect for featured plan */}
              {tier.highlighted && (
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-b from-[#ff6b3d] to-[#ff4d00] p-[2px]">
                  <div className="absolute inset-0 rounded-2xl bg-[#0f0f0f]"></div>
                </div>
              )}

              <div
                className={`relative h-full flex flex-col p-6 sm:p-8 bg-[#0f0f0f] backdrop-blur-sm rounded-2xl border ${tier.highlighted ? "border-[#ff6b3d]/50 shadow-xl shadow-[#ff6b3d]/10" : "border-white/10 shadow-lg"
                  }`}
              >
                {/* Badge */}
                {tier.badge && (
                  <div className="absolute -top-1 -right-1">
                    <div className="relative">
                      <div className="absolute inset-0 blur-sm bg-[#ff6b3d]/70 rounded-bl-xl rounded-tr-xl"></div>
                      <div
                        className={`relative px-3 py-1 text-xs font-bold text-white rounded-bl-xl rounded-tr-xl ${tier.highlighted ? "bg-[#ff6b3d]" : "bg-[#ff6b3d]/80"
                          }`}
                      >
                        {tier.badge}
                      </div>
                    </div>
                  </div>
                )}

                {/* Plan name */}
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-2xl">{tier.emoji}</span>
                  <h3 className="text-xl sm:text-2xl font-bold text-white flex items-center">
                    {tier.name}
                    {tier.highlighted && <Sparkles className="h-5 w-5 ml-2 text-[#ff6b3d]" />}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-gray-300 text-sm font-medium mb-4">🎯 {tier.description}</p>

                {/* Price */}
                <div className="mb-6 bg-black/20 p-3 rounded-xl border border-white/5">
                  <div className="flex items-baseline justify-center">
                    <span className="text-3xl sm:text-4xl font-bold text-white">${tier.price}</span>
                    <span className="text-gray-400 ml-2 text-sm">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-3 mb-8 flex-grow">
                  {tier.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start">
                      <Check className="h-5 w-5 text-[#ff6b3d] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {tier.note && (
                  <div className="mb-6 p-3 bg-white/5 rounded-lg border border-white/10">
                    <p className="text-sm text-gray-400 flex items-start">
                      <Info className="h-4 w-4 mr-2 flex-shrink-0 mt-0.5 text-[#ff6b3d]" />
                      <span>📌 {tier.note}</span>
                    </p>
                  </div>
                )}

                {/* CTA Button */}
                <motion.button
                  onClick={openCalendly}
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3 px-4 rounded-xl font-medium text-white transition-all duration-300 flex items-center justify-center gap-2 ${tier.highlighted
                      ? "bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:shadow-lg hover:shadow-[#ff6b3d]/20"
                      : "bg-white/10 hover:bg-white/15 border border-white/10"
                    }`}
                >
                  {tier.ctaText}
                  <ArrowRight className="h-4 w-4" />
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>

      
      </div>

      {/* Calendly Modal */}
      {isCalendlyOpen && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative w-full max-w-4xl h-[700px] bg-white rounded-xl overflow-hidden">
            <button
              onClick={closeCalendly}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
            >
              ✕
            </button>
            <div
              className="calendly-inline-widget w-full h-full"
              data-url="https://calendly.com/contexmedia/contexmedia-discovery-call"
              style={{ minWidth: "320px", height: "700px" }}
            ></div>
          </div>
        </div>
      )}
    </section>
  )
}
