import Hero from "@/components/hero"
import Navbar from "@/components/navbar"
import { SparklesCore } from "@/components/sparkles"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { AIResearcher } from "@/components/ai-researcher"
import { ProductsSection } from "@/components/products-section"
import { ServicesSection } from "@/components/services-section"
import { PricingSection } from "@/components/pricing-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0F0F1A] antialiased bg-grid-white/[0.02] relative overflow-hidden">
      {/* Ambient background with moving particles */}
      <div className="h-full w-full absolute inset-0 z-0">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={80}
          className="w-full h-full"
          particleColor="#D4AF37"
        />
      </div>

      <div className="relative z-10">
        <Navbar />
        <Hero />
        <ProductsSection />
        <ServicesSection />
        <AIResearcher />
        <PricingSection />

        {/* Dashboard Link */}
        <div className="flex justify-center py-12">
          <Link href="/dashboard">
            <Button size="lg" className="bg-[#D4AF37] hover:bg-[#D4AF37]/80 text-[#191970] font-medium">
              View Brand Dashboard
            </Button>
          </Link>
        </div>

        <Footer />
      </div>
    </main>
  )
}
