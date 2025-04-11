"use client"

import { useRef, useEffect, useState, useCallback } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import {
    Play,
    Pause,
    Volume2,
    VolumeX,
    ChevronLeft,
    ChevronRight,
    User,
    Maximize,
    Minimize,
    X,
    Info,
    Share2,
    Clock,
    ExternalLink,
} from "lucide-react"
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
    description?: string
    category?: string
    duration?: string
}

type TestimonialCardProps = {
    testimonial: Testimonial
    isActive: boolean
    onPlay: () => void
    onClose: () => void
    isMuted: boolean
    setIsMuted: (muted: boolean) => void
    priority?: boolean
}

// Sample testimonial data with YouTube IDs
const testimonials = [
    {
        id: "1",
        name: "Sarah Johnson",
        role: "Marketing Director",
        company: "TechGrowth Inc.",
        videoId: "",
        thumbnail: `https://i.ytimg.com/vi//hqdefault.jpg`,
        description:
            "Working with this team transformed our marketing strategy completely. We saw a 40% increase in engagement within the first month.",
        category: "Marketing",
        duration: "2:45",
    },
    {
        id: "2",
        name: "Michael Chen",
        role: "Startup Founder",
        company: "InnovateLab",
        videoId: "pkj",
        thumbnail: `https://i.ytimg.com/vi//hqdefault.jpg`,
        rating: 5,
        description:
            "The insights and strategies provided helped us secure our Series A funding. Couldn't have done it without their expertise.",
        category: "Startup",
        duration: "3:12",
    },
    {
        id: "3",
        name: "Jessica Williams",
        role: "E-commerce Manager",
        company: "StyleHub",
        videoId: "",
        thumbnail: `https://i.ytimg.com/vi//hqdefault.jpg`,
        description:
            "Our online sales increased by 75% after implementing the recommended changes. The ROI has been incredible.",
        category: "E-commerce",
        duration: "1:58",
    },
    {
        id: "4",
        name: "David Rodriguez",
        role: "Sales Director",
        company: "GrowthForce",
        videoId: "",
        thumbnail: `https://i.ytimg.com/vi//hqdefault.jpg`,
        rating: 5,
        description:
            "The sales framework we developed together has become our company's secret weapon. Our team's performance has never been better.",
        category: "Sales",
        duration: "2:34",
    },
    {
        id: "5",
        name: "Emma Thompson",
        role: "Content Creator",
        company: "CreativeMinds",
        videoId: "",
        thumbnail: `https://i.ytimg.com/vi//hqdefault.jpg`,
        rating: 5,
        description:
            "The content strategy we built together helped me grow my audience from 10K to over 500K followers in just six months.",
        category: "Content",
        duration: "3:05",
    },
]

// Progress bar component for video playback
const ProgressBar = ({ progress = 0 }: { progress: number }) => {
    return (
        <div className="w-full h-1 bg-gray-700 rounded-full overflow-hidden">
            <motion.div
                className="h-full bg-[#ff6b3d]"
                initial={{ width: 0 }}
                animate={{ width: `${progress * 100}%` }}
                transition={{ ease: "linear" }}
            />
        </div>
    )
}

