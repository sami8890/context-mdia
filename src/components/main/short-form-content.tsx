"use client"

import { useRef, useEffect, useState } from "react"
import { MoreVertical, Play, ChevronLeft, ChevronRight, Clock, User, Share2, Heart, Maximize, Info } from "lucide-react"
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion"
import { cn } from "@/lib/utils"
import { useMobile } from "@/lib/use-mobile"

// Updated to match the image structure with original data
const shortFormVideos = [
    {
        title: "WHY 95%",
        videoId: "tgbNymZ7vqY", // YouTube ID from first link
        tag: "S2 V1",
        author: "Ahmad Tiasan",
        duration: "0:15",
        platform: "youtube",
    },
    {
        title: "DISPOSABLE DIAPERS CONTAIN\nHARMFUL CHEMICALS",
        videoId: "tgbNymZ7vqY", // YouTube ID from second link
        tag: "book 1",
        author: "Ahmad Tiasan",
        duration: "0:30",
        platform: "youtube",
    },
    {
        title: "MAKE",
        videoId: "tgbNymZ7vqY", // YouTube ID from third link
        tag: "Final in p",
        author: "Ahmad Tiasan",
        duration: "0:22",
        platform: "youtube",
    },
    {
        title: "THE SAD",
        videoId: "tgbNymZ7vqY", // YouTube ID from fourth link
        tag: "final sample",
        author: "Ahmad Tiasan",
        duration: "0:18",
        platform: "youtube",
    },
    {
        title: "GROWTH HACK",
        videoId: "tgbNymZ7vqY", // Reusing first link as example
        tag: "S2 V1",
        author: "Ahmad Tiasan",
        duration: "0:25",
        platform: "youtube",
    },
    {
        title: "10X RESULTS",
        videoId: "tgbNymZ7vqY", // Reusing second link as example
        tag: "book 1",
        author: "Ahmad Tiasan",
        duration: "0:20",
        platform: "youtube",
    },
]

interface VideoItemProps {
    video: {
        title: string
        videoId: string
        tag: string
        author: string
        duration: string
        platform: string
    }
    index: number
    onPlay: (index: number) => void
    isPlaying: boolean
}

