import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Users, MessageCircle, Calendar, BookOpen } from "lucide-react"
import { SectionHeading } from "@/components/ui/section-heading"

export function CommunitySection() {
  const communityFeatures = [
    {
      title: "Spoonie Community",
      description: "A supportive space for those navigating chronic illness, disability, and neurodivergence.",
      icon: <Users className="h-6 w-6 text-rich-gold" />,
      link: "#",
    },
    {
      title: "Collaborative Projects",
      description: "Opportunities to connect and create with other Black women creators in our community.",
      icon: <BookOpen className="h-6 w-6 text-rich-gold" />,
      link: "#",
    },
    {
      title: "Monthly Gatherings",
      description: "Virtual events focused on healing, creativity, and business development.",
      icon: <Calendar className="h-6 w-6 text-rich-gold" />,
      link: "#",
    },
    {
      title: "Mentorship Program",
      description: "Connect with experienced creators for guidance and support on your journey.",
      icon: <MessageCircle className="h-6 w-6 text-rich-gold" />,
      link: "#",
    },
  ]

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-midnight-blue/90 to-midnight-teal/80 text-magnolia-white relative overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-rich-gold/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-64 h-64 bg-midnight-teal/10 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <SectionHeading
          label="COMMUNITY"
          title="Join Our Healing Collective"
          description="Connect with like-minded creators in a supportive community focused on transformation, creativity, and sustainable success."
          titleColor="text-rich-gold"
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto mb-16">
          {communityFeatures.map((feature, index) => (
            <div
              key={index}
              className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-midnight-teal/30 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 h-full flex flex-col"
            >
              <div className="w-12 h-12 bg-rich-gold/20 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="font-heading text-xl text-rich-gold mb-3">{feature.title}</h3>
              <p className="text-magnolia-white/90 mb-4 flex-grow">{feature.description}</p>
              <Link
                href={feature.link}
                className="font-accent text-sm text-rich-gold hover:underline inline-flex items-center gap-1 group mt-auto"
              >
                Learn More
                <ArrowRight className="h-3 w-3 transform group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h3 className="font-heading text-2xl text-rich-gold mb-8 text-center">Community Voices</h3>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-rich-gold/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src="/professional-black-woman-portrait.png" alt="Community Member" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg text-rich-gold">Amara J.</p>
                  <p className="text-sm text-magnolia-white/80">Digital Artist & Educator</p>
                </div>
              </div>
              <p className="text-magnolia-white/90 italic">
                "Finding this community has been transformative for my creative practice. As a neurodivergent creator,
                having systems and support that work with my brain instead of against it has helped me build a
                sustainable business while honoring my need for rest."
              </p>
            </div>

            <div className="bg-midnight-blue/40 backdrop-blur-sm p-6 rounded-lg shadow-lg border border-rich-gold/20">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden">
                  <Image src="/placeholder.svg?key=p75mo" alt="Community Member" fill className="object-cover" />
                </div>
                <div>
                  <p className="font-heading text-lg text-rich-gold">Tasha M.</p>
                  <p className="text-sm text-magnolia-white/80">Writer & Business Coach</p>
                </div>
              </div>
              <p className="text-magnolia-white/90 italic">
                "The automation strategies I've learned through this community have literally given me my life back.
                I've been able to create multiple passive income streams that support me while I focus on my health and
                creative projects that light me up."
              </p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <Link
            href="/patron-portal"
            className="inline-flex items-center gap-2 px-8 py-4 bg-rich-gold text-midnight-blue rounded-md font-accent text-sm hover:bg-rich-gold/90 transition-colors group shadow-md hover:shadow-lg"
          >
            Join Our Community
            <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  )
}