// Enhanced loading animation
const LoadingSpinner = () => (
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
            <div className="absolute inset-0 flex items-center justify-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    className="text-[#ff6b3d] text-xs font-medium"
                >
                    Loading
                </motion.div>
            </div>
        </div>
    </div>
)

// Rating stars component
const RatingStars = ({ rating = 0, size = "md" }: { rating: number; size?: "sm" | "md" | "lg" }) => {
    const sizeClasses = {
        sm: "text-sm",
        md: "text-lg md:text-xl",
        lg: "text-xl md:text-2xl",
    }

    return (
        <div className="flex">
            {Array.from({ length: 5 }).map((_, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className={cn(sizeClasses[size], i < rating ? "text-[#ff6b3d]" : "text-gray-600")}
                >
                    ★
                </motion.span>
            ))}
        </div>
    )
}

// Testimonial Video Card Component
const TestimonialCard = ({
    testimonial,
    isActive,
    onPlay,
    onClose,
    isMuted,
    setIsMuted,
}: TestimonialCardProps) => {
    const cardRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [videoLoaded, setVideoLoaded] = useState(false)
    const [showControls, setShowControls] = useState(true)
    const [showInfo, setShowInfo] = useState(false)
    const [videoProgress, setVideoProgress] = useState(0)
    const [imageLoaded, setImageLoaded] = useState(false)
    const isInView = useInView(cardRef, { once: true, amount: 0.2 })
    const isMobile = useMobile()

    // Simulate video progress
    useEffect(() => {
        if (!isActive) {
            setVideoProgress(0)
            return
        }

        const interval = setInterval(() => {
            setVideoProgress((prev) => {
                const newProgress = prev + 0.01
                return newProgress > 1 ? 1 : newProgress
            })
        }, 300)

        return () => clearInterval(interval)
    }, [isActive])

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

        // Create YouTube iframe with proper parameters
        const iframe = document.createElement("iframe")
        iframe.src = `https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&controls=1&modestbranding=1&rel=0&enablejsapi=1&playsinline=1`
        iframe.allow =
            "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
        iframe.setAttribute("allowfullscreen", "true")
        iframe.className = "absolute inset-0 w-full h-full z-10"
        iframe.style.border = "0"
        iframe.id = `youtube-player-${testimonial.id}`
        iframe.onload = () => setVideoLoaded(true)

        // Append the iframe to the container
        videoRef.current.appendChild(iframe)

        // Add a message to indicate keyboard shortcuts are available
        const keyboardHint = document.createElement("div")
        keyboardHint.className =
            "absolute bottom-16 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-20 opacity-0 transition-opacity duration-300"
        keyboardHint.textContent = "Press 'f' for fullscreen, 'i' for info, 'm' to mute, 'Esc' to close"
        keyboardHint.style.opacity = "0"
        videoRef.current.appendChild(keyboardHint)

        // Show the hint briefly
        setTimeout(() => {
            keyboardHint.style.opacity = "1"
            setTimeout(() => {
                keyboardHint.style.opacity = "0"
                setTimeout(() => {
                    keyboardHint.remove()
                }, 500)
            }, 3000)
        }, 1000)

        return () => {
            if (videoRef.current?.querySelector("iframe")) {
                const iframe = videoRef.current.querySelector("iframe")
                if (iframe) {
                    iframe.remove()
                }
                setVideoLoaded(false)
            }
        }
    }, [isActive, testimonial.videoId, isMuted, testimonial.id])

    // Auto-hide controls after inactivity
    useEffect(() => {
        if (!isActive) return

        if (isHovered) {
            setShowControls(true)
            return
        }

        const timer = setTimeout(() => {
            setShowControls(false)
        }, 3000)

        return () => clearTimeout(timer)
    }, [isActive, isHovered])

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

    // Add keyboard shortcuts for the video
    useEffect(() => {
        if (!isActive) return

        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle keyboard events when not typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            switch (e.key) {
                case "f":
                    toggleFullscreen()
                    break
                case "m":
                    setIsMuted(!isMuted)
                    break
                case "i":
                    setShowInfo(!showInfo)
                    break
                case "Escape":
                    if (isFullscreen) {
                        document.exitFullscreen()
                    } else {
                        onClose()
                    }
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isActive, toggleFullscreen, isMuted, setIsMuted, onClose, isFullscreen, showInfo])

    // Share functionality
    const handleShare = () => {
        if (navigator.share) {
            navigator
                .share({
                    title: `Testimonial from ${testimonial.name}`,
                    text: `Watch this testimonial from ${testimonial.name}, ${testimonial.role} at ${testimonial.company}`,
                    url: `https://www.youtube.com/watch?v=${testimonial.videoId}`,
                })
                .catch((err) => {
                    console.error("Error sharing:", err)
                })
        } else {
            // Fallback for browsers that don't support navigator.share
            navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${testimonial.videoId}`)
            // Toast notification
            const toast = document.createElement("div")
            toast.className =
                "fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-[#ff6b3d] text-white px-4 py-2 rounded-lg shadow-lg z-50"
            toast.textContent = "Link copied to clipboard!"
            document.body.appendChild(toast)

            setTimeout(() => {
                toast.style.opacity = "0"
                toast.style.transition = "opacity 0.5s ease"
                setTimeout(() => document.body.removeChild(toast), 500)
            }, 2000)
        }
    }

    return (
        <motion.div
            ref={cardRef}
            className="relative overflow-hidden transition-all duration-500 aspect-video w-full rounded-xl shadow-lg group"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
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
                                "absolute inset-0 w-full h-full object-cover transition-transform duration-700",
                                isHovered ? "scale-105" : "scale-100",
                                imageLoaded ? "opacity-100" : "opacity-0",
                            )}
                            onLoad={() => setImageLoaded(true)}
                        />
                    </>
                )}

                {/* Gradient overlay */}
                {!isActive && (
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 opacity-100">
                        <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent"></div>
                    </div>
                )}

                {/* Video loading animation */}
                {isActive && !videoLoaded && <LoadingSpinner />}
            </div>

            {/* Category badge */}
            {!isActive && testimonial.category && (
                <div className="absolute top-3 right-3 z-30">
                    <motion.div
                        className="px-2 py-1 bg-[#ff6b3d]/90 rounded-full text-xs font-medium text-white shadow-md"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                    >
                        {testimonial.category}
                    </motion.div>
                </div>
            )}

            {/* Duration badge */}
            {!isActive && testimonial.duration && (
                <div className="absolute bottom-16 right-3 z-30">
                    <motion.div
                        className="px-2 py-1 bg-black/70 rounded-full text-xs font-medium text-white shadow-md flex items-center gap-1"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3 }}
                    >
                        <Clock className="w-3 h-3" />
                        {testimonial.duration}
                    </motion.div>
                </div>
            )}

            {/* Content overlay */}
            <div className="absolute inset-0 p-4 md:p-6 flex flex-col justify-between z-20">
                {/* Top section with user info */}
                <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                        {/* User avatar */}
                        <motion.div
                            className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white shadow-lg"
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ type: "spring", stiffness: 260, damping: 20 }}
                        >
                            <User className="h-5 w-5 md:h-6 md:w-6" />
                        </motion.div>

                        <div>
                            <motion.h4
                                className="text-white font-bold text-sm md:text-base"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.1 }}
                            >
                                {testimonial.name}
                            </motion.h4>
                            <motion.p
                                className="text-gray-300 text-xs md:text-xs truncate max-w-[150px] md:max-w-[200px]"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.2 }}
                            >
                                {testimonial.role} • {testimonial.company}
                            </motion.p>
                        </div>
                    </div>

                    {/* Rating stars */}
                    {!isMobile && testimonial.rating && (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: 0.3 }}
                        >
                            <RatingStars rating={testimonial.rating} />
                        </motion.div>
                    )}
                </div>

                {/* Video controls */}
                <AnimatePresence>
                    {isActive && showControls && (
                        <motion.div
                            className="flex flex-col gap-2 w-full"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 10 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Progress bar */}
                            <ProgressBar progress={videoProgress} />

                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    {/* Play/Pause button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={onClose}
                                        className="relative w-12 h-12 md:w-14 md:h-14 rounded-full bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white shadow-lg hover:shadow-[#ff6b3d]/30 hover:shadow-xl transition-all duration-300 overflow-hidden group"
                                    >
                                        <Pause className="h-5 w-5 md:h-6 md:w-6 text-white" />
                                        <motion.div
                                            className="absolute inset-0 bg-white/20"
                                            initial={{ scale: 0, opacity: 0 }}
                                            whileHover={{ scale: 1.5, opacity: 0.4 }}
                                            transition={{ duration: 0.4 }}
                                        />
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
                                        aria-label={isMuted ? "Unmute (m)" : "Mute (m)"}
                                        title={isMuted ? "Unmute (m)" : "Mute (m)"}
                                    >
                                        {isMuted ? (
                                            <VolumeX className="h-4 w-4 md:h-5 md:w-5" />
                                        ) : (
                                            <Volume2 className="h-4 w-4 md:h-5 md:w-5" />
                                        )}
                                    </motion.button>

                                    {/* Time indicator */}
                                    {testimonial.duration && (
                                        <div className="text-white text-xs md:text-sm bg-black/50 px-2 py-1 rounded-full">
                                            {Math.floor(
                                                videoProgress * Number.parseFloat(testimonial.duration.split(":")[0]) * 60 +
                                                videoProgress * Number.parseFloat(testimonial.duration.split(":")[1]),
                                            )
                                                .toString()
                                                .padStart(2, "0")}
                                            s / {testimonial.duration}
                                        </div>
                                    )}
                                </div>

                                {/* Right side controls */}
                                <div className="flex items-center gap-2">
                                    {/* Info button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowInfo(!showInfo)}
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                                        aria-label="Show info (i)"
                                        title="Show info (i)"
                                    >
                                        <Info className="h-3 w-3 md:h-4 md:w-4" />
                                    </motion.button>

                                    {/* Share button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleShare}
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                                        aria-label="Share"
                                        title="Share testimonial"
                                    >
                                        <Share2 className="h-3 w-3 md:h-4 md:w-4" />
                                    </motion.button>

                                    {/* Fullscreen button */}
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={toggleFullscreen}
                                        className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                                        aria-label={isFullscreen ? "Exit Fullscreen (f)" : "Enter Fullscreen (f)"}
                                        title={isFullscreen ? "Exit Fullscreen (f)" : "Enter Fullscreen (f)"}
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
                                        aria-label="Close (Esc)"
                                        title="Close (Esc)"
                                    >
                                        <X className="h-3 w-3 md:h-4 md:w-4" />
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Info panel */}
                <AnimatePresence>
                    {isActive && showInfo && (
                        <motion.div
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm p-4 md:p-6 flex flex-col z-30"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="flex justify-between items-start mb-4">
                                <h3 className="text-white text-lg md:text-xl font-bold">About this Testimonial</h3>
                                <motion.button
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => setShowInfo(false)}
                                    className="w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                                >
                                    <X className="h-4 w-4" />
                                </motion.button>
                            </div>

                            <div className="flex items-center gap-3 mb-4">
                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white shadow-lg">
                                    <User className="h-6 w-6" />
                                </div>
                                <div>
                                    <h4 className="text-white font-bold text-base">{testimonial.name}</h4>
                                    <p className="text-gray-300 text-sm">
                                        {testimonial.role} at {testimonial.company}
                                    </p>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                {testimonial.rating && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Rating:</p>
                                        <RatingStars rating={testimonial.rating} size="lg" />
                                    </div>
                                )}

                                {testimonial.category && (
                                    <div>
                                        <p className="text-gray-400 text-sm mb-1">Category:</p>
                                        <div className="bg-[#ff6b3d]/20 text-[#ff6b3d] px-3 py-1 rounded-full text-sm inline-block">
                                            {testimonial.category}
                                        </div>
                                    </div>
                                )}
                            </div>

                            <div className="flex-1">
                                <p className="text-gray-400 text-sm mb-1">Testimonial:</p>
                                <p className="text-white text-sm md:text-base leading-relaxed">
                                    {testimonial.description || "This client shared their experience in this video testimonial."}
                                </p>
                            </div>

                            <div className="mt-4 flex justify-between items-center">
                                <a
                                    href={`https://www.youtube.com/watch?v=${testimonial.videoId}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1 text-[#ff6b3d] text-sm hover:underline"
                                >
                                    <ExternalLink className="h-3 w-3" /> Watch on YouTube
                                </a>

                                <div className="flex gap-2">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleShare}
                                        className="px-4 py-2 rounded-full bg-white/10 text-white text-sm hover:bg-white/20 transition-colors"
                                    >
                                        Share
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setShowInfo(false)}
                                        className="px-4 py-2 rounded-full bg-[#ff6b3d] text-white text-sm hover:bg-[#ff4d00] transition-colors"
                                    >
                                        Close
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Play button for inactive cards */}
                {!isActive && (
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
    const [showAllTestimonials, setShowAllTestimonials] = useState(false)
    const filteredTestimonials = testimonials

    // Calculate visible items based on screen size
    const getVisibleItems = () => {
        if (isMobile) return 1
        return 3
    }

    const visibleItems = getVisibleItems()
    const maxIndex = Math.max(0, filteredTestimonials.length - visibleItems)

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
            // Only handle keyboard events when not typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            switch (e.key) {
                case "ArrowLeft":
                    handlePrev()
                    break
                case "ArrowRight":
                    handleNext()
                    break
                case "Escape":
                    if (showAllTestimonials) {
                        setShowAllTestimonials(false)
                    } else {
                        setActiveVideoId(null)
                    }
                    break
                case " ": // Space bar
                    e.preventDefault() // Prevent page scrolling
                    if (activeVideoId) {
                        setActiveVideoId(null)
                    } else if (filteredTestimonials.length > 0) {
                        setActiveVideoId(filteredTestimonials[currentIndex].id)
                    }
                    break
                case "a": // "a" for "all"
                    setShowAllTestimonials(!showAllTestimonials)
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [handleNext, handlePrev, activeVideoId, currentIndex, showAllTestimonials, filteredTestimonials.length])

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
                {filteredTestimonials.length > 0 && (
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
                            {filteredTestimonials.slice(currentIndex, currentIndex + visibleItems).map((testimonial, index) => (
                                <TestimonialCard
                                    key={testimonial.id}
                                    testimonial={testimonial}
                                    isActive={activeVideoId === testimonial.id}
                                    onPlay={() => handleVideoPlay(testimonial.id)}
                                    onClose={handleVideoClose}
                                    isMuted={isMuted}
                                    setIsMuted={setIsMuted}
                                    priority={index === 0}
                                />
                            ))}
                        </motion.div>

                        {/* Enhanced pagination indicators */}
                        <div className="flex justify-center mt-8 gap-2">
                            {Array.from({ length: Math.ceil(filteredTestimonials.length / visibleItems) }).map((_, index) => (
                                <motion.button
                                    key={index}
                                    className={cn(
                                        "h-2 rounded-full transition-all duration-300",
                                        index === Math.floor(currentIndex / visibleItems)
                                            ? "bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] w-8"
                                            : "bg-gray-700 hover:bg-gray-600 w-2",
                                    )}
                                    whileHover={{ scale: 1.2 }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={() => {
                                        setCurrentIndex(index * visibleItems)
                                        setActiveVideoId(null)
                                    }}
                                    aria-label={`Go to page ${index + 1}`}
                                >
                                    {index === Math.floor(currentIndex / visibleItems) && (
                                        <motion.span
                                            className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-[#ff6b3d] text-white text-xs px-1.5 py-0.5 rounded"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                        >
                                            {index + 1}
                                        </motion.span>
                                    )}
                                </motion.button>
                            ))}
                        </div>

                        {/* Keyboard navigation hint */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 1, duration: 0.5 }}
                            className="text-center mt-4 text-gray-500 text-sm"
                        >
                            <span className="hidden md:inline-block">
                                Use arrow keys to navigate • Space to play/pause • &apos;a&apos; to view all
                            </span>
                        </motion.div>
                    </div>
                )}

                {/* View All button */}
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
                        onClick={() => setShowAllTestimonials(true)}
                    >
                        <span className="relative z-10">View All Testimonials</span>
                        <motion.div
                            className="absolute inset-0 bg-white/20 z-0"
                            initial={{ x: "-100%", opacity: 0 }}
                            whileHover={{ x: "100%", opacity: 0.3 }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>
                </motion.div>
            </div>

            {/* Enhanced View All Testimonials Modal */}
            <AnimatePresence>
                {showAllTestimonials && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAllTestimonials(false)}
                    >
                        <motion.div
                            className="relative w-full max-w-7xl bg-[#0c0c0c] rounded-xl overflow-hidden border border-gray-800 p-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="flex justify-between items-center mb-6">
                                <h2 className="text-2xl md:text-3xl font-bold text-white">All Client Testimonials</h2>
                                <button
                                    className="w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#ff6b3d]/80 transition-colors"
                                    onClick={() => setShowAllTestimonials(false)}
                                >
                                    <X className="h-5 w-5" />
                                </button>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 overflow-y-auto max-h-[70vh]">
                                {filteredTestimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={testimonial.id}
                                        className="relative aspect-video rounded-lg overflow-hidden cursor-pointer group"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.03 }}
                                        onClick={() => {
                                            setShowAllTestimonials(false)
                                            setTimeout(() => {
                                                handleVideoPlay(testimonial.id)
                                            }, 300)
                                        }}
                                    >
                                        <img
                                            src={testimonial.thumbnail || "/placeholder.svg"}
                                            alt={`Testimonial from ${testimonial.name}`}
                                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/30 group-hover:via-black/40"></div>

                                        {/* Category badge */}
                                        {testimonial.category && (
                                            <div className="absolute top-3 right-3">
                                                <div className="px-2 py-1 bg-[#ff6b3d]/90 rounded-full text-xs font-medium text-white shadow-md">
                                                    {testimonial.category}
                                                </div>
                                            </div>
                                        )}

                                        <div className="absolute inset-0 p-4 flex flex-col justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white">
                                                    <User className="h-4 w-4" />
                                                </div>
                                                <div>
                                                    <h4 className="text-white text-sm font-bold">{testimonial.name}</h4>
                                                    <p className="text-gray-300 text-xs truncate max-w-[150px]">{testimonial.role}</p>
                                                </div>
                                            </div>

                                            <div>
                                                <div className="flex items-center gap-2 mb-2">
                                                    <span className="text-xs text-white bg-black/60 px-2 py-0.5 rounded-full">
                                                        {testimonial.company}
                                                    </span>
                                                    {testimonial.duration && (
                                                        <span className="text-xs text-white flex items-center gap-1 bg-black/60 px-2 py-0.5 rounded-full">
                                                            <Clock className="h-3 w-3" />
                                                            {testimonial.duration}
                                                        </span>
                                                    )}
                                                </div>

                                                {/* Play button */}
                                                <motion.div
                                                    className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-[#ff6b3d] flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.9 }}
                                                >
                                                    <Play className="h-5 w-5 text-white fill-white ml-0.5" />
                                                </motion.div>

                                                {/* Rating stars if available */}
                                                {testimonial.rating && (
                                                    <div className="absolute bottom-4 left-4">
                                                        <div className="flex">
                                                            {Array.from({ length: testimonial.rating }).map((_, i) => (
                                                                <span key={i} className="text-[#ff6b3d] text-xs">
                                                                    ★
                                                                </span>
                                                            ))}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        </div>

                                        {/* Hover overlay with description preview */}
                                        {testimonial.description && (
                                            <motion.div
                                                className="absolute inset-0 bg-black/80 p-4 flex flex-col justify-center items-center text-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                                initial={{ opacity: 0 }}
                                                whileHover={{ opacity: 1 }}
                                            >
                                                <p className="text-white text-sm line-clamp-4">{testimonial.description}</p>
                                                <motion.span
                                                    className="mt-4 text-[#ff6b3d] text-xs font-medium"
                                                    initial={{ y: 10, opacity: 0 }}
                                                    whileHover={{ y: 0, opacity: 1 }}
                                                    transition={{ delay: 0.2 }}
                                                >
                                                    Click to watch
                                                </motion.span>
                                            </motion.div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}
