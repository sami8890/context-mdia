"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import {
    Play,
    X,
    Volume2,
    VolumeX,
    ChevronLeft,
    ChevronRight,
    Maximize,
    Minimize,
    Share2,
    Info,
    Clock,
    Tag,
} from "lucide-react"
import Image from "next/image"

// Define proper TypeScript interfaces
interface Video {
    title: string
    videoId: string
    label: string
    category: string
    thumbnail?: string
    duration?: string
    description?: string
}

// Video data with categories and descriptions
const longFormVideos: Video[] = [
    {
        title: "24/7 ACCESS WITH ME",
        videoId: "dQw4w9WgXcQ",
        label: "Featured",
        category: "Tutorials",
        thumbnail: "/image.png",
        duration: "12:45",
        description:
            "Get exclusive access to premium content and behind-the-scenes footage in this comprehensive tutorial series.",
    },
    {
        title: "With Everything",
        videoId: "dQw4w9WgXcQ",
        label: "New",
        category: "Interviews",
        thumbnail: "/image.png",
        duration: "18:30",
        description: "An in-depth interview exploring creative processes and professional insights from industry experts.",
    },
    {
        title: "JOB SEARCH REVIEW",
        videoId: "dQw4w9WgXcQ",
        label: "Popular",
        category: "Career",
        thumbnail: "/image.png",
        duration: "22:15",
        description:
            "Learn effective strategies for job searching and resume building with practical examples and expert advice.",
    },
    // Duplicate videos to create a continuous marquee effect
    {
        title: "24/7 ACCESS WITH ME",
        videoId: "dQw4w9WgXcQ",
        label: "Featured",
        category: "Tutorials",
        thumbnail: "/image.png",
        duration: "12:45",
        description:
            "Get exclusive access to premium content and behind-the-scenes footage in this comprehensive tutorial series.",
    },
    {
        title: "With Everything",
        videoId: "dQw4w9WgXcQ",
        label: "New",
        category: "Interviews",
        thumbnail: "/image.png",
        duration: "18:30",
        description: "An in-depth interview exploring creative processes and professional insights from industry experts.",
    },
    {
        title: "JOB SEARCH REVIEW",
        videoId: "dQw4w9WgXcQ",
        label: "Popular",
        category: "Career",
        thumbnail: "/image.png",
        duration: "22:15",
        description:
            "Learn effective strategies for job searching and resume building with practical examples and expert advice.",
    },
]

