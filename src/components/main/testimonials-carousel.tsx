"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Play, Star, Quote, ChevronLeft, ChevronRight, Sparkles } from "lucide-react"

export default function TestimonialsCarousel() {
  const [activeSlide, setActiveSlide] = useState(0)
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)
  const totalSlides = 5

  const nextSlide = () => {
    setIsVideoPlaying(false)
    setActiveSlide((prev) => (prev + 1) % totalSlides)
  }

  const prevSlide = () => {
    setIsVideoPlaying(false)
    setActiveSlide((prev) => (prev - 1 + totalSlides) % totalSlides)
  }

  const goToSlide = (index: number) => {
    setIsVideoPlaying(false)
    setActiveSlide(index)
  }

  const playVideo = () => {
    setIsVideoPlaying(true)
  }

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechVision Media",
      image: "/testimonial.png",
      quote:
        "Context Media transformed our content strategy. Our engagement increased by 300% and revenue doubled in just 3 months!",
      video: "/ww.jpg",
      youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    },
    {
      name: "Michael Chen",
      role: "Content Creator",
      company: "Startup Accelerator",
      image: "/testimonial.png",
      quote:
        "The quality of editing is outstanding. My YouTube channel grew from 10K to 100K subscribers after switching to Context Media.",
      video: "/placeholder.svg?height=400&width=600&text=Video+Testimonial+2",
      youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    },
    {
      name: "Jessica Williams",
      role: "Social Media Manager",
      company: "Global Brands Inc.",
      image: "/testimonial.png",
      quote:
        "Professional, fast, and incredibly effective. Our social media campaigns now convert 5X better thanks to their video editing.",
      video: "/placeholder.svg?height=400&width=600&text=Video+Testimonial+3",
      youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    },
    {
      name: "David Rodriguez",
      role: "CEO",
      company: "Digital Creators Network",
      image: "/testimonial.png",
      quote:
        "Context Media helped us scale our video production. We now produce twice the content in half the time with better results.",
      video: "/placeholder.svg?height=400&width=600&text=Video+Testimonial+4",
      youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    },
    {
      name: "Emma Thompson",
      role: "Influencer",
      company: "Lifestyle Brand",
      image: "/testimonial.png",
      quote:
        "The attention to detail is incredible. My engagement rate increased by 45% after my first video edited by Context Media.",
      video: "/placeholder.svg?height=400&width=600&text=Video+Testimonial+5",
      youtubeId: "dQw4w9WgXcQ", // Replace with your actual YouTube video ID
    },
  ]

  const currentTestimonial = testimonials[activeSlide]

  return (
    <div className="relative">
      {/* Heading */}
      <div className="text-center mb-10 md:mb-16">
        <div className="inline-block rounded-lg bg-orange-500/10 backdrop-blur-sm px-4 py-2 mb-4 border border-orange-500/20">
          <span className="text-orange-400 font-medium">What Our Clients Say</span>
        </div>
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
          <span className="text-white">Client </span>
          <span className="relative inline-block">
            <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
              Testimonials
            </span>
            <Sparkles className="absolute -right-8 -top-2 h-6 w-6 text-orange-500 animate-pulse" />
            <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></span>
          </span>
        </h2>
        <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
          Hear from our satisfied clients about their experience working with us
        </p>
      </div>

      {/* Desktop Carousel */}
      <div className="hidden md:block">
        <div className="grid grid-cols-2 gap-8 items-center">
          <div className="relative aspect-video bg-zinc-800 rounded-xl overflow-hidden">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentTestimonial.youtubeId}?autoplay=1`}
                title={`${currentTestimonial.name} Video Testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className="h-20 w-20 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
                    onClick={playVideo}
                  >
                    <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:from-orange-600 group-hover:to-red-700 transition-colors">
                      <Play className="h-8 w-8 text-white ml-1" />
                    </div>
                  </div>
                </div>
                <Image
                  src={currentTestimonial.video || "/placeholder.svg"}
                  alt={`${currentTestimonial.name} Video Testimonial`}
                  width={600}
                  height={400}
                  className="object-cover w-full h-full opacity-80"
                />
              </>
            )}
          </div>

          <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-700/50 p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=64&width=64&text=${currentTestimonial.name.charAt(0)}`}
                  alt={currentTestimonial.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{currentTestimonial.name}</h3>
                <p className="text-zinc-400">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>
              </div>
            </div>

            <div className="mb-8">
              <div className="flex mb-4">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star key={star} className="h-5 w-5 fill-orange-500 text-orange-500" />
                ))}
              </div>
              <Quote className="h-8 w-8 text-orange-500/40 mb-4" />
              <p className="text-xl text-zinc-300 italic leading-relaxed">&quot;{currentTestimonial.quote}&quot;</p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-2 rounded-full transition-all ${index === activeSlide
                        ? "w-8 bg-gradient-to-r from-orange-500 to-red-600"
                        : "w-2 bg-zinc-700 hover:bg-zinc-600"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white h-10 w-10 rounded-full"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white h-10 w-10 rounded-full"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Carousel */}
      <div className="md:hidden">
        <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-700/50 overflow-hidden">
          <div className="relative aspect-video bg-zinc-800">
            {isVideoPlaying ? (
              <iframe
                src={`https://www.youtube.com/embed/${currentTestimonial.youtubeId}?autoplay=1`}
                title={`${currentTestimonial.name} Video Testimonial`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full border-0"
              ></iframe>
            ) : (
              <>
                <div className="absolute inset-0 flex items-center justify-center z-10">
                  <div
                    className="h-14 w-14 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center cursor-pointer hover:scale-105 transition-transform group"
                    onClick={playVideo}
                  >
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center group-hover:from-orange-600 group-hover:to-red-700 transition-colors">
                      <Play className="h-5 w-5 text-white ml-0.5" />
                    </div>
                  </div>
                </div>
                <Image
                  src={currentTestimonial.video || "/placeholder.svg"}
                  alt={`${currentTestimonial.name} Video Testimonial`}
                  width={400}
                  height={225}
                  className="object-cover w-full h-full opacity-80"
                />
              </>
            )}
          </div>

          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center overflow-hidden">
                <Image
                  src={`/placeholder.svg?height=40&width=40&text=${currentTestimonial.name.charAt(0)}`}
                  alt={currentTestimonial.name}
                  width={40}
                  height={40}
                  className="object-cover"
                />
              </div>
              <div>
                <h3 className="font-semibold text-white text-sm">{currentTestimonial.name}</h3>
                <p className="text-zinc-400 text-xs">
                  {currentTestimonial.role}, {currentTestimonial.company}
                </p>
              </div>
            </div>

            <div className="flex mb-3">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star key={star} className="h-3 w-3 fill-orange-500 text-orange-500" />
              ))}
            </div>

            <p className="text-sm text-zinc-300 italic line-clamp-3">&quot;{currentTestimonial.quote}&quot;</p>

            <div className="flex justify-between items-center mt-4 pt-3 border-t border-zinc-700/50">
              <div className="flex gap-1">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${index === activeSlide ? "w-6 bg-gradient-to-r from-orange-500 to-red-600" : "w-1.5 bg-zinc-700"
                      }`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white h-8 w-8 rounded-full p-1.5"
                  onClick={prevSlide}
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-800 text-white h-8 w-8 rounded-full p-1.5"
                  onClick={nextSlide}
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

