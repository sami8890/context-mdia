import Link from "next/link"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Footer() {
    return (
        <footer className="bg-black text-white py-16 px-4 md:px-8 lg:px-16">
            <div className="container mx-auto max-w-6xl">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Logo and Brand */}
                    <div>
                        <Link href="/" className="text-white text-3xl font-bold">
                            <span className="text-[#ff6b3d]">Context</span>media
                        </Link>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-medium mb-6">Quick Link</h3>
                        <nav className="flex flex-wrap gap-x-8 gap-y-4">
                            <Link href="/service" className="text-gray-400 hover:text-[#ff6b3d] transition-colors">
                                Service
                            </Link>
                            <Link href="/projects" className="text-gray-400 hover:text-[#ff6b3d] transition-colors">
                                Projects
                            </Link>
                            <Link href="/pricing" className="text-gray-400 hover:text-[#ff6b3d] transition-colors">
                                Pricing
                            </Link>
                            <Link href="/faqs" className="text-gray-400 hover:text-[#ff6b3d] transition-colors">
                                Faqs
                            </Link>
                            <Link href="/contact" className="text-gray-400 hover:text-[#ff6b3d] transition-colors">
                                Contact
                            </Link>
                        </nav>

                        <div className="mt-8">
                            <form className="flex gap-2">
                                <div className="relative flex-1">
                                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 h-4 w-4" />
                                    <input
                                        type="email"
                                        placeholder="Email Address"
                                        className="w-full bg-transparent border-b border-gray-700 py-2 pl-10 pr-4 text-white placeholder:text-gray-500 focus:outline-none focus:border-[#ff6b3d]"
                                    />
                                </div>
                                <Button className="bg-[#ff6b3d] hover:bg-[#ff5722] text-white rounded-md px-4">
                                    Sign Up <ArrowRight className="ml-2 h-4 w-4" />
                                </Button>
                            </form>
                        </div>
                    </div>

                    {/* Address */}
                    <div>
                        <h3 className="text-lg font-medium mb-6">Address</h3>
                        <div className="space-y-4">
                            <div className="flex items-start gap-3">
                                <MapPin className="h-5 w-5 text-[#ff6b3d] mt-0.5" />
                                <p className="text-gray-400">
                                    55 Main Street, 2nd block,
                                    <br />
                                    New York City
                                </p>
                            </div>

                            <div className="flex items-center gap-3">
                                <Mail className="h-5 w-5 text-[#ff6b3d]" />
                                <a
                                    href="mailto:info.contexmedia@gmail.com"
                                    className="text-gray-400 hover:text-[#ff6b3d] transition-colors"
                                >
                                    info.contexmedia@gmail.com
                                </a>
                            </div>

                            <div className="flex items-center gap-3">
                                <Phone className="h-5 w-5 text-[#ff6b3d]" />
                                <a href="tel:+923126342763" className="text-gray-400 hover:text-[#ff6b3d] transition-colors">
                                    +92 312 6342763
                                </a>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500 text-sm">
                    <p>© {new Date().getFullYear()} Contexmedia. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}

