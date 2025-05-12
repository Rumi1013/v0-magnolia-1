import Image from "next/image"
import { Sparkles, Heart, Zap } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"

export function HeroSection() {
  return (
    <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue via-midnight-teal/90 to-midnight-teal">
      <div className="container mx-auto px-4 text-center mb-12">
        <div className="max-w-md mx-auto mb-8 relative">
          <div className="absolute inset-0 bg-rich-gold/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="relative z-10 rounded-full shadow-[0_0_30px_rgba(212,175,55,0.3)] overflow-hidden">
            <Image
              src="/logo/midnight-magnolia-warm.png"
              alt="Midnight Magnolia"
              width={400}
              height={400}
              className="w-full h-auto"
              priority
              style={{ animation: "float 6s ease-in-out infinite" }}
            />
          </div>
        </div>
        <h1 className="font-heading text-4xl md:text-5xl text-rich-gold mb-4 drop-shadow-sm">Midnight Magnolia</h1>
        <p className="font-body text-lg text-magnolia-white/95 max-w-2xl mx-auto drop-shadow-sm">
          A Southern Digital Sanctuary weaving together creativity, self-healing, automation, and storytelling for women
          of resilience.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
          <CTAButton href="/our-story" variant="primary" size="md">
            Discover Our Story
          </CTAButton>
          <CTAButton
            href="/shop"
            variant="outline"
            size="md"
            className="border-magnolia-white/50 text-magnolia-white hover:bg-magnolia-white/10"
          >
            Explore Products
          </CTAButton>
        </div>

        {/* Value Proposition Badges */}
        <div className="flex flex-wrap justify-center gap-4 mt-10">
          <div className="bg-midnight-blue/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <Sparkles className="h-4 w-4 text-rich-gold" />
            <span className="text-sm font-accent text-magnolia-white/90">ADHD-Friendly Design</span>
          </div>
          <div className="bg-midnight-blue/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <Heart className="h-4 w-4 text-rich-gold" />
            <span className="text-sm font-accent text-magnolia-white/90">Trauma-Informed Business</span>
          </div>
          <div className="bg-midnight-blue/40 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <Zap className="h-4 w-4 text-rich-gold" />
            <span className="text-sm font-accent text-magnolia-white/90">Automation for Liberation</span>
          </div>
        </div>
      </div>
    </section>
  )
}
