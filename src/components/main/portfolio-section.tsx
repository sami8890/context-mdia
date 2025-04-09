"use client"
import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useVideoStore } from "@/lib/video-store"

interface PortfolioItem {
    id: string
    title: string
    category: string
    thumbnail: string
    videoSrc: string
    client?: string
    description?: string
}

export default function PortfolioSection() {
    const { openVideo } = useVideoStore()

    const portfolioItems: PortfolioItem[] = [
        {
            id: "1",
            title: "Brand Commercial",
            category: "commercial",
            thumbnail: "/ww.jpg",
            videoSrc: "/main.mp4",
            client: "TechVision Media",
            description: "High-energy commercial spot with dynamic transitions and color grading.",
        },
        {
            id: "2",
            title: "Travel Vlog",
            category: "vlog",
            thumbnail: "/ww.jpg",
            videoSrc: "/main.mp4",
                        client: "Adventure Seekers",
            description: "Cinematic travel montage with smooth transitions and atmospheric color grading.",
        },
        {
            id: "3",
            title: "Product Showcase",
            category: "product",
            thumbnail: "/ww.jpg",
            videoSrc: "/main.mp4",
                        client: "Modern Designs",
            description: "Clean, minimalist product showcase with precise motion graphics.",
        },
        {
            id: "4",
            title: "Music Video",
            category: "music",
            thumbnail: "/ww.jpg",
            videoSrc: "/main.mp4",
            client: "Rhythm Records",
            description: "Visually striking music video with beat-synchronized edits and effects.",
        },
        {
            id: "5",
            title: "Corporate Presentation",
            category: "corporate",
            thumbnail: "/ww.jpg",
            videoSrc: "/main.mp4",
                        client: "Global Enterprises",
            description: "Professional corporate video with sleek animations and clear messaging.",
        },
        {
            id: "6",
            title: "Social Media Short",
            category: "social",
            thumbnail: "/ww.jpg",
            videoSrc: "/main.mp4",
                        client: "Trending Brands",
            description: "Attention-grabbing short-form content optimized for social media engagement.",
        },
    ]

    const handlePlayVideo = (videoSrc: string) => {
        openVideo(videoSrc)
    }

    return (
        <section id="portfolio" className="py-16 md:py-24 relative">
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                <div className="absolute top-[40%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-orange-600/10 to-red-500/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="text-white">My </span>
                        <span className="bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">Portfolio</span>
                    </h2>
                    <p className="text-zinc-400 max-w-2xl mx-auto text-sm md:text-base lg:text-lg">
                        Explore my video editing work across different styles and industries
                    </p>
                </div>

                {/* Portfolio Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {portfolioItems.map((item) => (
                        <div
                            key={item.id}
                            className="group bg-zinc-800/50 backdrop-blur-sm border border-zinc-700/50 rounded-xl overflow-hidden hover:border-zinc-600/80 transition-all duration-300 hover:shadow-xl hover:shadow-orange-900/10 hover:-translate-y-1"
                        >
                            <div className="relative aspect-video cursor-pointer" onClick={() => handlePlayVideo(item.videoSrc)}>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70 group-hover:opacity-90 transition-opacity"></div>
                                <Image
                                    src={item.thumbnail || "/.svg"}
 alt={item.title}
                                    width={600}
                                    height={400}
                                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-700 ease-out"
                                />
                                <div className="absolute inset-0 flex items-center justify-center z-10 opacity-90 group-hover:opacity-100">
                                    <div className="h-14 w-14 md:h-16 md:w-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300">
                                        <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                            <Play className="h-5 w-5 md:h-6 md:w-6 text-white ml-0.5 md:ml-1" />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-4">
                                <h3 className="text-white font-semibold text-lg mb-1">{item.title}</h3>
                                <p className="text-orange-500 text-sm mb-2">Client: {item.client}</p>
                                <p className="text-zinc-400 text-sm line-clamp-2">{item.description}</p>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <Button className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 px-8 py-6 h-auto rounded-xl">
                        View All Projects
                    </Button>
                </div>
            </div>
        </section>
    )
}

