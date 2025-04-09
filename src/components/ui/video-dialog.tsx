"use client"

import { useEffect, useRef } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"

interface VideoModalProps {
    isOpen: boolean
    onClose: () => void
    videoSrc?: string
}

export default function VideoModal({ isOpen, onClose, videoSrc = "/placeholder.mp4" }: VideoModalProps) {
    const modalRef = useRef<HTMLDivElement>(null)
    const videoRef = useRef<HTMLVideoElement>(null)

    // Close modal when clicking outside
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose()
            }
        }

        const handleEscKey = (event: KeyboardEvent) => {
            if (event.key === "Escape") {
                onClose()
            }
        }

        if (isOpen) {
            document.addEventListener("mousedown", handleClickOutside)
            document.addEventListener("keydown", handleEscKey)
            // Prevent scrolling when modal is open
            document.body.style.overflow = "hidden"

            // Play video when modal opens
            if (videoRef.current) {
                videoRef.current.play().catch((error) => {
                    console.log("Autoplay prevented:", error)
                })
            }
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
            document.removeEventListener("keydown", handleEscKey)
            document.body.style.overflow = "auto"
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fadeIn">
            <div ref={modalRef} className="relative bg-zinc-900 rounded-xl overflow-hidden max-w-4xl w-full shadow-2xl">
                <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full"
                    onClick={onClose}
                    aria-label="Close video"
                >
                    <X className="h-5 w-5" />
                </Button>

                <div className="aspect-video w-full">
                    <video
                        ref={videoRef}
                        className="w-full h-full object-cover"
                        controls
                        autoPlay
                        playsInline
                        src={videoSrc}
                        poster="/placeholder.svg?height=720&width=1280&text=Video+Preview"
                    >
                        Your browser does not support the video tag.
                    </video>
                </div>
            </div>
        </div>
    )
}

