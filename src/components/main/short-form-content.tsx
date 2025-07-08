"use client";
import { useRef, useEffect, useState } from "react"
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react"

// Video data with clean, professional titles
const shortFormVideos = [
  {
    videoId: "0oJu3eWKpEg",
    platform: "youtube",
    title: "Educational Content",
    duration: "0:45"
  },
  {
    videoId: "wP7ISAAu6SU",
    platform: "youtube",
    title: "Tutorial Video",
    duration: "1:20"
  },
  {
    videoId: "Kgm05VpjJ5A",
    platform: "youtube",
    title: "How-To Guide",
    duration: "0:58"
  },
  {
    videoId: "QRGHneSqbkA",
    platform: "youtube",
    title: "Quick Tips",
    duration: "1:15"
  },
  {
    videoId: "1q5t0rCIkfk",
    platform: "youtube",
    title: "Expert Insights",
    duration: "0:32"
  },
  {
    videoId: "Oqj3xlJWzrs",
    platform: "youtube",
    title: "Professional Content",
    duration: "1:05"
  },
]

interface VideoItemProps {
  video: {
    videoId: string
    platform: string
    title: string
    duration: string
  }
  index: number
  onPlay: (index: number) => void
  isPlaying: boolean
}

const VideoItem = ({ video, index, onPlay, isPlaying }: VideoItemProps) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)
  const [isHovered, setIsHovered] = useState(false)
  const [hasError, setHasError] = useState(false)

  // Load YouTube video
  useEffect(() => {
    if (!videoRef.current) return

    if (isPlaying) {
      // Create YouTube iframe
      const iframe = document.createElement("iframe")
      iframe.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1&controls=1&rel=0&modestbranding=1&playsinline=1`
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      iframe.className = "absolute inset-0 w-full h-full z-10 rounded-xl"
      iframe.style.border = "0"
      iframe.onload = () => setIsLoaded(true)
      iframe.onerror = () => setHasError(true)

      // Clear existing content and append iframe
      const existingIframe = videoRef.current.querySelector("iframe")
      if (existingIframe) {
        existingIframe.remove()
      }
      videoRef.current.appendChild(iframe)
    } else {
      // Remove iframe when not playing
      const existingIframe = videoRef.current.querySelector("iframe")
      if (existingIframe) {
        existingIframe.remove()
        setIsLoaded(false)
        setHasError(false)
      }
    }

    return () => {
      // Cleanup on unmount
      const existingIframe = videoRef.current?.querySelector("iframe")
      if (existingIframe) {
        existingIframe.remove()
      }
    }
  }, [isPlaying, video.videoId])

  return (
    <div
      className="relative aspect-[9/16] w-[300px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer bg-gradient-to-br from-gray-900 to-black shadow-2xl transform transition-all duration-500 hover:scale-105 hover:shadow-3xl"
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
              src={`https://i.ytimg.com/vi/${video.videoId}/maxresdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover transition-transform duration-700 ease-in-out"
              style={{
                transform: isHovered ? "scale(1.1)" : "scale(1)",
              }}
              onError={(e) => {
                // Fallback to lower quality thumbnail
                e.currentTarget.src = `https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent"></div>
          </div>
        )}

        {/* Loading indicator */}
        {isPlaying && !isLoaded && !hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full border-4 border-[#ff6b3d]/30 border-t-[#ff6b3d] animate-spin"></div>
              <span className="text-white text-sm">Loading...</span>
            </div>
          </div>
        )}

        {/* Error state */}
        {hasError && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-20">
            <div className="flex flex-col items-center gap-3 text-center px-4">
              <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                <X className="w-6 h-6 text-red-500" />
              </div>
              <span className="text-white text-sm">Failed to load video</span>
              <button 
                onClick={(e) => {
                  e.stopPropagation()
                  setHasError(false)
                  onPlay(index)
                }}
                className="text-[#ff6b3d] text-xs hover:underline"
              >
                Try again
              </button>
            </div>
          </div>
        )}

        {/* Play button overlay */}
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center z-20">
            <div className="w-16 h-16 rounded-full bg-[#ff6b3d]/90 backdrop-blur-sm flex items-center justify-center transform transition-all duration-300 hover:scale-110 hover:bg-[#ff6b3d]">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Duration badge */}
      {!isPlaying && (
        <div className="absolute top-3 right-3 z-30">
          <span className="px-2 py-1 bg-black/70 text-white text-xs rounded-md backdrop-blur-sm">
            {video.duration}
          </span>
        </div>
      )}

      {/* Optional: Remove title overlay entirely if you prefer no titles */}
      {!isPlaying && false && (
        <div className="absolute left-0 right-0 bottom-0 p-4 z-30">
          <h3 className="text-white font-medium text-sm mb-1 line-clamp-2">
            {video.title}
          </h3>
          <div className="flex items-center text-xs text-white/60">
            <span className="capitalize">{video.platform}</span>
          </div>
        </div>
      )}

      {/* Close button when playing */}
      {isPlaying && (
        <button
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center text-white hover:bg-black/80 transition-colors"
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

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft' && currentPage > 0) {
        goToPage(currentPage - 1)
      } else if (e.key === 'ArrowRight' && currentPage < totalPages - 1) {
        goToPage(currentPage + 1)
      } else if (e.key === 'Escape' && activeVideoIndex !== null) {
        setActiveVideoIndex(null)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentPage, totalPages, activeVideoIndex])

  return (
    <section className="w-full py-16 px-4 bg-gradient-to-br from-[#0c0c0c] to-[#1a1a1a]">
      <div className="container mx-auto max-w-6xl px-4">
        {/* Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="relative inline-block mb-4">
            <span className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#ff6b3d] opacity-20 blur-xl"></span>
            <span className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-[#ff6b3d] opacity-20 blur-xl"></span>
            <span className="text-sm font-semibold tracking-widest uppercase text-[#ff6b3d]">Premium Collection</span>
          </div>

          <h2 className="relative text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            <span className="text-white">Short Form</span>{" "}
            <span className="relative text-[#ff6b3d]">
              Content
              <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#ff6b3d] to-[#ff8c5d] rounded-full"></span>
            </span>
          </h2>

          <p className="text-gray-300 max-w-2xl text-lg mb-8 leading-relaxed">
            Discover our curated collection of engaging short-form videos designed to inform and inspire.
          </p>

          {/* Controls */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            {/* Videos per page toggle */}
            <div className="inline-flex items-center gap-1 bg-[#1a1a1a] p-1 rounded-lg border border-gray-800">
              <button
                onClick={() => {
                  setVideosPerPage(3)
                  setCurrentPage(0)
                  setActiveVideoIndex(null)
                }}
                className={`px-4 py-2 rounded-md transition-all text-sm font-medium ${
                  videosPerPage === 3 ? "bg-[#ff6b3d] text-white shadow-lg" : "text-gray-300 hover:text-white hover:bg-gray-800"
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
                className={`px-4 py-2 rounded-md transition-all text-sm font-medium ${
                  videosPerPage === 6 ? "bg-[#ff6b3d] text-white shadow-lg" : "text-gray-300 hover:text-white hover:bg-gray-800"
                }`}
              >
                6 Videos
              </button>
            </div>

            {/* Video count */}
            <div className="text-sm text-gray-400">
              {shortFormVideos.length} videos total
            </div>
          </div>
        </div>

        {/* Video grid */}
        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {currentVideos.map((video, index) => (
            <VideoItem
              key={`${currentPage}-${index}`}
              video={video}
              index={index}
              isPlaying={activeVideoIndex === currentPage * videosPerPage + index}
              onPlay={handleVideoPlay}
            />
          ))}
        </div>

        {/* Pagination controls */}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-3">
            <button
              onClick={() => goToPage(Math.max(0, currentPage - 1))}
              disabled={currentPage === 0}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white border border-gray-800"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Previous</span>
            </button>

            {/* Page indicators */}
            <div className="flex items-center gap-2">
              {Array.from({ length: totalPages }).map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToPage(i)}
                  className={`w-10 h-10 rounded-lg flex items-center justify-center transition-all font-medium ${
                    currentPage === i 
                      ? "bg-[#ff6b3d] text-white shadow-lg" 
                      : "bg-[#1a1a1a] text-gray-300 hover:bg-[#2a2a2a] hover:text-white border border-gray-800"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              onClick={() => goToPage(Math.min(totalPages - 1, currentPage + 1))}
              disabled={currentPage === totalPages - 1}
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[#1a1a1a] hover:bg-[#2a2a2a] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-white border border-gray-800"
              aria-label="Next page"
            >
              <span className="hidden sm:inline">Next</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Keyboard shortcuts hint */}
        <div className="mt-8 text-center text-xs text-gray-500">
          Use arrow keys to navigate pages • Press Escape to close video
        </div>
      </div>
    </section>
  )
}