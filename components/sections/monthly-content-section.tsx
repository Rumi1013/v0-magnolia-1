import Image from "next/image"
import { SectionHeading } from "@/components/ui/section-heading"
import { FileText, Music, ImageIcon, MessageCircle } from "lucide-react"

export function MonthlyContentSection() {
  const contentTypes = [
    {
      title: "Monthly Affirmation Cards",
      description:
        "Beautifully designed digital cards with powerful affirmations themed around resilience and transformation.",
      icon: <FileText className="h-6 w-6 text-midnight-blue" />,
      image: "/placeholder.svg?key=sceu5",
    },
    {
      title: "Digital Wallpapers",
      description: "Exclusive mobile and desktop wallpapers featuring Southern Gothic themes and inspirational quotes.",
      icon: <ImageIcon className="h-6 w-6 text-midnight-blue" />,
      image: "/placeholder.svg?key=vxzs7",
    },
    {
      title: "Audio Rituals & Playlists",
      description: "Guided meditations and curated playlists to support your healing journey and creative practice.",
      icon: <Music className="h-6 w-6 text-midnight-blue" />,
      image: "/placeholder.svg?key=94gez",
    },
    {
      title: "Community Circle Gatherings",
      description: "Monthly virtual gatherings focused on shared growth, creative exploration, and community support.",
      icon: <MessageCircle className="h-6 w-6 text-midnight-blue" />,
      image: "/placeholder.svg?key=w6ujg",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-magnolia-white relative overflow-hidden">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="MONTHLY CONTENT"
          title="Consistent Support for Your Journey"
          description="As a patron, you'll receive these carefully crafted resources each month to support your healing and creative practice."
          labelColor="text-midnight-teal"
          titleColor="text-midnight-blue"
          descriptionColor="text-midnight-teal/90"
        />

        <div className="grid md:grid-cols-2 gap-8 mt-12">
          {contentTypes.map((content, index) => (
            <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden border border-sage-green/20">
              <div className="relative h-48">
                <Image src={content.image || "/placeholder.svg"} alt={content.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="font-heading text-xl text-magnolia-white mb-1">{content.title}</h3>
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 bg-sage-green/20 rounded-full flex items-center justify-center flex-shrink-0">
                    {content.icon}
                  </div>
                  <p className="font-body text-midnight-teal/90">{content.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-midnight-teal/90 max-w-2xl mx-auto mb-6">
            All content is designed with ADHD-friendly principles, featuring clear visual hierarchies, consistent
            structures, and flexible implementation options.
          </p>
          <a
            href="/patron-portal"
            className="inline-flex items-center px-6 py-3 bg-midnight-blue text-magnolia-white rounded-md font-accent text-sm hover:bg-midnight-blue/90 transition-colors"
          >
            Explore Patron Portal
          </a>
        </div>
      </div>
    </section>
  )
}
