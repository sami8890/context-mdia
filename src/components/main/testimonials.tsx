"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import { Play, Pause, Volume2, VolumeX, ChevronLeft, ChevronRight, User, Maximize, Minimize, X } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useMobile } from "@/lib/use-mobile"

// Define types
type Testimonial = {
    id: string
    name: string
    role: string
    company: string
    videoId: string
    thumbnail: string
    rating?: number
}

type TestimonialCardProps = {
    testimonial: Testimonial
    isActive: boolean
    onPlay: () => void
    onClose: () => void
    isMuted: boolean
    setIsMuted: (muted: boolean) => void
}

// Sample testimonial data with YouTube IDs
const testimonials = [
    {
        id: "1",
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechGrowth Inc.",
        videoId: "dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=720&width=1280",
    },
    {
        id: "2",
        name: "Michael Chen",
        role: "Startup Founder",
        company: "InnovateLab",
        videoId: "dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=720&width=1280",
        rating: 5,
    },
    {
        id: "3",
        name: "Jessica Williams",
        role: "E-commerce Manager",
        company: "StyleHub",
        videoId: "dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=720&width=1280",
    },
    {
        id: "4",
        name: "David Rodriguez",
        role: "Sales Director",
        company: "GrowthForce",
        videoId: "dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=720&width=1280",
        rating: 5,
    },
    {
        id: "5",
        name: "Emma Thompson",
        role: "Content Creator",
        company: "CreativeMinds",
        videoId: "dQw4w9WgXcQ",
        thumbnail: "/placeholder.svg?height=720&width=1280",
        rating: 5,
    },
]

