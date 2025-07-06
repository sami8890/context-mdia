"use client"

import { ArrowRight } from "lucide-react"
import { motion } from "framer-motion"

const services = [
    {
        number: "01",
        title: "YouTube & LinkedIn videos  ",
        description: "YouTube videos made more engaging than ever for longer watch time and more subscribers.",
        icon: "/placeholder.svg?height=40&width=40",
    },
    {
        number: "02",
        title: "Short Form Videos",
        description: "Nail your Reels, TikToks and YouTube shorts to optimize engagement and shareability.",
        icon: "/placeholder.svg?height=40&width=40",
    },
    {
        number: "03",
        title: "Podcast Editing",
        description: "Podcasts edited to perfection for clear sound, engaging flow, and a loyal audience.",
        icon: "/placeholder.svg?height=40&width=40",
    },
    {
        number: "04",
        title: "Ad Creatives & VSLs",
        description: "High-Converting ad creatives and VSLs crafted to grab attention, drive action, and boost sales.",
        icon: "/placeholder.svg?height=40&width=40",
    },
]

export default function ServicesSection() {
    return (
        <section className="relative w-full py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]">
            {/* Background elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[120px] rounded-full"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#ff4d00]/5 blur-[100px] rounded-full"></div>
            </div>

            <div className="container relative z-10 mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold">
                        <span className="text-white">How can we </span>
                        <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
                            help you?
                        </span>
                    </h2>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {services.map((service, index) => (
                        <motion.div
                            key={service.number}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="group relative bg-gradient-to-br from-[#1a1a1a] to-[#232323] rounded-xl p-6 border border-gray-800/50 hover:border-[#ff6b3d]/30 transition-all duration-300"
                        >
                            <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[40px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                            <div className="flex justify-between items-start mb-4">
                                <span className="text-[#ff6b3d] text-lg font-bold">{service.number}</span>
                               
                            </div>

                            <h3 className="text-white text-xl font-bold mb-2">{service.title}</h3>
                            <p className="text-gray-400 text-sm">{service.description}</p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}

