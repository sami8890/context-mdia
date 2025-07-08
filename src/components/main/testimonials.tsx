"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Play, X, ChevronLeft, ChevronRight } from "lucide-react";

// Simple testimonial type
interface Testimonial {
  id: string;
  videoId: string;
  title?: string;
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
  {
    id: "4",
    videoId: "TK1Zd3rJhmQ",
  },
  {
    id: "5",
    videoId: "EDdMIA5piBw",
  },
];

// Custom hook for responsive breakpoints
const useResponsive = () => {
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    // Set initial size
    handleResize();

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: windowSize.width < 768,
    isTablet: windowSize.width >= 768 && windowSize.width < 1024,
    isDesktop: windowSize.width >= 1024,
  };
};

// Video Modal Component
const VideoModal = ({ testimonial, isOpen, onClose }: { testimonial: Testimonial | null; isOpen: boolean; onClose: () => void }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  // Close on escape key
  useEffect(() => {
    const handleKeydown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      window.addEventListener("keydown", handleKeydown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      window.removeEventListener("keydown", handleKeydown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  // Focus management
  useEffect(() => {
    if (isOpen && modalRef.current) {
      modalRef.current.focus();
    }
  }, [isOpen]);

  if (!testimonial || !isOpen) return null;

  return (
    <AnimatePresence>
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
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative w-full max-w-5xl aspect-video bg-black rounded-xl overflow-hidden shadow-2xl border border-white/10"
          onClick={(e) => e.stopPropagation()}
          tabIndex={-1}
        >
          <iframe
            src={`https://www.youtube.com/embed/${testimonial.videoId}?autoplay=1&rel=0&modestbranding=1&color=white`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; fullscreen"
            className="w-full h-full"
            frameBorder="0"
            allowFullScreen
            title={testimonial.title || "Client testimonial video"}
          ></iframe>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-black/70 hover:bg-black/90 text-white w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-[#ff6b3d] focus:ring-offset-2 focus:ring-offset-black"
            aria-label="Close video"
          >
            <X size={20} />
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Testimonial Card Component
const TestimonialCard = ({ testimonial, index, onPlay }: { testimonial: Testimonial; index: number; onPlay: (testimonial: Testimonial) => void }) => {
  const cardRef = useRef(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <div
        className="relative aspect-video overflow-hidden rounded-xl cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-300 bg-gray-900"
        onClick={() => onPlay(testimonial)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onPlay(testimonial);
          }
        }}
        aria-label={`Play testimonial video: ${testimonial.title || 'Client testimonial'}`}
      >
        <img
          src={`https://i.ytimg.com/vi/${testimonial.videoId}/maxresdefault.jpg`}
          alt={testimonial.title || "Client testimonial"}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        
        {/* Overlay gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20 opacity-70 group-hover:opacity-50 transition-opacity duration-300"></div>
        
        {/* Play button */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 rounded-full bg-[#ff6b3d]/90 backdrop-blur-sm flex items-center justify-center shadow-xl group-hover:scale-110 group-hover:bg-[#ff6b3d] transition-all duration-300 border-2 border-white/20">
            <Play className="h-7 w-7 text-white fill-white ml-1" />
          </div>
        </div>

        {/* Title overlay */}
        {testimonial.title && (
          <div className="absolute bottom-4 left-4 right-4">
            <h3 className="text-white font-medium text-sm opacity-90 group-hover:opacity-100 transition-opacity">
              {testimonial.title}
            </h3>
          </div>
        )}
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
  const { isMobile, isTablet } = useResponsive();

  // Calculate items per page based on screen size
  const itemsPerPage = isMobile ? 1 : isTablet ? 2 : 3;
  const pageCount = Math.ceil(testimonials.length / itemsPerPage);

  // Handle testimonial selection
  const handlePlayTestimonial = useCallback((testimonial: Testimonial) => {
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

  // Reset page when screen size changes
  useEffect(() => {
    setCurrentPage(0);
  }, [itemsPerPage]);

  // Get current items
  const getCurrentItems = () => {
    const start = currentPage * itemsPerPage;
    return testimonials.slice(start, start + itemsPerPage);
  };

  return (
    <section
      ref={ref}
      className="w-full py-20 px-4 md:px-8 lg:px-16 bg-[#0c0c0c] relative overflow-hidden"
      aria-label="Client testimonials section"
    >
      {/* Background decorations */}
      <div className="absolute top-0 left-1/4 w-72 h-72 bg-[#ff6b3d]/5 blur-[120px] rounded-full"></div>
      <div className="absolute bottom-0 right-1/4 w-72 h-72 bg-[#ff4d00]/5 blur-[120px] rounded-full"></div>

      <div className="container mx-auto max-w-7xl relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-block px-4 py-2 mb-6 bg-gradient-to-r from-[#ff6b3d]/10 to-[#ff4d00]/10 rounded-full backdrop-blur-sm border border-[#ff6b3d]/20"
          >
            <span className="text-sm font-medium bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
              Success Stories
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Client </span>
            <span className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] text-transparent bg-clip-text">
              Testimonials
            </span>
          </h2>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Hear directly from our clients about their transformation journey and results
          </p>
        </motion.div>

        {/* Navigation and testimonials */}
        <div className="relative">
          {/* Desktop Navigation buttons */}
          {pageCount > 1 && !isMobile && (
            <div className="absolute -left-16 -right-16 top-1/2 -translate-y-1/2 flex justify-between z-10 pointer-events-none">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto transition-all duration-300 ${
                  currentPage === 0 
                    ? 'bg-gray-700/50 cursor-not-allowed opacity-50' 
                    : 'bg-[#ff6b3d] hover:bg-[#ff5a2c] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff6b3d] focus:ring-offset-2 focus:ring-offset-black'
                }`}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= pageCount - 1}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg pointer-events-auto transition-all duration-300 ${
                  currentPage >= pageCount - 1 
                    ? 'bg-gray-700/50 cursor-not-allowed opacity-50' 
                    : 'bg-[#ff6b3d] hover:bg-[#ff5a2c] hover:scale-110 focus:outline-none focus:ring-2 focus:ring-[#ff6b3d] focus:ring-offset-2 focus:ring-offset-black'
                }`}
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Testimonial cards */}
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            key={currentPage}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            {getCurrentItems().map((testimonial, index) => (
              <TestimonialCard
                key={`${testimonial.id}-${currentPage}`}
                testimonial={testimonial}
                index={index}
                onPlay={handlePlayTestimonial}
              />
            ))}
          </motion.div>

          {/* Mobile navigation */}
          {pageCount > 1 && isMobile && (
            <div className="flex justify-center mt-8 gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                  currentPage === 0 
                    ? 'bg-gray-700/50 cursor-not-allowed opacity-50' 
                    : 'bg-[#ff6b3d] hover:bg-[#ff5a2c] active:scale-95'
                }`}
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>

              <button
                onClick={handleNextPage}
                disabled={currentPage >= pageCount - 1}
                className={`w-12 h-12 rounded-full flex items-center justify-center text-white shadow-lg transition-all duration-300 ${
                  currentPage >= pageCount - 1 
                    ? 'bg-gray-700/50 cursor-not-allowed opacity-50' 
                    : 'bg-[#ff6b3d] hover:bg-[#ff5a2c] active:scale-95'
                }`}
                aria-label="Next testimonials"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}

          {/* Pagination indicators */}
          {pageCount > 1 && (
            <div className="flex justify-center mt-8 gap-2">
              {Array.from({ length: pageCount }).map((_, index) => (
                <button
                  key={index}
                  className={`h-2 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#ff6b3d] focus:ring-offset-2 focus:ring-offset-black ${
                    index === currentPage 
                      ? 'bg-[#ff6b3d] w-8' 
                      : 'bg-gray-700 hover:bg-gray-600 w-2'
                  }`}
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