// Testimonial Video Card Component
const TestimonialCard = ({ testimonial, isActive, onPlay, onClose, isMuted, setIsMuted }: TestimonialCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const isInView = useInView(cardRef, { once: true, amount: 0.2 })
    const isMobile = useMobile()

    // Load YouTube video when active
    useEffect(() => {
        if (!videoRef.current || !isActive) return

        // Remove any existing iframe
        if (videoRef.current.querySelector("iframe")) {
            const iframe = videoRef.current.querySelector("iframe");
            if (iframe) {
                iframe.remove();
            }
            setVideoLoaded(false)
        }

        // Create YouTube iframe with proper parameters
        const iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&enablejsapi=1&playsinline=1`
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
                const iframe = videoRef.current.querySelector("iframe");
                if (iframe) {
                    iframe.remove();
                }
                setVideoLoaded(false)
            }
        }
    }, [isActive, testimonial.videoId, isMuted])

    // Toggle fullscreen
    const toggleFullscreen = useCallback(() => {
        if (!document.fullscreenElement && videoRef.current) {
            videoRef.current.requestFullscreen().catch((err: Error) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }, [])

    // Handle fullscreen change
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    return (
        <motion.div
            ref={cardRef}
            className="relative overflow-hidden transition-all duration-500 aspect-video w-full rounded-xl shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            {/* Video container */}
            <div ref={videoRef} className="absolute inset-0 bg-black rounded-xl overflow-hidden">
                {/* Thumbnail */}
                {!isActive && (
                    <Image
                        src={testimonial.thumbnail || "/placeholder.svg"}
                        alt={`Testimonial from ${testimonial.name}`}
                        fill
                        className={cn("object-cover transition-transform duration-700", isHovered ? "scale-105" : "scale-100")}
                        sizes="(max-width: 768px) 100vw, 500px"
                        priority
                    />
                )}

                {/* Gradient overlay */}
                {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    </div>
                )}

                {/* Video loading animation */}
                {isActive && !videoLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                        <div className="relative">
                            <svg className="w-16 h-16" viewBox="0 0 100 100">
                                <circle
                                    className="text-gray-700"
                                    strokeWidth="4"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="42"
                                    cx="50"
                                    cy="50"
                                />
                                <circle
                                    className="text-[#ff6b3d]"
                                    strokeWidth="4"
                                    strokeDasharray={264}
                                    strokeDashoffset={264 * (1 - 0.75)}
                                    strokeLinecap="round"
                                    stroke="currentColor"
                                    fill="transparent"
                                    r="42"
                                    cx="50"
                                    cy="50"
                                >
                                    <animate attributeName="stroke-dashoffset" from="264" to="0" dur="1.5s" repeatCount="indefinite" />
                                </circle>
                            </svg>
                        </div>
                    </div>
                )}
            </div>

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-20">
                {/* Top section with user info */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        {/* User avatar */}
                        <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white shadow-lg">
                            <User className="h-5 w-5 md:h-6 md:w-6" />
                        </div>

                        <div>
                            <h4 className="text-white font-bold text-sm md:text-base">{testimonial.name}</h4>
                            <p className="text-gray-300 text-xs md:text-xs truncate max-w-[150px] md:max-w-[200px]">
                                {testimonial.role} • {testimonial.company}
                            </p>
                        </div>
                    </div>

                    {/* Rating stars */}
                    {!isMobile && (
                        <div className="flex">
                            {Array.from({ length: 5 }).map((_, i) => (
                                <span
                                    key={i}
                                    className={cn(
                                        "text-lg md:text-xl",
                                        i < (testimonial.rating || 0) ? "text-[#ff6b3d]" : "text-gray-600",
                                    )}
                                >
                                    ★
                                </span>
                            ))}
                        </div>
                    )}
                </div>

                {/* Video controls */}
                <div className="flex items-center justify-between w-full">
                    {isActive ? (
                        <>
                            <div className="flex items-center gap-3">
                                {/* Play/Pause button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white shadow-lg hover:shadow-[#ff6b3d]/30 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                >
                                    <Pause className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                </motion.button>

                                {/* Mute button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setIsMuted(!isMuted)}
                                    className={cn(
                                        "w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-colors",
                                        isMuted ? "bg-gray-700/80 hover:bg-gray-600" : "bg-[#ff6b3d]/80 hover:bg-[#ff6b3d]",
                                    )}
                                >
                                    {isMuted ? (
                                        <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                                    ) : (
                                        <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                                    )}
                                </motion.button>
                            </div>

                            {/* Right side controls */}
                            <div className="flex items-center gap-2">
                                {/* Fullscreen button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={toggleFullscreen}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                                >
                                    {isFullscreen ? (
                                        <Minimize className="h-3 w-3 md:h-4 md:w-4" />
                                    ) : (
                                        <Maximize className="h-3 w-3 md:h-4 md:w-4" />
                                    )}
                                </motion.button>

                                {/* Close button */}
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={onClose}
                                    className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                                >
                                    <X className="h-3 w-3 md:h-4 md:w-4" />
                                </motion.button>
                            </div>
                        </>
                    ) : (
                        // Play button for inactive cards
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="absolute inset-0 flex items-center justify-center"
                        >
                            <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={onPlay}
                                className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-gradient-to-r from-[#ff6b3d]/90 to-[#ff4d00]/90 flex items-center justify-center shadow-lg shadow-[#ff6b3d]/30 overflow-hidden group"
                            >
                                {/* Animated background effect */}
                                <motion.div
                                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        x: ["0%", "100%"],
                                        opacity: [0, 0.5, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    }}
                                />
                                <Play className="h-8 w-8 md:h-10 md:w-10 text-white fill-white ml-1" />
                            </motion.button>
                        </motion.div>
                    )}
                </div>
            </div>

            {/* Animated border effect */}
            <motion.div
                className={cn(
                    "absolute inset-0 rounded-xl pointer-events-none",
                    isActive ? "border-2 border-[#ff6b3d]" : "border border-white/20",
                )}
                animate={
                    isHovered
                        ? {
                            boxShadow: [
                                "0 0 0 rgba(255, 107, 61, 0.3)",
                                "0 0 20px rgba(255, 107, 61, 0.5)",
                                "0 0 0 rgba(255, 107, 61, 0.3)",
                            ],
                        }
                        : {}
                }
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
            />
        </motion.div>
    )
}

export default function VideoTestimonials() {
    const controls = useAnimation()
    const ref = useRef(null)
    const rowRef = useRef(null)
    const inView = useInView(ref, { once: false, amount: 0.1 })
    const [activeVideoId, setActiveVideoId] = useState<string | null>(null)
    const [isMuted, setIsMuted] = useState(false)
    const [currentIndex, setCurrentIndex] = useState(0)
    const isMobile = useMobile()

    // Calculate visible items based on screen size
    const getVisibleItems = () => {
        if (isMobile) return 1
        return 3
    }

    const visibleItems = getVisibleItems()
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

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowLeft") {
                handlePrev()
            } else if (e.key === "ArrowRight") {
                handleNext()
            } else if (e.key === "Escape") {
                setActiveVideoId(null)
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => {
            window.removeEventListener("keydown", handleKeyDown)
        }
    }, [handleNext, handlePrev])

    // Animation controls
    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])


    return (
        <section className="relative w-full py-20 md:py-32 px-4 md:px-8 lg:px-16 bg-[#0c0c0c] overflow-hidden" ref={ref}>
            {/* Background elements */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                {/* Main gradient blob */}
                <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gradient-to-br from-[#ff6b3d]/10 to-[#ff4d00]/5 blur-[150px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gradient-to-tr from-[#ff4d00]/5 to-[#ff6b3d]/10 blur-[120px] rounded-full"></div>
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl">
                {/* Section header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16"
                >
                    {/* Animated badge */}
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-2 mb-6 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 hover:border-[#ff6b3d]/30 transition-colors"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 107, 61, 0.05)" }}
                    >
                        <motion.span
                            className="text-[#ff6b3d] text-sm"
                            aria-hidden="true"
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0],
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Number.POSITIVE_INFINITY,
                                repeatDelay: 3,
                            }}
                        >
                            ★
                        </motion.span>
                        <span className="text-gray-300 text-sm font-medium">Real Client Success Stories</span>
                    </motion.div>

                    <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 tracking-tight">
                        <span className="text-white">Client </span>
                        <motion.span
                            className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text inline-block"
                            animate={{
                                backgroundPosition: ["0% center", "100% center", "0% center"],
                            }}
                            transition={{
                                duration: 8,
                                repeat: Number.POSITIVE_INFINITY,
                                ease: "linear",
                            }}
                        >
                            Testimonials
                        </motion.span>
                    </h2>

                    <motion.p
                        className="text-gray-400 max-w-2xl mx-auto text-lg"
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.3 }}
                    >
                        Hear directly from our clients about their transformative experiences
                    </motion.p>
                </motion.div>

                {/* Testimonial Row with Navigation */}
                <div className="relative mb-16">
                    {/* Navigation buttons */}
                    <div className="flex justify-between absolute -left-4 -right-4 md:-left-8 md:-right-8 top-1/2 -translate-y-1/2 z-30 pointer-events-none">
                        <motion.button
                            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 107, 61, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center text-white shadow-lg pointer-events-auto overflow-hidden group",
                                currentIndex > 0
                                    ? "bg-gradient-to-r from-[#ff6b3d]/80 to-[#ff4d00]/80"
                                    : "bg-gray-800/50 cursor-not-allowed",
                            )}
                            onClick={handlePrev}
                            disabled={currentIndex === 0}
                            aria-label="Previous testimonials"
                        >
                            {/* Animated hover effect */}
                            {currentIndex > 0 && (
                                <motion.div
                                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        x: ["100%", "0%"],
                                        opacity: [0, 0.5, 0],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    }}
                                />
                            )}
                            <ChevronLeft className="h-6 w-6" />
                        </motion.button>

                        <motion.button
                            whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(255, 107, 61, 0.3)" }}
                            whileTap={{ scale: 0.95 }}
                            className={cn(
                                "w-12 h-12 rounded-full backdrop-blur-sm flex items-center justify-center text-white shadow-lg pointer-events-auto overflow-hidden group",
                                currentIndex < maxIndex
                                    ? "bg-gradient-to-r from-[#ff6b3d]/80 to-[#ff4d00]/80"
                                    : "bg-gray-800/50 cursor-not-allowed",
                            )}
                            onClick={handleNext}
                            disabled={currentIndex >= maxIndex}
                            aria-label="Next testimonials"
                        >
                            {/* Animated hover effect */}
                            {currentIndex < maxIndex && (
                                <motion.div
                                    className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                    animate={{
                                        x: ["-100%", "0%"],
                                        opacity: [0, 0.5, 0],
                                    }}
                                    transition={{
                                        duration: 1,
                                        repeat: Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                    }}
                                />
                            )}
                            <ChevronRight className="h-6 w-6" />
                        </motion.button>
                    </div>

                    {/* Testimonial cards row */}
                    <motion.div
                        ref={rowRef}
                        className="grid grid-cols-1 md:grid-cols-3 gap-6"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
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
                    </motion.div>

                    {/* Pagination indicators */}
                    <div className="flex justify-center mt-8 gap-2">
                        {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                            <motion.button
                                key={index}
                                className={cn(
                                    "h-2 rounded-full transition-all duration-300",
                                    index === currentIndex
                                        ? "bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] w-8"
                                        : "bg-gray-700 hover:bg-gray-600 w-2",
                                )}
                                whileHover={{ scale: 1.2 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => {
                                    setCurrentIndex(index)
                                    setActiveVideoId(null)
                                }}
                                aria-label={`Go to page ${index + 1}`}
                            />
                        ))}
                    </div>

                    {/* Keyboard navigation hint */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1, duration: 0.5 }}
                        className="text-center mt-4 text-gray-500 text-sm"
                    >
                        <span className="hidden md:inline-block">Use arrow keys to navigate</span>
                    </motion.div>
                </div>

                {/* Call to action */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-center"
                >
                    <motion.button
                        className="px-8 py-4 rounded-full bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-white font-medium text-lg hover:shadow-lg hover:shadow-[#ff6b3d]/20 transition-all relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <span className="relative z-10">Schedule a Consultation</span>
                        <motion.div
                            className="absolute inset-0 bg-white/20 z-0"
                            initial={{ x: "-100%", opacity: 0 }}
                            whileHover={{ x: "100%", opacity: 0.3 }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>
                </motion.div>
            </div>
        </section>
    )
}
