import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Moon, Sun, Star } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"
import { BirthChartGenerator } from "@/components/features/birth-chart-generator"

export function CelestialToolsSection() {
  const additionalTools = [
    {
      title: "Tarot Card Pulls",
      description: "Automated daily, weekly, or monthly tarot card pulls with personalized interpretations.",
      icon: <Star className="h-6 w-6 text-rich-gold" />,
      image: "/southern-gothic-tarot.png",
    },
    {
      title: "Moon Phase Tracker",
      description: "Track lunar cycles and receive guidance for aligning your activities with moon phases.",
      icon: <Moon className="h-6 w-6 text-rich-gold" />,
      image: "/placeholder.svg?key=2jya1",
    },
    {
      title: "Astrology Insights",
      description: "Personalized astrological insights based on current planetary transits and your birth chart.",
      icon: <Sun className="h-6 w-6 text-rich-gold" />,
      image: "/placeholder.svg?key=02666",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-rich-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="CELESTIAL TOOLS"
          title="Cosmic Guidance for Your Journey"
          description="Harness the wisdom of the stars with our automated celestial tools designed to support your healing and transformation."
          titleColor="text-rich-gold"
        />

        <div className="max-w-5xl mx-auto mb-16">
          <BirthChartGenerator />
        </div>

        <h3 className="font-heading text-2xl text-rich-gold mb-8 text-center">More Celestial Tools</h3>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {additionalTools.map((tool, index) => (
            <div
              key={index}
              className="bg-midnight-blue/40 backdrop-blur-sm rounded-lg overflow-hidden shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group"
            >
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={tool.image || "/placeholder.svg"}
                  alt={tool.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4">
                  <div className="bg-rich-gold/20 rounded-full p-2">{tool.icon}</div>
                </div>
              </div>
              <div className="p-6">
                <h3 className="font-heading text-xl text-rich-gold mb-3">{tool.title}</h3>
                <p className="font-body text-magnolia-white/90 mb-4">{tool.description}</p>
                <Link
                  href="#"
                  className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group"
                >
                  Try Now
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/celestial-tools"
            className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
          >
            Explore All Celestial Tools
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
