"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

// Simple testimonial type
interface Testimonial {
  id: string;
  videoId: string;
}

// Sample testimonials
const testimonials = [
  {
    id: "1",
    videoId: "TK1Zd3rJhmQ",
  },
  {
    id: "2",
    videoId: "EDdMIA5piBw",
  },
  {
    id: "3",
    videoId: "QoihxtDAGi4",
  },
];

// Video Modal Component
const VideoModal = ({ testimonial, isOpen, onClose }: { testimonial: Testimonial | null; isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef(null);

  // Close on escape key
  useEffect(() => {
    const handleKeydown = (e: { key: string; }) => {
      if (e.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeydown);
    return () => window.removeEventListener("keydown", handleKeydown);
  }, [onClose]);

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

  if (!testimonial || !isOpen) return null;

  return (
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
          src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className="w-full h-full"
          frameBorder="0"
          allowFullScreen
        ></iframe>

        {/* Close button at top-right */}
        <div className="absolute top-4 right-4 z-10">
          <button
            onClick={onClose}
            className="bg-black/50 hover:bg-black/70 text-white w-8 h-8 flex items-center justify-center rounded-full backdrop-blur-sm"
            aria-label="Close video"
          >
            <X size={18} />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index, onPlay }: { testimonial: Testimonial; index: number; onPlay: (testimonial: Testimonial) => void }) => {
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
        onClick={() => onPlay(testimonial)}
        role="button"
        tabIndex={0}
      >
        <img
          src={`https://i.ytimg.com/vi/${testimonial.videoId}/hqdefault.jpg`}
          alt={`Testimonial video`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent opacity-70 group-hover:opacity-60 transition-opacity"></div>

        {/* Play button and text overlay */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <div className="w-12 h-12 rounded-full bg-[#ff6b3d] flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 transition-transform">
            <Play className="h-6 w-6 text-white fill-white ml-1" />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// Main Component
export default function VideoTestimonials() {
  const ref = useRef(null);
  const [selectedTestimonial, setSelectedTestimonial] = useState<Testimonial | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);

  const itemsPerPage = typeof window !== 'undefined' && window.innerWidth < 768 ? 1 : 3;
  const pageCount = Math.ceil(testimonials.length / itemsPerPage);

  // Handle testimonial selection
  const handlePlayTestimonial = useCallback((testimonial: Testimonial | null) => {
    setSelectedTestimonial(testimonial);
    setIsModalOpen(true);
  }, []);

  // Close modal
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedTestimonial(null), 300);
  }, []);

  // Navigation handlers
  const handlePrevPage = useCallback(() => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  }, []);

  const handleNextPage = useCallback(() => {
    setCurrentPage((prev) => Math.min(pageCount - 1, prev + 1));
  }, [pageCount]);

  // Get current items
  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <section
      ref={ref}
      className="w-full py-16 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]"
      aria-label="Client testimonials section"
    >
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-white">Client </span>
            <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
              Testimonials
            </span>
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Hear directly from our clients about their experiences
          </p>
        </motion.div>

        {/* Navigation and testimonials */}
        <div className="relative">
          {/* Navigation buttons */}
          {pageCount > 1 && (
            <div className="absolute -left-4 -right-4 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto ${currentPage === 0 ? 'bg-gray-700/50 cursor-not-allowed' : 'bg-[#ff6b3d] hover:bg-[#ff5a2c]'} `}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= pageCount - 1}
                className={`w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto ${currentPage >= pageCount - 1 ? 'bg-gray-700/50 cursor-not-allowed' : 'bg-[#ff6b3d] hover:bg-[#ff5a2c]'}`}
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Testimonial cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {getCurrentItems().map((testimonial, index) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
                index={index}
                onPlay={handlePlayTestimonial}
              />
            ))}
          </div>

          {/* Pagination indicators */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-6 gap-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 ${index === currentPage ? 'bg-[#ff6b3d] w-8' : 'bg-gray-700 w-2'}`}
                  onClick={() => setCurrentPage(index)}
                  aria-label={`Go to page ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Video modal */}
      <VideoModal
        testimonial={selectedTestimonial}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </section>
  );
}
