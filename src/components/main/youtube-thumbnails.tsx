"use client"

import { motion } from "framer-motion"

const thumbnails = [
    {
        title: "WORLD WAR 3?",
        image: "/thumb/a.jpg",
    },
    {
        title: "UNBANNABLE FB ADS",
        image: "/thumb/b.jpg",
    },
    {
        title: "HOW TO BECOME FINANCIAL INDEPENDENT",
        image: "/thumb/c.jpg",
    },
    {
        title: "WATCH OUT",
        image: "/thumb/d.jpg",
    },
    {
        title: "CRYPTO SECRETS",
        image: "/thumb/e.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/f.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/g.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/h.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/i.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/j.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/k.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/l.jpg",
    },
    {
        title: "MARKETING HACKS",
        image: "/thumb/m.jpg",
    },
    
]

export default function YoutubeThumbnails() {
    return (
        <section className="relative w-full py-24 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]">
            <div className="container relative z-10 mx-auto max-w-6xl mb-12">
                <h2 className="text-3xl md:text-5xl font-bold text-center">
                    <span className="text-white">YouTube </span>
                    <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">Thumbnail</span>
                </h2>
            </div>

            {/* Marquee effect container */}
            <div className="overflow-hidden">
                <motion.div
                    initial={{ x: 0 }}
                    animate={{ x: "-50%" }}
                    transition={{
                        repeat: Number.POSITIVE_INFINITY,
                        repeatType: "loop",
                        duration: 25,
                        ease: "linear",
                    }}
                    className="flex gap-6 w-fit"
                >
                    {/* First set of thumbnails */}
                    {thumbnails.map((thumbnail, index) => (
                        <div
                            key={`first-${index}`}
                            className="relative w-[350px] flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer"
                        >
                            <div
                                className="aspect-video bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${thumbnail.image})` }}
                            ></div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex items-end">
                                <div className="p-4 w-full">
                                    <h3 className="text-white text-lg font-bold">
                                        {thumbnail.title.includes("UNBANNABLE") ? (
                                            <>
                                                <span className="text-[#ff6b3d]">UNBANNABLE</span> FB ADS
                                            </>
                                        ) : thumbnail.title.includes("FINANCIAL") ? (
                                            <>
                                                HOW TO BECOME <span className="text-[#ff6b3d]">FINANCIAL INDEPENDENT</span>
                                            </>
                                        ) : thumbnail.title.includes("WATCH") ? (
                                            <>
                                                <span className="text-[#ff6b3d]">WATCH OUT</span>
                                            </>
                                        ) : (
                                            thumbnail.title
                                        )}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Duplicate set for seamless loop */}
                    {thumbnails.map((thumbnail, index) => (
                        <div
                            key={`second-${index}`}
                            className="relative w-[350px] flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer"
                        >
                            <div
                                className="aspect-video bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: `url(${thumbnail.image})` }}
                            ></div>

                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30 flex items-end">
                                <div className="p-4 w-full">
                                    <h3 className="text-white text-lg font-bold">
                                        {thumbnail.title.includes("UNBANNABLE") ? (
                                            <>
                                                <span className="text-[#ff6b3d]">UNBANNABLE</span> FB ADS
                                            </>
                                        ) : thumbnail.title.includes("FINANCIAL") ? (
                                            <>
                                                HOW TO BECOME <span className="text-[#ff6b3d]">FINANCIAL INDEPENDENT</span>
                                            </>
                                        ) : thumbnail.title.includes("WATCH") ? (
                                            <>
                                                <span className="text-[#ff6b3d]">WATCH OUT</span>
                                            </>
                                        ) : (
                                            thumbnail.title
                                        )}
                                    </h3>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

