"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, Mail, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }

    // Initial check
    checkIfMobile()

    // Add event listener
    window.addEventListener("resize", checkIfMobile)

    // Scroll event listener for active section
    const handleScroll = () => {
      const sections = ["home", "services", "work", "testimonial", "contact"]
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetHeight = element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)

    // Cleanup
    return () => {
      window.removeEventListener("resize", checkIfMobile)
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      window.scrollTo({
        top: section.offsetTop - 80, // Adjust for navbar height
        behavior: "smooth",
      })
      setIsMenuOpen(false)
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 w-full py-4 px-4 md:px-8 lg:px-16 bg-[#0c0c0c]/90 backdrop-blur-md z-50 border-b border-gray-800/50">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-white text-2xl font-bold z-20">
          <span className="text-[#ff6b3d]">Contex  </span>Media
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <button
            onClick={() => scrollToSection("home")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "home" ? "text-[#ff6b3d]" : "text-white hover:text-[#ff6b3d]",
            )}
          >
            Home
          </button>
          <button
            onClick={() => scrollToSection("services")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "services" ? "text-[#ff6b3d]" : "text-white hover:text-[#ff6b3d]",
            )}
          >
            Services
          </button>
          <button
            onClick={() => scrollToSection("work")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "work" ? "text-[#ff6b3d]" : "text-white hover:text-[#ff6b3d]",
            )}
          >
            Work
          </button>
          <button
            onClick={() => scrollToSection("testimonial")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "testimonial" ? "text-[#ff6b3d]" : "text-white hover:text-[#ff6b3d]",
            )}
          >
            Testimonial
          </button>
          <button
            onClick={() => scrollToSection("contact")}
            className={cn(
              "text-sm font-medium transition-colors",
              activeSection === "contact" ? "text-[#ff6b3d]" : "text-white hover:text-[#ff6b3d]",
            )}
          >
            Contact
          </button>
        </nav>

        <div className="flex items-center gap-4 z-20">
          <Button
            className="hidden md:flex bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:opacity-90 text-white rounded-full text-sm font-medium px-6"
            onClick={() => scrollToSection("contact")}
          >
            BOOK A CALL
          </Button>

          {/* Menu Button - Both Mobile and Desktop */}
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/10 relative"
            onClick={toggleMenu}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </Button>
        </div>
      </div>

      {/* Improved Hamburger Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] bg-[#121212] border-b border-gray-800 z-10 shadow-xl max-h-[80vh] overflow-y-auto"
          >
            <div className="container mx-auto p-6">
              {isMobile ? (
                <div className="grid grid-cols-1 gap-8">
                  {/* Mobile: Navigation Links First */}
                  <div className="space-y-4">
                    <button
                      onClick={() => scrollToSection("home")}
                      className="block py-2 text-white hover:text-[#ff6b3d] transition-colors text-lg font-medium border-b border-gray-800 w-full text-left"
                    >
                      Home
                    </button>
                    <button
                      onClick={() => scrollToSection("services")}
                      className="block py-2 text-white hover:text-[#ff6b3d] transition-colors text-lg font-medium border-b border-gray-800 w-full text-left"
                    >
                      Services
                    </button>
                    <button
                      onClick={() => scrollToSection("work")}
                      className="block py-2 text-white hover:text-[#ff6b3d] transition-colors text-lg font-medium border-b border-gray-800 w-full text-left"
                    >
                      Work
                    </button>
                    <button
                      onClick={() => scrollToSection("testimonial")}
                      className="block py-2 text-white hover:text-[#ff6b3d] transition-colors text-lg font-medium border-b border-gray-800 w-full text-left"
                    >
                      Testimonial
                    </button>
                    <button
                      onClick={() => scrollToSection("contact")}
                      className="block py-2 text-white hover:text-[#ff6b3d] transition-colors text-lg font-medium border-b border-gray-800 w-full text-left"
                    >
                      Contact
                    </button>
                  </div>

                  {/* Mobile: Contact Info */}
                  <div className="bg-gradient-to-br from-[#1a1a1a] to-[#232323] p-6 rounded-lg border border-gray-800/50">
                    <div className="mb-6">
                      <h3 className="text-white text-xl font-bold mb-2">We help you go viral with our expertise</h3>
                      <p className="text-gray-400 text-sm mb-4">
                        Book the call with us and get a free consultation on your business
                      </p>
                      <Button
                        className="w-full bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:opacity-90 text-white rounded-md text-sm font-medium py-5"
                        onClick={() => scrollToSection("contact")}
                      >
                        BOOK A CALL NOW
                      </Button>
                    </div>

                    <div className="mb-6">
                      <h4 className="text-gray-300 text-sm font-medium mb-3 uppercase tracking-wide">
                        Contact details
                      </h4>
                      <div className="space-y-3">
                        <a
                          href="mailto:info.contexmedia@gmail.com"
                          className="flex items-center text-gray-300 hover:text-[#ff6b3d] transition-colors text-sm"
                        >
                          <Mail className="h-4 w-4 mr-2 text-[#ff6b3d]" />
                          info.contexmedia@gmail.com
                        </a>
                        <a
                          href="tel:+923126342763"
                          className="flex items-center text-gray-300 hover:text-[#ff6b3d] transition-colors text-sm"
                        >
                          <Phone className="h-4 w-4 mr-2 text-[#ff6b3d]" />
                          +92 312 6342763
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                /* Desktop: Only Contact Info in an Enhanced Design */
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-2">
                    <div className="bg-gradient-to-br from-[#1a1a1a] to-[#232323] p-8 rounded-lg border border-gray-800/50 relative overflow-hidden">
                      <div className="relative z-10">
                        <h3 className="text-white text-2xl md:text-3xl font-bold mb-3">
                          We help you go viral with our expertise
                        </h3>
                        <p className="text-gray-300 text-base mb-6 max-w-xl">
                          Book the call with us and get a free consultation on your business. We&apos;ll help you turn your
                          content into paying customers on autopilot.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 mb-8">
                          <Button
                            className="bg-gradient-to-r from-[#ff6b3d] to-[#ff4d00] hover:opacity-90 text-white rounded-md text-sm font-medium py-6 px-6"
                            onClick={() => scrollToSection("contact")}
                          >
                            BOOK A CALL NOW
                            <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <h4 className="text-gray-300 text-sm font-medium mb-3 uppercase tracking-wide">
                              Contact details
                            </h4>
                            <div className="space-y-3">
                              <Link
                                href="mailto:info.contexmedia@gmail.com"
                                className="flex items-center text-gray-300 hover:text-[#ff6b3d] transition-colors text-sm"
                              >
                                <Mail className="h-4 w-4 mr-2 text-[#ff6b3d]" />
                                info.contexmedia@gmail.com
                              </Link>
                              <Link
                                href="tel:+923126342763"
                                className="flex items-center text-gray-300 hover:text-[#ff6b3d] transition-colors text-sm"
                              >
                                <Phone className="h-4 w-4 mr-2 text-[#ff6b3d]" />
                                +92 312 6342763
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