const VideoItem = ({ video, index, onPlay, isPlaying }: VideoItemProps) => {
    const videoRef = useRef<HTMLDivElement>(null)
    const [isHovered, setIsHovered] = useState(false)
    const [isLoaded, setIsLoaded] = useState(false)
    const [showControls, setShowControls] = useState(false)
    const [liked, setLiked] = useState(false)

    // Add this function inside the VideoItem component, right after the useState declarations
    const handleFullscreen = () => {
        if (!videoRef.current) return

        if (document.fullscreenElement) {
            document.exitFullscreen()
        } else {
            videoRef.current.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`)
            })
        }
    }

    // Load YouTube video
    useEffect(() => {
        if (!videoRef.current) return

        if (isPlaying) {
            // Create YouTube iframe with enhanced parameters
            const iframe = document.createElement("iframe")
            iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&loop=0&controls=1&rel=0&modestbranding=1&playsinline=1&enablejsapi=1`
            iframe.allow =
                "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            iframe.className = "absolute inset-0 w-full h-full z-10"
            iframe.style.border = "0"
            iframe.id = `youtube-player-${index}`
            iframe.onload = () => setIsLoaded(true)

            // Clear existing content and append iframe
            if (videoRef.current.querySelector("iframe")) {
                videoRef.current.querySelector("iframe")?.remove()
            }
            videoRef.current.appendChild(iframe)

            // Add a message to indicate keyboard shortcuts are available
            const keyboardHint = document.createElement("div")
            keyboardHint.className =
                "absolute bottom-12 left-1/2 transform -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full z-20 opacity-0 transition-opacity duration-300"
            keyboardHint.textContent = "Press 'f' for fullscreen, 'Esc' to close"
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
        } else {
            // Remove iframe when not playing
            if (videoRef.current.querySelector("iframe")) {
                videoRef.current.querySelector("iframe")?.remove()
                setIsLoaded(false)
            }
        }

        return () => {
            // Cleanup on unmount
            if (videoRef.current?.querySelector("iframe")) {
                videoRef.current.querySelector("iframe")?.remove()
            }
        }
    }, [isPlaying, video.videoId, index])

    // Toggle video controls visibility
    useEffect(() => {
        if (isPlaying) {
            const timer = setTimeout(() => {
                setShowControls(false)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [isPlaying, showControls])

    // Add keyboard shortcuts for the video item
    // Add this useEffect inside the VideoItem component, after the existing useEffect hooks
    useEffect(() => {
        if (!isPlaying) return

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "f") {
                handleFullscreen()
            }
            if (e.key === "m") {
                // Toggle mute (would need to be implemented with YouTube iframe API)
                const iframe = videoRef.current?.querySelector("iframe")
                if (iframe) {
                    // This is a simplified approach - in a real implementation, you'd use the YouTube Player API
                    const src = iframe.src
                    if (src.includes("mute=1")) {
                        iframe.src = src.replace("mute=1", "mute=0")
                    } else {
                        iframe.src = src.replace("mute=0", "mute=1")
                    }
                }
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isPlaying])

    return (
        <motion.div
            className={cn(
                "relative aspect-[9/16] w-[280px] flex-shrink-0 rounded-xl overflow-hidden group cursor-pointer",
                "transition-all duration-300 shadow-lg",
                isPlaying ? "ring-2 ring-[#ff6b3d] shadow-lg shadow-[#ff6b3d]/20" : "hover:shadow-xl hover:shadow-[#ff6b3d]/10",
            )}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            onMouseEnter={() => {
                setIsHovered(true)
                if (isPlaying) setShowControls(true)
            }}
            onMouseLeave={() => {
                setIsHovered(false)
                if (isPlaying) setShowControls(false)
            }}
            onClick={() => {
                if (isPlaying) {
                    setShowControls(!showControls)
                } else {
                    onPlay(index)
                }
            }}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
        >
            {/* Video container */}
            <div ref={videoRef} className="w-full h-full relative bg-black">
                {/* YouTube preview (shows client's face) */}
                {!isPlaying && (
                    <div className="absolute inset-0 overflow-hidden">
                        <img
                            src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                            alt={video.title}
                            className={cn(
                                "w-full h-full object-cover transition-transform duration-700",
                                isHovered ? "scale-110" : "scale-100",
                            )}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
                    </div>
                )}

                {/* Loading indicator */}
                {isPlaying && !isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
                        <div className="w-12 h-12 rounded-full border-4 border-[#ff6b3d]/30 border-t-[#ff6b3d] animate-spin"></div>
                    </div>
                )}

                {/* Play button overlay (on hover) */}
                {!isPlaying && isHovered && (
                    <motion.div
                        className="absolute inset-0 flex items-center justify-center z-20 bg-black/40 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                    >
                        <motion.div
                            className="w-16 h-16 rounded-full bg-[#ff6b3d]/90 flex items-center justify-center shadow-lg shadow-[#ff6b3d]/30"
                            initial={{ scale: 0.8 }}
                            animate={{ scale: 1 }}
                            transition={{
                                type: "spring",
                                stiffness: 400,
                                damping: 10,
                            }}
                            whileHover={{
                                scale: 1.1,
                                boxShadow: "0 0 20px 5px rgba(255, 107, 61, 0.3)",
                            }}
                        >
                            <Play className="h-8 w-8 text-white fill-white ml-1" />
                        </motion.div>
                    </motion.div>
                )}
            </div>

            {/* Top overlay with avatar, tag and menu */}
            <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center z-30">
                <div className="flex items-center gap-2">
                    <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-[#ff6b3d] to-[#ff4d00] flex items-center justify-center text-white shadow-lg"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                    >
                        <User className="h-4 w-4" />
                    </motion.div>
                    <motion.span
                        className="text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full border border-white/10"
                        whileHover={{ backgroundColor: "rgba(255, 107, 61, 0.3)" }}
                    >
                        {video.tag}
                    </motion.span>
                </div>
                <motion.button
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                    aria-label="Video info"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation()
                        // Show video info tooltip
                        const tooltip = document.createElement("div")
                        tooltip.className =
                            "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black/90 text-white p-4 rounded-lg z-50 max-w-xs"
                        tooltip.innerHTML = `
              <h3 class="text-lg font-bold mb-2">${video.title}</h3>
              <p class="text-sm mb-2">By ${video.author}</p>
              <p class="text-sm mb-2">Duration: ${video.duration}</p>
              <p class="text-sm mb-2">Tag: ${video.tag}</p>
              <p class="text-xs text-gray-400 mt-4">Click anywhere to close</p>
            `
                        document.body.appendChild(tooltip)

                        // Close on click
                        const handleClick = () => {
                            tooltip.style.opacity = "0"
                            tooltip.style.transition = "opacity 0.3s ease"
                            setTimeout(() => {
                                document.body.removeChild(tooltip)
                                document.removeEventListener("click", handleClick)
                            }, 300)
                        }

                        document.addEventListener("click", handleClick)
                    }}
                >
                    <Info className="h-4 w-4" />
                </motion.button>
                <motion.button
                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/60 transition-colors"
                    aria-label="More options"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                        e.stopPropagation()
                        // Menu functionality here
                    }}
                >
                    <MoreVertical className="h-4 w-4" />
                </motion.button>
            </div>

            {/* Author name with enhanced styling */}
            <div className="absolute top-12 left-0 p-3 z-30">
                <motion.span
                    className="text-xs font-medium text-white bg-black/60 backdrop-blur-sm px-2 py-0.5 rounded-full flex items-center gap-1 border border-white/10"
                    whileHover={{ backgroundColor: "rgba(255, 107, 61, 0.3)" }}
                >
                    <User className="h-3 w-3" />
                    {video.author}
                </motion.span>
            </div>

            {/* Title overlay with animated reveal */}
            {!isPlaying && (
                <motion.div
                    className="absolute left-0 right-0 bottom-16 p-3 z-30"
                    initial={{ y: 10, opacity: 0.8 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                >
                    <h3 className="text-white text-xl font-bold drop-shadow-lg whitespace-pre-line">
                        {video.title.split("\n").map((line, i) => (
                            <span key={i} className={i === 1 ? "text-[#ff6b3d]" : ""}>
                                {line}
                                {i === 0 && video.title.includes("\n") && <br />}
                            </span>
                        ))}
                    </h3>
                </motion.div>
            )}

            {/* Video controls (when not playing) */}
            {!isPlaying && (
                <div className="absolute bottom-0 left-0 right-0 p-3 flex items-center gap-2 z-30">
                    <motion.div
                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 107, 61, 0.6)" }}
                    >
                        <Play className="h-4 w-4 fill-white ml-0.5" />
                    </motion.div>
                    <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                        <div className="h-full w-1/3 bg-[#ff6b3d] rounded-full"></div>
                    </div>
                    <span className="text-xs text-white flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {video.duration}
                    </span>
                </div>
            )}

            {/* Enhance the video controls when playing */}
            {isPlaying && (
                <AnimatePresence>
                    {showControls && (
                        <motion.div
                            className="absolute inset-0 z-30 flex flex-col justify-between bg-gradient-to-t from-black/70 via-transparent to-black/70 p-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {/* Top controls */}
                            <div className="flex justify-between">
                                <motion.button
                                    className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
                                    whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 107, 61, 0.6)" }}
                                    whileTap={{ scale: 0.9 }}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        onPlay(index) // Stop playing
                                    }}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </motion.button>

                                <div className="flex gap-2">
                                    <motion.button
                                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 107, 61, 0.6)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            setLiked(!liked)
                                        }}
                                    >
                                        <Heart className={cn("h-4 w-4", liked && "fill-[#ff6b3d] text-[#ff6b3d]")} />
                                    </motion.button>

                                    <motion.button
                                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 107, 61, 0.6)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            handleFullscreen()
                                        }}
                                    >
                                        <Maximize className="h-4 w-4" />
                                    </motion.button>

                                    <motion.button
                                        className="w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white"
                                        whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 107, 61, 0.6)" }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={(e) => {
                                            e.stopPropagation()
                                            // Share functionality
                                            if (navigator.share) {
                                                navigator
                                                    .share({
                                                        title: video.title,
                                                        text: `Check out this video by ${video.author}`,
                                                        url: `https://youtube.com/shorts/${video.videoId}`,
                                                    })
                                                    .catch((err) => console.error("Error sharing:", err))
                                            } else {
                                                navigator.clipboard.writeText(`https://youtube.com/shorts/${video.videoId}`)
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
                                        }}
                                    >
                                        <Share2 className="h-4 w-4" />
                                    </motion.button>
                                </div>
                            </div>

                            {/* Bottom info */}
                            <div>
                                <h4 className="text-white text-sm font-bold mb-1">{video.title}</h4>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs text-white bg-[#ff6b3d]/80 px-2 py-0.5 rounded-full">{video.tag}</span>
                                    <span className="text-xs text-white">{video.duration}</span>
                                    <span className="text-xs text-white/70">Press &apos;f&apos; for fullscreen</span>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </motion.div>
    )
}

