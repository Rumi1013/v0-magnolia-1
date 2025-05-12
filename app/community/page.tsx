import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, MessageCircle, Calendar, BookOpen, Heart, Shield } from "lucide-react"
import { SiteHeader } from "@/components/layout/site-header"
import { SiteFooter } from "@/components/layout/site-footer"

export default function Community() {
  const communityFeatures = [
    {
      title: "Spoonie Community",
      description: "A supportive space for those navigating chronic illness, disability, and neurodivergence.",
      icon: <Users className="h-6 w-6 text-midnight-teal" />,
      link: "/patron-portal",
    },
    {
      title: "Monthly Gatherings",
      description: "Virtual events focused on healing, creativity, and business development.",
      icon: <Calendar className="h-6 w-6 text-midnight-teal" />,
      link: "/events",
    },
    {
      title: "Resource Library",
      description: "Access our growing collection of guides, templates, and educational materials.",
      icon: <BookOpen className="h-6 w-6 text-midnight-teal" />,
      link: "/resources",
    },
    {
      title: "Private Forum",
      description: "Connect with community members in a safe, moderated space for sharing and support.",
      icon: <MessageCircle className="h-6 w-6 text-midnight-teal" />,
      link: "/forum",
    },
  ]

  const upcomingEvents = [
    {
      date: "MAY 15, 2025",
      time: "7:00 PM EST",
      title: "Blooming Through Adversity Circle",
      description: "A guided community discussion on personal and collective resilience.",
      access: "Crescent Bloom members and above",
      image: "/placeholder.svg?height=200&width=300&query=virtual+community+gathering",
    },
    {
      date: "JUNE 1, 2025",
      time: "3:00 PM EST",
      title: "Automation for Liberation Workshop",
      description: "Learn practical automation strategies to create more freedom in your business.",
      access: "Golden Grove members and above",
      image: "/placeholder.svg?height=200&width=300&query=business+automation+workshop",
    },
    {
      date: "JUNE 21, 2025",
      time: "8:00 PM EST",
      title: "Summer Solstice Ritual",
      description: "A guided meditation and intention-setting ceremony for the summer season.",
      access: "Open to all community members",
      image: "/placeholder.svg?height=200&width=300&query=summer+solstice+ritual",
    },
  ]

  return (
    <div className="min-h-screen bg-midnight-blue">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-gradient-to-b from-midnight-blue to-midnight-teal text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl mb-6 text-rich-gold drop-shadow-lg">Join Our Community</h1>
          <p className="font-body text-xl text-magnolia-white/95 max-w-2xl mx-auto">
            Connect with like-minded individuals on their journey of transformation, creativity, and healing in our
            Southern Digital Sanctuary.
          </p>
        </div>
      </section>

      {/* Community Features */}
      <section className="py-16 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">Community Features</h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {communityFeatures.map((feature, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
              >
                <div className="w-12 h-12 bg-sage-green/20 rounded-full flex items-center justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="font-heading text-xl text-midnight-blue mb-3">{feature.title}</h3>
                <p className="text-midnight-teal/90 mb-4 flex-grow">{feature.description}</p>
                <Link
                  href={feature.link}
                  className="font-accent text-sm text-midnight-teal hover:underline inline-flex items-center gap-1 group mt-auto"
                >
                  Learn More
                  <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Guidelines */}
      <section className="py-16 bg-midnight-blue/90">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-rich-gold mb-12 text-center">Community Guidelines</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg border border-midnight-teal/30">
              <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mb-4">
                <Heart className="h-6 w-6 text-rich-gold" />
              </div>
              <h3 className="font-heading text-xl text-rich-gold mb-3">Lead with Compassion</h3>
              <p className="text-magnolia-white/80">
                Approach all interactions with kindness, understanding that everyone is navigating their own healing
                journey. We value empathy and support over judgment and criticism.
              </p>
            </div>
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg border border-midnight-teal/30">
              <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mb-4">
                <Shield className="h-6 w-6 text-rich-gold" />
              </div>
              <h3 className="font-heading text-xl text-rich-gold mb-3">Respect Privacy</h3>
              <p className="text-magnolia-white/80">
                What's shared in our community stays in our community. Honor confidentiality and personal boundaries.
                Always ask for consent before sharing someone else's story or content.
              </p>
            </div>
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg border border-midnight-teal/30">
              <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-rich-gold" />
              </div>
              <h3 className="font-heading text-xl text-rich-gold mb-3">Celebrate Diversity</h3>
              <p className="text-magnolia-white/80">
                Embrace the diverse experiences, backgrounds, and perspectives that enrich our community. We are
                committed to creating an inclusive space where everyone feels welcome and valued.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-16 bg-magnolia-white">
        <div className="container mx-auto px-4">
          <h2 className="font-heading text-3xl text-midnight-blue mb-12 text-center">Upcoming Community Events</h2>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="bg-white rounded-lg overflow-hidden shadow-lg border border-sage-green/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-40">
                  <Image src={event.image || "/placeholder.svg"} alt={event.title} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight-blue/80 to-transparent"></div>
                  <div className="absolute top-2 left-2 bg-rich-gold/90 text-midnight-blue text-xs font-accent px-2 py-1 rounded-full">
                    {event.date}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-rich-gold font-accent text-sm mb-1">{event.time}</p>
                  <h3 className="font-heading text-xl text-midnight-blue mb-2">{event.title}</h3>
                  <p className="text-midnight-teal/90 text-sm mb-4">{event.description}</p>
                  <div className="flex justify-between items-center">
                    <p className="text-xs text-midnight-teal/70">{event.access}</p>
                    <Link
                      href="/patron-portal"
                      className="inline-flex items-center text-midnight-teal font-accent text-sm hover:underline"
                    >
                      Register
                      <ArrowRight className="ml-1 h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/events"
              className="inline-flex items-center gap-2 px-6 py-3 bg-midnight-blue text-magnolia-white rounded-md font-accent text-sm hover:bg-midnight-blue/90 transition-colors"
            >
              View All Events
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <h2 className="font-heading text-3xl text-rich-gold mb-6">Ready to Join Our Community?</h2>
          <p className="text-magnolia-white/90 mb-8 max-w-2xl mx-auto">
            Become a patron to access our community features, exclusive content, and special events. Choose the
            membership tier that best fits your needs and join us on this journey of transformation.
          </p>
          <Link
            href="/patron-portal"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors shadow-md hover:shadow-lg"
          >
            Explore Membership Options
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <SiteFooter />
    </div>
  )
}
