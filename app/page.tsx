import Hero from "@/components/Hero"
import FeaturedProducts from "@/components/FeaturedProducts"
import AboutSection from "@/components/AboutSection"
import ServicesSection from "@/components/ServicesSection"
import TestimonialsSection from "@/components/TestimonialsSection"
import HeritageSection from "@/components/HeritageSection"
import NewsletterSection from "@/components/NewsletterSection"
import MoonPhaseTracker from "@/components/MoonPhaseTracker"
import AIShowcase from "@/components/AIShowcase"
import SouthernGothicShowcase from "@/components/SouthernGothicShowcase"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Hero />
      <AboutSection />
      <SouthernGothicShowcase />
      <FeaturedProducts />
      <AIShowcase />
      <ServicesSection />
      <HeritageSection />
      <TestimonialsSection />
      <div className="bg-midnight-blue text-magnolia-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="w-full md:w-1/2">
              <MoonPhaseTracker />
            </div>
            <div className="w-full md:w-1/2">
              <NewsletterSection />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
