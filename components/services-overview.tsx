import type React from "react"
import Link from "next/link"
import { ArrowRight, Globe, Palette, Workflow, BookOpen, PenTool } from "lucide-react"

type Service = {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  link: string
}

const services: Service[] = [
  {
    id: "web-design",
    name: "Southern Gothic Web Design",
    description:
      "Elegant, sophisticated websites that blend southern charm with modern functionality. Perfect for businesses seeking a distinctive online presence.",
    icon: <Globe className="h-8 w-8 text-[#D4AF37]" />,
    link: "/services#web-design",
  },
  {
    id: "branding",
    name: "Elegant Brand Development",
    description:
      "Comprehensive branding services that capture the essence of southern sophistication. From logos to brand guidelines, we create cohesive visual identities.",
    icon: <Palette className="h-8 w-8 text-[#D4AF37]" />,
    link: "/services#branding",
  },
  {
    id: "automation",
    name: "Workflow Automation",
    description:
      "Streamlined business processes designed for executive function support. Our automation solutions help southern businesses operate more efficiently.",
    icon: <Workflow className="h-8 w-8 text-[#D4AF37]" />,
    link: "/services#automation",
  },
  {
    id: "ai-research",
    name: "AI Research Assistance",
    description:
      "Cutting-edge AI tools to support research, content creation, and business intelligence. We make advanced technology accessible to southern businesses.",
    icon: <BookOpen className="h-8 w-8 text-[#D4AF37]" />,
    link: "/services#ai-research",
  },
  {
    id: "content",
    name: "Content Creation",
    description:
      "Southern-inspired content that tells your story with elegance and authenticity. From blog posts to social media, we craft compelling narratives.",
    icon: <PenTool className="h-8 w-8 text-[#D4AF37]" />,
    link: "/services#content",
  },
]

export default function ServicesOverview() {
  return (
    <section className="py-16 bg-[#F8F6F0]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif text-[#191970] mb-4">Our Services</h2>
          <p className="text-[#191970]/80 max-w-2xl mx-auto">
            Midnight Magnolia offers a range of digital services designed with southern elegance and modern
            functionality.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service) => (
            <div
              key={service.id}
              className="bg-white rounded-lg shadow-md p-6 transition-transform hover:-translate-y-1"
            >
              <div className="mb-4">{service.icon}</div>
              <h3 className="text-xl font-serif text-[#191970] mb-3">{service.name}</h3>
              <p className="text-[#191970]/70 mb-4">{service.description}</p>
              <Link
                href={service.link}
                className="inline-flex items-center text-[#191970] hover:text-[#D4AF37] transition-colors font-medium"
              >
                Learn More <ArrowRight size={16} className="ml-1" />
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
            href="/services"
            className="inline-flex items-center px-6 py-3 bg-[#191970] text-white rounded-md hover:bg-[#191970]/90 transition-colors font-medium"
          >
            View All Services <ArrowRight size={18} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  )
}
