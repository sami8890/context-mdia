"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useInView } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

// Define types
type Testimonial = {
    id: string
    name: string
    role: string
    company: string
    videoId: string
    thumbnail: string
}

type TestimonialCardProps = {
    testimonial: Testimonial
    isActive: boolean
    onPlay: () => void
    onClose: () => void
    isMuted: boolean
    setIsMuted: (muted: boolean) => void
}

// Testimonial data with YouTube IDs
const testimonials = [
    {
        id: "1",
        name: "Client Testimonial 1",
        role: "Satisfied Customer",
        company: "Company Name",
        videoId: "TK1Zd3rJhmQ",
        thumbnail: `https://i.ytimg.com/vi/TK1Zd3rJhmQ/hqdefault.jpg`,
    },
    {
        id: "2",
        name: "Client Testimonial 2",
        role: "Satisfied Customer",
        company: "Company Name",
        videoId: "EDdMIA5piBw",
        thumbnail: `https://i.ytimg.com/vi/EDdMIA5piBw/hqdefault.jpg`,
    },
    {
        id: "3",
        name: "Client Testimonial 3",
        role: "Satisfied Customer",
        company: "Company Name",
        videoId: "QoihxtDAGi4",
        thumbnail: `https://i.ytimg.com/vi/QoihxtDAGi4/hqdefault.jpg`,
    },
]

// Loading spinner component
const LoadingSpinner = () => (
    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
        <div className="w-8 h-8 border-4 border-[#ff6b3d]/30 border-t-[#ff6b3d] rounded-full animate-spin"></div>
    </div>
)