// Enhanced Video Modal Component with better mobile support and visual improvements
const VideoModal = ({
    video,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
}: {
    video: Video | null
    isOpen: boolean
    onClose: () => void
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
}) => {
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const modalRef = useRef<HTMLDivElement>(null)
    const [isMobile, setIsMobile] = useState(false)

    // Check if device is mobile
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

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            modalRef.current?.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
            setIsFullscreen(true)
        } else {
            document.exitFullscreen()
            setIsFullscreen(false)
        }
    }

    // Share functionality
    const handleShare = () => {
        if (navigator.share && video) {
            navigator
                .share({
                    title: video.title,
                    text: `Check out this video: ${video.title}`,
                    url: `https://www.youtube.com/watch?v=${video.videoId}`,
                })
                .catch((err) => {
                    console.error("Error sharing:", err)
                })
        } else {
            // Fallback for browsers that don't support navigator.share
            if (video) {
                navigator.clipboard.writeText(`https://www.youtube.com/watch?v=${video.videoId}`)
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
    }

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose()
        }

        // Handle arrow keys for navigation
        const handleArrowKeys = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && onNext && hasNext) onNext()
            if (e.key === "ArrowLeft" && onPrevious && hasPrevious) onPrevious()
        }

        window.addEventListener("keydown", handleEsc)
        window.addEventListener("keydown", handleArrowKeys)

        return () => {
            window.removeEventListener("keydown", handleEsc)
            window.removeEventListener("keydown", handleArrowKeys)
        }
    }, [onClose, onNext, onPrevious, hasNext, hasPrevious])

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden"
        } else {
            document.body.style.overflow = ""
        }
        return () => {
            document.body.style.overflow = ""
        }
    }, [isOpen])

    // Fullscreen change detection
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement)
        }

        document.addEventListener("fullscreenchange", handleFullscreenChange)
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange)
        }
    }, [])

    if (!video) return null

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative w-full max-w-7xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&showinfo=0&color=white`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>

                        {/* Enhanced controls overlay with better mobile support */}
                        <div className="absolute inset-0 opacity-0 hover:opacity-100 focus-within:opacity-100 transition-opacity duration-300 flex flex-col justify-between pointer-events-none">
                            {/* Top controls */}
                            <div className="p-2 sm:p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center pointer-events-auto">
                                <h3 className="text-white text-sm sm:text-lg font-bold truncate max-w-[50%] sm:max-w-md">
                                    {video.title}
                                </h3>
                                <div className="flex gap-1 sm:gap-2">
                                    <button
                                        onClick={() => setShowInfo(!showInfo)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-all duration-300 hover:scale-105"
                                        aria-label="Show info"
                                    >
                                        <Info size={isMobile ? 16 : 18} />
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-all duration-300 hover:scale-105"
                                        aria-label="Share"
                                    >
                                        <Share2 size={isMobile ? 16 : 18} />
                                    </button>
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-all duration-300 hover:scale-105"
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                    >
                                        {isMuted ? <VolumeX size={isMobile ? 16 : 18} /> : <Volume2 size={isMobile ? 16 : 18} />}
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-all duration-300 hover:scale-105"
                                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                    >
                                        {isFullscreen ? <Minimize size={isMobile ? 16 : 18} /> : <Maximize size={isMobile ? 16 : 18} />}
                                    </button>
                                    <button
                                        onClick={onClose}
                                        className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-all duration-300 hover:scale-105"
                                        aria-label="Close"
                                    >
                                        <X size={isMobile ? 16 : 18} />
                                    </button>
                                </div>
                            </div>

                            {/* Navigation controls - adjusted for mobile */}
                            <div className="flex justify-between items-center px-2 sm:px-4 pointer-events-auto">
                                {hasPrevious ? (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            if (onPrevious) onPrevious()
                                        }}
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-colors"
                                        aria-label="Previous video"
                                    >
                                        <ChevronLeft size={isMobile ? 20 : 24} />
                                    </motion.button>
                                ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12"></div> // Placeholder for layout
                                )}

                                {hasNext ? (
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            if (onNext) onNext()
                                        }}
                                        className="w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full bg-black/60 backdrop-blur-sm text-white hover:bg-[#ff6b3d]/80 transition-colors"
                                        aria-label="Next video"
                                    >
                                        <ChevronRight size={isMobile ? 20 : 24} />
                                    </motion.button>
                                ) : (
                                    <div className="w-10 h-10 sm:w-12 sm:h-12"></div> // Placeholder for layout
                                )}
                            </div>

                            {/* Bottom info bar */}
                            <div className="p-2 sm:p-4 bg-gradient-to-t from-black/80 to-transparent pointer-events-auto">
                                <div className="flex justify-between items-center">
                                    <div className="text-white text-xs sm:text-sm flex items-center gap-2">
                                        <span className="bg-[#ff6b3d] px-2 py-0.5 rounded text-xs font-medium">{video.category}</span>
                                        <span className="flex items-center gap-1 text-gray-300">
                                            <Clock size={12} className="inline" />
                                            {video.duration}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Video info panel */}
                        <AnimatePresence>
                            {showInfo && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: 20 }}
                                    className="absolute inset-0 bg-black/90 p-4 sm:p-6 overflow-auto pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <button
                                        onClick={() => setShowInfo(false)}
                                        className="absolute top-2 right-2 w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#ff6b3d]/80 transition-colors"
                                        aria-label="Close info"
                                    >
                                        <X size={isMobile ? 16 : 18} />
                                    </button>

                                    <div className="mt-8 sm:mt-4">
                                        <h3 className="text-white text-xl sm:text-2xl font-bold mb-2">{video.title}</h3>
                                        <div className="flex flex-wrap gap-2 mb-4">
                                            <span className="flex items-center gap-1 bg-[#ff6b3d] px-2 py-1 rounded text-xs font-medium text-white">
                                                <Tag size={12} />
                                                {video.category}
                                            </span>
                                            <span className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded text-xs font-medium text-white">
                                                <Clock size={12} />
                                                {video.duration}
                                            </span>
                                            <span className="bg-white/10 px-2 py-1 rounded text-xs font-medium text-white">
                                                {video.label}
                                            </span>
                                        </div>
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{video.description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

// Enhanced Video Card Component with better mobile support and visual improvements
const VideoCard = ({
    video,
    index,
    onVideoSelect,
}: {
    video: Video
    index: number
    onVideoSelect: (video: Video) => void
}) => {
    const [isHovered, setIsHovered] = useState(false)
    const [isTouched, setIsTouched] = useState(false)
    const cardRef = useRef<HTMLDivElement>(null)
    const isInView = useInView(cardRef, { once: true, amount: 0.3 })
    const [isMobile, setIsMobile] = useState(false)

    // Handle touch events for mobile
    useEffect(() => {
        if (isTouched) {
            const timer = setTimeout(() => {
                setIsTouched(false)
            }, 3000) // Reset after 3 seconds

            return () => clearTimeout(timer)
        }
    }, [isTouched])

    // Format title with highlighted text
    const formatTitle = (title: string) => {
        if (title.includes("WITH ME")) {
            return (
                <>
                    24/7 ACCESS <span className="text-[#ff6b3d]">WITH ME</span>
                </>
            )
        } else if (title.includes("REVIEW")) {
            return (
                <>
                    JOB SEARCH <span className="text-[#ff6b3d]">REVIEW</span>
                </>
            )
        } else if (title.includes("PREMIUM")) {
            return (
                <>
                    PREMIUM <span className="text-[#ff6b3d]">CONTENT</span>
                </>
            )
        } else if (title.includes("EXPERT")) {
            return (
                <>
                    EXPERT <span className="text-[#ff6b3d]">INSIGHTS</span>
                </>
            )
        } else if (title.includes("MASTER")) {
            return (
                <>
                    MASTER <span className="text-[#ff6b3d]">CLASS</span>
                </>
            )
        }
        return title
    }

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

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onTouchStart={() => setIsTouched(true)}
        >
            <div
                className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b3d]/20 group"
                onClick={() => onVideoSelect(video)}
            >
                {/* Thumbnail with loading state */}
                <div className="absolute inset-0 bg-gray-900">
                    <Image
                        src={video.thumbnail || `/image.png`}
                        alt={video.title}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
                        className={`object-cover transition-transform duration-700 ${isHovered || isTouched ? "scale-110" : "scale-100"}`}
                        loading="eager"
                    />
                </div>

                {/* Overlay with improved gradient */}
                <div
                    className={`absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent transition-opacity duration-300 ${isHovered || isTouched ? "opacity-90" : "opacity-100"
                        }`}
                ></div>

                {/* Animated play button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isHovered || isTouched ? 1 : 0,
                        scale: isHovered || isTouched ? 1 : 0.8,
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center"
                >
                    <motion.div
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#ff6b3d] flex items-center justify-center shadow-lg shadow-[#ff6b3d]/30"
                    >
                        <Play className="h-7 w-7 sm:h-9 sm:w-9 text-white fill-white ml-1" />
                    </motion.div>
                </motion.div>

                {/* Top labels with improved styling */}
                <div className="absolute top-3 sm:top-5 left-3 sm:left-5 flex gap-2">
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-medium text-white border border-white/10 shadow-sm">
                        {video.label}
                    </div>
                    <div className="px-2 sm:px-3 py-0.5 sm:py-1 bg-[#ff6b3d]/90 rounded-full text-[10px] sm:text-xs font-medium text-white shadow-sm">
                        {video.category}
                    </div>
                </div>

                {/* Duration badge with icon */}
                <div className="absolute top-3 sm:top-5 right-3 sm:right-5">
                    <div className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-black/70 backdrop-blur-md rounded-full text-[10px] sm:text-xs font-medium text-white flex items-center gap-1 shadow-sm">
                        <Clock size={isMobile ? 10 : 12} />
                        {video.duration}
                    </div>
                </div>

                {/* Title with animated reveal */}
                <div className="absolute left-0 right-0 bottom-0 p-3 sm:p-5">
                    <h3 className="text-white text-base sm:text-xl font-bold tracking-wide line-clamp-2 group-hover:text-[#ff6b3d]/90 transition-colors duration-300">
                        {formatTitle(video.title)}
                    </h3>
                    {/* Description preview with animated reveal */}
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{
                            height: isHovered || isTouched ? "auto" : 0,
                            opacity: isHovered || isTouched ? 1 : 0,
                        }}
                        transition={{ duration: 0.3 }}
                        className="mt-1 text-gray-300 text-xs sm:text-sm line-clamp-2 overflow-hidden"
                    >
                        {video.description}
                    </motion.div>
                </div>

                {/* Subtle border effect on hover */}
                <div
                    className={`absolute inset-0 border-2 border-[#ff6b3d]/0 rounded-lg transition-all duration-300 ${isHovered || isTouched ? "border-[#ff6b3d]/70" : ""
                        }`}
                ></div>
            </div>
        </motion.div>
    )
}

export default function LongFormContent() {
    const ref = useRef<HTMLElement>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: false, amount: 0.2 })
    const controls = useAnimation()
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [, setIsMobile] = useState(false)

    // State for selected video and modal
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(-1)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Check if device is mobile
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

    // Handle video selection
    const handleVideoSelect = (video: Video) => {
        const index = longFormVideos.findIndex((v) => v.videoId === video.videoId && v.title === video.title)
        setSelectedVideo(video)
        setSelectedVideoIndex(index)
        setIsModalOpen(true)
    }

    // Navigation handlers
    const handleNextVideo = () => {
        if (selectedVideoIndex < longFormVideos.length - 1) {
            const nextVideo = longFormVideos[selectedVideoIndex + 1]
            setSelectedVideo(nextVideo)
            setSelectedVideoIndex(selectedVideoIndex + 1)
        }
    }

    const handlePreviousVideo = () => {
        if (selectedVideoIndex > 0) {
            const prevVideo = longFormVideos[selectedVideoIndex - 1]
            setSelectedVideo(prevVideo)
            setSelectedVideoIndex(selectedVideoIndex - 1)
        }
    }

    // Close modal
    const handleCloseModal = () => {
        setIsModalOpen(false)
        // Optional: delay clearing the selected video to allow for exit animation
        setTimeout(() => setSelectedVideo(null), 300)
    }

    // Animation for main content
    useEffect(() => {
        if (inView) {
            controls.start("visible")
        } else {
            controls.start("hidden")
        }
    }, [controls, inView])

    // Marquee animation from right to left with increased speed
    useEffect(() => {
        if (!marqueeRef.current || isPaused) return

        let animationId: number
        let lastTimestamp: number

        const animate = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp
            const elapsed = timestamp - lastTimestamp

            if (elapsed > 16) {
                // ~60fps
                lastTimestamp = timestamp
                setScrollPosition((prev) => {
                    // Move from right to left with increased speed (2.5x faster)
                    const newPosition = prev + 2.5

                    // Reset when we've scrolled far enough
                    if (newPosition >= (marqueeRef.current?.scrollWidth || 0) / 2) {
                        return 0
                    }
                    return newPosition
                })
            }

            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [isPaused])

    // Apply scroll position to marquee
    useEffect(() => {
        if (marqueeRef.current) {
            marqueeRef.current.style.transform = `translateX(-${scrollPosition}px)`
        }
    }, [scrollPosition])

    return (
        <section className="relative w-full py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]" ref={ref}>
            {/* Enhanced background elements with more dynamic gradients */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[150px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>
                <div className="absolute top-1/2 left-1/4 w-1/5 h-1/5 bg-[#ff6b3d]/3 blur-[180px] rounded-full animate-pulse"></div>
                <div
                    className="absolute bottom-1/4 right-1/4 w-1/6 h-1/6 bg-[#ff6b3d]/4 blur-[150px] rounded-full animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl">
                {/* Enhanced section header with animated text */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-10 sm:mb-16"
                >
                    <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">
                        <span className="text-white">Long form </span>
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
                            Content
                        </motion.span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-sm sm:text-base md:text-lg px-4">
                        Explore our in-depth video content created to help you master new skills
                    </p>
                </motion.div>

                {/* Enhanced marquee container with right-to-left animation */}
                <div
                    className="relative overflow-hidden mb-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                >
                    {/* Enhanced gradient overlays for fade effect */}
                    <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10"></div>
                    <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-32 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10"></div>

                    {/* Marquee content with improved spacing */}
                    <div
                        ref={marqueeRef}
                        className="flex transition-transform duration-1000 ease-linear py-4"
                        style={{ width: "fit-content" }}
                    >
                        {/* First set of videos */}
                        {longFormVideos.slice(0, 3).map((video, index) => (
                            <div key={`first-${index}`} className="px-4 w-[350px] sm:w-[450px] md:w-[500px]">
                                <VideoCard video={video} index={index} onVideoSelect={handleVideoSelect} />
                            </div>
                        ))}

                        {/* Duplicate set for continuous scrolling */}
                        {longFormVideos.slice(0, 3).map((video, index) => (
                            <div key={`second-${index}`} className="px-4 w-[350px] sm:w-[450px] md:w-[500px]">
                                <VideoCard video={video} index={index + 3} onVideoSelect={handleVideoSelect} />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Pause/Play indicator */}
                <div className="flex justify-center">
                    <div
                        className={`text-xs text-gray-500 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm transition-opacity duration-300 ${isPaused ? "opacity-100" : "opacity-0"}`}
                    >
                        {isPaused ? "Paused" : "Playing"} • Hover to pause • Touch to interact
                    </div>
                </div>
            </div>

            {/* Enhanced Video Modal with navigation */}
            <VideoModal
                video={selectedVideo}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onNext={handleNextVideo}
                onPrevious={handlePreviousVideo}
                hasNext={selectedVideoIndex < longFormVideos.length - 1}
                hasPrevious={selectedVideoIndex > 0}
            />
        </section>
    )
}
