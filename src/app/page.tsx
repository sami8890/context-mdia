import Footer from "@/components/layout/footer";
import Navbar from "@/components/layout/navbar";
import BookCallSection from "@/components/main/calendly-link";
import Hero from "@/components/main/hero";
import LongFormContent from "@/components/main/long-form-content";
import ServicesSection from "@/components/main/services-section";
import ShortFormContent from "@/components/main/short-form-content";
import Testimonials from "@/components/main/testimonials";
import YoutubeThumbnails from "@/components/main/youtube-thumbnails";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0c0c0c] overflow-x-hidden">
      <Navbar />
      <Hero/>
      <Testimonials />
      <ServicesSection/>
      <div id="work">
        <ShortFormContent />
        <YoutubeThumbnails />
      </div>
      <LongFormContent />
      <BookCallSection/>
      <Footer />
    </main>
  )
}

