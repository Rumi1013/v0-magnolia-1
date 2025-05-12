import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

export function NotionTemplatesSection() {
  const notionIcons = [
    { icon: "🌙", name: "Crescent Moon", use: "Brand Core Pages", meaning: "Transformation, night wisdom" },
    {
      icon: "🌸",
      name: "Magnolia Flower",
      use: "Main Content/Products",
      meaning: "Beauty, resilience, Southern heritage",
    },
    { icon: "✨", name: "Sparkles", use: "Special Projects", meaning: "Magic, inspiration, illumination" },
    { icon: "🕯️", name: "Candle", use: "Guidelines/Standards", meaning: "Illumination, guidance, ritual" },
  ]

  const notionTemplates = [
    {
      title: "Digital Creator's Command Center",
      description: "Complete Notion workspace with content planning, client management, and project tracking.",
      image: "/placeholder.svg?key=l9ifl",
      price: "$47",
      featured: true,
    },
    {
      title: "Patron Content Calendar",
      description: "Streamlined system for planning, creating, and scheduling your Patreon content.",
      image: "/placeholder.svg?key=zs7wo",
      price: "$37",
      featured: true,
    },
    {
      title: "Southern Digital Grimoire",
      description: "Digital journal system with tarot tracking, moon phases, and ancestral wisdom collection.",
      image: "/placeholder.svg?key=2wqd0",
      price: "$29",
      featured: true,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-magnolia-white relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="NOTION TEMPLATES"
          title="Digital Organization with Southern Gothic Style"
          description="Beautiful, functional Notion templates designed for neurodivergent creators with ADHD-friendly systems."
          labelColor="text-midnight-teal"
          titleColor="text-midnight-blue"
          descriptionColor="text-midnight-teal/90"
        />

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto mb-16">
          {notionTemplates.map((template, index) => (
            <div
              key={index}
              className="bg-white rounded-lg overflow-hidden shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image src={template.image || "/placeholder.svg"} alt={template.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl text-magnolia-white mb-1">{template.title}</h3>
                  <p className="text-magnolia-white/90 text-sm">{template.price}</p>
                </div>
              </div>
              <div className="p-6">
                <p className="font-body text-midnight-teal/90 mb-4">{template.description}</p>
                <Link
                  href="/shop"
                  className="inline-flex items-center text-midnight-teal font-accent text-sm hover:underline"
                >
                  View Template
                  <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-midnight-blue/90 rounded-xl p-8 max-w-4xl mx-auto text-magnolia-white">
          <h3 className="font-heading text-2xl text-rich-gold mb-6 text-center">Midnight Magnolia Notion Icons</h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
            {notionIcons.map((item, index) => (
              <div key={index} className="bg-midnight-blue/60 p-4 rounded-lg border border-rich-gold/20 text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h4 className="font-heading text-lg text-rich-gold mb-1">{item.name}</h4>
                <p className="text-xs text-magnolia-white/80 mb-1">{item.use}</p>
                <p className="text-xs italic text-magnolia-white/70">{item.meaning}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/notion-resources"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors"
            >
              Explore All Notion Resources
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
