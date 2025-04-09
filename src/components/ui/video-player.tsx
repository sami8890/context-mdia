"use client"

import { useState, useEffect, useRef } from "react"
import { X, Play, Pause, Volume2, VolumeX, Maximize, Minimize } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { useVideoStore } from "@/lib/video-store"

export default function VideoPlayer() {
    const { isOpen, videoSrc, closeVideo } = useVideoStore()
    const [isPlaying, setIsPlaying] = useState(false)
    const [currentTime, setCurrentTime] = useState(0)
    const [duration, setDuration] = useState(0)
    const [volume, setVolume] = useState(1)
    const [isMuted, setIsMuted] = useState(false)
    const [isFullscreen, setIsFullscreen] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null)
    const playerRef = useRef<HTMLDivElement>(null)

    // Handle video playback
    useEffect(() => {
        if (!videoRef.current) return

        const handleTimeUpdate = () => {
            if (videoRef.current) {
                setCurrentTime(videoRef.current.currentTime)
            }
        }

        const handleDurationChange = () => {
            if (videoRef.current) {
                setDuration(videoRef.current.duration)
            }
        }

        const handleEnded = () => {
            setIsPlaying(false)
        }

        const video = videoRef.current
        video.addEventListener("timeupdate", handleTimeUpdate)
        video.addEventListener("durationchange", handleDurationChange)
        video.addEventListener("ended", handleEnded)

        return () => {
            video.removeEventListener("timeupdate", handleTimeUpdate)
            video.removeEventListener("durationchange", handleDurationChange)
            video.removeEventListener("ended", handleEnded)
        }
    }, [videoRef])

    // Auto-play when video source changes
    useEffect(() => {
        if (videoRef.current && videoSrc) {
            videoRef.current.load()
            videoRef.current
                .play()
                .then(() => {
                    setIsPlaying(true)
                })
                .catch((error) => {
                    console.error("Autoplay failed:", error)
                    setIsPlaying(false)
                })
        }
    }, [videoSrc])

    // Handle play/pause
    const togglePlay = () => {
        if (!videoRef.current) return

        if (isPlaying) {
            videoRef.current.pause()
            setIsPlaying(false)
        } else {
            videoRef.current.play()
            setIsPlaying(true)
        }
    }

    // Handle seeking
    const handleSeek = (value: number[]) => {
        if (!videoRef.current) return

        const newTime = value[0]
        videoRef.current.currentTime = newTime
        setCurrentTime(newTime)
    }

    // Handle volume
    const handleVolumeChange = (value: number[]) => {
        if (!videoRef.current) return

        const newVolume = value[0]
        videoRef.current.volume = newVolume
        setVolume(newVolume)
        setIsMuted(newVolume === 0)
    }

    // Toggle mute
    const toggleMute = () => {
        if (!videoRef.current) return

        if (isMuted) {
            videoRef.current.volume = volume || 1
            setIsMuted(false)
        } else {
            videoRef.current.volume = 0
            setIsMuted(true)
        }
    }

    // Toggle fullscreen
    const toggleFullscreen = () => {
        if (!playerRef.current) return

        if (!isFullscreen) {
            if (playerRef.current.requestFullscreen) {
                playerRef.current.requestFullscreen()
            }
            setIsFullscreen(true)
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            }
            setIsFullscreen(false)
        }
    }

    // Format time (seconds to MM:SS)
    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60)
        const seconds = Math.floor(time % 60)
        return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
            <div ref={playerRef} className="relative w-full max-w-5xl overflow-hidden rounded-lg aspect-video bg-black">
                {/* Video title */}
                <div className="absolute inset-x-0 top-0 p-4 text-lg text-white bg-gradient-to-b from-black/50 to-transparent z-10">
                    <div className="flex justify-between items-center">
                        <div className="line-clamp-1 font-medium">Professional Video Editing Showcase</div>
                        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 -mr-2" onClick={closeVideo}>
                            <X className="h-5 w-5" />
                        </Button>
                    </div>
                </div>

                {/* Video element */}
                <video ref={videoRef} className="w-full h-full" onClick={togglePlay}>
                    <source
                        src={videoSrc || "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4"}
                        type="video/mp4"
                    />
                    Your browser does not support the video tag.
                </video>

                {/* Play/pause overlay */}
                {!isPlaying && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="h-20 w-20 rounded-full bg-black/30 backdrop-blur-sm hover:bg-black/50"
                            onClick={togglePlay}
                        >
                            <Play className="h-10 w-10 text-white" />
                        </Button>
                    </div>
                )}

                {/* Controls */}
                <div className="absolute inset-x-0 bottom-0 grid gap-2 bg-gradient-to-b from-transparent to-black/70 p-4">
                    {/* Progress bar */}
                    <div className="px-2">
                        <Slider
                            value={[currentTime]}
                            min={0}
                            max={duration || 100}
                            step={0.1}
                            onValueChange={handleSeek}
                            className="w-full [&>span:first-child]:h-1.5 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-orange-500 [&_[role=slider]]:w-4 [&_[role=slider]]:h-4 [&_[role=slider]]:border-2 [&_[role=slider]]:border-white [&>span:first-child_span]:bg-orange-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0 [&_[role=slider]:focus-visible]:scale-105 [&_[role=slider]:focus-visible]:transition-transform"
                        />
                    </div>

                    {/* Control buttons */}
                    <div className="flex items-center gap-3 text-white [&_svg]:text-white">
                        <Button size="icon" variant="ghost" className="w-9 h-9 hover:bg-white/10" onClick={togglePlay}>
                            {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
                        </Button>

                        <div className="flex items-center gap-2">
                            <Button size="icon" variant="ghost" className="w-9 h-9 hover:bg-white/10" onClick={toggleMute}>
                                {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                            </Button>

                            <div className="w-24 hidden sm:block">
                                <Slider
                                    value={[isMuted ? 0 : volume]}
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    onValueChange={handleVolumeChange}
                                    className="w-full [&>span:first-child]:h-1 [&>span:first-child]:bg-white/30 [&_[role=slider]]:bg-white [&_[role=slider]]:w-3 [&_[role=slider]]:h-3 [&_[role=slider]]:border-0 [&>span:first-child_span]:bg-orange-500 [&_[role=slider]:focus-visible]:ring-0 [&_[role=slider]:focus-visible]:ring-offset-0"
                                />
                            </div>
                        </div>

                        <div className="text-sm ml-2">
                            {formatTime(currentTime)} / {formatTime(duration || 0)}
                        </div>

                        <Button
                            size="icon"
                            variant="ghost"
                            className="ml-auto w-9 h-9 hover:bg-white/10"
                            onClick={toggleFullscreen}
                        >
                            {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

