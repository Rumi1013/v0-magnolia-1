import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Zap, RefreshCw, BarChart3, Clock } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

export function AutomationSection() {
  const automationFeatures = [
    {
      title: "Content Scheduling",
      description:
        "Automated content distribution across platforms to maintain consistent presence without constant manual posting.",
      icon: <Clock className="h-6 w-6 text-rich-gold" />,
    },
    {
      title: "Sales Funnels",
      description:
        "Automated email sequences and customer journeys that nurture leads and convert prospects into customers.",
      icon: <BarChart3 className="h-6 w-6 text-rich-gold" />,
    },
    {
      title: "Customer Service",
      description:
        "Streamlined support systems that ensure customers receive timely assistance without requiring 24/7 attention.",
      icon: <RefreshCw className="h-6 w-6 text-rich-gold" />,
    },
    {
      title: "Passive Income Streams",
      description: "Digital product delivery systems that generate income while you focus on creation and rest.",
      icon: <Zap className="h-6 w-6 text-rich-gold" />,
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue/80 to-midnight-teal/90 text-magnolia-white">
      <div className="container mx-auto px-4">
        <SectionHeading
          label="AUTOMATION & PASSIVE INCOME"
          title="Liberation Through Automation"
          description="Discover how strategic automation can create freedom, sustainability, and passive income for your creative business."
          titleColor="text-rich-gold"
        />

        <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-16">
          <div>
            <div className="relative h-full rounded-xl overflow-hidden shadow-2xl border border-rich-gold/20">
              <Image
                src="/passive-income-automation.png"
                alt="Automation for Liberation"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/90 to-transparent"></div>
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="font-heading text-2xl text-rich-gold mb-2">Automation for Liberation</h3>
                <p className="text-magnolia-white/90 mb-4">
                  Strategic systems that work while you rest, creating sustainable income and freedom.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {automationFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                    {feature.icon}
                  </div>
                  <div>
                    <h3 className="font-heading text-xl text-rich-gold mb-2">{feature.title}</h3>
                    <p className="text-magnolia-white/90">{feature.description}</p>
                  </div>
                </div>
              </div>
            ))}

            <Link
              href="/shop/product/3"
              className="inline-flex items-center gap-2 px-6 py-3 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
            >
              Explore Passive Income Guide
              <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>

        {/* Automation Stats */}
        <div className="bg-midnight-blue/40 backdrop-blur-sm rounded-xl p-8 max-w-4xl mx-auto border border-rich-gold/20">
          <div className="text-center mb-8">
            <h3 className="font-heading text-2xl text-rich-gold mb-2">The Power of Automation</h3>
            <p className="text-magnolia-white/90">
              Strategic automation creates more time and efficiency for creative entrepreneurs.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <p className="text-3xl font-accent text-rich-gold mb-2">30%</p>
              <p className="text-sm text-magnolia-white/80">Time Saved on Routine Tasks</p>
            </div>
            <div>
              <p className="text-3xl font-accent text-rich-gold mb-2">24/7</p>
              <p className="text-sm text-magnolia-white/80">Digital Product Delivery</p>
            </div>
            <div>
              <p className="text-3xl font-accent text-rich-gold mb-2">15%</p>
              <p className="text-sm text-magnolia-white/80">Potential Revenue Increase</p>
            </div>
            <div>
              <p className="text-3xl font-accent text-rich-gold mb-2">2x</p>
              <p className="text-sm text-magnolia-white/80">Typical Return on Investment</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
