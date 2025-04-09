"use client"

import { useState, useEffect } from "react"
import { Calendar, Clock, Video, ArrowRight } from "lucide-react"
import { motion, useAnimation } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Button } from "@/components/ui/button"

export default function BookCallSection() {
    const [isCalendlyOpen, setIsCalendlyOpen] = useState(false)
    const controls = useAnimation()
    const ref = useRef(null)
    const inView = useInView(ref, { once: true })

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

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
        <section id="book-call" className="relative w-full py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]" ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#ff4d00]/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Left Column - Text Content */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={controls}
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 30 },
                        }}
                        transition={{ duration: 0.6 }}
                        className="lg:pr-12"
                    >
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">
                            <span className="text-white">Book your </span>
                            <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
                                Free Call
                            </span>
                        </h2>

                        <p className="text-gray-300 text-lg mb-8">
                            Schedule a free 30-minute consultation with our experts to discuss your content needs and how we can help
                            you grow your audience.
                        </p>

                        <div className="space-y-6 mb-8">
                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#ff6b3d]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Calendar className="h-5 w-5 text-[#ff6b3d]" />
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">Choose a convenient time</h3>
                                    <p className="text-gray-400">Select from our available slots that work best for your schedule.</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#ff6b3d]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Clock className="h-5 w-5 text-[#ff6b3d]" />
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">30-minute strategy session</h3>
                                    <p className="text-gray-400">
                                        We'll discuss your goals, challenges, and create a tailored plan for your content.
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="w-12 h-12 rounded-full bg-[#ff6b3d]/10 flex items-center justify-center flex-shrink-0 mt-1">
                                    <Video className="h-5 w-5 text-[#ff6b3d]" />
                                </div>
                                <div>
                                    <h3 className="text-white text-lg font-medium mb-1">Video conference details</h3>
                                    <p className="text-gray-400">You'll receive all meeting details immediately after booking.</p>
                                </div>
                            </div>
                        </div>

                        <Button
                            onClick={openCalendly}
                            className="group bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:opacity-90 text-white rounded-full px-8 py-7 text-lg shadow-lg shadow-[#ff6b3d]/10 font-medium relative overflow-hidden w-full md:w-auto"
                        >
                            <span className="relative z-10">Book Your Free Call Now</span>
                            <ArrowRight className="ml-2 h-5 w-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-10 transition-opacity"></div>
                        </Button>
                    </motion.div>

                    {/* Right Column - Calendar Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={controls}
                        variants={{
                            visible: { opacity: 1, y: 0 },
                            hidden: { opacity: 0, y: 30 },
                        }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="relative rounded-2xl overflow-hidden border border-gray-800 shadow-2xl shadow-black/30">
                            <div className="absolute top-0 right-0 bg-gradient-to-bl from-[#ff6b3d] to-[#6366f1] text-white px-4 py-2 rounded-bl-lg text-sm font-medium z-10">
                                Complimentary
                            </div>

                            <div className="bg-[#121212] p-6 border-b border-gray-800">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-full bg-[#0c0c0c] flex items-center justify-center overflow-hidden">
                                        <span className="text-[#ff6b3d] text-lg font-bold">CM</span>
                                    </div>
                                    <div>
                                        <h3 className="text-white text-lg font-medium">Contex media</h3>
                                        <p className="text-gray-400 text-sm">Book Your 1-1 Call With us</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400 text-sm">
                                    <Clock className="h-4 w-4" />
                                    <span>30 min</span>
                                </div>
                            </div>

                            <div className="bg-white p-6">
                                <h4 className="text-gray-800 font-medium mb-4">Select a Date & Time</h4>

                                <div className="flex justify-between items-center mb-4">
                                    <span className="text-gray-600 text-sm">April 2025</span>
                                    <div className="flex gap-2">
                                        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <ArrowRight className="h-4 w-4 text-gray-600 rotate-180" />
                                        </button>
                                        <button className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                                            <ArrowRight className="h-4 w-4 text-gray-600" />
                                        </button>
                                    </div>
                                </div>

                                <div className="grid grid-cols-7 gap-2 mb-4">
                                    {["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"].map((day) => (
                                        <div key={day} className="text-center text-xs text-gray-500 font-medium">
                                            {day}
                                        </div>
                                    ))}

                                    {[...Array(30)].map((_, i) => {
                                        const day = i + 1
                                        const isSelected = day === 21
                                        const isAvailable = [10, 11, 12, 13, 17, 18, 19, 21, 24, 25].includes(day)

                                        return (
                                            <div
                                                key={i}
                                                className={`text-center py-2 text-sm rounded-full ${isSelected
                                                        ? "bg-[#ff6b3d] text-white"
                                                        : isAvailable
                                                            ? "hover:bg-gray-100 text-gray-800 cursor-pointer"
                                                            : "text-gray-300"
                                                    }`}
                                            >
                                                {day}
                                            </div>
                                        )
                                    })}
                                </div>

                                <div className="text-center text-gray-500 text-sm">
                                    <p>Click on an available day to view times</p>
                                </div>
                            </div>
                        </div>

                        {/* Decorative elements */}
                        <div className="absolute -top-6 -right-6 w-32 h-32 bg-[#ff6b3d]/10 rounded-full blur-2xl"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-[#6366f1]/10 rounded-full blur-2xl"></div>
                    </motion.div>
                </div>
            </div>

            {/* Calendly Modal */}
            {isCalendlyOpen && (
                <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
                    <div className="relative w-full max-w-4xl h-[80vh] bg-white rounded-xl overflow-hidden">
                        <button
                            onClick={closeCalendly}
                            className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-black/20 flex items-center justify-center text-white hover:bg-black/40 transition-colors"
                        >
                            ✕
                        </button>
                        <div
                            className="calendly-inline-widget w-full h-full"
                            data-url="https://calendly.com/contexmedia/30min"
                            style={{ minWidth: "320px" }}
                        ></div>
                    </div>
                </div>
            )}
        </section>
    )
}

