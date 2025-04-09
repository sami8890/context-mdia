"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import {
  ArrowUpRight,
  Github,
  Linkedin,
  Twitter,
  Mail,
  Sparkles,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function TeamSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [activeCard, setActiveCard] = useState<number | null>(null);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    setIsLoaded(true);

    const handleMouseMove = (e: MouseEvent) => {
      if (sectionRef.current) {
        const { left, top, width, height } =
          sectionRef.current.getBoundingClientRect();
        const x = (e.clientX - left) / width;
        const y = (e.clientY - top) / height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const teamMembers = [
    {
      id: 1,
      name: "Ahmed Hassan",
      role: "Founder & CEO",
      bio: "Visionary leader with 8+ years in video production and AI technology. Pioneered our revolutionary editing algorithms.",
      image: "/Ahmed-hassan.png",
      socialLinks: [
        { icon: <Twitter className="h-4 w-4" />, url: "#" },
        { icon: <Linkedin className="h-4 w-4" />, url: "#" },
        { icon: <Mail className="h-4 w-4" />, url: "#" },
      ],
      stats: [
        { label: "Projects", value: "120+" },
        { label: "Revenue", value: "$2.5M" },
      ],
    },
    {
      id: 2,
      name: "Hood Cgh",
      role: "Creative Director",
      bio: "Award-winning filmmaker with expertise in storytelling and visual effects. Leads our creative vision and client strategy.",
        image: "/hood.png",
      socialLinks: [
        { icon: <Twitter className="h-4 w-4" />, url: "#" },
        { icon: <Github className="h-4 w-4" />, url: "#" },
        { icon: <Mail className="h-4 w-4" />, url: "#" },
      ],
      stats: [
        { label: "Awards", value: "15" },
        { label: "Clients", value: "200+" },
      ],
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative py-12 md:py-20 lg:py-24 overflow-hidden bg-gradient-to-b from-black to-zinc-900"
    >
      {/* Enhanced background with curved lines */}
      <div className="absolute inset-0 z-0">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGZpbGw9IiMyODI4MjgiIGQ9Ik0wIDBoNjB2NjBIMHoiLz48cGF0aCBkPSJNNjAgNjBIMFYwaDYweiIgc3Ryb2tlPSIjMzMzIiBzdHJva2Utb3BhY2l0eT0iLjE1Ii8+PC9nPjwvc3ZnPg==')] opacity-20"></div>

        {/* Animated gradient background */}
        <div
          className="absolute w-full h-full opacity-40"
          style={{
            background:
              "radial-gradient(circle at center, rgba(249,115,22,0.3) 0%, rgba(0,0,0,0) 70%)",
            transform: `translate(${(mousePosition.x - 0.5) * 5}%, ${
              (mousePosition.y - 0.5) * 5
            }%)`,
            transition: "transform 0.5s ease-out",
          }}
        ></div>

        {/* Curved lines */}
        <svg
          className="absolute w-full h-full"
          viewBox="0 0 1200 800"
          preserveAspectRatio="none"
        >
          <path
            d="M0,100 C300,300 900,-100 1200,100 L1200,800 L0,800 Z"
            className="fill-orange-500/5"
          />
          <path
            d="M0,200 C400,100 800,300 1200,200 L1200,800 L0,800 Z"
            className="fill-orange-500/3"
          />
          <path
            d="M0,300 C200,400 1000,200 1200,300 L1200,800 L0,800 Z"
            className="fill-red-500/3"
          />
        </svg>

        {/* Animated particles */}
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full"
            style={{
              width: `${Math.random() * 8 + 4}px`,
              height: `${Math.random() * 8 + 4}px`,
              background:
                i % 3 === 0
                  ? "rgba(249,115,22,0.4)"
                  : i % 3 === 1
                  ? "rgba(239,68,68,0.3)"
                  : "rgba(255,255,255,0.2)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animation: `float ${
                Math.random() * 20 + 15
              }s infinite ease-in-out`,
              animationDelay: `${Math.random() * 5}s`,
              boxShadow: i % 3 === 0 ? "0 0 10px rgba(249,115,22,0.5)" : "none",
            }}
          ></div>
        ))}
      </div>

      <div className="container max-w-5xl mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-2xl mx-auto text-center mb-10 md:mb-12">
          <div
            className={`inline-block rounded-lg bg-orange-500/10 backdrop-blur-sm px-4 py-2 mb-4 border border-orange-500/20 transition-all duration-700 ${
              isLoaded
                ? "opacity-100 translate-y-0"
                : "opacity-0 -translate-y-4"
            }`}
          >
            <span className="text-orange-400 font-medium">Meet Our Team</span>
          </div>

          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-4 transition-all duration-700 delay-200 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <span className="text-white">The </span>
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-orange-400 via-orange-500 to-red-500 bg-clip-text text-transparent">
                Visionaries
              </span>
              <Sparkles className="absolute -right-8 -top-2 h-6 w-6 text-orange-500 animate-pulse" />
              <span className="absolute -bottom-1 left-0 w-full h-1 bg-gradient-to-r from-orange-500 to-red-600 rounded-full"></span>
            </span>
          </h2>

          <p
            className={`text-lg md:text-xl text-zinc-300 max-w-2xl mx-auto transition-all duration-700 delay-400 ${
              isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Our exceptional team combines creative expertise with technical
            innovation to transform your content into engaging stories that
            drive results.
          </p>
        </div>

        {/* Team members */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={member.id}
              className={`transition-all duration-1000 delay-${
                500 + index * 200
              } ${
                isLoaded
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-12"
              }`}
              onMouseEnter={() => setActiveCard(member.id)}
              onMouseLeave={() => setActiveCard(null)}
            >
              <div
                className="relative bg-gradient-to-br from-zinc-800/90 to-zinc-900/90 backdrop-blur-md rounded-2xl border border-orange-500/20 overflow-hidden shadow-2xl shadow-orange-900/10 group"
                style={{
                  transform:
                    activeCard === member.id
                      ? `perspective(1000px) rotateY(${
                          (mousePosition.x - 0.5) * 5
                        }deg) rotateX(${
                          (0.5 - mousePosition.y) * 5
                        }deg) scale(1.02)`
                      : "perspective(1000px)",
                  transition: "transform 0.5s ease",
                }}
              >
                {/* Enhanced glow effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-br from-orange-500/20 to-red-600/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  {/* Image and gradient overlay */}
                  <div className="relative h-96 overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-900 z-10"></div>
                    <Image
                      src={member.image || "/placeholder.svg"}
                      alt={member.name}
                      width={400}
                      height={700}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
                    />

                    {/* Curved overlay */}
                    <svg
                      className="absolute bottom-0 left-0 w-full z-20"
                      viewBox="0 0 1200 120"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,0 C300,120 900,0 1200,80 L1200,120 L0,120 Z"
                        className="fill-zinc-900"
                      ></path>
                    </svg>
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 relative">
                    {/* Name and role */}
                    <div className="mb-3">
                      <h3 className="text-xl md:text-2xl font-bold text-white mb-1">
                        {member.name}
                      </h3>
                      <p className="text-orange-400 font-medium text-sm">
                        {member.role}
                      </p>
                    </div>

                    {/* Bio */}
                    <p className="text-zinc-300 mb-4 text-sm">{member.bio}</p>

                    {/* Stats */}
                    <div className="grid grid-cols-2 gap-3 mb-4">
                      {member.stats.map((stat, i) => (
                        <div
                          key={i}
                          className="bg-zinc-800/50 backdrop-blur-sm border border-orange-500/10 rounded-xl p-2 hover:border-orange-500/30 transition-all duration-300 group-hover:transform group-hover:translate-y-[-4px]"
                        >
                          <div className="text-lg font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                            {stat.value}
                          </div>
                          <div className="text-zinc-400 text-xs font-medium">
                            {stat.label}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Social links and CTA */}
                    <div className="flex items-center justify-between">
                      <div className="flex space-x-2">
                        {member.socialLinks.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            className="h-7 w-7 rounded-full bg-zinc-800 hover:bg-zinc-700 border border-orange-500/20 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>

                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white border-0 rounded-xl relative overflow-hidden group shadow-lg shadow-orange-900/20"
                      >
                        <span className="relative z-10 flex items-center font-medium text-sm">
                          Connect
                          <ArrowUpRight className="ml-1 h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                        </span>
                        <span className="absolute inset-0 bg-gradient-to-r from-red-600 to-orange-500 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Floating accent elements */}
        <div
          className={`hidden lg:block absolute top-1/4 -right-20 w-40 h-40 rounded-full border border-orange-500/20 animate-spin-slow transition-all duration-1000 delay-1000 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
        ></div>
        <div
          className={`hidden lg:block absolute bottom-1/4 -left-20 w-20 h-20 rounded-full border border-red-500/20 animate-spin-slow transition-all duration-1000 delay-1200 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          style={{ animationDirection: "reverse", animationDuration: "15s" }}
        ></div>
      </div>

      {/* Curved bottom edge */}
      <svg
        className="absolute bottom-0 left-0 w-full"
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
      >
        <path
          d="M0,120 C400,0 800,100 1200,30 L1200,120 L0,120 Z"
          className="fill-zinc-900"
        ></path>
      </svg>
    </section>
  );
}
