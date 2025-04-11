"use client"

import { useRef, useEffect, useState, useCallback } from "react"
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
    Loader2,
    Youtube,
    SkipBack,
    SkipForward,
    List,
} from "lucide-react"

// Define proper TypeScript interfaces
interface Video {
    title: string
    videoId: string
    label: string
    category: string
    duration?: string
    description?: string
}

// Video data with categories and descriptions
const longFormVideos: Video[] = [
    {
        title: "24/7 ACCESS WITH ME",
        videoId: "lEeV1Sa7wjo",
        label: "Featured",
        category: "Tutorials",
        duration: "12:45",
        description:
            "Get exclusive access to premium content and behind-the-scenes footage in this comprehensive tutorial series.",
    },
    {
        title: "With Everything",
        videoId: "LWijamQNckM",
        label: "New",
        category: "Interviews",
        duration: "18:30",
        description: "An in-depth interview exploring creative processes and professional insights from industry experts.",
    },
    {
        title: "JOB SEARCH REVIEW",
        videoId: "5GL5oCrDxdI",
        label: "Popular",
        category: "Career",
        duration: "22:15",
        description:
            "Learn effective strategies for job searching and resume building with practical examples and expert advice.",
    },
    // Duplicate videos to create a continuous marquee effect
    {
        title: "24/7 ACCESS WITH ME",
        videoId: "lEeV1Sa7wjo",
        label: "Featured",
        category: "Tutorials",
        duration: "12:45",
        description:
            "Get exclusive access to premium content and behind-the-scenes footage in this comprehensive tutorial series.",
    },
    {
        title: "With Everything",
        videoId: "LWijamQNckM",
        label: "New",
        category: "Interviews",
        duration: "18:30",
        description: "An in-depth interview exploring creative processes and professional insights from industry experts.",
    },
    {
        title: "JOB SEARCH REVIEW",
        videoId: "5GL5oCrDxdI",
        label: "Popular",
        category: "Career",
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
    onJumpTo,
    allVideos,
}: {
    video: Video | null
    isOpen: boolean
    onClose: () => void
    onNext?: () => void
    onPrevious?: () => void
    hasNext?: boolean
    hasPrevious?: boolean
    onJumpTo?: (index: number) => void
    allVideos?: Video[]
}) => {
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const [showInfo, setShowInfo] = useState(false)
    const [showVideoList, setShowVideoList] = useState(false)
    const [isLoading, setIsLoading] = useState(true)
    const modalRef = useRef<HTMLDivElement>(null)
    const iframeRef = useRef<HTMLIFrameElement>(null)
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

    // Handle iframe load event
    const handleIframeLoad = () => {
        setIsLoading(false)
    }

    // Reset loading state when video changes
    useEffect(() => {
        if (video) {
            setIsLoading(true)
        }
    }, [video])

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
            if (e.key === "m") setIsMuted(!isMuted)
            if (e.key === "f") toggleFullscreen()
            if (e.key === "i") setShowInfo(!showInfo)
            if (e.key === "l") setShowVideoList(!showVideoList)
        }

        window.addEventListener("keydown", handleEsc)
        window.addEventListener("keydown", handleArrowKeys)

        return () => {
            window.removeEventListener("keydown", handleEsc)
            window.removeEventListener("keydown", handleArrowKeys)
        }
    }, [onClose, onNext, onPrevious, hasNext, hasPrevious, isMuted, showInfo, showVideoList])

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
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="video-modal-title"
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
                        {/* Loading indicator */}
                        {isLoading && (
                            <div className="absolute inset-0 flex items-center justify-center bg-black z-10">
                                <div className="flex flex-col items-center gap-4">
                                    <Loader2 className="h-12 w-12 text-[#ff6b3d] animate-spin" />
                                    <p className="text-white text-sm">Loading video...</p>
                                </div>
                            </div>
                        )}

                        <iframe
                            ref={iframeRef}
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&showinfo=0&color=white`}
                            title={video.title}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            onLoad={handleIframeLoad}
                            id="video-player-iframe"
                        ></iframe>

                        {/* Enhanced controls overlay - ALWAYS VISIBLE on larger screens */}
                        <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                            {/* Top controls - ALWAYS VISIBLE on larger screens */}
                            <div className="p-2 sm:p-4 bg-gradient-to-b from-black/80 to-transparent flex justify-between items-center pointer-events-auto">
                                <h3
                                    id="video-modal-title"
                                    className="text-white text-sm sm:text-lg font-bold truncate max-w-[50%] sm:max-w-md"
                                >
                                    {video.title}
                                </h3>
                                <div className="flex gap-2 sm:gap-3">
                                    {/* IMPROVED: Larger, more visible buttons with labels on larger screens */}
                                    <button
                                        onClick={() => setShowVideoList(!showVideoList)}
                                        className="flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-[#ff6b3d] transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2"
                                        aria-label="Show video list"
                                        title="Show video list (l)"
                                    >
                                        <List size={isMobile ? 16 : 20} />
                                        <span className="ml-1.5 hidden sm:inline text-sm">List</span>
                                    </button>
                                    <button
                                        onClick={() => setShowInfo(!showInfo)}
                                        className="flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-[#ff6b3d] transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2"
                                        aria-label="Show info"
                                        title="Show info (i)"
                                    >
                                        <Info size={isMobile ? 16 : 20} />
                                        <span className="ml-1.5 hidden sm:inline text-sm">Info</span>
                                    </button>
                                    <button
                                        onClick={handleShare}
                                        className="flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-[#ff6b3d] transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2"
                                        aria-label="Share"
                                        title="Share video"
                                    >
                                        <Share2 size={isMobile ? 16 : 20} />
                                        <span className="ml-1.5 hidden sm:inline text-sm">Share</span>
                                    </button>
                                    <button
                                        onClick={() => setIsMuted(!isMuted)}
                                        className="flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-[#ff6b3d] transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2"
                                        aria-label={isMuted ? "Unmute" : "Mute"}
                                        title={isMuted ? "Unmute (m)" : "Mute (m)"}
                                    >
                                        {isMuted ? <VolumeX size={isMobile ? 16 : 20} /> : <Volume2 size={isMobile ? 16 : 20} />}
                                        <span className="ml-1.5 hidden sm:inline text-sm">{isMuted ? "Unmute" : "Mute"}</span>
                                    </button>
                                    <button
                                        onClick={toggleFullscreen}
                                        className="flex items-center justify-center rounded-lg bg-black/70 text-white hover:bg-[#ff6b3d] transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2"
                                        aria-label={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                                        title={isFullscreen ? "Exit Fullscreen (f)" : "Enter Fullscreen (f)"}
                                    >
                                        {isFullscreen ? <Minimize size={isMobile ? 16 : 20} /> : <Maximize size={isMobile ? 16 : 20} />}
                                        <span className="ml-1.5 hidden sm:inline text-sm">{isFullscreen ? "Exit" : "Full"}</span>
                                    </button>
                                    {/* IMPROVED: Close button is now more prominent */}
                                    <button
                                        onClick={onClose}
                                        className="flex items-center justify-center rounded-lg bg-[#ff6b3d] text-white hover:bg-[#ff4d00] transition-all duration-300 px-2 py-1.5 sm:px-3 sm:py-2"
                                        aria-label="Close"
                                        title="Close (Esc)"
                                    >
                                        <X size={isMobile ? 16 : 20} />
                                        <span className="ml-1.5 hidden sm:inline text-sm">Close</span>
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
                                        title="Previous video (←)"
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
                                        title="Next video (→)"
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
                                    <div className="text-xs text-gray-400 hidden sm:block">
                                        Keyboard shortcuts: ← → (navigation), m (mute), f (fullscreen), i (info), l (list)
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
                                            <a
                                                href={`https://www.youtube.com/watch?v=${video.videoId}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-1 bg-red-600 px-2 py-1 rounded text-xs font-medium text-white hover:bg-red-700 transition-colors"
                                            >
                                                <Youtube size={12} />
                                                Watch on YouTube
                                            </a>
                                        </div>
                                        <p className="text-gray-300 text-sm sm:text-base leading-relaxed">{video.description}</p>
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>

                        {/* Video list panel */}
                        <AnimatePresence>
                            {showVideoList && allVideos && allVideos.length > 0 && (
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    className="absolute inset-y-0 left-0 w-full sm:w-72 md:w-80 bg-black/90 p-4 overflow-auto pointer-events-auto"
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-white text-lg font-bold">All Videos</h3>
                                        <button
                                            onClick={() => setShowVideoList(false)}
                                            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#ff6b3d]/80 transition-colors"
                                            aria-label="Close video list"
                                        >
                                            <X size={16} />
                                        </button>
                                    </div>

                                    <div className="grid gap-3">
                                        {allVideos.map((v, idx) => {
                                            // Only show unique videos (filter out duplicates)
                                            const isFirstOccurrence =
                                                allVideos.findIndex((video) => video.videoId === v.videoId && video.title === v.title) === idx

                                            if (!isFirstOccurrence) return null

                                            const isActive = v.videoId === video.videoId && v.title === video.title

                                            return (
                                                <div
                                                    key={`list-${idx}`}
                                                    className={`p-2 rounded cursor-pointer transition-all duration-200 ${isActive
                                                            ? "bg-[#ff6b3d]/20 border-l-4 border-[#ff6b3d]"
                                                            : "hover:bg-white/5 border-l-4 border-transparent"
                                                        }`}
                                                    onClick={() => {
                                                        if (onJumpTo) {
                                                            onJumpTo(idx)
                                                            setShowVideoList(false)
                                                        }
                                                    }}
                                                >
                                                    <div className="flex gap-3 items-center">
                                                        <div
                                                            className={`w-8 h-8 rounded-full flex items-center justify-center ${isActive ? "bg-[#ff6b3d]" : "bg-white/10"
                                                                }`}
                                                        >
                                                            {isActive ? (
                                                                <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                                                            ) : (
                                                                <span className="text-xs text-white">{idx + 1}</span>
                                                            )}
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-white text-sm font-medium truncate">{v.title}</h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-xs text-gray-400">{v.category}</span>
                                                                <span className="text-xs text-gray-400 flex items-center">
                                                                    <Clock size={10} className="mr-1" />
                                                                    {v.duration}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })}
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
    const [, setIsMobile] = useState(false)
    const [isActive] = useState(false)

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

    // Generate a gradient background based on the video ID
    const getGradientBackground = (videoId: string) => {
        // Use the last character of the video ID to determine the gradient
        const lastChar = videoId.charAt(videoId.length - 1)
        const colorNum = Number.parseInt(lastChar, 16) || 0

        // Create different gradients based on the number
        switch (colorNum % 5) {
            case 0:
                return "bg-gradient-to-br from-[#1a1a2e] to-[#16213e]"
            case 1:
                return "bg-gradient-to-br from-[#0f0e17] to-[#232946]"
            case 2:
                return "bg-gradient-to-br from-[#2d3748] to-[#1a202c]"
            case 3:
                return "bg-gradient-to-br from-[#3d5a80] to-[#293241]"
            case 4:
                return "bg-gradient-to-br from-[#2b2d42] to-[#1b1b2f]"
            default:
                return "bg-gradient-to-br from-gray-900 to-gray-800"
        }
    }

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
                role="button"
                aria-label={`Play ${video.title}`}
                tabIndex={0}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault()
                        onVideoSelect(video)
                    }
                }}
            >
                {/* Video thumbnail preview using YouTube thumbnail */}
                <div className="absolute inset-0">
                    <img
                        src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt={video.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        onError={(e) => {
                            // Fallback to gradient background if image fails to load
                            e.currentTarget.style.display = "none"
                            e.currentTarget.parentElement?.classList.add(getGradientBackground(video.videoId))
                        }}
                    />

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>

                {/* Animated play button */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{
                        opacity: isHovered || isTouched ? 1 : 0.7, // Make slightly visible even when not hovered
                        scale: isHovered || isTouched ? 1 : 0.9,
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
                {isActive && (
                    <div className="absolute inset-0 border-4 border-[#ff6b3d] rounded-lg z-10 pointer-events-none"></div>
                )}
            </div>
        </motion.div>
    )
}

// Performance optimizations for the main component
export default function LongFormContent() {
    const ref = useRef<HTMLElement>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: false, amount: 0.2 })
    const controls = useAnimation()
    const [scrollPosition, setScrollPosition] = useState(0)
    const [isPaused, setIsPaused] = useState(false)
    const [isMobile, setIsMobile] = useState(false)
    const [isReducedMotion, setIsReducedMotion] = useState(false)
    const [activeVideoIndex, setActiveVideoIndex] = useState(0)
    const [showControls, setShowControls] = useState(false)

    // State for selected video and modal
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null)
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(-1)
    const [isModalOpen, setIsModalOpen] = useState(false)

    // Get unique videos (filter out duplicates)
    const uniqueVideos = longFormVideos.filter((video, index) => {
        return longFormVideos.findIndex((v) => v.videoId === video.videoId && v.title === video.title) === index
    })

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)")
        setIsReducedMotion(mediaQuery.matches)

        const handleChange = () => {
            setIsReducedMotion(mediaQuery.matches)
        }

        mediaQuery.addEventListener("change", handleChange)
        return () => {
            mediaQuery.removeEventListener("change", handleChange)
        }
    }, [])

    // Check if device is mobile - with cleanup
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768)
        }

        checkMobile()
        const resizeHandler = () => {
            // Debounce resize event
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(checkMobile)
            } else {
                checkMobile()
            }
        }

        window.addEventListener("resize", resizeHandler)

        return () => {
            window.removeEventListener("resize", resizeHandler)
        }
    }, [])

    // Handle video selection
    const handleVideoSelect = useCallback((video: Video) => {
        const index = longFormVideos.findIndex((v) => v.videoId === video.videoId && v.title === video.title)
        setSelectedVideo(video)
        setSelectedVideoIndex(index)
        setIsModalOpen(true)
    }, [])

    // Navigation handlers - memoized
    const handleNextVideo = useCallback(() => {
        if (selectedVideoIndex < longFormVideos.length - 1) {
            const nextVideo = longFormVideos[selectedVideoIndex + 1]
            setSelectedVideo(nextVideo)
            setSelectedVideoIndex(selectedVideoIndex + 1)
        }
    }, [selectedVideoIndex])

    const handlePreviousVideo = useCallback(() => {
        if (selectedVideoIndex > 0) {
            const prevVideo = longFormVideos[selectedVideoIndex - 1]
            setSelectedVideo(prevVideo)
            setSelectedVideoIndex(selectedVideoIndex - 1)
        }
    }, [selectedVideoIndex])

    // Jump to specific video index
    const handleJumpToVideo = useCallback((index: number) => {
        if (index >= 0 && index < longFormVideos.length) {
            const video = longFormVideos[index]
            setSelectedVideo(video)
            setSelectedVideoIndex(index)
        }
    }, [])

    // Close modal - memoized
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false)
        // Optional: delay clearing the selected video to allow for exit animation
        setTimeout(() => setSelectedVideo(null), 300)
    }, [])

    // Animation for main content - optimized
    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    // Optimized marquee animation with respect for reduced motion preferences
    useEffect(() => {
        if (!marqueeRef.current || isPaused || isReducedMotion) return

        let animationId: number
        let lastTimestamp: number

        const animate = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp

            // Smoother animation with requestAnimationFrame
            lastTimestamp = timestamp
            setScrollPosition((prev) => {
                // Move from right to left with consistent speed
                const newPosition = prev + 0.5 // Slower, smoother speed

                // Reset when we've scrolled far enough
                if (newPosition >= (marqueeRef.current?.scrollWidth || 0) / 2) {
                    return 0
                }
                return newPosition
            })

            animationId = requestAnimationFrame(animate)
        }

        animationId = requestAnimationFrame(animate)

        return () => {
            cancelAnimationFrame(animationId)
        }
    }, [isPaused, isReducedMotion])

    // Apply scroll position to marquee with transform optimization
    useEffect(() => {
        if (marqueeRef.current) {
            // Use transform3d for hardware acceleration
            marqueeRef.current.style.transform = `translate3d(-${scrollPosition}px, 0, 0)`
        }
    }, [scrollPosition])

    // Handle navigation to first video
    const handleFirstVideo = useCallback(() => {
        if (uniqueVideos.length > 0) {
            handleVideoSelect(uniqueVideos[0])
        }
    }, [uniqueVideos, handleVideoSelect])

    // Handle navigation to last video
    const handleLastVideo = useCallback(() => {
        if (uniqueVideos.length > 0) {
            handleVideoSelect(uniqueVideos[uniqueVideos.length - 1])
        }
    }, [uniqueVideos, handleVideoSelect])

    // Handle direct navigation to specific video
    const handleNavigateToVideo = useCallback(
        (index: number) => {
            if (index >= 0 && index < uniqueVideos.length) {
                setActiveVideoIndex(index)
                // Scroll to the video if needed
                const videoElements = document.querySelectorAll(".video-card")
                if (videoElements && videoElements[index]) {
                    videoElements[index].scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    })
                }
            }
        },
        [uniqueVideos.length],
    )

    // Handle carousel navigation - Fixed to properly navigate
    const handleNavigation = (direction: "prev" | "next") => {
        if (direction === "prev") {
            setScrollPosition((prev) => {
                const newPosition = Math.max(0, prev - 500) // Move left by 500px
                return newPosition
            })
        } else {
            setScrollPosition((prev) => {
                const maxScroll = (marqueeRef.current?.scrollWidth || 0) / 2
                const newPosition = Math.min(maxScroll, prev + 500) // Move right by 500px
                return newPosition
            })
        }
    }

    return (
        <section
            className="relative w-full py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]"
            ref={ref}
            aria-label="Long form content section"
            onMouseEnter={() => setShowControls(true)}
            onMouseLeave={() => setShowControls(false)}
        >
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
                            animate={
                                isReducedMotion
                                    ? {}
                                    : {
                                        backgroundPosition: ["0% center", "100% center", "0% center"],
                                    }
                            }
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

                {/* Video navigation controls */}
                <div
                    className={`flex justify-center mb-6 transition-opacity duration-300 ${showControls ? "opacity-100" : "opacity-0 sm:opacity-100"}`}
                >
                    <div className="bg-black/40 backdrop-blur-sm rounded-full p-1 flex items-center">
                        <button
                            onClick={handleFirstVideo}
                            className="p-2 text-white hover:text-[#ff6b3d] transition-colors"
                            aria-label="First video"
                            title="First video"
                        >
                            <SkipBack className="w-5 h-5" />
                        </button>

                        {uniqueVideos.map((_, idx) => (
                            <button
                                key={`nav-${idx}`}
                                onClick={() => handleNavigateToVideo(idx)}
                                className={`w-2 h-2 mx-1 rounded-full transition-all duration-300 ${activeVideoIndex === idx ? "bg-[#ff6b3d] scale-125" : "bg-white/50 hover:bg-white/80"
                                    }`}
                                aria-label={`Go to video ${idx + 1}`}
                                title={`Go to video ${idx + 1}`}
                            />
                        ))}

                        <button
                            onClick={handleLastVideo}
                            className="p-2 text-white hover:text-[#ff6b3d] transition-colors"
                            aria-label="Last video"
                            title="Last video"
                        >
                            <SkipForward className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Enhanced marquee container with right-to-left animation */}
                <div
                    className="relative overflow-hidden mb-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    aria-label="Video carousel"
                >
                    {/* Enhanced navigation arrows for tablet and desktop - Fixed to properly handle click events */}
                    {!isMobile && (
                        <>
                            <motion.button
                                className="absolute left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/80 transition-colors shadow-lg"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleNavigation("prev")
                                }}
                                aria-label="Previous videos"
                                whileHover={{ scale: 1.1, boxShadow: "0 0 15px 2px rgba(255, 107, 61, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronLeft className="h-6 w-6" />
                            </motion.button>

                            <motion.button
                                className="absolute right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/80 transition-colors shadow-lg"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    handleNavigation("next")
                                }}
                                aria-label="Next videos"
                                whileHover={{ scale: 1.1, boxShadow: "0 0 15px 2px rgba(255, 107, 61, 0.3)" }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <ChevronRight className="h-6 w-6" />
                            </motion.button>
                        </>
                    )}

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
                            <div key={`first-${index}`} className="px-4 w-[350px] sm:w-[450px] md:w-[500px] video-card">
                                <VideoCard video={video} index={index} onVideoSelect={handleVideoSelect} />
                            </div>
                        ))}

                        {/* Duplicate set for continuous scrolling */}
                        {longFormVideos.slice(0, 3).map((video, index) => (
                            <div key={`second-${index}`} className="px-4 w-[350px] sm:w-[450px] md:w-[500px] video-card">
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

                {/* Video controls and shortcuts */}
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                    <button
                        onClick={handleFirstVideo}
                        className="text-xs text-white hover:text-[#ff6b3d] transition-colors duration-300 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1"
                    >
                        <SkipBack className="w-3 h-3" /> First Video
                    </button>

                    <button
                        onClick={() => {
                            if (uniqueVideos.length > 0) {
                                handleVideoSelect(uniqueVideos[0])
                            }
                        }}
                        className="text-xs text-white hover:text-[#ff6b3d] transition-colors duration-300 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm"
                    >
                        View keyboard shortcuts
                    </button>

                    <button
                        onClick={handleLastVideo}
                        className="text-xs text-white hover:text-[#ff6b3d] transition-colors duration-300 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm flex items-center gap-1"
                    >
                        Last Video <SkipForward className="w-3 h-3" />
                    </button>
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
                onJumpTo={handleJumpToVideo}
                allVideos={longFormVideos}
            />
        </section>
    )
}
