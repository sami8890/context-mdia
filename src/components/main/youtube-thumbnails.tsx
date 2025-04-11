"use client"

import { motion } from "framer-motion"

const thumbnails = [
    {
          image: "/thumb/a.jpg",
    },
    {
        
        image: "/thumb/b.jpg",
    },
    {
        image: "/thumb/c.jpg",
    },
    {   image: "/thumb/d.jpg",
    },
    {
       image: "/thumb/e.jpg",
    },
    {
        
        image: "/thumb/f.jpg",
    },
    {
        
        image: "/thumb/g.jpg",
    },
    {
        
        image: "/thumb/h.jpg",
    },
    {
        
        image: "/thumb/i.jpg",
    },
    {
        
        image: "/thumb/j.jpg",
    },
    {
        
        image: "/thumb/k.jpg",
    },
    {
        
        image: "/thumb/l.jpg",
    },
    {
        
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
                                 
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