export default function ShortFormContent() {
    const controls = useAnimation()
    const ref = useRef<HTMLElement>(null)
    const marqueeRef = useRef<HTMLDivElement>(null)
    const inView = useInView(ref, { once: false })
    const [isPaused, setIsPaused] = useState(false)
    const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
    const [currentPage, setCurrentPage] = useState(0)
    const isMobile = useMobile()
    const isTablet = useMobile()

    // Add a "View All" modal to show all videos in a grid
    // Add this state at the beginning of the ShortFormContent component
    const [showAllVideos, setShowAllVideos] = useState(false)

    // Handle video play/pause
    const handleVideoPlay = (index: number) => {
        // If clicking on the currently playing video, stop it
        if (activeVideoIndex === index) {
            setActiveVideoIndex(null)
            setIsPaused(false) // Resume marquee when video stops
        } else {
            // Stop any currently playing video
            setActiveVideoIndex(index)
            setIsPaused(true) // Ensure marquee stops when video plays

            // Scroll to the video if needed (for mobile view)
            if (isMobile) {
                const videoElements = document.querySelectorAll(".snap-center")
                if (videoElements && videoElements[index]) {
                    videoElements[index].scrollIntoView({
                        behavior: "smooth",
                        block: "nearest",
                        inline: "center",
                    })
                }
            }

            // Update current page to match the video index (for pagination)
            setCurrentPage(Math.floor(index / getItemsPerPage()))
        }
    }

    // Calculate items per page based on screen size
    const getItemsPerPage = () => {
        if (isMobile) return 1
        if (isTablet) return 2
        return 4
    }

    // Handle carousel navigation - Fixed to properly navigate
    const handleNavigation = (direction: "prev" | "next") => {
        const itemsPerPage = getItemsPerPage()
        const totalPages = Math.ceil(shortFormVideos.length / itemsPerPage)

        if (direction === "prev") {
            setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1))
        } else {
            setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0))
        }

        // Stop any playing videos when navigating
        setActiveVideoIndex(null)

        // Scroll to the appropriate position in the marquee
        if (marqueeRef.current) {
            const newPosition =
                direction === "next"
                    ? (currentPage + 1) * (280 + 24) // width of video + gap
                    : (currentPage - 1) * (280 + 24)

            marqueeRef.current.style.transform = `translateX(-${newPosition}px)`
        }
    }

    useEffect(() => {
        if (inView) {
            controls.start("visible")
        }
    }, [controls, inView])

    // Reset active video when screen size changes
    useEffect(() => {
        setActiveVideoIndex(null)
    }, [isMobile, isTablet])

    // Add keyboard shortcuts for navigation
    // Add this useEffect after the existing useEffect hooks in the ShortFormContent component
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            // Only handle keyboard events when not typing in an input
            if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return

            switch (e.key) {
                case "ArrowLeft":
                    handleNavigation("prev")
                    break
                case "ArrowRight":
                    handleNavigation("next")
                    break
                case "Escape":
                    if (activeVideoIndex !== null) {
                        setActiveVideoIndex(null)
                        setIsPaused(false)
                    }
                    break
                case " ": // Space bar
                    e.preventDefault() // Prevent page scrolling
                    if (activeVideoIndex !== null) {
                        setActiveVideoIndex(null)
                        setIsPaused(false)
                    } else {
                        setActiveVideoIndex(0)
                        setIsPaused(true)
                    }
                    break
            }
        }

        window.addEventListener("keydown", handleKeyDown)
        return () => window.removeEventListener("keydown", handleKeyDown)
    }, [activeVideoIndex])

    // Update the "View All" button to open the modal
    // Replace the existing "View All" button with this enhanced version
    return (
        <section className="relative w-full py-16 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]" ref={ref}>
            {/* Enhanced background elements with animations */}
            <div className="absolute inset-0 z-0 overflow-hidden">
                <div className="absolute top-0 left-0 w-1/3 h-1/3 bg-[#ff6b3d]/5 blur-[120px] rounded-full animate-pulse"></div>
                <div className="absolute bottom-0 right-0 w-1/4 h-1/4 bg-[#ff4d00]/5 blur-[100px] rounded-full"></div>
                <div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/2 bg-[#ff6b3d]/3 blur-[150px] rounded-full opacity-20 animate-pulse"
                    style={{ animationDuration: "4s" }}
                ></div>
                <div
                    className="absolute bottom-1/3 right-1/4 w-1/5 h-1/5 bg-[#ff6b3d]/4 blur-[100px] rounded-full animate-pulse"
                    style={{ animationDuration: "7s", animationDelay: "2s" }}
                ></div>
            </div>

            <div className="container relative z-10 mx-auto max-w-7xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-10"
                >
                    <motion.div
                        className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 rounded-full backdrop-blur-sm border border-gray-800 hover:border-[#ff6b3d]/30 transition-colors"
                        whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 107, 61, 0.05)" }}
                    >
                        <motion.span
                            className="text-[#ff6b3d] text-xs"
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
                        <span className="text-gray-400 text-xs font-medium">Explore My Popular Projects</span>
                    </motion.div>

                    <h2 className="text-3xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Short Form </span>
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

                    <p className="text-gray-400 max-w-2xl">
                        Engaging short-form videos optimized for social media platforms. Click on any video to play.
                    </p>
                </motion.div>

                {/* Content container with responsive handling */}
                <div className="relative">
                    {/* Enhanced navigation arrows for tablet and desktop - Fixed to properly handle click events */}
                    {!isMobile && (
                        <>
                            <motion.button
                                className="absolute -left-4 md:left-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/80 transition-colors shadow-lg"
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
                                className="absolute -right-4 md:right-0 top-1/2 -translate-y-1/2 z-30 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm flex items-center justify-center text-white hover:bg-[#ff6b3d]/80 transition-colors shadow-lg"
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

                    {/* Mobile view - enhanced snap scroll */}
                    {isMobile ? (
                        <div className="relative">
                            <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 scrollbar-hide">
                                {shortFormVideos.map((video, index) => (
                                    <div key={index} className="snap-center">
                                        <VideoItem
                                            video={video}
                                            index={index}
                                            isPlaying={activeVideoIndex === index}
                                            onPlay={handleVideoPlay}
                                        />
                                    </div>
                                ))}
                            </div>

                            {/* Enhanced mobile pagination indicators */}
                            <div className="flex justify-center mt-4 gap-1.5">
                                {shortFormVideos.map((_, index) => (
                                    <motion.button
                                        key={index}
                                        className={cn(
                                            "h-2 rounded-full transition-all duration-300",
                                            activeVideoIndex === index || (activeVideoIndex === null && index === currentPage)
                                                ? "bg-[#ff6b3d] w-6"
                                                : "bg-gray-600 hover:bg-gray-500 w-2",
                                        )}
                                        whileHover={{ scale: 1.2 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => {
                                            setCurrentPage(index)
                                            setActiveVideoIndex(null)
                                            // Scroll to the video
                                            document.querySelectorAll(".snap-center")[index].scrollIntoView({
                                                behavior: "smooth",
                                                inline: "center",
                                            })
                                        }}
                                        aria-label={`Go to video ${index + 1}`}
                                    >
                                        {activeVideoIndex === index && (
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
                        </div>
                    ) : (
                        /* Enhanced Tablet and Desktop view with marquee */
                        <div
                            className="relative overflow-hidden"
                            onMouseEnter={() => setIsPaused(true)}
                            onMouseLeave={() => !activeVideoIndex && setIsPaused(false)}
                        >
                            {/* Gradient overlays for fade effect */}
                            <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-r from-[#0c0c0c] to-transparent z-10"></div>
                            <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-24 bg-gradient-to-l from-[#0c0c0c] to-transparent z-10"></div>

                            <AnimatePresence>
                                <motion.div
                                    ref={marqueeRef}
                                    className="flex gap-6 py-4"
                                    initial={{ x: 0 }}
                                    animate={{ x: isPaused ? "0%" : "-50%" }}
                                    transition={{
                                        repeat: isPaused ? 0 : Number.POSITIVE_INFINITY,
                                        repeatType: "loop",
                                        duration: 30,
                                        ease: "linear",
                                    }}
                                >
                                    {/* First set of videos */}
                                    {shortFormVideos.map((video, index) => (
                                        <VideoItem
                                            key={`first-${index}`}
                                            video={video}
                                            index={index}
                                            isPlaying={activeVideoIndex === index}
                                            onPlay={handleVideoPlay}
                                        />
                                    ))}

                                    {/* Duplicate set for seamless loop */}
                                    {shortFormVideos.map((video, index) => (
                                        <VideoItem
                                            key={`second-${index}`}
                                            video={video}
                                            index={index + shortFormVideos.length}
                                            isPlaying={activeVideoIndex === index + shortFormVideos.length}
                                            onPlay={(i) => handleVideoPlay(i - shortFormVideos.length)}
                                        />
                                    ))}
                                </motion.div>
                            </AnimatePresence>

                            {/* Pause/Play indicator */}
                            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2">
                                <div
                                    className={`text-xs text-gray-500 bg-black/30 px-3 py-1 rounded-full backdrop-blur-sm transition-opacity duration-300 ${isPaused ? "opacity-100" : "opacity-0"}`}
                                >
                                    {isPaused ? "Paused" : "Playing"} • Hover to pause • Touch to interact
                                </div>
                            </div>
                            {activeVideoIndex !== null && (
                                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 z-20">
                                    <div className="text-xs text-white bg-[#ff6b3d]/80 px-3 py-1 rounded-full backdrop-blur-sm">
                                        Video Playing • Click to close
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>

                {/* Enhanced View all button */}
                <div className="flex justify-center mt-12">
                    <motion.button
                        className="px-6 py-3 rounded-full bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-white font-medium hover:shadow-lg hover:shadow-[#ff6b3d]/20 transition-all relative overflow-hidden group"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setShowAllVideos(true)}
                    >
                        <span className="relative z-10">View All Videos</span>
                        <motion.span
                            className="absolute inset-0 bg-white/20 z-0"
                            initial={{ x: "-100%", opacity: 0 }}
                            whileHover={{ x: "100%", opacity: 0.3 }}
                            transition={{ duration: 0.6 }}
                        />
                    </motion.button>
                </div>
            </div>
            {/* View All Videos Modal */}
            <AnimatePresence>
                {showAllVideos && (
                    <motion.div
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowAllVideos(false)}
                    >
                        <motion.div
                            className="relative w-full max-w-7xl bg-[#0c0c0c] rounded-xl overflow-hidden border border-gray-800 p-6"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/60 text-white hover:bg-[#ff6b3d]/80 transition-colors"
                                onClick={() => setShowAllVideos(false)}
                            >
                                <ChevronLeft className="h-5 w-5" />
                            </button>

                            <h2 className="text-2xl md:text-3xl font-bold mb-6 text-white">All Short Form Videos</h2>

                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 overflow-y-auto max-h-[70vh]">
                                {shortFormVideos.map((video, index) => (
                                    <motion.div
                                        key={index}
                                        className="relative aspect-[9/16] rounded-lg overflow-hidden cursor-pointer"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.05 }}
                                        whileHover={{ scale: 1.05 }}
                                        onClick={() => {
                                            setShowAllVideos(false)
                                            setTimeout(() => {
                                                setActiveVideoIndex(index)
                                                setIsPaused(true)
                                            }, 300)
                                        }}
                                    >
                                        <img
                                            src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                                            alt={video.title}
                                            className="w-full h-full object-cover"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

                                        <div className="absolute bottom-0 left-0 right-0 p-3">
                                            <h3 className="text-white text-sm font-bold">{video.title}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <span className="text-xs text-white bg-[#ff6b3d]/80 px-2 py-0.5 rounded-full">{video.tag}</span>
                                                <span className="text-xs text-white flex items-center gap-1">
                                                    <Clock className="h-3 w-3" />
                                                    {video.duration}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="absolute top-0 right-0 p-2">
                                            <div className="w-8 h-8 rounded-full bg-[#ff6b3d] flex items-center justify-center">
                                                <Play className="h-4 w-4 text-white fill-white ml-0.5" />
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            <div className="fixed bottom-4 right-4 z-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="bg-black/80 backdrop-blur-sm text-white text-xs p-3 rounded-lg shadow-lg border border-white/10">
                    <h4 className="font-bold mb-2 text-[#ff6b3d]">Keyboard Shortcuts</h4>
                    <ul className="space-y-1">
                        <li>← → : Navigate videos</li>
                        <li>Space : Play/Pause video</li>
                        <li>Esc : Close video</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
