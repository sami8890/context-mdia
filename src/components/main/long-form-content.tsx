"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useAnimation, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Simple Video interface
interface Video {
    videoId: string;
}

// Sample videos
const longFormVideos = [
    { videoId: "lEeV1Sa7wjo" },
    { videoId: "LWijamQNckM" },
    { videoId: "5GL5oCrDxdI" },
];

// Video Modal Component
interface VideoModalProps {
    video: Video | null;
    isOpen: boolean;
    onClose: () => void;
    onNext?: () => void;
    onPrevious?: () => void;
    hasNext: boolean;
    hasPrevious: boolean;
}

const VideoModal = ({
    video,
    isOpen,
    onClose,
    onNext,
    onPrevious,
    hasNext,
    hasPrevious,
}: VideoModalProps) => {
    const modalRef = useRef<HTMLDivElement | null>(null);

    // Close on escape key and handle arrow navigation
    useEffect(() => {
        const handleKeydown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowRight" && onNext && hasNext) onNext();
            if (e.key === "ArrowLeft" && onPrevious && hasPrevious) onPrevious();
        };

        window.addEventListener("keydown", handleKeydown);
        return () => window.removeEventListener("keydown", handleKeydown);
    }, [onClose, onNext, onPrevious, hasNext, hasPrevious]);

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

    if (!video) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/95 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        ref={modalRef}
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", damping: 25 }}
                        className="relative w-full max-w-5xl aspect-video bg-black rounded-lg overflow-hidden shadow-2xl border border-white/10"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <iframe
                            src={`https://www.youtube.com/embed/${video.videoId}?autoplay=1&rel=0&modestbranding=1`}
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
                            className="w-full h-full"
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>

                        {/* Navigation buttons - moved to top-right */}
                        <div className="absolute top-4 right-4 flex items-center gap-2 z-10">
                            {hasPrevious && (
                                <button
                                    onClick={onPrevious}
                                    className="bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm"
                                    aria-label="Previous video"
                                >
                                    ←
                                </button>
                            )}
                            {hasNext && (
                                <button
                                    onClick={onNext}
                                    className="bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm"
                                    aria-label="Next video"
                                >
                                    →
                                </button>
                            )}
                            <button
                                onClick={onClose}
                                className="bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm"
                                aria-label="Close video"
                            >
                                ×
                            </button>
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

// Video Card Component
const VideoCard = ({ video, index, onVideoSelect }: { video: Video; index: number; onVideoSelect: (video: Video) => void }) => {
    const cardRef = useRef(null);
    const isInView = useInView(cardRef, { once: true, amount: 0.3 });

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            className="group"
        >
            <div
                className="relative aspect-video overflow-hidden rounded-lg cursor-pointer shadow-lg hover:shadow-xl transition-all duration-300"
                onClick={() => onVideoSelect(video)}
                role="button"
                tabIndex={0}
            >
                <Image
                    src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
                    alt="Video thumbnail"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    width={1280}
                    height={720}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>

                {/* Play button overlay */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm group-hover:bg-white/30 transition-all">
                        <div className="w-0 h-0 border-y-8 border-y-transparent border-l-[12px] border-l-white ml-1"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Main Component
export default function LongFormContent() {
    const ref = useRef(null);
    const controls = useAnimation();
    const inView = useInView(ref, { once: false, amount: 0.2 });

    const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);
    const [selectedVideoIndex, setSelectedVideoIndex] = useState(-1);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Animation control
    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    // Handle video selection
    const handleVideoSelect = useCallback((video: Video) => {
        const index: number = longFormVideos.findIndex((v: Video) => v.videoId === video.videoId);
        setSelectedVideo(video);
        setSelectedVideoIndex(index);
        setIsModalOpen(true);
    }, []);

    // Close modal
    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedVideo(null), 300);
    }, []);

    return (
        <section
            ref={ref}
            className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]"
            aria-label="Long form content section"
        >
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={controls}
                    variants={{
                        visible: { opacity: 1, y: 0 },
                        hidden: { opacity: 0, y: 20 },
                    }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-12"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4">
                        <span className="text-white">Long Form </span>
                        <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
                            Content
                        </span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        Explore our in-depth video content created to help you master new skills
                    </p>
                </motion.div>

                {/* Video grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {longFormVideos.map((video, index) => (
                        <VideoCard
                            key={`${video.videoId}-${index}`}
                            video={video}
                            index={index}
                            onVideoSelect={handleVideoSelect}
                        />
                    ))}
                </div>
            </div>

            {/* Video modal */}
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
            />
        </section>
    );
}
