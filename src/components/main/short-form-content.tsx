"use client"

import { useRef, useEffect, useState } from "react"
import { Play, X } from "lucide-react"
import { useMobile } from "@/lib/use-mobile"

// Update the shortFormVideos array to have clearer titles and consistent formatting
const shortFormVideos = [
  {
    title: "YouTube Short",
    videoId: "0oJu3eWKpEg",
    tag: "New",
    author: "Ahmad Tiasan",
    duration: "0:30",
    platform: "youtube",
  },
  {
    title: "Featured Short",
    videoId: "wP7ISAAu6SU",
    tag: "Featured",
    author: "Ahmad Tiasan",
    duration: "0:25",
    platform: "youtube",
  },
  {
    title: "Why 95% Fail",
    videoId: "Kgm05VpjJ5A",
    tag: "Series 2",
    author: "Ahmad Tiasan",
    duration: "0:15",
    platform: "youtube",
  },
  {
    title: "Harmful Chemicals\nin Diapers",
    videoId: "QRGHneSqbkA",
    tag: "Health",
    author: "Ahmad Tiasan",
    duration: "0:30",
    platform: "youtube",
  },
  {
    title: "Make It Happen",
    videoId: "1q5t0rCIkfk",
    tag: "Motivation",
    author: "Ahmad Tiasan",
    duration: "0:22",
    platform: "youtube",
  },
  {
    title: "The Sad Truth",
    videoId: "Oqj3xlJWzrs",
    tag: "Reality",
    author: "Ahmad Tiasan",
    duration: "0:18",
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
  isMobile: boolean
}

// Replace the entire VideoItem component with this simplified version
const VideoItem = ({ video, index, onPlay, isPlaying }: VideoItemProps) => {
  const videoRef = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

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
      className="relative aspect-[9/16] w-[280px] flex-shrink-0 rounded-xl overflow-hidden cursor-pointer bg-black shadow-lg"
      onClick={() => onPlay(index)}
    >
      {/* Video container */}
      <div ref={videoRef} className="w-full h-full relative">
        {/* YouTube preview */}
        {!isPlaying && (
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={`https://i.ytimg.com/vi/${video.videoId}/hqdefault.jpg`}
              alt={video.title}
              className="w-full h-full object-cover"
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
            <div className="w-16 h-16 rounded-full bg-[#ff6b3d]/90 flex items-center justify-center">
              <Play className="h-8 w-8 text-white fill-white ml-1" />
            </div>
          </div>
        )}
      </div>

      {/* Title overlay */}
      {!isPlaying && (
        <div className="absolute left-0 right-0 bottom-0 p-3 z-30">
          <h3 className="text-white text-lg font-bold">{video.title}</h3>
          <p className="text-white/80 text-sm">{video.author}</p>
        </div>
      )}

      {/* Close button when playing */}
      {isPlaying && (
        <button
          className="absolute top-3 right-3 z-30 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center text-white"
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

// Replace the ShortFormContent component with this simplified version
export default function ShortFormContent() {
  const [activeVideoIndex, setActiveVideoIndex] = useState<number | null>(null)
  const isMobile = useMobile()

  // Handle video play/pause
  const handleVideoPlay = (index: number) => {
    // If clicking on the currently playing video, stop it
    if (activeVideoIndex === index) {
      setActiveVideoIndex(null)
    } else {
      // Play the selected video
      setActiveVideoIndex(index)
    }
  }

  return (
    <section className="w-full py-8 px-4 bg-[#0c0c0c]">
      <div className="container mx-auto max-w-7xl">
        <div className="flex flex-col items-center text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">
            <span className="text-white">Short Form </span>
            <span className="text-[#ff6b3d]">Content</span>
          </h2>
          <p className="text-gray-400 max-w-2xl">Click on any video to play.</p>
        </div>

        {/* Video grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {shortFormVideos.map((video, index) => (
            <VideoItem
              key={index}
              video={video}
              index={index}
              isPlaying={activeVideoIndex === index}
              onPlay={handleVideoPlay}
              isMobile={isMobile}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