// Testimonial Video Card Component
const TestimonialCard = ({ testimonial, isActive, onPlay, onClose, isMuted, setIsMuted }: TestimonialCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [imageLoaded, setImageLoaded] = useState(false)
    const isInView = useInView(cardRef, { once: true, amount: 0.2 })

    // Load YouTube video when active
    useEffect(() => {
        if (!videoRef.current || !isActive) return

        // Remove any existing iframe
        if (videoRef.current.querySelector("iframe")) {
            const iframe = videoRef.current.querySelector("iframe")
            if (iframe) {
                iframe.remove()
            }
            setVideoLoaded(false)
        }

        // Create YouTube iframe
        const iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&playsinline=1`
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        iframe.setAttribute("allowfullscreen", "true")
        iframe.className = "absolute inset-0 w-full h-full z-10"
        iframe.style.border = "0"
        iframe.onload = () => setVideoLoaded(true)

        // Append the iframe to the container
        videoRef.current.appendChild(iframe)

        return () => {
            if (videoRef.current?.querySelector("iframe")) {
                const iframe = videoRef.current.querySelector("iframe")
                if (iframe) {
                    iframe.remove()
                }
                setVideoLoaded(false)
            }
        }
    }, [isActive, testimonial.videoId, isMuted])

    return (
        <motion.div
            ref={cardRef}
            className="relative overflow-hidden transition-all duration-300 aspect-video w-full rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
        >
            {/* Video container */}
            <div ref={videoRef} className="absolute inset-0 bg-black rounded-xl overflow-hidden">
                {/* Thumbnail */}
                {!isActive && (
                    <>
                        {!imageLoaded && (
                            <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                                <div className="w-8 h-8 border-4 border-[#ff6b3d]/30 border-t-[#ff6b3d] rounded-full animate-spin"></div>
                            </div>
                        )}
                        <img
                            src={testimonial.thumbnail || "/placeholder.svg"}
                            alt={`Testimonial from ${testimonial.name}`}
                            className={cn(
                                "absolute inset-0 w-full h-full object-cover transition-transform duration-500",
                                isHovered ? "scale-105" : "scale-100",
                                imageLoaded ? "opacity-100" : "opacity-0",
                            )}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </>
                )}

                {/* Gradient overlay */}
                {!isActive && <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30"></div>}

                {/* Video loading animation */}
                {isActive && !videoLoaded && <LoadingSpinner />}
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 flex flex-col justify-between z-20">
                {/* Top section with info */}
                {!isActive && (
                    <div className="flex items-center gap-3">
                        <div>
                            <h4 className="text-white font-bold text-sm md:text-base">{testimonial.name}</h4>
                            <p className="text-gray-300 text-xs">
                                {testimonial.role} • {testimonial.company}
                            </p>
                        </div>
                    </div>
                )}

                {/* Video controls */}
                {isActive && (
                    <div className="mt-auto flex items-center gap-3">
                        {/* Play/Pause button */}
                        <button
                            onClick={onClose}
                            className="w-8 h-8 rounded-full bg-[#ff6b3d] flex items-center justify-center text-white shadow-lg"
                            aria-label="Pause"
                        >
                            <Pause className="h-4 w-4" />
                        </button>

                        {/* Mute button */}
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className={cn(
                                "w-7 h-7 rounded-full flex items-center justify-center text-white shadow-lg",
                                isMuted ? "bg-gray-700" : "bg-[#ff6b3d]",
                            )}
                            aria-label={isMuted ? "Unmute" : "Mute"}
                        >
                            {isMuted ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                        </button>
                    </div>
                )}

                {/* Play button for inactive cards */}
                {!isActive && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            onClick={onPlay}
                            className="w-14 h-14 rounded-full bg-[#ff6b3d]/90 flex items-center justify-center shadow-lg"
                            aria-label="Play"
                        >
                            <Play className="h-7 w-7 text-white fill-white ml-1" />
                        </button>
                    </div>
                )}
            </div>
        </motion.div>
    )
}

export default function VideoTestimonials() {
    const ref = useRef(null)
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
    const [isMuted, setIsMuted] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)

    // Calculate visible items based on screen size
    const getVisibleItems = () => {
        if (typeof window !== "undefined") {
            return window.innerWidth < 768 ? 1 : 3
        }
        return 3
    }

    const [visibleItems, setVisibleItems] = useState(3)

    useEffect(() => {
        const handleResize = () => {
            setVisibleItems(getVisibleItems())
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    const maxIndex = Math.max(0, testimonials.length - visibleItems)

    // Handle navigation
    const handlePrev = useCallback(() => {
        setCurrentIndex((prev) => Math.max(0, prev - 1))
        setActiveVideoId(null)
    }, [])

    const handleNext = useCallback(() => {
        setCurrentIndex((prev) => Math.min(maxIndex, prev + 1))
        setActiveVideoId(null)
    }, [maxIndex])

    // Handle video play/pause
    const handleVideoPlay = useCallback((id: string) => {
        setActiveVideoId(id)
    }, [])

    // Handle video close
    const handleVideoClose = useCallback(() => {
        setActiveVideoId(null)
    }, [])

    return (
        <section className="relative w-full py-16 px-4 bg-[#0c0c0c]" ref={ref}>
            <div className="container mx-auto max-w-6xl">
                {/* Section header */}
                <div className="text-center mb-12">
                    <h2 className="text-4xl font-bold mb-4">
                        <span className="text-white">Client </span>
                        <span className="text-[#ff6b3d]">Testimonials</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">Hear directly from our clients about their experiences</p>
                </div>

                {/* Testimonial Row with Navigation */}
                <div className="relative mb-8">
                    {/* Navigation buttons */}
                    <div className="flex justify-between absolute -left-4 -right-4 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <button
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto",
                                currentIndex > 0 ? "bg-[#ff6b3d]" : "bg-gray-800/50 cursor-not-allowed",
                            )}
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            aria-label="Previous testimonials"
                        >
                            <ChevronLeft className="h-5 w-5" />
                        </button>

                        <button
                            className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto",
                                currentIndex < maxIndex ? "bg-[#ff6b3d]" : "bg-gray-800/50 cursor-not-allowed",
                            )}
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            aria-label="Next testimonials"
                        >
                            <ChevronRight className="h-5 w-5" />
                        </button>
                    </div>

                    {/* Testimonial cards row */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {testimonials.slice(currentIndex, currentIndex + visibleItems).map((testimonial) => (
                            <TestimonialCard
                                key={testimonial.id}
                                testimonial={testimonial}
                                isActive={activeVideoId === testimonial.id}
                                onPlay={() => handleVideoPlay(testimonial.id)}
                                onClose={handleVideoClose}
                                isMuted={isMuted}
                                setIsMuted={setIsMuted}
                            />
                        ))}
                    </div>

                    {/* Pagination indicators */}
                    <div className="flex justify-center mt-6 gap-2">
                        {Array.from({ length: Math.ceil(testimonials.length / visibleItems) }).map((_, index) => (
                            <button
                                key={index}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    index === Math.floor(currentIndex / visibleItems) ? "bg-[#ff6b3d] w-8" : "bg-gray-700 w-2",
                                )}
                                onClick={() => {
                                    setCurrentIndex(index * visibleItems)
                                    setActiveVideoId(null)
                                }}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
