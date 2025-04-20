"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
    motion,
    useAnimation,
    useInView,
    AnimatePresence,
} from "framer-motion";

// Updated Video interface to only include videoId
interface Video {
    videoId: string;
}

// Updated video data to only include videoId
const longFormVideos: Video[] = [
    { videoId: "lEeV1Sa7wjo" },
    { videoId: "LWijamQNckM" },
    { videoId: "5GL5oCrDxdI" },
    { videoId: "lEeV1Sa7wjo" },
    { videoId: "LWijamQNckM" },
    { videoId: "5GL5oCrDxdI" },
];

// Removed unused properties in VideoModal and VideoCard components
const VideoModal = ({
    video,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
    onPauseMarquee,
}: {
    video: Video | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    hasNext?: boolean;
    hasPrevious?: boolean;
    onJumpTo?: (index: number) => void;
    allVideos?: Video[];
    onPauseMarquee?: () => void;
}) => {
    const [isMuted, setIsMuted] = useState(false);
    const [, setIsFullscreen] = useState(false);
    const modalRef = useRef<HTMLDivElement>(null);
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [, setIsMobile] = useState(false);

    // Check if device is mobile
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        window.addEventListener("resize", checkMobile);

        return () => {
            window.removeEventListener("resize", checkMobile);
        };
    }, []);

    // Notify parent to pause marquee when video starts playing
    useEffect(() => {
        if (isOpen && onPauseMarquee) {
            onPauseMarquee();
        }
    }, [isOpen, onPauseMarquee]);

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!document.fullscreenElement) {
            modalRef.current?.requestFullscreen().catch((err) => {
                console.error(`Error attempting to enable fullscreen: ${err.message}`);
            });
            setIsFullscreen(true);
        } else {
            document.exitFullscreen();
            setIsFullscreen(false);
        }
    };

    // Close on escape key
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };

        // Handle arrow keys for navigation
        const handleArrowKeys = (e: KeyboardEvent) => {
            if (e.key === "ArrowRight" && onNext && hasNext) onNext();
            if (e.key === "ArrowLeft" && onPrevious && hasPrevious) onPrevious();
            if (e.key === "m") setIsMuted(!isMuted);
            if (e.key === "f") toggleFullscreen();
        };

        window.addEventListener("keydown", handleEsc);
        window.addEventListener("keydown", handleArrowKeys);

        return () => {
            window.removeEventListener("keydown", handleEsc);
            window.removeEventListener("keydown", handleArrowKeys);
        };
    }, [onClose, onNext, onPrevious, hasNext, hasPrevious, isMuted]);

    // Prevent body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [isOpen]);

    // Fullscreen change detection
    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    if (!video) return null;

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
                        <iframe
                            ref={iframeRef}
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&playsinline=1&showinfo=0&color=white`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                            id="video-player-iframe"
                        ></iframe>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

const VideoCard = ({
    video,
    index,
    onVideoSelect,
}: {
    video: Video;
    index: number;
    onVideoSelect: (video: Video) => void;
}) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group relative"
        >
            <div
                className="relative aspect-[16/10] overflow-hidden rounded-lg cursor-pointer shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#ff6b3d]/20 group"
                onClick={() => onVideoSelect(video)}
                role="button"
                aria-label={`Play video`}
                tabIndex={0}
            >
                <div className="absolute inset-0">
                    <img
                        src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                        alt="Video thumbnail"
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent"></div>
                </div>
            </div>
        </motion.div>
    );
};

// Updated uniqueVideos filter to only check videoId

// Performance optimizations for the main component
export default function LongFormContent() {
    const ref = useRef<HTMLElement>(null);
    const marqueeRef = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: false, amount: 0.2 });
    const controls = useAnimation();
    const [scrollPosition, setScrollPosition] = useState(0);
    const [isPaused, setIsPaused] = useState(false);
    const [, setIsMobile] = useState(false);
    const [isReducedMotion, setIsReducedMotion] = useState(false);
    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState<number>(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Check for reduced motion preference
    useEffect(() => {
        const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
        setIsReducedMotion(mediaQuery.matches);

        const handleChange = () => {
            setIsReducedMotion(mediaQuery.matches);
        };

        mediaQuery.addEventListener("change", handleChange);
        return () => {
            mediaQuery.removeEventListener("change", handleChange);
        };
    }, []);

    // Check if device is mobile - with cleanup
    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkMobile();
        const resizeHandler = () => {
            if (window.requestAnimationFrame) {
                window.requestAnimationFrame(checkMobile);
            } else {
                checkMobile();
            }
        };

        window.addEventListener("resize", resizeHandler);

        return () => {
            window.removeEventListener("resize", resizeHandler);
        };
    }, []);

    // Updated handleVideoSelect to only use videoId
    const handleVideoSelect = useCallback((video: Video) => {
        const index = longFormVideos.findIndex((v) => v.videoId === video.videoId);
        setSelectedVideo(video);
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
    }, []);

    // Updated handleJumpToVideo to only use videoId
    const handleJumpToVideo = useCallback((index: number) => {
        if (index >= 0 && index < longFormVideos.length) {
            const video = longFormVideos[index];
            setSelectedVideo(video);
            setSelectedVideoIndex(index);
        }
    }, []);

    // Pause marquee when a video is played
    const handlePauseMarquee = useCallback(() => {
        setIsPaused(true);
    }, []);

    // Close modal - memoized
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => {
            setSelectedVideo(null);
            setIsPaused(false);
        }, 300);
    }, []);

    // Animation for main content - optimized
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Optimized marquee animation with respect for reduced motion preferences
    useEffect(() => {
        if (!marqueeRef.current || isPaused || isReducedMotion) return;

        let animationId: number;
        let lastTimestamp: number;

        const animate = (timestamp: number) => {
            if (!lastTimestamp) lastTimestamp = timestamp;

            lastTimestamp = timestamp;
            setScrollPosition((prev) => {
                const newPosition = prev + 0.5;

                if (newPosition >= (marqueeRef.current?.scrollWidth || 0) / 2) {
                    return 0;
                }
                return newPosition;
            });

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => {
            cancelAnimationFrame(animationId);
        };
    }, [isPaused, isReducedMotion]);

    // Apply scroll position to marquee with transform optimization
    useEffect(() => {
        if (marqueeRef.current) {
            marqueeRef.current.style.transform = `translate3d(-${scrollPosition}px, 0, 0)`;
        }
    }, [scrollPosition]);

    return (
        <section
            className="relative w-full py-12 sm:py-16 md:py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]"
            ref={ref}
            aria-label="Long form content section"
        >
            <div className="container relative z-10 mx-auto max-w-7xl">
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
                                        backgroundPosition: [
                                            "0% center",
                                            "100% center",
                                            "0% center",
                                        ],
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
                        Explore our in-depth video content created to help you master new
                        skills
                    </p>
                </motion.div>

                {/* Pause and Start buttons */}
                <div className="flex justify-center gap-4 mb-6">
                    <button
                        onClick={() => setIsPaused(true)}
                        className="px-4 py-2 bg-[#ff6b3d] text-white rounded-lg hover:bg-[#ff4d00] transition-all"
                    >
                        Pause
                    </button>
                    <button
                        onClick={() => setIsPaused(false)}
                        className="px-4 py-2 bg-[#ff6b3d] text-white rounded-lg hover:bg-[#ff4d00] transition-all"
                    >
                        Start
                    </button>
                </div>

                <div
                    className="relative overflow-hidden mb-8"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onTouchStart={() => setIsPaused(true)}
                    onTouchEnd={() => setIsPaused(false)}
                    aria-label="Video carousel"
                >
                    <div
                        ref={marqueeRef}
                        className="flex transition-transform duration-1000 ease-linear py-4"
                        style={{ width: "fit-content" }}
                    >
                        {longFormVideos.slice(0, 3).map((video, index) => (
                            <div
                                key={`first-${index}`}
                                className="px-4 w-[350px] sm:w-[450px] md:w-[500px] video-card"
                            >
                                <VideoCard
                                    video={video}
                                    index={index}
                                    onVideoSelect={handleVideoSelect}
                                />
                            </div>
                        ))}

                        {longFormVideos.slice(0, 3).map((video, index) => (
                            <div
                                key={`second-${index}`}
                                className="px-4 w-[350px] sm:w-[450px] md:w-[500px] video-card"
                            >
                                <VideoCard
                                    video={video}
                                    index={index + 3}
                                    onVideoSelect={handleVideoSelect}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <VideoModal
                video={selectedVideo}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onNext={() => {
                    if (selectedVideoIndex < longFormVideos.length - 1) {
                        const nextVideo = longFormVideos[selectedVideoIndex + 1];
                        setSelectedVideo(nextVideo);
                        setSelectedVideoIndex(selectedVideoIndex + 1);
                    }
                }}
                onPrevious={() => {
                    if (selectedVideoIndex > 0) {
                        const prevVideo = longFormVideos[selectedVideoIndex - 1];
                        setSelectedVideo(prevVideo);
                        setSelectedVideoIndex(selectedVideoIndex - 1);
                    }
                }}
                hasNext={selectedVideoIndex < longFormVideos.length - 1}
                hasPrevious={selectedVideoIndex > 0}
                onJumpTo={handleJumpToVideo}
                allVideos={longFormVideos}
                onPauseMarquee={handlePauseMarquee}
            />
        </section>
    );
}
