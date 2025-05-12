import Link from "next/link"
import { ArrowRight, Star, Sparkles } from "lucide-react"
import { CTAButton } from "@/components/ui/cta-button"

export function AboutSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="font-heading text-3xl md:text-4xl text-center mb-12 text-rich-gold drop-shadow-lg">
            The Story Behind Midnight Magnolia
          </h2>

          <div className="bg-midnight-blue/50 p-8 rounded-lg border-l-4 border-rich-gold mb-12 shadow-lg transform hover:scale-102 transition-transform">
            <p className="font-heading text-xl italic text-magnolia-white/90">
              "A journey of transformation, resilience, and reclamation that birthed not just a business, but a movement
              for financial autonomy and creative freedom."
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12 mb-12">
            <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rich-gold/20">
              <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md flex items-center gap-2">
                <Star className="h-5 w-5 text-rich-gold" />
                Origins in Transformation
              </h3>
              <p className="font-body text-magnolia-white/90 mb-4">
                Midnight Magnolia was born from the ashes of burnout, the trauma of activism, and the journey of
                self-discovery that follows when you finally choose yourself.
              </p>
              <Link
                href="/our-story"
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
              >
                Read more <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>

            <div className="bg-midnight-blue/30 p-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-rich-gold/20">
              <h3 className="font-heading text-2xl text-rich-gold mb-4 drop-shadow-md flex items-center gap-2">
                <Sparkles className="h-5 w-5 text-rich-gold" />
                The Power of Diagnosis
              </h3>
              <p className="font-body text-magnolia-white/90 mb-4">
                At 42, I received an ADHD diagnosis that finally provided context for what I had experienced as failure.
                I wasn't broken—I was wired differently in a world that never learned to listen.
              </p>
              <Link
                href="/our-story"
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
              >
                Read more <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Enhanced CTA */}
          <div className="text-center">
            <CTAButton href="/our-story" variant="primary">
              Read the Full Story
            </CTAButton>
          </div>
        </div>
      </div>
    </section>
  )
}
