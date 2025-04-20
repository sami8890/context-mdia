"use client"

import { useRef, useEffect, useState } from "react"
import { Play, X } from "lucide-react"
import { useMobile } from "@/lib/use-mobile"

// Update the shortFormVideos array to have clearer titles and consistent formatting
const shortFormVideos = [
  {
    videoId: "0oJu3eWKpEg",
    platform: "youtube",
  },
  {
    videoId: "wP7ISAAu6SU",
    platform: "youtube",
  },
  {
    
    videoId: "Kgm05VpjJ5A",
    platform: "youtube",
  },
  {
    videoId: "QRGHneSqbkA",    
    platform: "youtube",
  },
  {
    videoId: "1q5t0rCIkfk",
    platform: "youtube",
  },
  {
    videoId: "Oqj3xlJWzrs",
    platform: "youtube",
  },
]

interface VideoItemProps {
  video: {
    videoId: string
    platform: string
  }
  index: number
  onPlay: (index: number) => void
  isPlaying: boolean
  isMobile: boolean
}

const VideoItem = ({ video, index, onPlay, isPlaying }: VideoItemProps) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)

  // Load YouTube video
  useEffect(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      // Create YouTube iframe
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=0&rel=0&modestbranding=1&playsinline=1`
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.className = "absolute inset-0 w-full h-full z-10"
      iframe.style.border = "0"
      iframe.onload = () => setIsLoaded(true)

      // Clear existing content and append iframe
      if (videoRef.current.querySelector("iframe")) {
        videoRef.current.querySelector("iframe")?.remove()
      }
      videoRef.current.appendChild(iframe)
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
  }, [isPlaying, video.videoId])

  return (
    <div
      className="relative aspect-[9/16] w-[300px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer bg-black shadow-lg transform transition-transform duration-300 hover:scale-105"
      onClick={() => onPlay(index)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Video container */}
      <div ref={videoRef} className="w-full h-full relative">
        {/* YouTube preview */}
        {!isPlaying && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt="Video thumbnail"
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
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

        {/* Play button overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 rounded-full bg-[#ff6b3d]/90 flex items-center justify-center transform transition-transform duration-300 hover:scale-110">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Tag badge */}
      {!isPlaying && (
        <div className="absolute top-3 left-3 z-30">
        </div>
      )}

      {/* Title overlay */}
      {!isPlaying && (
        <div className="absolute left-0 right-0 bottom-0 p-3 z-30">
          <div className="flex items-center mt-1">
            <span className="mx-2 text-white/40">•</span>
          </div>
        </div>
      )}

      {/* Close button when playing */}
      {isPlaying && (
        <button
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white hover:bg-black/80 transition-colors"
          onClick={(e) => {
            e.stopPropagation()
            onPlay(index)
          }}
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  )
}

export default function ShortFormContent() {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
  const [currentPage, setCurrentPage] = useState(0)
  const [videosPerPage, setVideosPerPage] = useState(3)
  const isMobile = useMobile()

  // Calculate total pages
  const totalPages = Math.ceil(shortFormVideos.length / videosPerPage)

  // Get current page videos
  const currentVideos = shortFormVideos.slice(currentPage * videosPerPage, (currentPage + 1) * videosPerPage)

  // Handle video play/pause
  const handleVideoPlay = (index: number) => {
    // Calculate the actual index in the full array
    const actualIndex = currentPage * videosPerPage + index

    // If clicking on the currently playing video, stop it
    if (activeVideoIndex === actualIndex) {
      setActiveVideoIndex(null)
    } else {
      // Play the selected video
      setActiveVideoIndex(actualIndex)
    }
  }

  // Handle page navigation
  const goToPage = (pageNumber: number) => {
    setActiveVideoIndex(null) // Stop any playing video
    setCurrentPage(pageNumber)
  }

  // Toggle videos per page between 3 and 6
 
  return (
    <section className="w-full py-16 px-4 bg-[#0c0c0c]">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Professional and eye-catching heading */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative inline-block mb-2">
            <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#ff6b3d] opacity-20 blur-xl"></span>
            <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#ff6b3d] opacity-20 blur-xl"></span>
            <span className="text-sm font-semibold tracking-widest uppercase text-[#ff6b3d]">Premium Collection</span>
          </div>

          <h2 className="relative text-5xl md:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            <span className="text-white">Short Form</span>{" "}
            <span className="relative text-[#ff6b3d]">
              Content
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-[#ff6b3d]"></span>
            </span>
            <span className="absolute -right-6 -top-6 text-6xl text-[#ff6b3d] opacity-10 font-bold">+</span>
            <span className="absolute -left-6 -bottom-6 text-6xl text-[#ff6b3d] opacity-10 font-bold">+</span>
          </h2>

          <p className="text-gray-300 max-w-2xl text-lg mb-8 leading-relaxed">
            Discover our curated collection of engaging short-form videos designed to inform and inspire.
          </p>

          {/* Videos per page toggle */}
          <div className="inline-flex items-center gap-3 bg-[#1a1a1a] p-1 rounded-lg border border-gray-800">
            <button
              onClick={() => {
                setVideosPerPage(3)
                setCurrentPage(0)
                setActiveVideoIndex(null)
              }}
              className={`px-4 py-2 rounded-md transition-all ${videosPerPage === 3 ? "bg-[#ff6b3d] text-white" : "text-gray-300 hover:text-white"
                }`}
            >
              3 Videos
            </button>
            <button
              onClick={() => {
                setVideosPerPage(6)
                setCurrentPage(0)
                setActiveVideoIndex(null)
              }}
              className={`px-4 py-2 rounded-md transition-all ${videosPerPage === 6 ? "bg-[#ff6b3d] text-white" : "text-gray-300 hover:text-white"
                }`}
            >
              6 Videos
            </button>
          </div>
        </div>

        {/* Video grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-8">
          {currentVideos.map((video, index) => (
            <VideoItem
              key={index}
              video={video}
              index={index}
              isPlaying={activeVideoIndex === currentPage * videosPerPage + index}
              onPlay={handleVideoPlay}
              isMobile={isMobile}
            />
          ))}
        </div>

        {/* Pagination controls */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            onClick={() => goToPage(Math.max(0, currentPage - 1))}
            disabled={currentPage === 0}
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m15 18-6-6 6-6" />
            </svg>
          </button>

          {/* Page indicators */}
          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${currentPage === i ? "bg-[#ff6b3d] text-white" : "bg-[#1a1a1a] text-white hover:bg-[#2a2a2a]"
                  }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={() => goToPage(Math.min(totalPages - 1, currentPage + 1))}
            disabled={currentPage === totalPages - 1}
            className="p-2 rounded-full bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-white"
            >
              <path d="m9 18 6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
