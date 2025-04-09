"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail, Phone, MapPin, Send, Sparkles, Instagram, Twitter, Youtube, Linkedin } from "lucide-react"
import Link from "next/link"

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitSuccess(true)
      // Reset form after successful submission
      setFormData({
        name: "",
        email: "",
        subject: "",
        message: "",
      })

      // Reset success message after 5 seconds
      setTimeout(() => {
        setSubmitSuccess(false)
      }, 5000)
    }, 1500)
  }

  return (
    <section id="contact" className="py-16 md:py-24 relative">
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        {/* Background gradient */}
        <div className="absolute bottom-[20%] right-[-10%] w-[50%] h-[50%] bg-gradient-to-bl from-orange-600/10 to-red-500/10 rounded-full blur-[100px]"></div>

        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyODI4MjgiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgNjBIMFYwaDYweiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utb3BhY2l0eT0iLjE1Ii8+PC9nPjwvc3ZnPg==')] opacity-10"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-block rounded-lg bg-orange-500/10 backdrop-blur-sm px-4 py-2 mb-4 border border-orange-500/20">
            <span className="text-orange-400 font-medium">Get In Touch</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-white">Contact </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Us Today
              </span>
              <Sparkles className="absolute -right-8 -top-2 h-6 w-6 text-orange-500 animate-pulse" />
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></span>
            </span>
          </h2>
          <p className="text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto">
            Ready to transform your video content? Reach out to discuss your project
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact Info */}
          <div>
            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-700/50 p-6 md:p-8 mb-8">
              <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center">
                    <Mail className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Email Us</p>
                    <Link
                      href="mailto:hello@contextmedia.com"
                      className="text-white hover:text-orange-400 transition-colors"
                    >
                      hello@contextmedia.com
                    </Link>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center">
                    <Phone className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Call Us</p>
                    <a href="tel:+1234567890" className="text-white hover:text-orange-400 transition-colors">
                      +1 (234) 567-890
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-orange-500/20 to-red-600/20 flex items-center justify-center">
                    <MapPin className="h-5 w-5 text-orange-500" />
                  </div>
                  <div>
                    <p className="text-zinc-400 text-sm">Visit Us</p>
                    <address className="text-white not-italic">
                      123 Creative Studio St.
                      <br />
                      Los Angeles, CA 90210
                    </address>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-700/50 p-6 md:p-8">
              <h3 className="text-xl font-bold text-white mb-4">Follow Us</h3>
              <p className="text-zinc-400 mb-6">Stay connected with us on social media</p>

              <div className="flex gap-4">
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-orange-500 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-orange-500 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-orange-500 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="YouTube"
                >
                  <Youtube className="h-5 w-5" />
                </Link>
                <Link
                  href="#"
                  className="h-10 w-10 rounded-full bg-zinc-800 hover:bg-orange-500 border border-zinc-700 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-gradient-to-br from-zinc-800/80 to-zinc-900/80 backdrop-blur-md rounded-xl border border-zinc-700/50 p-6 md:p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Send Us a Message</h3>

            {submitSuccess ? (
              <div className="bg-green-500/20 border border-green-500/30 rounded-lg p-4 mb-6">
                <p className="text-green-400">Your message has been sent successfully! We&apos;ll get back to you soon.</p>
              </div>
            ) : null}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-zinc-300 mb-2">
                  Your Name
                </label>
                <Input
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="John Doe"
                  required
                  className="bg-zinc-800/50 border-zinc-700 focus:border-orange-500 text-white"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-zinc-300 mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  required
                  className="bg-zinc-800/50 border-zinc-700 focus:border-orange-500 text-white"
                />
              </div>

              <div>
                <label htmlFor="subject" className="block text-zinc-300 mb-2">
                  Subject
                </label>
                <Input
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="How can we help you?"
                  required
                  className="bg-zinc-800/50 border-zinc-700 focus:border-orange-500 text-white"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-zinc-300 mb-2">
                  Your Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Tell us about your project..."
                  required
                  className="w-full bg-zinc-800/50 border border-zinc-700 focus:border-orange-500 text-white rounded-md p-2 resize-none h-32"
                  style={{ minHeight: "8rem", maxHeight: "12rem" }}
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 h-12 rounded-xl relative overflow-hidden group"
              >
                <span className="relative z-10 flex items-center justify-center">
                  {isSubmitting ? "Sending..." : "Send Message"}
                  <Send className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </span>
                <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

