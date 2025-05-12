import { SectionHeading } from "@/components/ui/section-heading"
import { FeatureCard } from "@/components/ui/feature-card"
import { Sparkles, BookOpen, Palette, Lightbulb } from "lucide-react"

export function ServicesSection() {
  return (
    <section className="py-16 md:py-24 bg-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-sage-green/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="SERVICES"
          title="Creative Solutions for Neurodivergent Minds"
          description="Tailored resources and services designed to support your unique journey of healing, creativity, and sustainable growth."
          labelColor="text-midnight-teal"
          titleColor="text-midnight-blue"
          descriptionColor="text-midnight-teal/90"
        />

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mt-12">
          <FeatureCard
            title="Digital Journals & Workbooks"
            description="ADHD-friendly digital journals and workbooks designed for neurodivergent minds, with flexible structures and visual cues."
            icon={<BookOpen className="h-6 w-6 text-midnight-teal" />}
            link={{ href: "/shop", text: "Browse Journals" }}
          />
          <FeatureCard
            title="Southern Gothic Tarot"
            description="Unique tarot deck and guidebook infused with Southern Gothic aesthetics and ancestral wisdom for personal reflection."
            icon={<Sparkles className="h-6 w-6 text-midnight-teal" />}
            link={{ href: "/shop", text: "Explore Tarot" }}
          />
          <FeatureCard
            title="Art Prints & Merchandise"
            description="Curated collection of art prints, stickers, and merchandise featuring original Southern Gothic-inspired designs."
            icon={<Palette className="h-6 w-6 text-midnight-teal" />}
            link={{ href: "/gallery", text: "View Gallery" }}
          />
          <FeatureCard
            title="Business Planning Services"
            description="Strategic planning services for creative entrepreneurs, with a focus on sustainable systems and automation."
            icon={<Lightbulb className="h-6 w-6 text-midnight-teal" />}
            link={{ href: "/contact", text: "Learn More" }}
          />
        </div>
      </div>
    </section>
  )
}
